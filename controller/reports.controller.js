const { errorHandler } = require("../helpers/error_handler");
const pool = require("../config/db");

const addreports = async (req, res) => {
  try {
    const { user_id, news_id, reason, status, created_at } = req.body;

    const newreports = await pool.query(
      `INSERT INTO reports(user_id, news_id, reason, status, created_at)
            VALUES ($1, $2, $3, $4, $5) RETURNING * 
            `,
      [ user_id, news_id, reason, status, created_at ]
    );
    if (newreports.rowCount === 0) {
      return res
        .status(404)
        .send({ message: "Qiymatlar shartni qanoatlantirmaydi " });
    }
    console.log(newreports);
    console.log(newreports.rows[0]);
    res.status(201).send({
      message: "Yangi reports qo'shildi",
      reports: newreports.rows[0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getreports = async (req, res) => {
  try {
    const getreports = await pool.query(`select * from  reports`);
    console.log(getreports);
    console.log(getreports.rows[0]);
    res
      .status(201)
      .send({ message: "barcha reports lar", reports: getreports.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getByIdreports = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({ message: "Id da xatolik " });
    }
    const getreports = await pool.query(`select * from reports where id=$1`, [
      id,
    ]);
    console.log(getreports);
    console.log(getreports.rows[0]);
    res.status(201).send({
      message: "id bo'yicha reports lar",
      reports: getreports.rows[0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updatereports = async (req, res) => {
  try {
    const id = req.params.id;
    const { user_id, news_id, reason, status, created_at } = req.body;

    const newreports = await pool.query(
      `update reports
      set user_id=$1, news_id=$2, reason=$3, status=$4, created_at=$5
      where id = $6
      returning *; 
            `,
      [
        user_id, news_id, reason, status, created_at,id,
      ]
    );
    if (newreports.rowCount === 0 || !id) {
      return res
        .status(404)
        .send({ message: "id yoki qiymatlar shartni qanoatlantirmaydi " });
    }
    console.log(newreports);
    console.log(newreports.rows[0]);
    res
      .status(201)
      .send({ message: "update qilindi", reports: newreports.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deletereports = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({ message: "Id da xatolik " });
    }
    const getreports = await pool.query(`delete  from reports where id=$1`, [
      id,
    ]);
    console.log(getreports);
    console.log(getreports.rows[0]);
    res.status(201).send({
      message: "id bo'yicha reports lar o'chirildi",
      reports: getreports.rows[0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addreports,
  getreports,
  getByIdreports,
  updatereports,
  deletereports,
};
