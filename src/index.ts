
import express from 'express';
import cors from 'cors';
import routes from './routes';
import helmet from 'helmet'
import "reflect-metadata";
import { createConnection } from "typeorm";

const PORT = process.env.PORT || 3000;

createConnection().then(async () => {

  // create express app
  const app = express();

  //Middelwares
  app.use(cors());
  app.use(express.json());
  app.use(helmet());

  //Routes
  app.use('/', routes);
  app.use(express.static('public'));

  app.use( (req, res,next)=> {
  res.setHeader("content-security-policy-report-only", "default-src 'self'; script-src 'self' 'report-sample'; style-src 'self' 'report-sample'; base-uri 'none'; object-src 'none'; report-uri https://5e52f4c893efcda6a7d40460.endpoint.csper.io")
  next()
});

// start express server
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));


}).catch (error => console.log(error));
