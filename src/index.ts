import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import router from './routes';
import Config from './config/Config';
import { errorHandler } from './middleware/ErrorHandler';
import ElasticSearch from './elasticsearch/ElasticSearch';

const app = express();
const port = Config.port;

app.use(express.json());
app.use('/api/v1', router);
app.use(errorHandler());

const startup = async (): Promise<void> => {
    await ElasticSearch.createIndices();

    app.listen(port, () => {
        return console.log(`Server is running on http://localhost:${port}`);
    });
};

startup().catch(err => {
   console.error('Unable to start server', err);

   process.exit();
});
