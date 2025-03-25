const { errorHandler } = require("../helpers/error_handler");
const pool = require("../config/db");

const addNewstag = async (req, res) => {
  try {
    const { user_id, is_approved, is_editor } = req.body;

    const newNewstag = await pool.query(
      `INSERT INTO news_tag(user_id, is_approved, is_editor)
            VALUES ($1, $2, $3) RETURNING * 
            `,
      [user_id, is_approved, is_editor]
    );
    if (newNewstag.rowCount === 0) {
      return res
        .status(404)
        .send({ message: "Qiymatlar shartni qanoatlantirmaydi " });
    }
    console.log(newNewstag);
    console.log(newNewstag.rows[0]);
    res
      .status(201)
      .send({
        message: "Yangi news tags qo'shildi",
        newstag: newNewstag.rows[0],
      });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getNewstag = async (req, res) => {
  try {
    const getNewstag = await pool.query(`select * from  news_tag`);
    console.log(getNewstag);
    console.log(getNewstag.rows[0]);
    res
      .status(201)
      .send({ message: "barcha newstag lar", newstag: getNewstag.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getByIdNewstag = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({ message: "Id da xatolik " });
    }
    const getNewstag = await pool.query(`select * from news_tag where id=$1`, [
      id,
    ]);
    console.log(getNewstag);
    console.log(getNewstag.rows[0]);
    res
      .status(201)
      .send({
        message: "id bo'yicha newstag lar",
        newstag: getNewstag.rows[0],
      });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateNewstag = async (req, res) => {
  try {
    const id = req.params.id;
    const { user_id, is_approved, is_editor } = req.body;

    const newNewstag = await pool.query(
      `update news_tag
      set user_id=$1, is_approved=$2, is_editor=$3
      where id = $4
      returning *; 
            `,
      [user_id, is_approved, is_editor, id]
    );
    if (newNewstag.rowCount === 0 || !id) {
      return res
        .status(404)
        .send({ message: "id yoki qiymatlar shartni qanoatlantirmaydi " });
    }
    console.log(newNewstag);
    console.log(newNewstag.rows[0]);
    res
      .status(201)
      .send({ message: "update qilindi", newstag: newNewstag.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteNewstag = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({ message: "Id da xatolik " });
    }
    const getNewstag = await pool.query(`delete  from news_tag where id=$1`, [
      id,
    ]);
    console.log(getNewstag);
    console.log(getNewstag.rows[0]);
    res.status(201).send({
      message: "id bo'yicha newstag lar o'chirildi",
      newstag: getNewstag.rows[0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewstag,
  getNewstag,
  getByIdNewstag,
  updateNewstag,
  deleteNewstag,
};
