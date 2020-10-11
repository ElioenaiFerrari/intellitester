require('dotenv/config');

const { PORT, APP_NAME } = process.env;

module.exports = {
  apps: [
    {
      name: `[${PORT}]${APP_NAME}`,
      script: 'src/main.js',
      exec_interpreter: 'babel-node',
      instances: 'max',
      exec_mode: 'fork_mode',
    },
  ],
};
