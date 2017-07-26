FROM ubuntu:14.04.5


RUN apt-get update && apt-get -y upgrade && apt-get -y install \
    apache2 \
    software-properties-common \
    git \
    zip \
    unzip \
    mysql-server-5.6 \
    wget \
		python \
    curl

RUN curl -sL https://deb.nodesource.com/setup_7.x | bash -

RUN export LANG=C.UTF-8 && add-apt-repository -y ppa:ondrej/php && apt-get update && apt-get -y install \
    php7.1 \
    php7.1-zip \
    php7.1-xml \
    php7.1-mysql \
    php7.1-mbstring \
    nodejs

COPY ./db.sql /root/

RUN service mysql start && echo "CREATE DATABASE sfingee" | mysql && mysql sfingee < ./root/db.sql

#\n ./node_modules/forever/bin/forever -w start server.js

RUN echo "#!/bin/bash \n\n service mysql start \n service apache2 start \n npm install \n ./node_modules/webpack/bin/webpack.js " > /run.sh
RUN chmod +x /run.sh

EXPOSE 80

WORKDIR /

RUN wget https://github.com/vrana/adminer/releases/download/v4.3.1/adminer-4.3.1-mysql-cs.php
RUN mv adminer-4.3.1-mysql-cs.php /var/www/html/index.php

RUN rm /var/www/html/index.html

WORKDIR /sfingee.com

CMD /run.sh ; bash


