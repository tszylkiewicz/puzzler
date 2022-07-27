import { createServer } from './utils/server';
import db from './utils/db';
import logger from './utils/logger';
import dotenv from 'dotenv';

dotenv.config();
const port = process.env.PORT;

db.open()
    .then(() => createServer())
    .then((server) => {
        server.listen(port, () => {
            logger.info(`Server listening on port ${port}`);
        });
    })
    .catch((err) => {
        logger.error(`Error: ${err}`);
    });
