module.exports = {
  apps: [
    {
      name: 'nuxt',
      cwd: './apps/nuxt',
      script: '.output/server/index.mjs',
      instances: 2,
      exec_mode: 'cluster',
      autorestart: true,
      max_memory_restart: '512M',
      listen_timeout: 8000,
      kill_timeout: 8000,
      env_file: "/root/app/.env",
      env_production: {
        NODE_ENV: 'production',
        NITRO_PRESET: 'node_cluster',
        PORT: '3000'
      },
    },
    {
      name: 'payload',
      cwd: './apps/payloadcms',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      exec_mode: 'fork',
      autorestart: true,
      max_memory_restart: '1G',
      listen_timeout: 8000,
      kill_timeout: 8000,
      env_file: "/root/app/apps/payloadcms/.env",
      env: {
        NODE_ENV: 'production',
        NODE_OPTIONS: '--no-deprecation',
        PORT: 8080
      },
    },
  ],
}