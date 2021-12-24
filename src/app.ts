import express from 'express';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import config from 'config';
//
import { Route } from '@interfaces';
import { errorMiddleware, notfoundMiddleware } from '@middlewares';
import { logger, stream } from '@utils/logger';

class App {
    app: express.Application;
    port: number;
    env: string;

    constructor(routes: Route[]) {
        this.app = express();
        this.env = config.get('env');
        this.port = Number(config.get('port'));

        // Logger
        if (this.env === 'production') {
            this.app.use(morgan('combined', {
                skip: (_, res) => (res.statusCode < 400)
            }));
            this.app.use(cors());
        } else {
            this.app.use(morgan('dev', { stream }));
            this.app.use(cors({ origin: true, credentials: true }));
        }

        // Other important middlewares
        this.app.use(hpp());
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.static('public'));

        // Routes
        routes.forEach(route => {
            this.app.use('/api', route.router);
        });

        // Error handling
        this.app.use(errorMiddleware);
        this.app.use(notfoundMiddleware);
    }

    public listen() {
        this.app.listen(this.port, () => {
            logger.info(`======= ENV: ${this.env} =======`);
            logger.info(`🚀 App listening on the port ${this.port}`);
            logger.info(`=================================`);
        });
    }
}

export default App;