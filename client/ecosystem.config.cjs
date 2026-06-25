module.exports = {
  apps: [
    {
      name: "trucmai-client",
      cwd: __dirname,
      script: "npm",
      args: "start",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "500M",
      env: {
        NODE_ENV: "production",
        HOSTNAME: "0.0.0.0",
        PORT: "3000",
      },
    },
  ],
};
