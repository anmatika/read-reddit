import { log } from './utils/logger';

module.exports = function restApi(app) {
  // app.post('/api/postTest', (req, res) => {
  //   log('req.body', req.body);
  //   res.json({ payload: 'ok', status: 'postTest OK' });
  // });

  app.get('/', (req, res) => {
    log('req.query', req.query);
    res.json({ payload: 'ok', status: 'getTest OK' });
  });

  app.get('/authorize_callback', (req, res) => {
    log('req.query', req.query);
    res.json({ payload: 'authorize_callback', status: 'authorize OK' });
  });
};
