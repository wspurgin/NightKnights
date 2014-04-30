# ************************************************************
# Sequel Pro SQL dump
# Version 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: ec2-54-84-248-48.compute-1.amazonaws.com (MySQL 5.5.35-0ubuntu0.12.04.2)
# Database: night_knights
# Generation Time: 2014-04-30 00:47:53 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table Areas
# ------------------------------------------------------------

LOCK TABLES `Areas` WRITE;
/*!40000 ALTER TABLE `Areas` DISABLE KEYS */;

INSERT INTO `Areas` (`id`, `name`, `img_url`)
VALUES
	(1,'Forest','/game/backgrounds/ForestMap.png'),
	(2,'Mountain','/game/backgrounds/MountainMap.png'),
	(3,'Castle','/game/backgrounds/CastleMap.png');

/*!40000 ALTER TABLE `Areas` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Areas_Monsters
# ------------------------------------------------------------

LOCK TABLES `Areas_Monsters` WRITE;
/*!40000 ALTER TABLE `Areas_Monsters` DISABLE KEYS */;

INSERT INTO `Areas_Monsters` (`area_id`, `monster_id`)
VALUES
	(1,3),
	(1,4),
	(1,5),
	(1,6),
	(1,7),
	(1,8),
	(1,9),
	(1,10),
	(1,11),
	(1,12),
	(1,13),
	(1,14),
	(1,15),
	(1,16),
	(1,17),
	(1,18),
	(1,19),
	(1,20),
	(1,21),
	(1,22),
	(1,23),
	(1,24),
	(1,25),
	(1,26),
	(1,27),
	(2,2),
	(2,28),
	(2,29),
	(2,30),
	(2,31),
	(2,32),
	(2,33),
	(2,34),
	(2,35),
	(2,36),
	(2,37),
	(2,38),
	(2,39),
	(2,40),
	(2,41),
	(2,42),
	(2,43),
	(2,44),
	(2,45),
	(2,46),
	(2,47),
	(2,48),
	(2,49),
	(2,50),
	(3,1),
	(3,51),
	(3,52),
	(3,53),
	(3,54),
	(3,55),
	(3,56),
	(3,57),
	(3,58),
	(3,59),
	(3,60),
	(3,61),
	(3,62),
	(3,63),
	(3,64),
	(3,65),
	(3,66),
	(3,67),
	(3,68),
	(3,69),
	(3,70),
	(3,71),
	(3,72),
	(3,73),
	(3,74),
	(3,75),
	(3,76),
	(3,77),
	(3,78),
	(3,79),
	(3,80),
	(3,81),
	(3,82);

/*!40000 ALTER TABLE `Areas_Monsters` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Characters
# ------------------------------------------------------------

LOCK TABLES `Characters` WRITE;
/*!40000 ALTER TABLE `Characters` DISABLE KEYS */;

INSERT INTO `Characters` (`id`, `name`, `energy`, `experience`, `level`)
VALUES
	(1,'picoriley',250,0,1),
	(2,'wspurgin',250,195,3),
	(3,'Sgt. Mom',250,0,1),
	(4,'TheDogeFormerlyKnownasMarfleBark',250,0,1),
	(5,'^C',250,0,1);

/*!40000 ALTER TABLE `Characters` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Inventories
# ------------------------------------------------------------

LOCK TABLES `Inventories` WRITE;
/*!40000 ALTER TABLE `Inventories` DISABLE KEYS */;

INSERT INTO `Inventories` (`item_id`, `character_id`, `is_equipped`)
VALUES
	(1,2,0),
	(1,3,0),
	(2,3,1),
	(3,2,0),
	(3,3,0),
	(4,3,0),
	(5,2,1),
	(6,2,0),
	(6,3,0),
	(7,1,1),
	(7,2,0),
	(7,3,0),
	(7,4,1),
	(7,5,1);

/*!40000 ALTER TABLE `Inventories` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Items
# ------------------------------------------------------------

LOCK TABLES `Items` WRITE;
/*!40000 ALTER TABLE `Items` DISABLE KEYS */;

INSERT INTO `Items` (`id`, `name`, `attack_stat`, `defense_stat`, `magic_stat`, `classification`, `img_url`)
VALUES
	(1,'Iron Sword',4,0,0,'Weapon','sword0'),
	(2,'Iron Staff',0,0,1,'Weapon','spear0'),
	(3,'Steel Sword',6,1,0,'Weapon','sword1'),
	(4,'Steel Staff',0,1,2,'Weapon','spear1'),
	(5,'Sword of Truth',10,5,0,'Weapon','sword2'),
	(6,'Magical Staff of Power',0,5,10,'Weapon','spear3'),
	(7,'Iron Dagger',1,0,0,'Weapon','dagger0');

/*!40000 ALTER TABLE `Items` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Messages
# ------------------------------------------------------------



# Dump of table Monsters
# ------------------------------------------------------------

LOCK TABLES `Monsters` WRITE;
/*!40000 ALTER TABLE `Monsters` DISABLE KEYS */;

