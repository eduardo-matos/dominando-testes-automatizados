module.exports = {
  LOG_LEVEL: process.env.LOG_LEVEL || 'error',
  DB: {
    URL: process.env.DATABASE_URL || 'sqlite://:memory:', // could be "postgres://user:pass@example.com:5432/dbname"
    DIALECT: process.env.DATABASE_URL && process.env.DATABASE_URL.split(':')[0] || 'sqlite',
  },
  PORT: parseInt(process.env.PORT, 10) || 3000,
};
