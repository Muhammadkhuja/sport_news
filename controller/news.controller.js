const { errorHandler } = require("../helpers/error_handler");
const pool = require("../config/db");

const addNews = async (req, res) => {
  try {
    const {
      news_id,
      category_id,
      author_id,
      status,
      published_at,
      source,
      lang_id,
    } = req.body;

    const newnews = await pool.query(
      `INSERT INTO news(news_id,
      category_id,
      author_id,
      status,
      published_at,
      source,
      lang_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING * 
            `,
      [news_id, category_id, author_id, status, published_at, source, lang_id]
    );
    if (newNews.rowCount === 0) {
      return res
        .status(404)
        .send({ message: "Qiymatlar shartni qanoatlantirmaydi " });
    }
    console.log(newnews);
    console.log(newnews.rows[0]);
    res
      .status(201)
      .send({ message: "Yangi news qo'shildi", news: newnews.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getNews = async (req, res) => {
  try {
    const getnews = await pool.query(`select * from  news`);
    console.log(getnews);
    console.log(getnews.rows[0]);
    res.status(201).send({ message: "barcha news lar", news: getnews.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getByIdNews = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({ message: "Id da xatolik " });
    }
    const getnews = await pool.query(`select * from news where id=$1`, [id]);
    console.log(getnews);
    console.log(getnews.rows[0]);
    res
      .status(201)
      .send({ message: "id bo'yicha news lar", news: getnews.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateNews = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      news_id,
      category_id,
      author_id,
      status,
      published_at,
      source,
      lang_id,
    } = req.body;

    const newnews = await pool.query(
      `update news
      set news_id=$1,
      category_id=$2,
      author_id=$3,
      status=$4,
      published_at=$5,
      source=$6,
      lang_id=$7 
      where id = $8
      returning *; 
            `,
      [
        news_id,
        category_id,
        author_id,
        status,
        published_at,
        source,
        lang_id,
        id,
      ]
    );
    if (newNews.rowCount === 0 || !id) {
      return res
        .status(404)
        .send({ message: "id yoki qiymatlar shartni qanoatlantirmaydi " });
    }
    console.log(newnews);
    console.log(newnews.rows[0]);
    res.status(201).send({ message: "update qilindi", news: newnews.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteNews = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({ message: "Id da xatolik " });
    }
    const getnews = await pool.query(`delete  from news where id=$1`, [id]);
    console.log(getnews);
    console.log(getnews.rows[0]);
    res.status(201).send({
      message: "id bo'yicha news lar o'chirildi",
      news: getnews.rows[0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNews,
  getNews,
  getByIdNews,
  updateNews,
  deleteNews,
};
