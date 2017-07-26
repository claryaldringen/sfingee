-- Adminer 4.3.1 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `conversation`;
CREATE TABLE `conversation` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id1` int(10) unsigned NOT NULL,
  `user_id2` int(10) unsigned NOT NULL,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id1_user_id2` (`user_id1`,`user_id2`),
  KEY `user_id2` (`user_id2`),
  CONSTRAINT `conversation_ibfk_1` FOREIGN KEY (`user_id1`) REFERENCES `user` (`id`),
  CONSTRAINT `conversation_ibfk_2` FOREIGN KEY (`user_id2`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

INSERT INTO `conversation` (`id`, `user_id1`, `user_id2`, `updated`) VALUES
  (2,	1,	10,	'2017-07-06 19:09:50'),
  (3,	1,	4,	'2017-07-06 19:26:43'),
  (4,	1,	9,	'2017-07-07 06:54:46');

DROP TABLE IF EXISTS `image`;
CREATE TABLE `image` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `name` bigint(20) unsigned NOT NULL,
  `extension` varchar(8) NOT NULL,
  `avatar` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `image_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `image` (`id`, `user_id`, `name`, `extension`, `avatar`, `updated`) VALUES
  (1,	1,	1493829456595,	'png',	1,	'2017-05-03 16:37:36'),
  (2,	2,	1493877784069,	'jpg',	1,	'2017-05-04 06:03:04'),
  (3,	4,	1493878155404,	'jpg',	1,	'2017-05-04 06:09:15'),
  (4,	5,	1493878222463,	'jpg',	1,	'2017-05-04 06:10:22'),
  (5,	6,	1493878329701,	'jpg',	1,	'2017-05-04 06:12:09'),
  (6,	7,	1493878418760,	'jpg',	1,	'2017-05-04 06:13:38'),
  (7,	8,	1493878461046,	'jpg',	1,	'2017-05-04 06:14:21'),
  (8,	9,	1493878513414,	'jpg',	1,	'2017-05-04 06:15:13'),
  (9,	10,	1499334396436,	'jpg',	1,	'2017-07-06 09:46:36');

DROP TABLE IF EXISTS `message`;
CREATE TABLE `message` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `conversation_id` int(10) unsigned NOT NULL,
  `from_user_id` int(10) unsigned NOT NULL,
  `to_user_id` int(10) unsigned NOT NULL,
  `message` text NOT NULL,
  `readed` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `conversation_id` (`conversation_id`),
  KEY `from_user_id` (`from_user_id`),
  KEY `to_user_id` (`to_user_id`),
  CONSTRAINT `message_ibfk_1` FOREIGN KEY (`conversation_id`) REFERENCES `conversation` (`id`),
  CONSTRAINT `message_ibfk_2` FOREIGN KEY (`from_user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `message_ibfk_3` FOREIGN KEY (`to_user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `message` (`id`, `conversation_id`, `from_user_id`, `to_user_id`, `message`, `readed`, `updated`) VALUES
  (2,	2,	1,	10,	'Test 2',	0,	'2017-07-06 19:09:50'),
  (3,	2,	1,	10,	'test',	0,	'2017-07-06 19:10:24'),
  (4,	2,	10,	1,	'sdgddsgsdg',	0,	'2017-07-06 19:10:56'),
  (5,	2,	1,	10,	'Test',	0,	'2017-07-06 19:17:39'),
  (6,	2,	1,	10,	'prdel',	0,	'2017-07-06 19:21:23'),
  (7,	3,	1,	4,	'Test chatu',	0,	'2017-07-06 19:26:43'),
  (8,	2,	1,	10,	'fooo',	0,	'2017-07-07 05:14:25'),
  (9,	4,	1,	9,	'Další test s terezou',	0,	'2017-07-07 06:54:46'),
  (10,	3,	1,	4,	'test',	0,	'2017-07-07 10:59:22'),
  (11,	4,	1,	9,	'A ještě jeden test',	0,	'2017-07-07 11:11:52'),
  (12,	3,	1,	4,	'Nemluvíš?',	0,	'2017-07-07 11:13:16'),
  (13,	2,	10,	1,	'Ahoj :-)',	0,	'2017-07-07 11:14:21'),
  (14,	2,	10,	1,	'test',	0,	'2017-07-07 11:15:06'),
  (15,	2,	1,	10,	'foo',	0,	'2017-07-07 11:15:27'),
  (16,	2,	10,	1,	'ble ble',	0,	'2017-07-07 11:15:43'),
  (17,	2,	10,	1,	'fsdfsfff',	0,	'2017-07-07 11:15:59'),
  (18,	2,	10,	1,	'fooo',	0,	'2017-07-07 11:19:23'),
  (19,	2,	10,	1,	'test',	0,	'2017-07-07 11:19:42'),
  (20,	2,	1,	10,	'Test přečtení',	0,	'2017-07-07 11:24:10'),
  (21,	2,	1,	10,	'Další test přečtení',	0,	'2017-07-07 11:26:37'),
  (22,	2,	10,	1,	'Můj test přečtení',	0,	'2017-07-07 11:26:53'),
  (23,	2,	10,	1,	'foo bar baz',	0,	'2017-07-07 11:27:24'),
  (24,	2,	10,	1,	't e s t',	0,	'2017-07-07 11:30:27'),
  (25,	2,	1,	10,	'Test smajlíku :-)',	0,	'2017-07-07 11:53:58'),
  (26,	2,	1,	10,	':P',	0,	'2017-07-07 11:54:02');

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL,
  `email` varchar(64) NOT NULL,
  `birthdate` date NOT NULL,
  `sex` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `active` tinyint(4) NOT NULL DEFAULT '0',
  `hash` varchar(32) NOT NULL,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `user` (`id`, `name`, `password`, `email`, `birthdate`, `sex`, `active`, `hash`, `updated`) VALUES
  (1,	'Martin Zadražil',	'$2a$10$hjtA19G.vO.L8O0NvRVVt.eh1YNoGZC5jVp4ef33eGJ1.KVaPrw9i',	'clary.aldringen@seznam.cz',	'1999-01-01',	0,	1,	'',	'2017-05-03 16:37:36'),
  (2,	'Alice',	'$2a$10$BuVJ0wn7q.7bc3DzXP/K3eoj51kWubnlgK6w7cA.QU/7NhgoqddYa',	'test1@test.cz',	'1999-01-01',	1,	1,	'',	'2017-05-04 06:03:04'),
  (4,	'Aneta',	'$2a$10$ma4iqrh6RvCH4s8EwSgIWe.awN9OI.I3nIt7xAPvv/s/HBz61hxe.',	'test2@test.cz',	'1999-01-01',	1,	1,	'',	'2017-05-04 06:09:15'),
  (5,	'Bára',	'$2a$10$ynknr7NIR/3kSog/4dylaeHZL99MpNpOhiqjmbbx/n1nP6XyXa6S.',	'test3@test.cz',	'1999-01-01',	1,	1,	'',	'2017-05-04 06:10:22'),
  (6,	'Martina',	'$2a$10$Tpwy4og02MdzyRyJS1RFIuAh8jb3vZvO540jo8ea9Qw98gV7MmRue',	'test4@test.cz',	'1999-01-01',	1,	1,	'',	'2017-05-04 06:12:09'),
  (7,	'Jana',	'$2a$10$X/YBaVJsZqFrEGCG2qS4MujsUwIlwxUY/oo2RtzMBsM2wya75YTJ2',	'test5@test.cz',	'1999-01-01',	1,	1,	'',	'2017-05-04 06:13:38'),
  (8,	'Monika',	'$2a$10$8z0u9bhqzhQHcmLnaDTuyObBL3o5ZDfPFOOVciOvMf095ugjMstV.',	'test6@test.cz',	'1999-01-01',	1,	1,	'',	'2017-05-04 06:14:21'),
  (9,	'Tereza',	'$2a$10$Nc.1mne9CyLo6.de24NmpuinmAscQiTPy30daRKwe5g8mTkcD8/bS',	'test7@test.cz',	'1999-01-01',	1,	1,	'',	'2017-05-04 06:15:13'),
  (10,	'Lilian',	'$2a$10$vni7r55z7l.fXb6Y6IdOAOKUM0yXZR5XbmZfIl0uZBWPm/SyOfeLa',	'dlouhodobexxx@seznam.cz',	'1999-01-01',	1,	1,	'',	'2017-07-06 09:46:36');

-- 2017-07-08 05:34:34