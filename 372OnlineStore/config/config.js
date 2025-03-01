require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  secretKey: process.env.SECRET_KEY,
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    port: process.env.DB_PORT,
  },
};
