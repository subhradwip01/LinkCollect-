cd ~
curl -sL https://deb.nodesource.com/setup_14.x -o nodesource_setup.sh
cd ~
curl -sL https://deb.nodesource.com/setup_14.x -o nodesource_setup.sh
nano nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt install nodejs
cd ~
sudo apt install nodejs
node -v
npm -v
sudo apt install npm
sudo shutdown -r now
sudo apt install build-essential
mkdir apps
cd apps
git clone https://github.com/linkcollect/LinkCollect-.git
ls
git clone https://github.com/linkcollect/LinkCollect-.git
curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
apt-key list
sudo apt-get install gnupg
url -fsSL https://pgp.mongodb.com/server-6.0.asc |    sudo gpg -o /usr/share/keyrings/mongodb-server-6.0.gpg    --dearmor
curl -fsSL https://pgp.mongodb.com/server-6.0.asc |    sudo gpg -o /usr/share/keyrings/mongodb-server-6.0.gpg    --dearmor
etc/apt/sources.list.d/mongodb-org-6.0.list~
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-6.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl status mongod
sudo systemctl enable mongod
mongosh
sudo apt update
sudo ufw app list
sudo ufw enable
sudo ufw allow 'Nginx FULL'
sudo ufw allow 'Nginx Full'
sudo ufw allow "Nginx HTTPS"
sudo apt update
sudo ufw app list
sudo ufw allow 'Nginx HTTP'
sudo apt install nginx
sudo ufw allow 'Nginx Full'
sudo ufw app list
systemctl status nginx
sudo systemctl enable nginx
$domain=api.linkcollect.io
domain
domain=api.linkcollect.io
domain
sudo nano /etc/nginx/sites-available/$domain
cd  /etc/nginx/sites-available/
ls
sudo ln -s /etc/nginx/sites-available/$domain /etc/nginx/sites-enabled/
sudo nginx -t
sudo ln -s /etc/nginx/sites-available/$domain /etc/nginx/sites-enabled/
sudo nginx -t
sudo nano /etc/nginx/sites-available/$domain
cd /etc/nginx/sites-enabled/
ls
sudo rm -rf api.linkcollect.io
ls
sudo ln -s /etc/nginx/sites-available/$domain /etc/nginx/sites-enabled/
Check syntax - sudo nginx -t
sudo nginx -t
sudo systemctl restart nginx
sudo mongorestore --db linkcollect --drop /var/backups/mongobackups/06-27-23/linkcollect
mongosh
cd /c
cd ~
ls
cd /
ls
cd /apps
ls
cd home/
cd a
ls
cd bhim/
cd apps/
git clone https://github.com/linkcollect/LinkCollect-.git
ls
cd LinkCollect-/
cd src
cd ..
ls
npm i
ls
mongoimport --db linkcollect --collection users --file users.json
mongoimport --db linkcollect --collection users --file newUsers.json
mongoimport --db linkcollect --collection collections --file newCollections.json
mongoimport --db linkcollect --collection timelines --file newTimelines.json
mongosh
cd apps/LinkCollect-/
npm i
cd src
sudo nano .env
node app.js
sudo nano .env
domain=api.linkcollect.io
sudo certbot --nginx -d $domain
sudo apt install certbot python3-certbot-nginx
sudo nano /etc/nginx/sites-available/example.com
sudo nano /etc/nginx/sites-available/api.linkcollect.io
sudo nginx -t
sudo systemctl reload nginx
sudo certbot --nginx -d $domain
sudo systemctl status certbot.timer
sudo certbot renew --dry-run
sudo npm install pm2@latest -g
pm2 startup systemd
pm2 start app.js
ls
cat newUsers.json
exit