const otpGenerater = require("otp-generator");
const config = require("config");
const { errorHandler } = require("../helpers/error_handler");
const { addMinuteToData } = require("../helpers/add_minutes");
const pool = require("../config/db");
const uuid = require("uuid");
const { encode, decode } = require("../helpers/crypt");
const mailService = require("../services/mail.service");

const createOtp = async (req, res) => {
  try {
    const {phone_number, email} = req.body
    const otp = otpGenerater.generate(4, {
      digits: true,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const now = new Date();
    const expirationTime = addMinuteToData(
      now,
      config.get("expiration_minute")
    );

    const newOtp = await pool.query(
      `
            INSERT INTO otp (id, otp, expiration_time)
            VALUES ($1, $2, $3) RETURNING id`,
      [uuid.v4(), otp, expirationTime]
    );

    const dateil = {
      timesamtamp: now,
      otp_id: newOtp.rows[0].id,
    };

    const encodedDate = await encode(JSON.stringify(dateil));

    if (email) {
        await mailService.sendOtpMail(email, otp);
    }

    res.status(201).send({ verification_key: encodedDate });
  } catch (error) {
    errorHandler(error, res);
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { verification_key, phone_number, otp } = req.body;
    const now = new Date();
    const decodedData = await decode(verification_key);
    const details = JSON.parse(decodedData);
    if (details.phone_number != phone_number) {
      const response = {
        Status: "Failure",
        Message: "Otp bunga jonatilmagan",
      };
      return res.status(400).send(response);
    }
    const otpDate = await pool.query(`SELECT * FROM otp WHERE id=$1  `, [
      details.otp_id,
    ]);

    const otpResult = otpDate.rows[0];

    if (otpDate.rowCount == 0) {
      const response = {
        Status: "Failure",
        Message: "Otp topilmadi",
      };
      return res.status(400).send(response);
    }

    if (otpResult.verified == true) {
      const response = {
        Status: "Failure",
        Message: "Otp dan oldin foydalanilgan",
      };
      return res.status(400).send(response);
    }

    if (otpResult.expiration_time < now) {
      const response = {
        Status: "Failure",
        Message: "Otp vaqti otib ketgan",
      };
      return res.status(400).send(response);
    }

    if (otpResult.otp != otp) {
      const response = {
        Status: "Failure",
        Message: "Otp  mos emas",
      };
      return res.status(400).send(response);
    }
    await pool.query(
      `
            UPDATE otp SET verified=true WHERE id=$1
            `,
      [otpResult.id]
    );
    let userID, isNEW;

    const userData = await pool.query(
      `SELECT * FROM users WHERE phone_number = $1`,
      [phone_number]
    );
    if (userData.rows.length == 0) {
      const newUser = await pool.query(
        `
                    INSERT INTO users (phone_number, is_active) VALUES ($1, true) RETURNING id`,
        [phone_number]
      );
      userID = newUser.rows[0].id;
      isNEW = true;
    } else {
      userID = newUser.rows[0].id;
      isNEW = true;
    }

    const response = {
      Status: "Seccess",
    };
    return res.status(200).send(response);
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = { createOtp, verifyOTP };
