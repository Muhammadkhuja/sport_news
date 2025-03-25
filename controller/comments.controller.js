const { errorHandler } = require("../helpers/error_handler");
const pool = require("../config/db");

const addComment = async (req, res) => {
  try {
    const {
      user_id,
      news_id,
      content,
      created_at,
      reply_comment_id,
      is_approved,
      is_deleted,
      views,
      likes,
    } = req.body;

    const newComment = await pool.query(
      `INSERT INTO comments(user_id, news_id, content, created_at, reply_comment_id, is_approved, is_deleted, views, likes)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING * 
            `,
      [
        user_id,
        news_id,
        content,
        created_at,
        reply_comment_id,
        is_approved,
        is_deleted,
        views,
        likes,
      ]
    );
    if (newComment.rowCount === 0) {
      return res
        .status(404)
        .send({ message: "Qiymatlar shartni qanoatlantirmaydi " });
    }
    console.log(newComment);
    console.log(newComment.rows[0]);
    res.status(201).send({
      message: "Yangi comments qo'shildi",
      comments: newComment.rows[0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getComment = async (req, res) => {
  try {
    const getComment = await pool.query(`select * from  comments`);
    console.log(getComment);
    console.log(getComment.rows[0]);
    res
      .status(201)
      .send({ message: "barcha comments lar", comments: getComment.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getByIdComment = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({ message: "Id da xatolik " });
    }
    const getComment = await pool.query(`select * from comments where id=$1`, [
      id,
    ]);
    console.log(getComment);
    console.log(getComment.rows[0]);
    res.status(201).send({
      message: "id bo'yicha comments lar",
      comments: getComment.rows[0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateComment = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      user_id,
      news_id,
      content,
      created_at,
      reply_comment_id,
      is_approved,
      is_deleted,
      views,
      likes,
    } = req.body;

    const newComment = await pool.query(
      `update comments
      set user_id=$1, news_id=$2, content=$3, created_at=$4, reply_comment_id=$5, is_approved=$6, is_deleted=$7, views=$8, likes=$9
      where id = $10
      returning *; 
            `,
      [
        user_id,
        news_id,
        content,
        created_at,
        reply_comment_id,
        is_approved,
        is_deleted,
        views,
        likes,
        id,
      ]
    );
    if (newComment.rowCount === 0 || !id) {
      return res
        .status(404)
        .send({ message: "id yoki qiymatlar shartni qanoatlantirmaydi " });
    }
    console.log(newComment);
    console.log(newComment.rows[0]);
    res
      .status(201)
      .send({ message: "update qilindi", comments: newComment.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteComment = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({ message: "Id da xatolik " });
    }
    const getComment = await pool.query(`delete  from comments where id=$1`, [
      id,
    ]);
    console.log(getComment);
    console.log(getComment.rows[0]);
    res.status(201).send({
      message: "id bo'yicha comments lar o'chirildi",
      comments: getComment.rows[0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addComment,
  getComment,
  getByIdComment,
  updateComment,
  deleteComment,
};
