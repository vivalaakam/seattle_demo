import { WorkerHandler } from '@vivalaakam/seattle_scheduler';

export default new WorkerHandler(
  'onCron15',
  (params, { log, publishEvent }) => {
    setTimeout(() => {
      log('call');
      publishEvent('onEvent', { currentTime: new Date() });
    }, 250);
  },
  {
    cronJob: ['0 */15 * * * *'],
  }
);
