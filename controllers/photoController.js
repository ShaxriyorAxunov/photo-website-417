const pool = require("../config/db");
const jwt = require("jsonwebtoken");

exports.addPhoto = async (req, res) => {
  try {
    const { userId } = req.body;
    const filepath = req.file.path;
    const result = await pool.query(
      "INSERT INTO photos (filepath, userId) VALUES ($1, $2) RETURNING *",
      [filepath, userId]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Girgittonimizda nomaqbul nuqson yuzaga keldi");
  }
}

exports.getPhotos = async (req, res) => {
  try {
    const { userId } = req.query;

    const result = await pool.query(
      `select photos.id, filepath, firstname, lastname, count(photoId) as likeCount,
      exists (select * from likes where userId = $1 and photoId = photos.id) as isLiked
      from photos
      left join likes on likes.photoId = photos.id
      inner join users on photos.userId = users.id
      group by photos.id, users.id`,
      [userId]
    );

    const photos = result.rows.map(photo => {const pool = require("../config/db");
const jwt = require("jsonwebtoken");

exports.addPhoto = async (req, res) => {
  try {
    const { userId } = req.body;
    const filepath = req.file.path;
    const result = await pool.query(
      "INSERT INTO photos (filepath, userId) VALUES ($1, $2) RETURNING *",
      [filepath, userId]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
}

exports.getPhotos = async (req, res) => {
  try {
    const { userId } = req.query;

    const result = await pool.query(
      `SELECT 
        p.id, 
        p.filepath, 
        u.firstname, 
        u.lastname, 
        COUNT(l.photoId) AS likeCount,
        EXISTS (SELECT 1 FROM likes WHERE userId = $1 AND photoId = p.id) AS isLiked
      FROM 
        photos p
      LEFT JOIN 
        likes l ON l.photoId = p.id
      INNER JOIN 
        users u ON p.userId = u.id
      GROUP BY 
        p.id, u.id`,
      [userId]
    );

    const photos = result.rows.map(photo => ({
      ...photo,
      url: `http://localhost:4000/${photo.filepath}`,
    }));

    res.status(200).json(photos);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
}

exports.myPhotos = async (req, res) => {
  try {
    const { id } = req.params.id;
    if (id) {
      const resultUser = await pool.query(
        "SELECT * FROM photos WHERE userId = $1",
        [id]
      );

      const photos = resultUser.rows.map(photo => ({
        ...photo,
        url: `http://localhost:4000/${photo.filepath}`,
      }));
      return res.status(200).json(photos);
    }

    const result = await pool.query(
      `SELECT 
        p.id, 
        p.filepath AS url, 
        u.firstname, 
        u.lastname 
      FROM 
        photos p
      INNER JOIN 
        users u ON p.userId = u.id;`
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
}

exports.deletePhoto = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM photos WHERE id = $1", [id]);
    res.status(200).json({ message: "Photo deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
}
      return {...photo, url: 'http://localhost:4000/' + photo.filepath}
    });

    res.status(200).json(photos);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Girgittonimizda nomaqbul nuqson yuzaga keldi");
  }
}

exports.myPhotos = async (req, res) => {
  try {
    const id = req.params
    if (id) {
      const resultUser = await pool.query(
        "SELECT * FROM photos WHERE userId = $1",
        [id]
      );

      const photos = resultUser.rows.map(photo => {
        return {...photo, url: 'http://localhost:4000/' + photo.filepath}
      })
      return res.status(200).json(photos);
    }

    const result = await pool.query(
      `SELECT photos.id, url, firstname, lastname FROM photos INNER JOIN users ON photos.userId = users.id;`
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Girgittonimizda nomaqbul nuqson yuzaga keldi");
  }
}

exports.deletePhoto = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("delete from photos where id = $1", [id]);
    res.status(200).json({
      message: "Rasm o'chirildi",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Girgittonimizda nomaqbul nuqson yuzaga keldi");
  }
}