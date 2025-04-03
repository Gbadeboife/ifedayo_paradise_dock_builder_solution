-- Adminer 4.6.2 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `paralift_boat_lifts`;
CREATE TABLE `paralift_boat_lifts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_at` date NOT NULL,
  `update_at` datetime NOT NULL,
  `model` varchar(255) NOT NULL,
  `weight_capacity` float NOT NULL,
  `lift_range` int(11) NOT NULL,
  `no_of_cylinders` int(11) NOT NULL,
  `length` float DEFAULT NULL,
  `width` float DEFAULT NULL,
  `image` longtext NOT NULL,
  `top_view` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

INSERT INTO `paralift_boat_lifts` (`id`, `create_at`, `update_at`, `model`, `weight_capacity`, `lift_range`, `no_of_cylinders`, `length`, `width`, `image`, `top_view`) VALUES
(8,	'2022-11-17',	'2022-11-17 18:25:37',	'PH-2K-4',	2000,	4,	2,	14.84,	11.3,	'https://s3.us-west-1.amazonaws.com/com.mkdlab.images/2%20Cylinder%20Boat%20Lift-min.png',	'https://s3.us-west-1.amazonaws.com/com.mkdlab.images/PH-6%2C8K-4%2C5%2C6.png'),
(9,	'2022-11-17',	'2022-11-17 18:28:51',	'PH-2K-5',	2000,	5,	2,	14.84,	11.3,	'https://s3.us-west-1.amazonaws.com/com.mkdlab.images/2%20Cylinder%20Boat%20Lift-min.png',	'https://s3.us-west-1.amazonaws.com/com.mkdlab.images/PH-6%2C8K-4%2C5%2C6.png'),
(10,	'2022-11-17',	'2022-11-17 18:27:02',	'PH-2K-6',	2000,	6,	2,	14.84,	11.3,	'https://s3.us-west-1.amazonaws.com/com.mkdlab.images/2%20Cylinder%20Boat%20Lift-min.png',	'https://s3.us-west-1.amazonaws.com/com.mkdlab.images/PH-6%2C8K-4%2C5%2C6.png'),
(11,	'2022-11-17',	'2022-11-17 18:27:29',	'PH-6.5K-4',	6500,	4,	2,	14.84,	11.3,	'https://s3.us-west-1.amazonaws.com/com.mkdlab.images/2%20Cylinder%20Boat%20Lift-min.png',	'https://s3.us-west-1.amazonaws.com/com.mkdlab.images/PH-6%2C8K-4%2C5%2C6.png'),
(12,	'2022-11-17',	'2022-11-17 18:27:57',	'PH-6K-5',	6000,	5,	2,	14.84,	11.3,	'https://s3.us-west-1.amazonaws.com/com.mkdlab.images/2%20Cylinder%20Boat%20Lift-min.png',	'https://s3.us-west-1.amazonaws.com/com.mkdlab.images/PH-6%2C8K-4%2C5%2C6.png'),
(13,	'2022-11-17',	'2022-11-17 18:28:32',	'PH-6K-6',	6000,	6,	2,	14.84,	11.3,	'https://s3.us-west-1.amazonaws.com/com.mkdlab.images/2%20Cylinder%20Boat%20Lift-min.png',	'https://s3.us-west-1.amazonaws.com/com.mkdlab.images/PH-6%2C8K-4%2C5%2C6.png'),
(14,	'2022-11-17',	'2022-11-17 18:29:25',	'PH-8.5K-4',	8500,	4,	2,	14.84,	11.3,	'https://s3.us-west-1.amazonaws.com/com.mkdlab.images/2%20Cylinder%20Boat%20Lift-min.png',	'https://s3.us-west-1.amazonaws.com/com.mkdlab.images/PH-6%2C8K-4%2C5%2C6.png'),
(15,	'2022-11-17',	'2022-11-17 18:29:53',	'PH-8K-5',	8000,	5,	2,	14.84,	11.3,	'https://s3.us-west-1.amazonaws.com/com.mkdlab.images/2%20Cylinder%20Boat%20Lift-min.png',	'https://s3.us-west-1.amazonaws.com/com.mkdlab.images/PH-6%2C8K-4%2C5%2C6.png'),
(16,	'2022-11-17',	'2022-11-17 18:33:12',	'PH-8K-6',	8000,	6,	4,	14.84,	11.3,	'https://s3.us-west-1.amazonaws.com/com.mkdlab.images/4%20Cylinder%20Boat%20Lift-min.png',	'https://s3.us-west-1.amazonaws.com/com.mkdlab.images/PH-6%2C8K-4%2C5%2C6.png'),
(17,	'2022-11-17',	'2022-11-17 18:37:36',	'PH-11K-4S',	1100,	4,	4,	16.85,	11.3,	'https://s3.us-west-1.amazonaws.com/com.mkdlab.images/4%20Cylinder%20Boat%20Lift-min.png',	'https://s3.us-west-1.amazonaws.com/com.mkdlab.images/PH-10%2C12K-4%2C5%2C6.png'),
(20,	'2022-11-17',	'2022-11-17 18:55:35',	'PH-11K-4',	11000,	4,	4,	16.85,	11.3,	'https://s3.us-west-1.amazonaws.com/com.mkdlab.images/4%20Cylinder%20Boat%20Lift-min.png',	'https://s3.us-west-1.amazonaws.com/com.mkdlab.images/PH-10%2C12K-4%2C5%2C6.png'),
(21,	'2022-11-17',	'2022-11-17 18:56:18',	'PH-10K-5',	10000,	5,	4,	16.85,	11.3,	'https://s3.us-west-1.amazonaws.com/com.mkdlab.images/4%20Cylinder%20Boat%20Lift-min.png',	'https://s3.us-west-1.amazonaws.com/com.mkdlab.images/PH-10%2C12K-4%2C5%2C6.png'),
(22,	'2022-11-17',	'2022-11-17 18:57:25',	'PH-10K-6',	10000,	6,	4,	16.85,	11.3,	'https://s3.us-west-1.amazonaws.com/com.mkdlab.images/4%20Cylinder%20Boat%20Lift-min.png',	'https://s3.us-west-1.amazonaws.com/com.mkdlab.images/PH-10%2C12K-4%2C5%2C6.png'),
(23,	'2022-11-17',	'2022-11-17 18:59:12',	'PH-13K-4',	13000,	4,	4,	16.85,	11.3,	'https://s3.us-west-1.amazonaws.com/com.mkdlab.images/4%20Cylinder%20Boat%20Lift-min.png',	'https://s3.us-west-1.amazonaws.com/com.mkdlab.images/PH-10%2C12K-4%2C5%2C6.png'),
(24,	'2022-11-17',	'2022-11-17 18:59:39',	'PH-12K-5',	12000,	5,	4,	16.85,	11.3,	'https://s3.us-west-1.amazonaws.com/com.mkdlab.images/4%20Cylinder%20Boat%20Lift-min.png',	'https://s3.us-west-1.amazonaws.com/com.mkdlab.images/PH-10%2C12K-4%2C5%2C6.png'),
(25,	'2022-11-17',	'2022-11-17 19:00:36',	'PH-12K-6',	12000,	6,	4,	16.85,	11.3,	'https://s3.us-west-1.amazonaws.com/com.mkdlab.images/4%20Cylinder%20Boat%20Lift-min.png',	'https://s3.us-west-1.amazonaws.com/com.mkdlab.images/PH-10%2C12K-4%2C5%2C6.png'),
(26,	'2022-11-17',	'2022-11-17 19:05:57',	'PH-15K-4',	15000,	4,	4,	20.95,	12.41,	'https://s3.us-west-1.amazonaws.com/com.mkdlab.images/4%20Cylinder%20Boat%20Lift-min.png',	'https://s3.us-west-1.amazonaws.com/com.mkdlab.images/PH-15K-4%2C5%2C6.png'),
(27,	'2022-11-17',	'2022-11-17 19:06:47',	'PH-15K-5',	15000,	5,	4,	20.95,	12.41,	'https://s3.us-west-1.amazonaws.com/com.mkdlab.images/4%20Cylinder%20Boat%20Lift-min.png',	'https://s3.us-west-1.amazonaws.com/com.mkdlab.images/PH-15K-4%2C5%2C6.png'),
(28,	'2022-11-17',	'2022-11-17 19:07:28',	'PH-15K-6',	15000,	6,	4,	20.95,	12.41,	'https://s3.us-west-1.amazonaws.com/com.mkdlab.images/4%20Cylinder%20Boat%20Lift-min.png',	'https://s3.us-west-1.amazonaws.com/com.mkdlab.images/PH-15K-4%2C5%2C6.png'),
(29,	'2022-11-17',	'2022-11-17 19:08:30',	'PH-20K-4',	20000,	4,	4,	22.86,	12.41,	'https://s3.us-west-1.amazonaws.com/com.mkdlab.images/4%20Cylinder%20Boat%20Lift-min.png',	'https://s3.us-west-1.amazonaws.com/com.mkdlab.images/PH-20K-4%2C5%2C6.png'),
(30,	'2022-11-17',	'2022-11-17 19:09:09',	'PH-20K-5',	20000,	5,	4,	22.86,	12.41,	'https://s3.us-west-1.amazonaws.com/com.mkdlab.images/4%20Cylinder%20Boat%20Lift-min.png',	'https://s3.us-west-1.amazonaws.com/com.mkdlab.images/PH-20K-4%2C5%2C6.png'),
(31,	'2022-11-17',	'2022-11-17 19:10:21',	'PH-20K-6',	20000,	6,	4,	22.86,	12.41,	'https://s3.us-west-1.amazonaws.com/com.mkdlab.images/4%20Cylinder%20Boat%20Lift-min.png',	'https://s3.us-west-1.amazonaws.com/com.mkdlab.images/PH-20K-4%2C5%2C6.png'),
(32,	'2022-11-17',	'2022-11-17 19:11:09',	'PH-24K-4',	24000,	4,	4,	25.03,	12.41,	'https://s3.us-west-1.amazonaws.com/com.mkdlab.images/4%20Cylinder%20Boat%20Lift-min.png',	'https://s3.us-west-1.amazonaws.com/com.mkdlab.images/PH-24K-4%2C5%2C6.png'),
(33,	'2022-11-17',	'2022-11-17 19:12:07',	'PH-24K-5',	24000,	5,	4,	25.03,	12.41,	'https://s3.us-west-1.amazonaws.com/com.mkdlab.images/4%20Cylinder%20Boat%20Lift-min.png',	'https://s3.us-west-1.amazonaws.com/com.mkdlab.images/PH-24K-4%2C5%2C6.png'),
(34,	'2022-11-17',	'2022-11-17 19:12:37',	'PH-24K-6',	24000,	6,	4,	25.03,	12.41,	'https://s3.us-west-1.amazonaws.com/com.mkdlab.images/4%20Cylinder%20Boat%20Lift-min.png',	'https://s3.us-west-1.amazonaws.com/com.mkdlab.images/PH-24K-4%2C5%2C6.png')
ON DUPLICATE KEY UPDATE `id` = VALUES(`id`), `create_at` = VALUES(`create_at`), `update_at` = VALUES(`update_at`), `model` = VALUES(`model`), `weight_capacity` = VALUES(`weight_capacity`), `lift_range` = VALUES(`lift_range`), `no_of_cylinders` = VALUES(`no_of_cylinders`), `length` = VALUES(`length`), `width` = VALUES(`width`), `image` = VALUES(`image`), `top_view` = VALUES(`top_view`);

-- 2025-04-02 18:13:38
