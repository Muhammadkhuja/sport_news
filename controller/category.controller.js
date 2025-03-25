const { errorHandler } = require("../helpers/error_handler");
const pool = require("../config/db");

const addCategory = async (req, res) => {
  try {
    const { name, description, parent_id } = req.body;

    const newcategory = await pool.query(
      `INSERT INTO category(name, description, parent_id)
            VALUES ($1, $2, $3) RETURNING * 
            `,
      [name, description, parent_id]
    );
    if (newLang.rowCount === 0) {
      return res
        .status(404)
        .send({ message: "Qiymatlar shartni qanoatlantirmaydi " });
    }
    console.log(newcategory);
    console.log(newcategory.rows[0]);
    res.status(201).send({
      message: "Yangi category qo'shildi",
      category: newcategory.rows[0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getCategory = async (req, res) => {
  try {
    const getcategory = await pool.query(`select * from  category`);
    console.log(getcategory);
    console.log(getcategory.rows[0]);
    res
      .status(201)
      .send({ message: "barcha category lar", category: getcategory.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getByIdCategory = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).send({ message: "id noto'gri " });
    }
    const getcategory = await pool.query(`select * from category where id=$1`, [
      id,
    ]);
    console.log(getcategory);
    console.log(getcategory.rows[0]);
    res.status(201).send({
      message: "id bo'yicha category lar",
      category: getcategory.rows[0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description, parent_id } = req.body;

    const newcategory = await pool.query(
      `update category
      set name=$1, description=$2, parent_id=$3 
      where id = $4
      returning *; 
            `,
      [name, description, parent_id, id]
    );
    if (newLang.rowCount === 0 || !id) {
      return res
        .status(404)
        .send({ message: "id yoki qiymatlar shartni qanoatlantirmaydi " });
    }
    console.log(newcategory);
    console.log(newcategory.rows[0]);
    res
      .status(201)
      .send({ message: "update qilindi", category: newcategory.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).send({ message: "id noto'gri " });
    }
    const getcategory = await pool.query(`delete  from category where id=$1`, [
      id,
    ]);
    console.log(getcategory);
    console.log(getcategory.rows[0]);
    res.status(201).send({
      message: "id bo'yicha category lar o'chirildi",
      category: getcategory.rows[0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addCategory,
  getCategory,
  getByIdCategory,
  updateCategory,
  deleteCategory,
};
