import { WorkerHandler } from '@vivalaakam/seattle_scheduler';
import { HANDLER_HOST, STORAGE_HOST } from '../constants';
import axios from 'axios';
import { Author, Framework } from '../types';

export default new WorkerHandler('onFramework', async (params, { log }) => {
  const author = await axios.post<Author>(`${HANDLER_HOST}/getAuthor`);

  if (!author.data._id) {
    log('author not exists');
    return;
  }

  const frameworks = await axios.get<Framework[]>(
    `${STORAGE_HOST}/class/framework?authorId=${author.data._id}`
  );

  const resp = await axios.post<Framework>(`${STORAGE_HOST}/class/framework`, {
    title: `yet another js framework ${frameworks.data.length + 1}`,
    authorId: author.data._id,
    repository: `//github.com/js_author_2/js_framework${frameworks.data.length + 1}`,
  });

  log('framework created', {
    title: resp.data.title,
  });
});
