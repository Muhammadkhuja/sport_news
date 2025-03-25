const { errorHandler } = require("../helpers/error_handler");
const pool = require("../config/db");

const addLikes = async (req, res) => {
  try {
    const { user_id, news_id, liked_at } = req.body;

    const newLikes = await pool.query(
      `INSERT INTO likes(user_id, news_id, liked_at)
            VALUES ($1, $2, $3) RETURNING * 
            `,
      [user_id, news_id, liked_at]
    );
    if (newLikes.rowCount === 0) {
      return res
        .status(404)
        .send({ message: "Qiymatlar shartni qanoatlantirmaydi " });
    }
    console.log(newLikes);
    console.log(newLikes.rows[0]);
    res.status(201).send({
      message: "Yangi likes qo'shildi",
      likes: newLikes.rows[0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getLikes = async (req, res) => {
  try {
    const getLikes = await pool.query(`select * from  likes`);
    console.log(getLikes);
    console.log(getLikes.rows[0]);
    res
      .status(201)
      .send({ message: "barcha likes lar", likes: getLikes.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getByIdLikes = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({ message: "Id da xatolik " });
    }
    const getLikes = await pool.query(`select * from likes where id=$1`, [
      id,
    ]);
    console.log(getLikes);
    console.log(getLikes.rows[0]);
    res.status(201).send({
      message: "id bo'yicha likes lar",
      likes: getLikes.rows[0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateLikes = async (req, res) => {
  try {
    const id = req.params.id;
    const { user_id, news_id, liked_at } = req.body;

    const newLikes = await pool.query(
      `update likes
      set user_id=$1, news_id=$2, liked_at=$3
      where id = $4
      returning *; 
            `,
      [user_id, news_id, liked_at, id]
    );
    if (newLikes.rowCount === 0 || !id) {
      return res
        .status(404)
        .send({ message: "id yoki qiymatlar shartni qanoatlantirmaydi " });
    }
    console.log(newLikes);
    console.log(newLikes.rows[0]);
    res
      .status(201)
      .send({ message: "update qilindi", likes: newLikes.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteLikes = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({ message: "Id da xatolik " });
    }
    const getLikes = await pool.query(`delete  from likes where id=$1`, [
      id,
    ]);
    console.log(getLikes);
    console.log(getLikes.rows[0]);
    res.status(201).send({
      message: "id bo'yicha likes lar o'chirildi",
      likes: getLikes.rows[0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addLikes,
  getLikes,
  getByIdLikes,
  updateLikes,
  deleteLikes,
};
