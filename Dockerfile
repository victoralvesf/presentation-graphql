FROM node:8

LABEL maintainer="Victor Alves <viictor.alvess12@gmail.com>"

WORKDIR /var/www

COPY . .

RUN npm install -g @adonisjs/cli

COPY init.sh /init.sh

RUN chmod 755 /init.sh

CMD ["/init.sh"]
