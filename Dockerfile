# Utiliser l'image officielle Nginx
FROM nginx:alpine

# Copier ton projet dans le dossier de Nginx
COPY . /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80
