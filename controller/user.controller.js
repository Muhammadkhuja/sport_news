const { errorHandler } = require("../helpers/error_handler");
const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwtService = require("../services/jwt.service");
const config = require("config");
const mailService = require("../services/mail.service");

const addUser = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      phone_number,
      password,
      role,
      is_active,
      created_at,
      interests,
      bookmarks,
    } = req.body;

    const newUser = await pool.query(
      `INSERT INTO users(first_name, last_name, email, phone_number, password, role, is_active, created_at, interests, bookmarks)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING * 
            `,
      [
        first_name,
        last_name,
        email,
        password,
        phone_number,
        role,
        is_active,
        created_at,
        interests,
        bookmarks,
      ]
    );
    if (newUser.rowCount === 0) {
      return res
        .status(404)
        .send({ message: "Qiymatlar shartni qanoatlantirmaydi " });
    }
    console.log(newUser);
    console.log(newUser.rows[0]);
    res
      .status(201)
      .send({ message: "Yangi users qo'shildi", users: newUser.rows[0] });


  } catch (error) {
    errorHandler(error, res);
  }
};
const getUser = async (req, res) => {
  try {
    const getUser = await pool.query(`select * from  users`);
    console.log(getUser);
    console.log(getUser.rows[0]);
    res
      .status(201)
      .send({ message: "barcha users lar", users: getUser.rows[0] });

    await mailService.sendActivationMail(
      newUser.email,
      `${config.get("api_url")}/api/users/activate/${activation_link}`
    );
    res.status(201).send({
      message:
        "Yangi foydalanuvchi qo'shildi. Akkauntni foallashtirish uchun pochtaga o'ting",
      newUser,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getByIdUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({ message: "Id da xatolik " });
    }
    const getUser = await pool.query(`select * from users where id=$1`, [id]);
    console.log(getUser);
    console.log(getUser.rows[0]);
    res
      .status(201)
      .send({ message: "id bo'yicha users lar", users: getUser.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      first_name,
      last_name,
      email,
      phone_number,
      password,
      role,
      is_active,
      created_at,
      interests,
      bookmarks,
    } = req.body;

    const newUser = await pool.query(
      `update users
      set first_name=$1, 
      last_name=$2, 
      email=$3,
      phone_number=$4,
      password=$5, 
      role=$6, 
      is_active=$7, 
      created_at=$8, 
      interests=$9, 
      bookmarks=$10
      where id = $11
      returning *; 
            `,
      [
        first_name,
        last_name,
        email,
        phone_number,
        password,
        role,
        is_active,
        created_at,
        interests,
        bookmarks,
        id,
      ]
    );
    if (newUsers.rowCount === 0 || !id) {
      return res
        .status(404)
        .send({ message: "id yoki qiymatlar shartni qanoatlantirmaydi " });
    }
    console.log(newUser);
    console.log(newUser.rows[0]);
    res.status(201).send({ message: "update qilindi", users: newUser.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({ message: "Id da xatolik " });
    }
    const getUser = await pool.query(`delete  from users where id=$1`, [id]);
    console.log(getUser);
    console.log(getUser.rows[0]);
    res.status(201).send({
      message: "id bo'yicha users lar o'chirildi",
      users: getUser.rows[0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userResult = await pool.query(
      ` SELECT id, email, password, role FROM users WHERE email = $1`,
      [email]
    );
    const user = userResult.rows[0];

    if (!user) {
      return res.status(400).send({ message: "Email yoki password noto'gri " });
    }
    const valiPassword = bcrypt.compare(password, user.password);
    if (!valiPassword) {
      return res.status(400).send({ message: "Email yoki password noto'gri " });
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const tokens = jwtService.generateTokens(payload);

    await pool.query(` update users set refresh_token = $1 where email = $2`, [
      tokens.refreshtoken,
      user.email,
    ]);

    res.cookie("refreshToken", tokens.refreshtoken, {
      httpOnly: true,
      maxAge: config.get("refresh_cookie_time"),
    });
    res.send({
      message: "Tizimga hush kelibsiz",
      accessToken: tokens.accesstoken,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const logoutuser = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res
        .status(400)
        .send({ message: "Cookie refresh token topilmadi ?" });
    }
    const userResult = await pool.query(
      ` SELECT id, email, role FROM users WHERE refresh_token = $1`,
      [refreshToken]
    );
    const user = userResult.rows[0];
    if (!user) {
      return res
        .status(400)
        .send({ message: "Bunday tokendagi foydalanuvchi topilmadi" });
    }
    await pool.query(`UPDATE users SET refresh_token = NULL WHERE id = $1`, [
      user.id,
    ]);
    res.clearCookie("refreshToken");
    res.send({ message: "User succesfully logged out" });
  } catch (error) {
    errorHandler(error, res);
  }
};

const refreshTokenUser = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res
        .status(400)
        .send({ message: "Cookie refresh token topilmadi ?" });
    }
    const userResult = await pool.query(
      ` SELECT id, email, password, role FROM users WHERE refresh_token = $1`,
      [refreshToken]
    );
    const user = userResult.rows[0];
    if (!user) {
      return res
        .status(400)
        .send({ message: "Bunday tokendagi foydalanuvchi topilmadi" });
    }
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    const tokens = jwtService.generateTokens(payload);
    await pool.query(` update users set refresh_token = $1 where email = $2`, [
      tokens.refreshtoken,
      user.email,
    ]);

    res.cookie("refreshToken", tokens.refreshtoken, {
      httpOnly: true,
      maxAge: config.get("refresh_cookie_time"),
    });
    res.send({
      message: "Tokenlar yangilandi",
      accessToken: tokens.accesstoken,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addUser,
  login,
  logoutuser,
  refreshTokenUser,
  getUser,
  getByIdUser,
  updateUser,
  deleteUser,
};
