
import express from 'express';
import cors from 'cors';
import server from './server';
import restApi from './restApi';


const app = express();
app.use(cors());
server.createServer(app);

restApi(app);


