# nuxt-payload
A monorepo for projects using Nuxt and Payload CMS.

## Deployment

### PM2

### Nginx

### SSL Cert

### Install Redis

Install Redis, enable, and start the process on the server.

```
sudo apt install redis-server
sudo systemctl enable redis-server
sudo systemctl start redis-server
```

Add redis url to /apps/nuxt/.env

```
REDIS_URL=redis://127.0.0.1:6379
```