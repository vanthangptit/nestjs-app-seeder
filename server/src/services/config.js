import fs from 'fs';
import env from 'dotenv';

const envConf = env.config().parsed;

function config() {
  const {
    APP_ENV: appEnv,
    ACCESS_TOKEN_SECRET: accessTokenSecret,
    SERVER_PORT: port,
    MONGO_DB: dbName,
    MONGO_USERNAME_DB: dbUsername,
    MONGO_PASSWORD_DB: dbPassword } = envConf;

  const conf = JSON.parse(fs.readFileSync(`${__dirname}/../../conf/${appEnv}.json`));

  return {
    ...conf,
    appEnv,
    port,
    accessTokenSecret,
    dbName,
    dbPassword,
    dbUsername
  };
}

module.exports = config();