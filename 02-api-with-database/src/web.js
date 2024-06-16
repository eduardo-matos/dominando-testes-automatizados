const app = require('./routes');
const config = require('./config');

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
