const { errorHandler } = require("../helpers/error_handler");
const pool = require("../config/db");

const addNotifaction = async (req, res) => {
  try {
    const { user_id, news_id, msg_type, is_checked, created_at } = req.body;

    const newNotifaction = await pool.query(
      `INSERT INTO notifactions(user_id, news_id, msg_type, is_checked, created_at)
            VALUES ($1, $2, $3, $4, $5) RETURNING * 
            `,
      [user_id, news_id, msg_type, is_checked, created_at]
    );
    if (newNotifaction.rowCount === 0) {
      return res
        .status(404)
        .send({ message: "Qiymatlar shartni qanoatlantirmaydi " });
    }
    console.log(newNotifaction);
    console.log(newNotifaction.rows[0]);
    res
      .status(201)
      .send({
        message: "Yangi notifactions qo'shildi",
        notifactions: newNotifaction.rows[0],
      });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getNotifaction = async (req, res) => {
  try {
    const getNotifaction = await pool.query(`select * from  notifactions`);
    console.log(getNotifaction);
    console.log(getNotifaction.rows[0]);
    res
      .status(201)
      .send({
        message: "barcha notifactions lar",
        notifactions: getNotifaction.rows[0],
      });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getByIdNotifaction = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({ message: "Id da xatolik " });
    }
    const getNotifaction = await pool.query(
      `select * from notifactions where id=$1`,
      [id]
    );
    console.log(getNotifaction);
    console.log(getNotifaction.rows[0]);
    res
      .status(201)
      .send({
        message: "id bo'yicha notifactions lar",
        notifactions: getNotifaction.rows[0],
      });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateNotifaction = async (req, res) => {
  try {
    const id = req.params.id;
    const { user_id, news_id, msg_type, is_checked, created_at } = req.body;

    const newNotifaction = await pool.query(
      `update notifactions
      set user_id=%1, news_id=$2, msg_type=$3, is_checked=$4, created_at=$5
      where id = $6
      returning *; 
            `,
      [user_id, news_id, msg_type, is_checked, created_at, id]
    );
    if (newNotifaction.rowCount === 0 || !id) {
      return res
        .status(404)
        .send({ message: "id yoki qiymatlar shartni qanoatlantirmaydi " });
    }
    console.log(newNotifaction);
    console.log(newNotifaction.rows[0]);
    res
      .status(201)
      .send({
        message: "update qilindi",
        notifactions: newNotifaction.rows[0],
      });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteNotifaction = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({ message: "Id da xatolik " });
    }
    const getNotifaction = await pool.query(
      `delete  from notifactions where id=$1`,
      [id]
    );
    console.log(getNotifaction);
    console.log(getNotifaction.rows[0]);
    res.status(201).send({
      message: "id bo'yicha notifactions lar o'chirildi",
      notifactions: getNotifaction.rows[0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNotifaction,
  getNotifaction,
  getByIdNotifaction,
  updateNotifaction,
  deleteNotifaction,
};
