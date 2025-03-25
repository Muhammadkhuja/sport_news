const { errorHandler } = require("../helpers/error_handler");
const pool = require("../config/db");

const addAuthor = async (req, res) => {
  try {
    const { user_id, is_approved, is_editor } = req.body;

    const newAuthor = await pool.query(
      `INSERT INTO authors(user_id, is_approved, is_editor)
            VALUES ($1, $2, $3) RETURNING * 
            `,
      [user_id, is_approved, is_editor]
    );
    if (newAuthor.rowCount === 0) {
      return res
        .status(404)
        .send({ message: "Qiymatlar shartni qanoatlantirmaydi " });
    }
    console.log(newAuthor);
    console.log(newAuthor.rows[0]);
    res
      .status(201)
      .send({ message: "Yangi authors qo'shildi", authors: newAuthor.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getAuthor = async (req, res) => {
  try {
    const getAuthor = await pool.query(`select * from  authors`);
    console.log(getAuthor);
    console.log(getAuthor.rows[0]);
    res
      .status(201)
      .send({ message: "barcha authors lar", authors: getAuthor.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getByIdAuthor = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({ message: "Id da xatolik " });
    }
    const getAuthor = await pool.query(`select * from authors where id=$1`, [
      id,
    ]);
    console.log(getAuthor);
    console.log(getAuthor.rows[0]);
    res
      .status(201)
      .send({ message: "id bo'yicha authors lar", authors: getAuthor.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateAuthor = async (req, res) => {
  try {
    const id = req.params.id;
    const { user_id, is_approved, is_editor } = req.body;

    const newAuthor = await pool.query(
      `update authors
      set user_id=$1, is_approved=$2, is_editor=$3
      where id = $4
      returning *; 
            `,
      [user_id, is_approved, is_editor, id]
    );
    if (newAuthor.rowCount === 0 || !id) {
      return res
        .status(404)
        .send({ message: "id yoki qiymatlar shartni qanoatlantirmaydi " });
    }
    console.log(newAuthor);
    console.log(newAuthor.rows[0]);
    res
      .status(201)
      .send({ message: "update qilindi", authors: newAuthor.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({ message: "Id da xatolik " });
    }
    const getAuthor = await pool.query(`delete  from authors where id=$1`, [
      id,
    ]);
    console.log(getAuthor);
    console.log(getAuthor.rows[0]);
    res.status(201).send({
      message: "id bo'yicha authors lar o'chirildi",
      authors: getAuthor.rows[0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addAuthor,
  getAuthor,
  getByIdAuthor,
  updateAuthor,
  deleteAuthor,
};
