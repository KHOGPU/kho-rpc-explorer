### Setup of https://kho-explorer.com on Ubuntu 16.04

    apt update
    apt upgrade
    apt install git python-software-properties software-properties-common nginx gcc g++ make
    curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
    apt install -y nodejs
    npm install pm2 --global
    add-apt-repository ppa:certbot/certbot
    apt update
    apt upgrade
    apt install python-certbot-nginx

Copy content from [./kho-explorer.com.conf](./kho-explorer.com.conf) into `/etc/nginx/sites-available/kho-explorer.com.conf`

    certbot --nginx -d kho-explorer.com
    cd /etc/ssl/certs
    openssl dhparam -out dhparam.pem 4096
    cd /home/khorium
    git clone https://github.com/KHOGPU/kho-rpc-explorer.git
    cd /home/khorium/kho-rpc-explorer
    npm install
    pm2 start bin/www --name "kho-rpc-explorer"
