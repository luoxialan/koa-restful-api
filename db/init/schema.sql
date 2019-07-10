
use demodb;

DROP TABLE IF EXISTS `ord`;

CREATE TABLE `ord` (
 `id` INT NOT NULL AUTO_INCREMENT,
 `status` TINYINT(1) NOT NULL DEFAULT '0',
 `start_latitude` varchar(255) DEFAULT NULL,
 `start_longtitude` varchar(255) DEFAULT NULL,
 `end_latitude` varchar(255) DEFAULT NULL,
 `end_longtitude` varchar(255) DEFAULT NULL,
 `distance` INT DEFAULT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `ord` ( `start_latitude`, `start_longtitude`, `end_latitude`, `end_longtitude`, `distance`)
VALUES ('40.6655101', '-73.89188969999998', '40.6905615', '-73.9976592', 10400);
INSERT INTO `ord` ( `start_latitude`, `start_longtitude`, `end_latitude`, `end_longtitude`, `distance`)
VALUES ('41.6655101', '-73.89188969999998', '41.6905615', '-73.9976592', 14900);