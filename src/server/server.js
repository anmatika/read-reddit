const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');
const chalk = require('chalk');
const express = require('express');

module.exports.createServer = (app) => {
  app.use(express.static(path.join(__dirname, './')));
  app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
  );
  app.use(bodyParser.json());

  // const privateKey = fs.readFileSync(path.join(`${__dirname}/sslcert/key.pem`));
  // const certificate = fs.readFileSync(path.join(`${__dirname}/sslcert/server.crt`));
  // const credentials = { key: privateKey, cert: certificate };

  const DEFAULT_PORT_HTTP = 4444;
  // const DEFAULT_PORT_HTTPS = 4445;

  const httpServer = http.createServer(app);
  const portHttp = process.env.PORT_HTTP || DEFAULT_PORT_HTTP;
  // const portHttps = process.env.PORT_HTTPS || DEFAULT_PORT_HTTPS;

  // app.set('portHttps', portHttps);
  app.set('portHttp', portHttp);

  // const httpsServer = https.createServer(credentials, app);

  // httpsServer.listen(app.get('portHttps'), () =>
  //   log(chalk.magenta(`Dev api server listening on https://localhost:${portHttps}`)),
  // );

  httpServer.listen(app.get('portHttp'), () =>
    console.log(chalk.green(`Dev api server listening on http://localhost:${portHttp}`)),
  );

  return {
    httpServer,
    // httpsServer,
  };
};
