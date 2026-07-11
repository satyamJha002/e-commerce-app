module.exports = {
  apps: [
    {
      name: "elite-mart-api",
      script: "backend/index.js",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
