FROM ubuntu:xenial

RUN echo "mysql-server mysql-server/root_password password H3s1o" | debconf-set-selections && \
    echo "mysql-server mysql-server/root_password_again password H3s1o" | debconf-set-selections

RUN apt-get update && apt-get -y upgrade && apt-get -y install \
    apt-utils \
    apache2 \
    software-properties-common \
    git \
    zip \
    unzip \
    mysql-server \
    wget \
	python \
    curl

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN export LANG=C.UTF-8 && add-apt-repository -y ppa:ondrej/php && apt-get update && apt-get -y install \
    php7.1 \
    php7.1-zip \
    php7.1-xml \
    php7.1-mysql \
    php7.1-mbstring \
    nodejs \
    yarn

COPY ./db.sql /root/

RUN mkdir /var/run/mysqld && \
    usermod -d /var/lib/mysql/ mysql && \
    chown -R mysql:mysql /var/lib/mysql /var/run/mysqld && \
    service mysql start && \
    echo "CREATE DATABASE sfingee" | mysql -pH3s1o && \
    mysql -pH3s1o sfingee < ./root/db.sql

#\n ./node_modules/forever/bin/forever -w start server.js

RUN echo "#!/bin/bash \n\n chown -R mysql:mysql /var/lib/mysql /var/run/mysqld && service mysql start \n service apache2 start \n yarn start " > /run.sh
RUN chmod +x /run.sh

EXPOSE 80

WORKDIR /

RUN wget https://github.com/vrana/adminer/releases/download/v4.3.1/adminer-4.3.1-mysql-cs.php
RUN mv adminer-4.3.1-mysql-cs.php /var/www/html/index.php

RUN rm /var/www/html/index.html

WORKDIR /sfingee.com

RUN yarn

CMD /run.sh ; bash


