import express from 'express';
import conf from './services/config';
import bodyParser from 'body-parser';
import { connectDB } from './models/database';
import routeAuth from './routes/auth';

const app = express();
const { port } = conf;

const init = async () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true,
  }));

  connectDB();
  app.use(routeAuth);

  app.listen(port, function () {
    console.log('Server listen port at ' + port);
  });
};

init();