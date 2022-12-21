export enum eJob {
  EMAIL_REGISTRATION_JOB = 'email-registration-job',
  RECOVER_PASSWORD_JOB = 'recover-password-job',
}

export enum eQueue {
  EMAIL_REGISTRATION_QUEUE = 'email-registration-queue',
  RECOVER_PASSWORD_QUEUE = 'recover-password-queue',
}

export const JOB_CONFIG = {
  config_redis: {
    redis: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    },
  },
  list_queues: [
    {
      name: eQueue.EMAIL_REGISTRATION_QUEUE,
    },
    {
      name: eQueue.RECOVER_PASSWORD_QUEUE,
    },
  ],
};
