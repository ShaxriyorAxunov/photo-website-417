// const { Pool } = require("pg");

// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "yupiter",
//   password: "1230",
//   port: 5432,
// });

// module.exports = pool;

const { Pool } = require("pg");

const pool = new Pool({
  connectionString: "postgresql://shaxriyor:Li1Q3Nu2wzHHSKCa3aOY36Orz0XZMPGE@dpg-cv4pll0fnakc73brf160-a.oregon-postgres.render.com/yupiter_ejjq",
  ssl: {
    rejectUnauthorized: false, // Required for Render PostgreSQL
  },
});

module.exports = pool;