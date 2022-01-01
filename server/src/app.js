import express from 'express';
import conf from './services/config';

const app = express();
const { port } = conf;

const init = async () => {
  app.get('/', (req, res) => {
    return res.send('Hello world!!!');
  });

  app.listen(port, function () {
    console.log('Server listen port at ' + port);
  });
};

init();