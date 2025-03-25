const { errorHandler } = require("../helpers/error_handler");
const pool = require("../config/db");

const addMedia = async (req, res) => {
  try {
    const { news_id, media_type, media_url, uploaded_at } = req.body;

    const newMedia = await pool.query(
      `INSERT INTO media(news_id, media_type, media_url, uploaded_at)
            VALUES ($1, $2, $3, $4) RETURNING * 
            `,
      [news_id, media_type, media_url, uploaded_at]
    );
    if (newMedia.rowCount === 0) {
      return res
        .status(404)
        .send({ message: "Qiymatlar shartni qanoatlantirmaydi " });
    }
    console.log(newMedia);
    console.log(newMedia.rows[0]);
    res
      .status(201)
      .send({ message: "Yangi media qo'shildi", media: newMedia.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getMedia = async (req, res) => {
  try {
    const getMedia = await pool.query(`select * from  media`);
    console.log(getMedia);
    console.log(getMedia.rows[0]);
    res
      .status(201)
      .send({ message: "barcha media lar", media: getMedia.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getByIdMedia = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({ message: "Id da xatolik " });
    }
    const getMedia = await pool.query(`select * from media where id=$1`, [id]);

    console.log(getMedia);
    console.log(getMedia.rows[0]);
    res
      .status(201)
      .send({ message: "id bo'yicha media lar", media: getMedia.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateMedia = async (req, res) => {
  try {
    const id = req.params.id;
    const { news_id, media_type, media_url, uploaded_at } = req.body;

    const newMedia = await pool.query(
      `update media
      set news_id=$1, media_type=$2, media_url=$3, uploaded_at=$4
      where id = $5
      returning *; 
            `,
      [news_id, media_type, media_url, uploaded_at, id]
    );
    if (newMedia.rowCount === 0 || !id) {
      return res
        .status(404)
        .send({ message: "id yoki qiymatlar shartni qanoatlantirmaydi " });
    }
    console.log(newMedia);
    console.log(newMedia.rows[0]);
    res
      .status(201)
      .send({ message: "update qilindi", media: newMedia.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteMedia = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({ message: "Id da xatolik " });
    }
    const getMedia = await pool.query(`delete  from media where id=$1`, [id]);
    console.log(getMedia);
    console.log(getMedia.rows[0]);
    res.status(201).send({
      message: "id bo'yicha media lar o'chirildi",
      media: getMedia.rows[0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addMedia,
  getMedia,
  getByIdMedia,
  updateMedia,
  deleteMedia,
};
