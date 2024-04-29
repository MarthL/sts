# Commencez par une image de base
FROM debian:latest

# Installez Nginx
RUN apt-get update && apt-get install -y nginx

# Copiez votre configuration Nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY sites-enabled /etc/nginx/sites-enabled