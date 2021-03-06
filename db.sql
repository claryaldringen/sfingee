-- Adminer 4.2.1 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

USE `sfingee`;

DROP TABLE IF EXISTS `conversation`;
CREATE TABLE `conversation` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id1` int(10) unsigned NOT NULL,
  `user_id2` int(10) unsigned NOT NULL,
  `locked` tinyint(3) unsigned NOT NULL DEFAULT '1',
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id1_user_id2` (`user_id1`,`user_id2`),
  KEY `user_id2` (`user_id2`),
  CONSTRAINT `conversation_ibfk_1` FOREIGN KEY (`user_id1`) REFERENCES `user` (`id`),
  CONSTRAINT `conversation_ibfk_2` FOREIGN KEY (`user_id2`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

INSERT INTO `conversation` (`id`, `user_id1`, `user_id2`, `locked`, `updated`) VALUES
(1,	3,	6,	1,	'2017-08-13 22:22:08'),
(2,	1,	7,	1,	'2017-08-14 12:48:41'),
(3,	1,	4,	1,	'2017-08-18 18:58:31'),
(4,	1,	2,	0,	'2017-08-21 10:27:33'),
(5,	1,	5,	1,	'2017-08-21 10:29:40'),
(6,	1,	31,	0,	'2017-09-29 18:05:47'),
(7,	39,	39,	0,	'2017-10-11 23:48:06');

DROP TABLE IF EXISTS `image`;
CREATE TABLE `image` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `name` bigint(20) unsigned NOT NULL,
  `extension` varchar(8) NOT NULL,
  `avatar` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `brutto` decimal(9,2) unsigned NOT NULL DEFAULT '0.00',
  `netto` decimal(9,2) unsigned NOT NULL DEFAULT '0.00',
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `image_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `image` (`id`, `user_id`, `name`, `extension`, `avatar`, `brutto`, `netto`, `updated`) VALUES
(1,	1,	1502658881522,	'jpg',	1,	0.00,	0.00,	'2017-08-13 21:14:42'),
(2,	2,	1502659817765,	'jpg',	1,	0.00,	0.00,	'2017-08-13 21:30:18'),
(3,	3,	1502659999295,	'jpg',	1,	0.00,	0.00,	'2017-08-13 21:33:20'),
(4,	4,	1502660140873,	'jpg',	1,	0.00,	0.00,	'2017-08-13 21:35:43'),
(5,	5,	1502660230842,	'jpg',	1,	0.00,	0.00,	'2017-08-13 21:37:12'),
(6,	6,	1502660361870,	'jpg',	1,	0.00,	0.00,	'2017-08-13 21:39:24'),
(7,	7,	1502660492349,	'jpg',	1,	0.00,	0.00,	'2017-08-13 21:41:32'),
(8,	8,	1502660604251,	'jpg',	1,	0.00,	0.00,	'2017-08-13 21:43:24'),
(9,	3,	15026613037961,	'jpg',	0,	9.00,	10.40,	'2017-08-13 21:55:10'),
(10,	3,	15026613037950,	'jpg',	0,	2.00,	2.30,	'2017-08-13 21:55:10'),
(11,	3,	15026613038232,	'jpg',	0,	9.00,	10.40,	'2017-08-13 21:55:10'),
(12,	3,	15026613038403,	'jpg',	0,	8.00,	9.20,	'2017-08-13 21:55:10'),
(13,	3,	15026613068104,	'jpg',	0,	11.00,	12.70,	'2017-08-13 21:55:10'),
(14,	3,	15026613087456,	'jpg',	0,	0.00,	0.00,	'2017-08-13 21:55:10'),
(22,	2,	15026620824010,	'jpg',	0,	3.00,	3.50,	'2017-08-13 22:08:03'),
(23,	2,	15026620824942,	'jpg',	0,	2.00,	2.30,	'2017-08-13 22:08:03'),
(24,	2,	15026620824701,	'jpg',	0,	2.00,	2.30,	'2017-08-13 22:08:03'),
(25,	2,	15026620825303,	'jpg',	0,	0.00,	0.00,	'2017-08-13 22:08:03'),
(26,	2,	15026620832354,	'jpg',	0,	2.00,	2.30,	'2017-08-13 22:08:03'),
(27,	2,	15026620833115,	'jpg',	0,	3.00,	3.50,	'2017-08-13 22:08:03'),
(28,	2,	15026620834216,	'jpg',	0,	3.00,	3.50,	'2017-08-13 22:08:03'),
(29,	2,	15026620834507,	'jpg',	0,	4.00,	4.60,	'2017-08-13 22:08:03'),
(45,	4,	15026623280252,	'jpg',	0,	0.00,	0.00,	'2017-08-13 22:12:35'),
(46,	4,	15026623280553,	'jpg',	0,	20.00,	23.00,	'2017-08-13 22:12:35'),
(47,	4,	15026623277410,	'jpg',	0,	4.00,	4.60,	'2017-08-13 22:12:35'),
(48,	4,	15026623279241,	'jpg',	0,	15.00,	17.30,	'2017-08-13 22:12:35'),
(49,	4,	15026623413864,	'jpg',	0,	15.00,	17.30,	'2017-08-13 22:12:35'),
(50,	4,	15026623410015,	'jpg',	0,	8.00,	9.20,	'2017-08-13 22:12:35'),
(51,	4,	15026623437496,	'jpg',	0,	9.00,	10.40,	'2017-08-13 22:12:35'),
(52,	4,	15026623446657,	'jpg',	0,	4.00,	4.60,	'2017-08-13 22:12:35'),
(76,	6,	15026626994990,	'jpg',	0,	0.00,	0.00,	'2017-08-13 22:18:28'),
(77,	6,	15026627001862,	'jpg',	0,	0.00,	0.00,	'2017-08-13 22:18:28'),
(78,	6,	15026626996661,	'jpg',	0,	0.00,	0.00,	'2017-08-13 22:18:28'),
(79,	6,	15026627002563,	'jpg',	0,	0.00,	0.00,	'2017-08-13 22:18:28'),
(80,	6,	15026627051944,	'jpg',	0,	0.00,	0.00,	'2017-08-13 22:18:28'),
(81,	6,	15026627066445,	'jpg',	0,	0.00,	0.00,	'2017-08-13 22:18:28'),
(111,	8,	15026631304730,	'jpg',	0,	0.00,	0.00,	'2017-08-13 22:25:33'),
(112,	8,	15026631305931,	'jpg',	0,	0.00,	0.00,	'2017-08-13 22:25:33'),
(113,	8,	15026631306252,	'jpg',	0,	2.00,	2.30,	'2017-08-13 22:25:33'),
(114,	8,	15026631306503,	'jpg',	0,	1.00,	1.20,	'2017-08-13 22:25:33'),
(115,	8,	15026631318524,	'jpg',	0,	2.00,	2.30,	'2017-08-13 22:25:33'),
(116,	8,	15026631325585,	'jpg',	0,	0.00,	0.00,	'2017-08-13 22:25:33'),
(117,	8,	15026631325896,	'jpg',	0,	1.00,	1.20,	'2017-08-13 22:25:33'),
(118,	7,	15027147239343,	'jpg',	0,	2.00,	2.30,	'2017-08-14 12:45:30'),
(119,	7,	15027147238782,	'jpg',	0,	2.00,	2.30,	'2017-08-14 12:45:30'),
(120,	7,	15027147238060,	'jpg',	0,	2.00,	2.30,	'2017-08-14 12:45:30'),
(121,	7,	15027147273344,	'jpg',	0,	1.00,	1.20,	'2017-08-14 12:45:30'),
(122,	7,	15027147238491,	'jpg',	0,	1.00,	1.20,	'2017-08-14 12:45:30'),
(123,	7,	15027147274025,	'jpg',	0,	1.00,	1.20,	'2017-08-14 12:45:30'),
(124,	7,	15027147284786,	'jpg',	0,	2.00,	2.30,	'2017-08-14 12:45:30'),
(134,	9,	1502952521341,	'JPG',	1,	0.00,	0.00,	'2017-08-17 06:48:41'),
(135,	21,	1502963019491,	'jpg',	1,	0.00,	0.00,	'2017-08-17 09:43:40'),
(136,	21,	15029631291430,	'jpg',	0,	0.00,	0.00,	'2017-08-17 09:45:39'),
(137,	21,	15029631295013,	'jpg',	0,	0.00,	0.00,	'2017-08-17 09:45:39'),
(138,	21,	15029631294672,	'jpg',	0,	3.00,	3.50,	'2017-08-17 09:45:39'),
(139,	21,	15029631330604,	'jpg',	0,	0.00,	0.00,	'2017-08-17 09:45:39'),
(140,	21,	15029631292791,	'jpg',	0,	10.00,	11.50,	'2017-08-17 09:45:39'),
(141,	21,	15029631344096,	'jpg',	0,	9.00,	10.40,	'2017-08-17 09:45:39'),
(142,	21,	15029631352737,	'jpg',	0,	10.00,	11.50,	'2017-08-17 09:45:39'),
(143,	21,	15029631377419,	'jpg',	0,	10.00,	11.50,	'2017-08-17 09:45:39'),
(144,	21,	15029631343015,	'jpg',	0,	5.00,	5.80,	'2017-08-17 09:46:04'),
(145,	21,	15029631363988,	'jpg',	0,	10.00,	11.50,	'2017-08-17 09:46:04'),
(146,	21,	15029631633781,	'jpg',	0,	5.00,	5.80,	'2017-08-17 09:46:04'),
(147,	22,	1503007838399,	'jpg',	1,	0.00,	0.00,	'2017-08-17 22:10:38'),
(148,	22,	15030080361670,	'png',	0,	0.00,	0.00,	'2017-08-17 22:13:56'),
(149,	22,	15030080610350,	'jpg',	0,	0.00,	0.00,	'2017-08-17 22:14:21'),
(150,	22,	15030080773880,	'JPG',	0,	0.00,	0.00,	'2017-08-17 22:14:38'),
(151,	22,	15030080905560,	'jpg',	0,	0.00,	0.00,	'2017-08-17 22:14:50'),
(152,	22,	15030081012890,	'JPG',	0,	0.00,	0.00,	'2017-08-17 22:15:01'),
(153,	23,	1503047869115,	'jpg',	1,	0.00,	0.00,	'2017-08-18 09:17:49'),
(155,	24,	15030950689450,	'jpg',	1,	0.00,	0.00,	'2017-08-18 22:24:29'),
(156,	24,	15030950838360,	'jpg',	0,	1.60,	1.90,	'2017-08-18 22:24:43'),
(157,	24,	15030951640610,	'jpg',	0,	1.60,	1.90,	'2017-08-18 22:26:04'),
(158,	24,	15030952147330,	'jpg',	0,	1.70,	2.00,	'2017-08-18 22:26:54'),
(159,	24,	15030953036090,	'jpg',	0,	1.80,	2.10,	'2017-08-18 22:28:23'),
(160,	24,	15030954133800,	'jpg',	0,	250.00,	287.50,	'2017-08-18 22:30:13'),
(161,	25,	1503125288161,	'jpg',	1,	0.00,	0.00,	'2017-08-19 06:48:08'),
(162,	25,	15031257776500,	'jpg',	0,	3.00,	3.50,	'2017-08-19 06:56:17'),
(163,	25,	15031258231720,	'jpg',	0,	2.00,	2.30,	'2017-08-19 06:57:03'),
(164,	25,	15031258650430,	'jpg',	0,	4.00,	4.60,	'2017-08-19 06:57:47'),
(165,	25,	15031259028990,	'jpg',	0,	5.00,	5.80,	'2017-08-19 06:58:22'),
(166,	25,	15031259436690,	'jpg',	0,	5.00,	5.80,	'2017-08-19 06:59:04'),
(167,	25,	15031259691790,	'jpg',	0,	3.00,	3.50,	'2017-08-19 06:59:29'),
(168,	25,	15031259947200,	'jpg',	0,	3.00,	3.50,	'2017-08-19 06:59:55'),
(170,	25,	15031260648210,	'jpg',	0,	0.00,	0.00,	'2017-08-19 07:01:05'),
(171,	25,	15031260917980,	'jpg',	0,	0.00,	0.00,	'2017-08-19 07:01:31'),
(172,	25,	15031261180840,	'jpg',	0,	2.00,	2.30,	'2017-08-19 07:01:58'),
(173,	26,	1503216037728,	'JPG',	1,	0.00,	0.00,	'2017-08-20 08:00:38'),
(174,	24,	15033667677600,	'jpg',	0,	0.00,	0.00,	'2017-08-22 01:52:47'),
(175,	9,	1502952644389,	'JPG',	0,	0.00,	0.00,	'2017-08-26 15:38:17'),
(176,	1,	15037635387480,	'jpg',	0,	0.00,	0.00,	'2017-08-26 16:05:39'),
(177,	27,	1504546614866,	'jpg',	1,	0.00,	0.00,	'2017-09-04 17:36:55'),
(178,	27,	15045467014780,	'jpg',	0,	0.00,	0.00,	'2017-09-04 17:38:22'),
(179,	27,	15045467014962,	'jpg',	0,	0.00,	0.00,	'2017-09-04 17:38:22'),
(180,	27,	15045467014961,	'jpg',	0,	0.00,	0.00,	'2017-09-04 17:38:22'),
(181,	27,	15045467014993,	'jpg',	0,	0.00,	0.00,	'2017-09-04 17:38:22'),
(182,	27,	15045467016704,	'jpg',	0,	0.00,	0.00,	'2017-09-04 17:38:22'),
(183,	27,	15045467017265,	'jpg',	0,	0.00,	0.00,	'2017-09-04 17:38:22'),
(184,	27,	15045467017276,	'jpg',	0,	0.00,	0.00,	'2017-09-04 17:38:22'),
(185,	27,	15045467017327,	'jpg',	0,	0.00,	0.00,	'2017-09-04 17:38:22'),
(186,	27,	15045467017958,	'jpg',	0,	0.00,	0.00,	'2017-09-04 17:38:22'),
(187,	27,	15045467018529,	'jpg',	0,	0.00,	0.00,	'2017-09-04 17:38:22'),
(188,	27,	150454670188510,	'jpg',	0,	0.00,	0.00,	'2017-09-04 17:38:22'),
(189,	27,	150454670191211,	'jpg',	0,	0.00,	0.00,	'2017-09-04 17:38:22'),
(190,	27,	150454670193612,	'jpg',	0,	1.00,	1.20,	'2017-09-04 17:38:22'),
(191,	27,	150454670197513,	'jpg',	0,	1.00,	1.20,	'2017-09-04 17:38:22'),
(192,	28,	1504547067100,	'jpg',	1,	0.00,	0.00,	'2017-09-04 17:44:27'),
(193,	28,	15045471820930,	'jpg',	0,	0.00,	0.00,	'2017-09-04 17:46:22'),
(194,	28,	15045471821161,	'jpg',	0,	0.00,	0.00,	'2017-09-04 17:46:22'),
(195,	28,	15045471821183,	'jpg',	0,	0.00,	0.00,	'2017-09-04 17:46:22'),
(196,	28,	15045471821172,	'jpg',	0,	0.00,	0.00,	'2017-09-04 17:46:22'),
(197,	28,	15045471823034,	'jpg',	0,	0.00,	0.00,	'2017-09-04 17:46:22'),
(198,	28,	15045471823225,	'jpg',	0,	0.00,	0.00,	'2017-09-04 17:46:22'),
(199,	28,	15045471824137,	'jpg',	0,	0.00,	0.00,	'2017-09-04 17:46:22'),
(200,	28,	15045471824126,	'jpg',	0,	0.00,	0.00,	'2017-09-04 17:46:22'),
(201,	28,	15045471942590,	'jpg',	0,	0.00,	0.00,	'2017-09-04 17:46:34'),
(202,	28,	15045471942731,	'jpg',	0,	0.00,	0.00,	'2017-09-04 17:46:34'),
(203,	28,	15045471942792,	'jpg',	0,	0.00,	0.00,	'2017-09-04 17:46:34'),
(204,	28,	15045471942813,	'jpg',	0,	0.00,	0.00,	'2017-09-04 17:46:34'),
(205,	28,	15045471943994,	'jpg',	0,	0.00,	0.00,	'2017-09-04 17:46:34'),
(206,	28,	15045471944515,	'jpg',	0,	0.00,	0.00,	'2017-09-04 17:46:34'),
(207,	28,	15045471944526,	'jpg',	0,	0.00,	0.00,	'2017-09-04 17:46:34'),
(208,	29,	1504582610358,	'jpg',	1,	0.00,	0.00,	'2017-09-05 03:36:51'),
(209,	30,	1505067112568,	'jpg',	1,	0.00,	0.00,	'2017-09-10 18:11:54'),
(211,	37,	1505869623500,	'jpg',	1,	0.00,	0.00,	'2017-09-20 01:07:04'),
(212,	38,	1506290542459,	'JPG',	1,	0.00,	0.00,	'2017-09-24 22:02:24'),
(213,	38,	15062909260720,	'jpg',	0,	0.00,	0.00,	'2017-09-24 22:08:46'),
(214,	38,	15062909476510,	'JPG',	0,	0.00,	0.00,	'2017-09-24 22:09:07'),
(215,	31,	15067090856250,	'PNG',	1,	0.00,	0.00,	'2017-09-29 18:18:06'),
(217,	39,	15077653377960,	'jpg',	1,	0.00,	0.00,	'2017-10-11 23:42:19'),
(218,	68,	1509771285263,	'png',	1,	0.00,	0.00,	'2017-11-04 04:54:47'),
(219,	69,	1510280583485,	'jpg',	1,	0.00,	0.00,	'2017-11-10 02:23:05'),
(220,	71,	1510280624588,	'jpg',	1,	0.00,	0.00,	'2017-11-10 02:23:45'),
(221,	79,	1510545832882,	'jpg',	1,	0.00,	0.00,	'2017-11-13 04:03:53');

DROP TABLE IF EXISTS `message`;
CREATE TABLE `message` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `conversation_id` int(10) unsigned NOT NULL,
  `from_user_id` int(10) unsigned NOT NULL,
  `to_user_id` int(10) unsigned NOT NULL,
  `message` text NOT NULL,
  `readed` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `microtime` int(10) unsigned NOT NULL DEFAULT '0',
  `brutto` decimal(9,2) unsigned NOT NULL DEFAULT '0.00',
  `netto` decimal(9,2) unsigned NOT NULL DEFAULT '0.00',
  `reciever_id` int(10) unsigned DEFAULT NULL,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `conversation_id` (`conversation_id`),
  KEY `from_user_id` (`from_user_id`),
  KEY `to_user_id` (`to_user_id`),
  KEY `reciever_id` (`reciever_id`),
  CONSTRAINT `message_ibfk_1` FOREIGN KEY (`conversation_id`) REFERENCES `conversation` (`id`),
  CONSTRAINT `message_ibfk_2` FOREIGN KEY (`from_user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `message_ibfk_3` FOREIGN KEY (`to_user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `message_ibfk_4` FOREIGN KEY (`reciever_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `message` (`id`, `conversation_id`, `from_user_id`, `to_user_id`, `message`, `readed`, `microtime`, `brutto`, `netto`, `reciever_id`, `updated`) VALUES
(1,	1,	6,	3,	'Ahoj :-*',	1,	0,	0.00,	0.00,	NULL,	'2017-08-13 22:22:08'),
(2,	2,	7,	1,	'Ahoj',	1,	0,	0.00,	0.00,	NULL,	'2017-08-14 12:48:41'),
(3,	2,	1,	7,	'Zdravím :-)',	0,	0,	0.00,	0.00,	NULL,	'2017-08-14 12:50:50'),
(4,	2,	7,	1,	'Haló?',	1,	0,	0.00,	0.00,	NULL,	'2017-08-14 12:52:02'),
(5,	2,	1,	7,	'Jak se máš? :P',	1,	0,	0.00,	0.00,	NULL,	'2017-08-14 12:52:08'),
(6,	2,	7,	1,	'Super :-*',	1,	0,	0.00,	0.00,	NULL,	'2017-08-14 12:52:14'),
(7,	2,	1,	7,	'Hihi :P O:-)',	1,	0,	0.00,	0.00,	NULL,	'2017-08-14 12:53:18'),
(8,	2,	7,	1,	'Nefunguje tvoje fotka',	1,	0,	0.00,	0.00,	NULL,	'2017-08-14 12:55:28'),
(9,	3,	4,	1,	'Test',	1,	0,	0.00,	0.00,	NULL,	'2017-08-18 18:58:31'),
(10,	4,	1,	2,	'Test',	0,	1492,	0.06,	0.08,	2,	'2017-08-21 10:27:33'),
(11,	4,	1,	2,	'{{CHAT_END}}',	0,	0,	0.00,	0.00,	NULL,	'2017-08-21 10:27:47'),
(12,	4,	1,	2,	'{{CHAT_END}}',	0,	0,	0.00,	0.00,	NULL,	'2017-08-21 10:27:48'),
(13,	4,	1,	2,	'{{CHAT_END}}',	0,	0,	0.00,	0.00,	NULL,	'2017-08-21 10:27:50'),
(14,	4,	1,	2,	'{{CHAT_END}}',	0,	0,	0.00,	0.00,	NULL,	'2017-08-21 10:28:22'),
(15,	4,	1,	2,	'{{CHAT_END}}',	1,	0,	0.00,	0.00,	NULL,	'2017-08-21 10:28:31'),
(16,	5,	1,	5,	'Ahoj :-)',	0,	3026,	0.00,	0.00,	5,	'2017-08-21 10:29:40'),
(17,	5,	1,	5,	'Jsi tu? :)',	0,	3260,	0.00,	0.00,	5,	'2017-08-21 10:29:43'),
(18,	5,	1,	5,	'{{CHAT_END}}',	0,	0,	0.00,	0.00,	NULL,	'2017-08-21 10:29:47'),
(19,	4,	2,	1,	'Ahoj :-)',	1,	3907,	0.00,	0.00,	1,	'2017-08-21 10:35:01'),
(20,	4,	2,	1,	'hmm',	1,	975,	0.00,	0.00,	1,	'2017-08-26 12:58:16'),
(21,	4,	1,	2,	':-)',	1,	3274,	0.00,	0.00,	1,	'2017-08-26 13:05:27'),
(22,	4,	2,	1,	'kurva',	1,	1370,	0.00,	0.00,	1,	'2017-08-26 13:44:56'),
(23,	6,	31,	1,	'baf :-)',	1,	2166,	0.00,	0.00,	1,	'2017-09-29 18:05:47'),
(24,	6,	1,	31,	'Lek :)',	0,	2872,	0.00,	0.00,	1,	'2017-10-01 17:20:51'),
(25,	6,	1,	31,	'Test toho, jestli funguje chat na https',	1,	10506,	0.00,	0.00,	1,	'2017-10-11 05:08:47'),
(26,	4,	2,	1,	'test',	1,	1483,	0.00,	0.00,	1,	'2017-10-11 05:10:16'),
(27,	4,	1,	2,	'boo',	1,	2416,	0.00,	0.00,	1,	'2017-10-11 05:10:38'),
(28,	7,	39,	39,	'Jsem nadržená...',	1,	7765,	0.21,	0.26,	39,	'2017-10-11 23:48:06'),
(29,	7,	39,	39,	'Chci to',	0,	2674,	0.00,	0.00,	39,	'2017-10-14 16:45:41'),
(30,	7,	39,	39,	'Kuk',	0,	1174,	0.00,	0.00,	39,	'2017-10-16 20:28:21'),
(31,	6,	1,	31,	'Bafiky baf :D',	0,	3458,	0.00,	0.00,	1,	'2017-11-05 17:27:48'),
(32,	6,	1,	31,	':P',	0,	937,	0.00,	0.00,	1,	'2017-11-05 17:27:57');

DROP TABLE IF EXISTS `unlock`;
CREATE TABLE `unlock` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `image_id` int(10) unsigned NOT NULL,
  `brutto` decimal(9,2) unsigned NOT NULL,
  `netto` decimal(9,2) unsigned NOT NULL,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `image_id` (`image_id`),
  CONSTRAINT `unlock_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `unlock_ibfk_2` FOREIGN KEY (`image_id`) REFERENCES `image` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `unlock` (`id`, `user_id`, `image_id`, `brutto`, `netto`, `updated`) VALUES
(1,	31,	10,	2.00,	2.30,	'2017-09-20 15:49:50'),
(2,	31,	13,	11.00,	12.70,	'2017-09-20 15:52:06'),
(3,	31,	11,	9.00,	10.40,	'2017-09-20 15:54:26'),
(4,	31,	9,	9.00,	10.40,	'2017-09-20 15:54:51'),
(5,	31,	12,	8.00,	9.20,	'2017-09-20 15:55:05'),
(6,	31,	121,	1.00,	1.20,	'2017-09-20 16:12:37'),
(7,	31,	122,	1.00,	1.20,	'2017-09-20 16:12:45'),
(8,	31,	123,	1.00,	1.20,	'2017-09-20 16:12:54'),
(9,	31,	118,	2.00,	2.30,	'2017-09-20 16:13:08'),
(10,	31,	119,	2.00,	2.30,	'2017-09-20 16:13:12'),
(11,	31,	120,	2.00,	2.30,	'2017-09-20 16:13:17'),
(12,	31,	124,	2.00,	2.30,	'2017-09-20 16:13:28'),
(13,	31,	114,	1.00,	1.20,	'2017-09-20 16:14:18'),
(14,	31,	117,	1.00,	1.20,	'2017-09-20 16:14:28'),
(15,	31,	113,	2.00,	2.30,	'2017-09-20 16:14:32'),
(16,	31,	115,	2.00,	2.30,	'2017-09-20 16:14:38'),
(17,	31,	23,	2.00,	2.30,	'2017-09-20 16:22:31'),
(18,	31,	24,	2.00,	2.30,	'2017-09-20 16:22:35'),
(19,	31,	26,	2.00,	2.30,	'2017-09-20 16:22:40'),
(20,	31,	22,	3.00,	3.50,	'2017-09-20 16:22:52'),
(21,	31,	27,	3.00,	3.50,	'2017-09-20 16:22:56'),
(22,	31,	28,	3.00,	3.50,	'2017-09-20 16:22:58'),
(23,	31,	29,	4.00,	4.60,	'2017-09-20 16:23:01'),
(24,	31,	190,	1.00,	1.20,	'2017-09-20 16:34:03'),
(25,	31,	191,	1.00,	1.20,	'2017-09-20 16:34:07'),
(26,	31,	47,	4.00,	4.60,	'2017-09-20 16:34:42'),
(27,	31,	52,	4.00,	4.60,	'2017-09-20 16:34:45'),
(28,	31,	50,	8.00,	9.20,	'2017-09-20 16:34:48'),
(29,	31,	51,	9.00,	10.40,	'2017-09-20 16:34:53'),
(30,	31,	48,	15.00,	17.30,	'2017-09-20 16:34:56'),
(31,	31,	49,	15.00,	17.30,	'2017-09-20 16:35:00'),
(32,	31,	46,	20.00,	23.00,	'2017-09-20 16:35:03'),
(33,	31,	138,	3.00,	3.50,	'2017-09-20 16:35:42'),
(34,	31,	144,	5.00,	5.80,	'2017-09-20 16:35:45'),
(35,	31,	146,	5.00,	5.80,	'2017-09-20 16:35:55'),
(36,	31,	141,	9.00,	10.40,	'2017-09-20 16:35:58'),
(37,	31,	142,	10.00,	11.50,	'2017-09-20 16:36:02'),
(38,	31,	143,	10.00,	11.50,	'2017-09-20 16:36:05'),
(39,	31,	140,	10.00,	11.50,	'2017-09-20 16:36:12'),
(40,	31,	145,	10.00,	11.50,	'2017-09-20 16:36:17');

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL,
  `email` varchar(64) NOT NULL,
  `birthdate` date NOT NULL,
  `sex` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `orientation` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `relationship` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `tall` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `weight` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `hair` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `hair_long` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `eyes` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `experience` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `show_weight` tinyint(3) unsigned NOT NULL DEFAULT '1',
  `description` varchar(1024) NOT NULL DEFAULT '',
  `account` varchar(64) NOT NULL DEFAULT '',
  `credits` decimal(9,2) unsigned NOT NULL DEFAULT '0.00',
  `chatprice` decimal(9,2) unsigned NOT NULL DEFAULT '0.00',
  `latitude` double NOT NULL DEFAULT '0',
  `longitude` double NOT NULL DEFAULT '0',
  `active` tinyint(4) NOT NULL DEFAULT '0',
  `last_activity` datetime NOT NULL DEFAULT '1970-01-01 00:00:00',
  `hash` varchar(32) NOT NULL DEFAULT '',
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `user` (`id`, `name`, `password`, `email`, `birthdate`, `sex`, `orientation`, `relationship`, `tall`, `weight`, `hair`, `hair_long`, `eyes`, `experience`, `show_weight`, `description`, `account`, `credits`, `chatprice`, `latitude`, `longitude`, `active`, `last_activity`, `hash`, `updated`) VALUES
(1,	'Martin',	'$2a$10$BAPH9V5nqxZUBXyQe/z3SemdYuw9Z17MJY7NQS7q4bz.cEIGK4zS2',	'clary.aldringen@seznam.cz',	'1986-01-04',	0,	1,	2,	200,	93,	3,	4,	2,	3,	1,	'Administrátor portálu',	'2700111675/2010',	100.00,	0.00,	50.045673199999996,	14.332755800000001,	1,	'2017-11-05 18:27:57',	'',	'2017-08-13 21:14:42'),
(2,	'Alice',	'$2a$10$Gc0wG3zFMJK0eNGV7fRpgeftQA66KxTARLF7exIMwCvgWph.PhV72',	'test1@freetech.cz',	'1992-12-30',	1,	3,	1,	179,	61,	4,	4,	2,	4,	1,	'',	'',	19.06,	160.00,	0,	0,	1,	'2017-10-11 07:12:24',	'',	'2017-08-13 21:30:18'),
(3,	'Jana',	'$2a$10$44/0drSZshFNiczH6mcutOZH/cDQ4fbf.WDTQrQxfgTEku5DSsCRq',	'test2@freetech.cz',	'1996-06-13',	1,	3,	1,	174,	58,	4,	4,	0,	5,	1,	'',	'',	39.00,	0.00,	0,	0,	1,	'2017-08-16 15:06:52',	'',	'2017-08-13 21:33:20'),
(4,	'Aneta',	'$2a$10$csyuAiwzyA6iZYS9Ok2UkO.mW.WedigcsmCC3FZTGPgUFh3SG05CK',	'test3@freetech.cz',	'1998-07-16',	1,	1,	5,	164,	52,	2,	4,	1,	3,	1,	'',	'',	75.00,	0.00,	0,	0,	1,	'2017-08-16 19:23:12',	'',	'2017-08-13 21:35:43'),
(5,	'Bára',	'$2a$10$QBFXNzWE1x1lBx0BaiPo.u4Hex9nxpyxpODWcuqPxPeH7gLJo8yhC',	'test4@freetech.cz',	'1997-06-11',	1,	0,	0,	0,	0,	0,	0,	0,	0,	1,	'',	'',	0.00,	0.00,	0,	0,	1,	'2017-08-14 14:41:36',	'',	'2017-08-13 21:37:12'),
(6,	'Jana',	'$2a$10$SHV76HbNwZJqx20zOznnAur.iaacRfMqzymHqAQqzRbDcmhGpgMP6',	'test5@freetech.cz',	'1996-06-12',	1,	3,	1,	174,	58,	4,	4,	0,	5,	1,	'',	'',	0.00,	0.00,	0,	0,	1,	'2017-08-14 14:41:36',	'',	'2017-08-13 21:39:24'),
(7,	'Monika',	'$2a$10$EeY0d9FCBKwjdPEfek51mOqb5lo.dACmGH9M4qo4OhlqPOVDmrkPq',	'test6@freetech.cz',	'1993-07-04',	1,	1,	1,	174,	59,	4,	3,	2,	2,	1,	'',	'',	11.00,	0.00,	0,	0,	1,	'2017-08-16 18:27:06',	'',	'2017-08-13 21:41:32'),
(8,	'Tereza',	'$2a$10$8MPWXD10eCxWQW6Bloq0WOmq/zbzN4njALDuODA5POC91YR3ALkSe',	'test7@freetech.cz',	'1999-06-10',	1,	1,	2,	156,	51,	1,	3,	3,	2,	1,	'Jsem sice zadaná, ale troše flirtu se nebráním O:-)',	'',	6.00,	0.00,	0,	0,	1,	'2017-08-16 18:25:41',	'',	'2017-08-13 21:43:24'),
(9,	'Adrea',	'$2a$10$JKP9Lh2crKAkdOBuE4pUl.i3p1jp3jh/H4IL9Met6IZXn3v2n45XS',	'andrea126@post.cz',	'1991-04-10',	1,	0,	0,	0,	0,	0,	0,	0,	0,	1,	'',	'',	0.00,	0.00,	0,	0,	1,	'2017-08-17 08:48:41',	'',	'2017-08-17 06:48:41'),
(21,	'Bára',	'$2a$10$vbwQaCT92lyahLVEIcQ.AuMKBtmWWPKehYMa9a8.drwfHoNYDOQzu',	'info@freetech.cz',	'1997-08-09',	1,	0,	0,	0,	0,	0,	0,	0,	0,	1,	'',	'',	62.00,	0.00,	0,	0,	1,	'2017-08-17 12:45:53',	'',	'2017-08-17 09:43:40'),
(22,	'venuspraha',	'$2a$10$8ogy5KPliJDsz3jc0IIg/eVAKunYKwuy0NBdD1v3H4e4L9eFOaWPK',	'venuspraha@seznam.cz',	'1981-10-31',	1,	1,	2,	162,	98,	6,	4,	2,	4,	1,	'webka nebo sex po tel 200 kredit paypal ge era mbank coolkarta skype madamkarami',	'coolkarta8001177115',	0.00,	0.00,	0,	0,	1,	'2017-08-18 00:18:46',	'',	'2017-08-17 22:10:38'),
(23,	'Natty',	'$2a$10$eipDocEizIczQtLe60TzkOEWwyS40Octk.HxVlibwW43zTpUQlLDO',	'angelanddevil@post.cz',	'1997-05-10',	1,	4,	1,	158,	56,	6,	3,	2,	3,	1,	'',	'',	0.00,	0.00,	0,	0,	1,	'2017-08-18 11:21:14',	'',	'2017-08-18 09:17:49'),
(24,	'Marie',	'$2a$10$Hf2TCzhG6udPdtGRVVf0sOi5oMTTe5Brd6ximHYbyuww/iPJ2t2x2',	'dawe2612@seznam.cz',	'1965-02-25',	1,	4,	3,	165,	60,	7,	4,	2,	5,	1,	'mam rada něžný sex nejvíc orál do konce s polykáním ',	'43-6878720257/0100',	0.00,	7.00,	0,	0,	1,	'2017-10-25 22:56:13',	'',	'2017-08-18 22:18:19'),
(25,	'Irenka',	'$2a$10$3DhSdPTa8VcCcSmHKipKQ.l4t3g8cw4C1wIEgaVL2hM7/QBLw/032',	'irenka69@post.cz',	'1984-12-11',	1,	1,	5,	170,	69,	7,	4,	2,	5,	1,	'Ahojky, jsem nadržená kočička, která miluje povídání o sexu, pojď mi prozradit co vše máš rád.',	'257263287/0300',	0.00,	0.00,	0,	0,	1,	'2017-08-19 09:01:04',	'',	'2017-08-19 06:48:08'),
(26,	'Tereza',	'$2a$10$xKV7SQMTAp4AWvilJ6eZCeSr8q2hQjWsgV0tMFgmRy0eQt.u2nWYW',	'terreza33421@email.cz',	'1998-12-31',	1,	1,	1,	172,	60,	3,	4,	3,	5,	1,	'',	'',	0.00,	0.00,	0,	0,	1,	'2017-08-20 10:00:38',	'',	'2017-08-20 08:00:38'),
(27,	'Renata',	'$2a$10$84oin5Aj7Bm3c.P9QDlPjuQnk.fllFD3m0FKyIdz3ljTUzUXUkFTm',	'test8@freetech.cz',	'1993-03-12',	1,	0,	0,	0,	0,	0,	0,	0,	0,	1,	'',	'',	2.00,	0.00,	0,	0,	1,	'2017-09-04 19:40:13',	'',	'2017-09-04 17:36:55'),
(28,	'Lolitka',	'$2a$10$mNlWMDSAPU04s6hnPO7aI.rHpJadIWrNbsh1adDQ12qlkSLZyp996',	'info9@freetech.cz',	'1999-06-14',	0,	1,	1,	156,	51,	3,	4,	1,	2,	1,	'Ráda bych našla kamaráda s výhodami, který by mě podporoval malým \"kapesným\".',	'',	0.00,	0.00,	0,	0,	1,	'2017-09-04 19:47:26',	'',	'2017-09-04 17:44:27'),
(29,	'Honzík',	'$2a$10$xxmS6QDUHtlJFZbxdfjZpOh4kZUmZBWryW17urko.BBZJJeQH9OXi',	'honzicek-praha@seznam.cz',	'1993-10-20',	0,	0,	0,	0,	0,	0,	0,	0,	0,	1,	'',	'',	0.00,	0.00,	0,	0,	0,	'2017-09-05 05:36:51',	'1505870696888',	'2017-09-05 03:36:51'),
(30,	'Trans Bitch Nikola ',	'$2a$10$eN/oTsYL2s6909vzuHsYues.S0rQNHoN8MJnMU8phLI.YIg4KL106',	'nikolasibravu.sexy@email.cz',	'1981-11-14',	1,	3,	2,	165,	63,	7,	4,	2,	4,	1,	'Roztouzena kocka co ma rada smetanku na jazycku.Miluji hluboky oral a mam rada hodne moc slin,dale mam rada poradne vysukanou prdelinku.Mam rada extremne vysoke podpatecky  a sexy hadriky.Proste miluju ,kdyz se za mnou chlap otoci.Nabizim placene sluzby 1000h. oral a anal, panum co nevadi ,kdyz ma holka v kalhotkach pindika.',	'',	0.00,	200.00,	50.112684599999994,	14.3774796,	1,	'2017-11-04 18:31:58',	'',	'2017-09-10 18:11:54'),
(31,	'Daniela',	'$2a$10$daU376W6u7ph91U4vG0o0ubg5Rci/maVFQtdhbm/Yaezqm3Ym4EEa',	'slaba.daniela@seznam.cz',	'1991-11-05',	1,	3,	0,	181,	70,	3,	5,	2,	3,	1,	'',	'',	752.90,	0.00,	0,	0,	1,	'2017-10-17 20:50:07',	'',	'2017-09-11 10:08:33'),
(37,	'Honzík',	'$2a$10$U5rcd8XcKOP8JsKdNZiK..8ytLFeHZOBOlJWS/YrjFl4fcDwI/wL6',	'kbg18@seznam.cz',	'1993-08-18',	0,	0,	0,	0,	0,	0,	0,	0,	0,	1,	'',	'',	0.00,	0.00,	0,	0,	0,	'2017-09-20 03:07:04',	'',	'2017-09-20 01:07:04'),
(38,	'Vlaďka',	'$2a$10$ZzRmJBCymFaLuPG/dS.XpOaft/iESOzwd8mzrzjqyRVBgMKO14Yle',	'eldorado2x@seznam.cz',	'1991-09-22',	1,	1,	2,	172,	53,	5,	3,	1,	4,	1,	'',	'',	0.00,	0.00,	0,	0,	1,	'2017-09-25 11:57:09',	'',	'2017-09-24 22:02:24'),
(39,	'Azeret',	'$2a$10$1noAfVBrIktrX5g891.6G.fBoD.apUR.TO9WEFSK1RXLJyCBuP/Oi',	'leeloo@atlas.cz',	'1988-10-04',	1,	1,	2,	163,	63,	2,	2,	1,	3,	1,	'Nechci dráždit jen pár lidí - chci provokovat a otravovat úplně všechny!',	'1147716016/3030',	0.00,	5.00,	0,	0,	1,	'2017-10-16 22:30:19',	'',	'2017-10-11 23:22:40'),
(68,	'Andy1989',	'$2a$10$qFbtdI/0ZNN1lIrc3bUBuuJS34jb804YOP3RmRePrUyJNkTBx5opi',	'jardaa1981@seznam.cz',	'1989-01-01',	1,	0,	0,	0,	0,	0,	0,	0,	0,	1,	'',	'',	0.00,	0.00,	50.042185,	14.4801015,	1,	'2017-11-04 06:22:10',	'',	'2017-11-04 04:54:47'),
(69,	'Frantisek',	'$2a$10$CCbKWR/NZ0yrDrJBxY0OhOC.7RhLDimYo/0KpdzK/Dy/tMtiquH0i',	'fazi25@seznam.cz',	'1984-07-31',	0,	0,	0,	0,	0,	0,	0,	0,	0,	1,	'',	'',	0.00,	0.00,	0,	0,	0,	'2017-11-10 03:23:05',	'',	'2017-11-10 02:23:05'),
(71,	'Frantisek',	'$2a$10$izNnvBLzMcBxBmrQcNBjoe3BCuv1h77Vs2iMuiKLGlgjSg1wlSiOO',	'Sukenik.25@seznam.cz',	'1984-07-31',	0,	0,	0,	0,	0,	0,	0,	0,	0,	1,	'',	'',	0.00,	0.00,	0,	0,	1,	'2017-11-12 03:30:20',	'',	'2017-11-10 02:23:45'),
(79,	'Melinho',	'$2a$10$nuOC/qjhZZpfCxSXTaq5..UH0lpZXt3dipxAV.PpPQntqlNYqc3Py',	'mydvaUb@seznam.cz',	'1981-07-18',	0,	0,	0,	0,	0,	0,	0,	0,	0,	1,	'',	'',	0.00,	0.00,	50.0422552,	14.4800981,	1,	'2017-11-13 05:13:02',	'',	'2017-11-13 04:03:53');

-- 2017-11-18 15:13:49
