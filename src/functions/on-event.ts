import { WorkerHandler } from '@vivalaakam/seattle_scheduler';

export default new WorkerHandler<object>('onEvent', async (params, { log, publishEvent }) => {
  log('data', params);

  if (Math.random() < 0.5) {
    await publishEvent('onBook');
  } else {
    await publishEvent('onFramework');
  }
});
