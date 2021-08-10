FROM ubuntu:20.04

RUN apt update;DEBIAN_FRONTEND=noninteractive apt install -y  nginx;apt -y upgrade;apt clean;rm -rf /var/lib/apt/lists/* \
    rm -rf /var/www/html/index.nginx-debian.html 
ADD html /var/www/html
ADD nginx.conf /etc/nginx
RUN chmod -R 755 /var/www

USER www-data


CMD ["/usr/sbin/nginx"]