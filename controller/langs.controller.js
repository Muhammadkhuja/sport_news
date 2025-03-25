const { errorHandler } = require("../helpers/error_handler");
const pool = require("../config/db");

const addLang = async (req, res) => {
  try {
    const { name, code } = req.body;

    const newLang = await pool.query(
      `INSERT INTO languages(name, code)
            VALUES ($1, $2) RETURNING * 
            `,
      [name, code]
    );
    if (newLang.rowCount === 0) {
      return res
        .status(404)
        .send({ message: "Qiymatlar shartni qanoatlantirmaydi " });
    }
    console.log(newLang);
    console.log(newLang.rows[0]);
    res
      .status(201)
      .send({ message: "Yangi languages qo'shildi", lang: newLang.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getLang = async (req, res) => {
  try {
    const getLang = await pool.query(`select * from  languages`);
    console.log(getLang);
    console.log(getLang.rows[0]);
    res
      .status(201)
      .send({ message: "barcha languages lar", lang: getLang.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getByIdLang = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({ message: "Id da xatolik " });
    }
    const getLang = await pool.query(`select * from languages where id=$1`, [
      id,
    ]);
    console.log(getLang);
    console.log(getLang.rows[0]);
    res
      .status(201)
      .send({ message: "id bo'yicha languages lar", lang: getLang.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateLang = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, code } = req.body;

    const newLang = await pool.query(
      `update languages
      set name = $1, code = $2
      where id = $3
      returning *; 
            `,
      [name, code, id]
    );
    if (newLang.rowCount === 0 || !id) {
      return res
        .status(404)
        .send({ message: "id yoki qiymatlar shartni qanoatlantirmaydi " });
    }
    console.log(newLang);
    console.log(newLang.rows[0]);
    res.status(201).send({ message: "update qilindi", lang: newLang.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteLang = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({ message: "Id da xatolik " });
    }
    const getLang = await pool.query(`delete  from languages where id=$1`, [
      id,
    ]);
    console.log(getLang);
    console.log(getLang.rows[0]);
    res.status(201).send({
      message: "id bo'yicha languages lar o'chirildi",
      lang: getLang.rows[0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addLang,
  getLang,
  getByIdLang,
  updateLang,
  deleteLang,
};
