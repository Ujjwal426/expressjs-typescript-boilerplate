process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })
//
import { Route } from '@interfaces';
import { IndexRoutes } from '@routes';
import validateEnv from '@utils/validateEnv';
import App from './app';

// Validates ENV variables
validateEnv();

const routes: Route[] = [
    new IndexRoutes()
];

const app = new App(routes);
app.listen();