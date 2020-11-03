require('dotenv/config');

const { PORT, APP_NAME } = process.env;

module.exports = {
  apps: [
    {
      name: `[${PORT}]${APP_NAME}`,
      script: 'build/main.js',
      exec_interpreter: 'babel-node',
      instances: 1,
      exec_mode: 'fork_mode',
    },
  ],
};
