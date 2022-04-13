import { WorkerHandler } from '@vivalaakam/seattle_scheduler';

export type Params = {
  a: number;
  b: number;
};

export default new WorkerHandler<Params>('onRequest', (params, { log }) => {
  return new Promise(resolve => {
    setTimeout(() => {
      log(`result: ${params.a + params.b}`);
      resolve(params.a + params.b);
    });
  });
});
