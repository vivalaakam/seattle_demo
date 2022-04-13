import { WorkerHandler } from '@vivalaakam/seattle_scheduler';
import axios from 'axios';
import { Author } from '../types';
import { STORAGE_HOST } from '../constants';

export default new WorkerHandler<unknown>('getAuthor', async (_params, { log }) => {
  const reallyUniqNumber = Math.round(Math.random() * 10);
  const authorId = `author:${reallyUniqNumber}`;

  log(`enter: ${authorId}`);

  try {
    const author = await axios.get<Author>(`${STORAGE_HOST}/class/author/${authorId}`);

    return author.data;
  } catch (e) {
    log(`author ${authorId} not found`);

    const resp = await axios.post<Author>(`${STORAGE_HOST}/class/author`, {
      _id: authorId,
      author: `js author ${reallyUniqNumber}`,
    });

    log('author created', {
      _id: resp.data._id,
    });

    return resp.data;
  }
});
