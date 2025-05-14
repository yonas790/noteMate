module.exports = {
  HOST: "localhost",
  USER: "yon-naz",
  PASSWORD: "Ttnay@7644", 
  DB: "notes_db",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}; 