const pool = require("../config/db");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getUsers = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM users`);
    res.status(200).json(result.rows);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Girgittonimizda nomaqbul nuqson yuzaga keldi");
  }
};

exports.signup = async (req, res) => {
  try {
    const { firstname, lastname, username, password } = req.body;

    const test = await pool.query(
      `SELECT * FROM users WHERE username = '${username}' LIMIT 1`
    );

    if (test.rows.length > 0) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const salt = await bcryptjs.genSalt(10);
    const encryptedPassword = await bcryptjs.hash(password, salt);

    const result = await pool.query(
      `insert into users( firstname, lastname, username, password ) values($1, $2, $3, $4) returning *`,
      [firstname, lastname, username, encryptedPassword]
    );
    res.status(201).json({ user: result.rows[0] });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Girgittonimizda nomaqbul nuqson yuzaga keldi");
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await pool.query(
      `SELECT * FROM users WHERE username = $1 LIMIT 1`,
      [username]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Incorrect username or password" });
    }

    
    const user = result.rows[0];
    const isValidPassword = await bcryptjs.compare(password, user.password);
    if (!isValidPassword) {
      return res
      .status(404)
      .json({ message: "Incorrect username or password" });
    }


    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username
      },
      "MEN SENGA BIR GAP AYTAMAN, HECH KIM BILMASIN",
      { expiresIn: "1h" }
    )
    
    res.status(200).json({ user, token });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Girgittonimizda nomaqbul nuqson yuzaga keldi");
  }
};
