import express from 'express';
import { middleware as storeMiddleware } from '@vivalaakam/seattle_store';
import { Log, middleware as schedulerMiddleware } from '@vivalaakam/seattle_scheduler';
import { DB_CONNECTION, DB_NAME, PORT, STORAGE_HOST } from './constants';
import path from 'path';
import axios from 'axios';
import { Author } from './types';

Log.apply = async logs => {
  for (const event of logs) {
    await axios.post<Author>(`${STORAGE_HOST}/class/logs`, event);

    console.log(
      `Log.apply: ${event.date}: ${event.event} (${event.type}): ${event.message} ${JSON.stringify(event.data)}`
    );
  }
};

const app = express();
app.use(storeMiddleware({ dbConnection: DB_CONNECTION, dbName: DB_NAME, basePath: '/store' }));
app.use(schedulerMiddleware({ functions: path.resolve(__dirname, './functions'), basePath: '/handler' }));

app.listen(PORT);