INSERT INTO `Monsters` (`id`, `name`, `attack_seed`, `defense_seed`, `magic_seed`, `health_seed`, `img_url`)
VALUES
	(1,'Dragon',1,1,1,1,'sprites/Dragons/BigBlueDragon.png'),
	(2,'Unicorn',0,0,5,3,'sprites/Beasts/Unicorn.png'),
	(3,'Gorilla',5,3,0,3,'sprites/Beasts/Gorilla.png'),
	(4,'Beaver',5,3,0,3,'sprites/Beasts/Beaver.png'),
	(5,'Big Beast',3,3,3,3,'sprites/Beasts/BigBeast.png'),
	(6,'Charizard',3,3,3,3,'sprites/Beasts/Charizard.png'),
	(7,'Elephant',3,3,3,3,'sprites/Beasts/Elephant.png'),
	(8,'Fire Cheetah',3,3,3,3,'sprites/Beasts/FireCheetah.png'),
	(9,'Furby',3,3,3,3,'sprites/Beasts/Furby.png'),
	(10,'Gopher',3,3,3,3,'sprites/Beasts/Gopher.png'),
	(11,'Gorilla',3,3,3,3,'sprites/Beasts/Gorilla.png'),
	(12,'Grey Guy',3,3,3,3,'sprites/Beasts/GreyGuy.png'),
	(13,'Grizzly',3,3,3,3,'sprites/Beasts/Grizzly.png'),
	(14,'Horn Bird',3,3,3,3,'sprites/Beasts/HornBird.png'),
	(15,'Kangaroo',3,3,3,3,'sprites/Beasts/Kangaroo.png'),
	(16,'KKKHammer',3,3,3,3,'sprites/Beasts/KKKHammer.png'),
	(17,'Lion',3,3,3,3,'sprites/Beasts/Lion.png'),
	(18,'Mousicorn',3,3,3,3,'sprites/Beasts/Mousicorn.png'),
	(19,'Ram',3,3,3,3,'sprites/Beasts/Ram.png'),
	(20,'Shoveler',3,3,3,3,'sprites/Beasts/Shoveler.png'),
	(21,'Snopher',3,3,3,3,'sprites/Beasts/Snopher.png'),
	(22,'Snow Man',3,3,3,3,'sprites/Beasts/SnowMan.png'),
	(23,'Stinger',3,3,3,3,'sprites/Beasts/Stinger.png'),
	(24,'Tornadus',3,3,3,3,'sprites/Beasts/Tornadus.png'),
	(25,'Tree',3,3,3,3,'sprites/Beasts/Tree.png'),
	(26,'Turtle',3,3,3,3,'sprites/Beasts/Turtle.png'),
	(27,'Weird Bug',3,3,3,3,'sprites/Beasts/WeirdBug.png'),
	(28,'Aerodactyl',3,3,3,3,'sprites/Dragons/Aerodactyl.png'),
	(29,'Axe Dragon',3,3,3,3,'sprites/Dragons/AxeDragon.png'),
	(30,'Big Snake',3,3,3,3,'sprites/Dragons/BigSnake.png'),
	(31,'Bloated Dragon',3,3,3,3,'sprites/Dragons/BloatedDragon.png'),
	(32,'ButterDragon',3,3,3,3,'sprites/Dragons/ButterDragon.png'),
	(33,'Cobra',3,3,3,3,'sprites/Dragons/Cobra.png'),
	(34,'Dinosaur',3,3,3,3,'sprites/Dragons/Dinosaur.png'),
	(35,'Dragonfly',3,3,3,3,'sprites/Dragons/Dragonfly.png'),
	(36,'Dragonite',3,3,3,3,'sprites/Dragons/Dragonite.png'),
	(37,'Gargoyle Dragon',3,3,3,3,'sprites/Dragons/GargoyleDragon.png'),
	(38,'Green Lizard',3,3,3,3,'sprites/Dragons/GreenLizard.png'),
	(39,'Hydra',3,3,3,3,'sprites/Dragons/Hydra.png'),
	(40,'Ice Dragon',3,3,3,3,'sprites/Dragons/IceDragon.png'),
	(41,'Light Green Dragon',3,3,3,3,'sprites/Dragons/LightGreenDragon.png'),
	(42,'Lizard',3,3,3,3,'sprites/Dragons/Lizard.png'),
	(43,'MedusaSnake',3,3,3,3,'sprites/Dragons/MedusaSnake.png'),
	(44,'Orange Dragon',3,3,3,3,'sprites/Dragons/OrangeDragon.png'),
	(45,'Salamence',3,3,3,3,'sprites/Dragons/Salamence.png'),
	(46,'Shield Dragon',3,3,3,3,'sprites/Dragons/ShieldDragon.png'),
	(47,'SmallDinosaur',3,3,3,3,'sprites/Dragons/SmallDinosaur.png'),
	(48,'Snake Dragon',3,3,3,3,'sprites/Dragons/SnakeDragon.png'),
	(49,'Triceratops',3,3,3,3,'sprites/Dragons/Triceratops.png'),
	(50,'Yellow Dragon',3,3,3,3,'sprites/Dragons/YellowDragon.png'),
	(51,'1',3,3,3,3,'sprites/Bosses/1.png'),
	(52,'2',3,3,3,3,'sprites/Bosses/2.png'),
	(53,'3',3,3,3,3,'sprites/Bosses/3.png'),
	(54,'4',3,3,3,3,'sprites/Bosses/4.png'),
	(55,'5',3,3,3,3,'sprites/Bosses/5.png'),
	(56,'6',3,3,3,3,'sprites/Bosses/6.png'),
	(57,'7',3,3,3,3,'sprites/Bosses/7.png'),
	(58,'8',3,3,3,3,'sprites/Bosses/8.png'),
	(59,'9',3,3,3,3,'sprites/Bosses/9.png'),
	(60,'10',3,3,3,3,'sprites/Bosses/10.png'),
	(61,'11',3,3,3,3,'sprites/Bosses/11.png'),
	(62,'12',3,3,3,3,'sprites/Bosses/12.png'),
	(63,'13',3,3,3,3,'sprites/Bosses/13.png'),
	(64,'14',3,3,3,3,'sprites/Bosses/14.png'),
	(65,'15',3,3,3,3,'sprites/Bosses/15.png'),
	(66,'16',3,3,3,3,'sprites/Bosses/16.png'),
	(67,'Badass Haunter',3,3,3,3,'sprites/Bosses/BadassHaunter.png'),
	(68,'Belly Mouth',3,3,3,3,'sprites/Bosses/BellyMouth.png'),
	(69,'Bigger Dragon Dude',3,3,3,3,'sprites/Bosses/BiggerDragonDude.png'),
	(70,'Dragon',3,3,3,3,'sprites/Bosses/Dragon.png'),
	(71,'Dragon Dude',3,3,3,3,'sprites/Bosses/Dragon Dude.png'),
	(72,'Dude With Bat Robe',3,3,3,3,'sprites/Bosses/DudeWithBatRobe.png'),
	(73,'Evil Preacher Man',3,3,3,3,'sprites/Bosses/EvilPreacherMan.png'),
	(74,'Fat Piglet',3,3,3,3,'sprites/Bosses/FatPiglet.png'),
	(75,'Guy With Balls',3,3,3,3,'sprites/Bosses/GuyWithBalls.png'),
	(76,'Mage Guy',3,3,3,3,'sprites/Bosses/MageGuy.png'),
	(77,'Paladin',3,3,3,3,'sprites/Bosses/Paladin.png'),
	(78,'Preacher Man',3,3,3,3,'sprites/Bosses/PreacherMan.png'),
	(79,'Red Mage',3,3,3,3,'sprites/Bosses/RedMage.png'),
	(80,'Sword Man',3,3,3,3,'sprites/Bosses/SwordMan.png'),
	(81,'Sword Man 2',3,3,3,3,'sprites/Bosses/SwordMan2.png'),
	(82,'Weird Dude',3,3,3,3,'sprites/Bosses/WeirdDude.png');

