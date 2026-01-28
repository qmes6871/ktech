module.exports = {
  apps: [{
    name: 'ktech-nextjs',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/ktech/ktech-nextjs',
    env: {
      PORT: 3005,
      NODE_ENV: 'production'
    },
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G'
  }]
};
