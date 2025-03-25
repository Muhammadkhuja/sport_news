const { errorHandler } = require("../helpers/error_handler");
const pool = require("../config/db");

const addViews = async (req, res) => {
  try {
    const { user_id, news_id, viewed_at } = req.body;

    const newViews = await pool.query(
      `INSERT INTO views(user_id, news_id, viewed_at)
            VALUES ($1, $2, $3) RETURNING * 
            `,
      [user_id, news_id, viewed_at]
    );
    if (newViews.rowCount === 0) {
      return res
        .status(404)
        .send({ message: "Qiymatlar shartni qanoatlantirmaydi " });
    }
    console.log(newViews);
    console.log(newViews.rows[0]);
    res.status(201).send({
      message: "Yangi views qo'shildi",
      views: newViews.rows[0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getViews = async (req, res) => {
  try {
    const getViews = await pool.query(`select * from  views`);
    console.log(getViews);
    console.log(getViews.rows[0]);
    res
      .status(201)
      .send({ message: "barcha views lar", views: getViews.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getByIdViews = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({ message: "Id da xatolik " });
    }
    const getViews = await pool.query(`select * from views where id=$1`, [
      id,
    ]);
    console.log(getViews);
    console.log(getViews.rows[0]);
    res.status(201).send({
      message: "id bo'yicha views lar",
      views: getViews.rows[0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateViews = async (req, res) => {
  try {
    const id = req.params.id;
    const { user_id, news_id, viewed_at } = req.body;

    const newViews = await pool.query(
      `update views
      set user_id=$1, news_id=$2, viewd_at=$3
      where id = $4
      returning *; 
            `,
      [user_id, news_id, viewed_at, id]
    );
    if (newViews.rowCount === 0 || !id) {
      return res
        .status(404)
        .send({ message: "id yoki qiymatlar shartni qanoatlantirmaydi " });
    }
    console.log(newViews);
    console.log(newViews.rows[0]);
    res
      .status(201)
      .send({ message: "update qilindi", views: newViews.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteViews = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({ message: "Id da xatolik " });
    }
    const getViews = await pool.query(`delete  from views where id=$1`, [
      id,
    ]);
    console.log(getViews);
    console.log(getViews.rows[0]);
    res.status(201).send({
      message: "id bo'yicha views lar o'chirildi",
      views: getViews.rows[0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addViews,
  getViews,
  getByIdViews,
  updateViews,
  deleteViews,
};
