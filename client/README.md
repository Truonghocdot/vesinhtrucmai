# Truc Mai Client

Ung dung nay la frontend `Next.js 16` dung `App Router`.

## Chay local

```bash
npm install
npm run dev
```

## Build production

```bash
npm install
npm run build
npm run start
```

Mac dinh app se chay tai `http://localhost:3000`.

## Deploy len VPS

Huong de xuat cho du an nay:

- `Nginx` reverse proxy
- `PM2` de giu tien trinh Next.js luon chay
- `Node.js 24` de dong bo voi may local

### 1. Cai moi truong tren VPS

```bash
curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
source ~/.nvm/nvm.sh
nvm install 24
nvm use 24
npm install -g pm2
```

### 2. Dua source code len server

Co the `git clone` repo hoac upload source code vao thu muc, vi du:

```bash
mkdir -p ~/apps
cd ~/apps
git clone <repo-url> trucmai
cd trucmai/client
```

### 3. Cai dependency va build

```bash
npm ci
npm run build
```

### 4. Chay app bang PM2

```bash
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

Kiem tra:

```bash
pm2 status
curl http://127.0.0.1:3000
```

### 5. Cau hinh Nginx

Tao file `/etc/nginx/sites-available/trucmai`:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

Bat site:

```bash
sudo ln -s /etc/nginx/sites-available/trucmai /etc/nginx/sites-enabled/trucmai
sudo nginx -t
sudo systemctl reload nginx
```

### 6. Bat HTTPS voi Let's Encrypt

```bash
sudo apt update
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## Lenh cap nhat sau nay

Moi lan deploy ban co the chay:

```bash
cd ~/apps/trucmai/client
git pull
nvm use 24
npm ci
npm run build
pm2 restart trucmai-client
```

## Ghi chu

- Cac route site nhu `/blog`, `/lien-he`, `/bang-gia`, `/dich-vu` build production binh thuong.
- Can restart `next dev` neu muon test qua IP LAN va dung them `allowedDevOrigins` trong `next.config.ts`.
