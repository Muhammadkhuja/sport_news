const { errorHandler } = require("../helpers/error_handler");
const pool = require("../config/db");

const addUser = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      role,
      is_active,
      created_at,
      interests,
      bookmarks,
    } = req.body;

    const newUser = await pool.query(
      `INSERT INTO users(first_name, last_name, email, password, role, is_active, created_at, interests, bookmarks)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING * 
            `,
      [
        first_name,
        last_name,
        email,
        password,
        role,
        is_active,
        created_at,
        interests,
        bookmarks,
      ]
    );
    if (newLang.rowCount === 0) {
      return res
        .status(404)
        .send({ message: "Qiymatlar shartni qanoatlantirmaydi " });
    }
    console.log(newUser);
    console.log(newUser.rows[0]);
    res
      .status(201)
      .send({ message: "Yangi users qo'shildi", users: newUser.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getUser = async (req, res) => {
  try {
    const getUser = await pool.query(`select * from  users`);
    console.log(getUser);
    console.log(getUser.rows[0]);
    res
      .status(201)
      .send({ message: "barcha users lar", users: getUser.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getByIdUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({ message: "Id da xatolik " });
    }
    const getUser = await pool.query(`select * from users where id=$1`, [id]);
    console.log(getUser);
    console.log(getUser.rows[0]);
    res
      .status(201)
      .send({ message: "id bo'yicha users lar", users: getUser.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      first_name,
      last_name,
      email,
      password,
      role,
      is_active,
      created_at,
      interests,
      bookmarks,
    } = req.body;

    const newUser = await pool.query(
      `update users
      set first_name=$1, 
      last_name=$2, 
      email=$3, 
      password=$4, 
      role=$5, 
      is_active=$6, 
      created_at=$7, 
      interests=$8, 
      bookmarks=$9
      where id = $10
      returning *; 
            `,
      [
        first_name,
        last_name,
        email,
        password,
        role,
        is_active,
        created_at,
        interests,
        bookmarks,
        id,
      ]
    );
    if (newLang.rowCount === 0 || !id) {
      return res
        .status(404)
        .send({ message: "id yoki qiymatlar shartni qanoatlantirmaydi " });
    }
    console.log(newUser);
    console.log(newUser.rows[0]);
    res.status(201).send({ message: "update qilindi", users: newUser.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({ message: "Id da xatolik " });
    }
    const getUser = await pool.query(`delete  from users where id=$1`, [id]);
    console.log(getUser);
    console.log(getUser.rows[0]);
    res.status(201).send({
      message: "id bo'yicha users lar o'chirildi",
      users: getUser.rows[0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addUser,
  getUser,
  getByIdUser,
  updateUser,
  deleteUser,
};
