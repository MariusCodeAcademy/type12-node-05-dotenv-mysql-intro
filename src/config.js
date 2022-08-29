// Config
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, // pas ka mamp 'root'
  port: process.env.DB_PORT, // mamp 8889
  database: process.env.DB_DATABASE,
};
// console.log('dbConfig ===', dbConfig);

module.exports = {
  dbConfig,
};