/*!40000 ALTER TABLE `Monsters` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Users
# ------------------------------------------------------------

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;

INSERT INTO `Users` (`id`, `username`, `email`, `password`)
VALUES
	(1,'picoriley','acloudy@smu.edu','$2y$10$ewAtLrK7Xojl.fj2330hGumzMCJfR35vn4e7sbNee9Wlvm30yFzvO'),
	(2,'wspurgin','wspurgin@smu.edu','$2y$10$NV8/U2jLgXuUqVorGiZujugc9KvobJr4qSNZcKH9MIBsq8kbFHwTu'),
	(3,'Sgt. Mom','a@a.a','$2y$10$K01tm8MFw9zzKUGTbKNX9eqwZX/at6kc8olUO7qk0KwgqLl3qSKLO'),
	(4,'The Doge Formerly Known as Marf','ebusbee@smu.edu','$2y$10$AnS.ItlKqHvqSoQwmEyk9e7geruz6qfl./eZD7Xv9w/cjfE5bE47G'),
	(5,'^C','me@theboss.com','$2y$10$/6vepUUa/EcK21KFSHURIuFc5j6cZ4O.xLS0845xLqmf6XDrenINO');

/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table World_Bosses
# ------------------------------------------------------------

LOCK TABLES `World_Bosses` WRITE;
/*!40000 ALTER TABLE `World_Bosses` DISABLE KEYS */;

INSERT INTO `World_Bosses` (`id`, `monster_id`, `boss_health`, `boss_attack`, `boss_defense`, `boss_magic`, `achievable_item_id`)
VALUES
	(1,55,1000,1000,1000,1000,5),
	(2,57,1000,1000,1000,1000,5);

/*!40000 ALTER TABLE `World_Bosses` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table World_Fights
# ------------------------------------------------------------




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
