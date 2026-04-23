# nuxt-payload
A monorepo for projects using Nuxt and Payload CMS.

Prebuilt solution for Nuxt and Payload CMS, including solutions for:
- Lexical Rich Text Rendering
- Live Previews in payload admin panel
- Cacheing CMS data in Redis
- Automatic cache invalidation when content is edited 
- Payload Fetch composable to simplify data fetching
- Payload Page builder functionality
- Nuxt component resolution 

## Deployment
How to deploy on VPS running Ubunutu 24.04 (LTTS) x64


### NVM

install nvm

```
curl https://raw.githubusercontent.com/creationix/nvm/v0.40.3/install.sh | bash
```

close/reopen terminal and install node v24

``` 
nvm i 24
```

### Ubunut Firewall

```
sudo ufw allow 'Nginx Full'
sudo ufw allow 'OpenSSH'
sudo ufw enable
```

### PM2

install and run PM2

```
npm i -g pm2
pm2 startup systemd
```

### Postgres

```
sudo apt update
```

install postgres

```
sudo apt install postgresql postgresql-contrib
```

Create user and prompt for password

```
sudo -u postgres createuser --pwprompt payload_app
```

Create database

```
sudo -u postgres createdb -O payload_app payload_cms
```

Grant schema permissions

```
sudo -u postgres psql -d payload_cms -c "ALTER SCHEMA public OWNER TO payload_app;"
```

### Redis

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

### Run Apps

Clone repo to server

run npm install in both nuxt and payload directories.

```
npm i 
``` 

In each app directory add the environment variables and build the app

```
npm run build
```

in the root directory of the repository run:

```
pm2 start
```

### Nginx

install nginx
```
sudo apt install nginx
```

start nginx

```
sudo systemctl start nginx
```

Copy nginx config from repo to sites-available, from the root of the repository:

```
sudo cp nginx/production.conf /etc/nginx/sites-available/
```

Edit nginx example file to have the correct host name.

Create Symlink in sites-enabled.

```
rm /etc/nginx/sites-enabled/default 
sudo ln -s /etc/nginx/sites-available/production.conf /etc/nginx/sites-enabled/
```

test and restart nginx
```
sudo nginx -t && sudo systemctl reload nginx
```


### SSL Cert

Install certbot 
```
sudo apt install certbot python3-certbot-nginx
```
obstain ssl certificate:
```
sudo certbot --nginx -d example.com
```