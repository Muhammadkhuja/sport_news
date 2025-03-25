const { errorHandler } = require("../helpers/error_handler");
const pool = require("../config/db");

const addTag = async (req, res) => {
  try {
    const { tag_name, description } = req.body;

    const newTag = await pool.query(
      `INSERT INTO tags(tag_name, description)
            VALUES ($1, $2) RETURNING * 
            `,
      [tag_name, description]
    );
    if (newTag.rowCount === 0) {
      return res
        .status(404)
        .send({ message: "Qiymatlar shartni qanoatlantirmaydi " });
    }
    console.log(newTag);
    console.log(newTag.rows[0]);
    res
      .status(201)
      .send({ message: "Yangi tags qo'shildi", tags: newTag.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getTag = async (req, res) => {
  try {
    const getTag = await pool.query(`select * from  tags`);
    console.log(getTag);
    console.log(getTag.rows[0]);
    res.status(201).send({ message: "barcha tags lar", tags: getTag.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getByIdTag = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({ message: "Id da xatolik " });
    }
    const getTag = await pool.query(`select * from tags where id=$1`, [id]);
    console.log(getTag);
    console.log(getTag.rows[0]);
    res
      .status(201)
      .send({ message: "id bo'yicha tags lar", tags: getTag.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateTag = async (req, res) => {
  try {
    const id = req.params.id;
    const { tag_name, description } = req.body;

    const newTag = await pool.query(
      `update tags
      set tag_name=$1, description=$2
      where id = $3
      returning *; 
            `,
      [tag_name, description, id]
    );
    if (newTag.rowCount === 0 || !id) {
      return res
        .status(404)
        .send({ message: "id yoki qiymatlar shartni qanoatlantirmaydi " });
    }
    console.log(newTag);
    console.log(newTag.rows[0]);
    res.status(201).send({ message: "update qilindi", tags: newTag.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteTag = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({ message: "Id da xatolik " });
    }
    const getTag = await pool.query(`delete  from tags where id=$1`, [id]);
    console.log(getTag);
    console.log(getTag.rows[0]);
    res.status(201).send({
      message: "id bo'yicha tags lar o'chirildi",
      tags: getTag.rows[0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addTag,
  getTag,
  getByIdTag,
  updateTag,
  deleteTag,
};
