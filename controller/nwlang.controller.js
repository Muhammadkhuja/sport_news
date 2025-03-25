const { errorHandler } = require("../helpers/error_handler");
const pool = require("../config/db");

const addNwlang = async (req, res) => {
  try {
    const { title, contnet, summary_news, lang_id } = req.body;

    const newnews = await pool.query(
      `INSERT INTO news_with_langs(title,
      contnet,
      summary_news,
      lang_id)
            VALUES ($1, $2, $3, $4) RETURNING * 
            `,
      [title, contnet, summary_news, lang_id]
    );
    if (newLang.rowCount === 0) {
      return res
        .status(404)
        .send({ message: "Qiymatlar shartni qanoatlantirmaydi " });
    }
    console.log(newnews);
    console.log(newnews.rows[0]);
    res.status(201).send({
      message: "Yangi news with langs qo'shildi",
      nwlang: newnews.rows[0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getNwlang = async (req, res) => {
  try {
    const getnwlang = await pool.query(`select * from  news_with_langs`);
    console.log(getnwlang);
    console.log(getnwlang.rows[0]);
    res.status(201).send({
      message: "barcha news with langs lar",
      nwlang: getnwlang.rows[0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getByIdNwlang = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({ message: "Id da xatolik " });
    }
    const getnwlang = await pool.query(
      `select * from news_with_langs where id=$1`,
      [id]
    );
    console.log(getnwlang);
    console.log(getnwlang.rows[0]);
    res.status(201).send({
      message: "id bo'yicha news with langs lar",
      nwlang: getnwlang.rows[0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateNwlang = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, contnet, summary_news, lang_id } = req.body;

    const newnews = await pool.query(
      `update news_with_langs
      set title=$1,
      contnet=$2,
      summary_news=$3,
      lang_id=$4 
      where id = $5
      returning *; 
            `,
      [title, contnet, summary_news, lang_id, id]
    );
    if (newLang.rowCount === 0 || !id) {
      return res
        .status(404)
        .send({ message: "id yoki qiymatlar shartni qanoatlantirmaydi " });
    }
    console.log(newnews);
    console.log(newnews.rows[0]);
    res
      .status(201)
      .send({ message: "update qilindi", nwlang: newnews.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteNwlang = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({ message: "Id da xatolik " });
    }
    const getnwlang = await pool.query(
      `delete  from news_with_langs where id=$1`,
      [id]
    );
    console.log(getnwlang);
    console.log(getnwlang.rows[0]);
    res.status(201).send({
      message: "id bo'yicha news with langs lar o'chirildi",
      nwlang: getnwlang.rows[0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNwlang,
  getNwlang,
  getByIdNwlang,
  updateNwlang,
  deleteNwlang,
};
