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
	(1,103),
	(1,104),
	(1,105),
	(1,106),
	(1,107),
	(1,108),
	(1,109),
	(1,110),
	(1,111),
	(1,112),
	(1,113),
	(1,114),
	(1,115),
	(1,116),
	(1,117),
	(1,118),
	(1,119),
	(1,120),
	(1,121),
	(1,122),
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
	(2,83),
	(2,84),
	(2,85),
	(2,86),
	(2,87),
	(2,88),
	(2,89),
	(2,90),
	(2,91),
	(2,92),
	(2,93),
	(2,94),
	(2,95),
	(2,96),
	(2,97),
	(2,98),
	(2,99),
	(2,100),
	(2,101),
	(2,102),
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
	(1,'Dragon',70,50,1,700,'sprites/Dragons/BigBlueDragon.png'),
	(2,'Unicorn',0,0,5,200,'sprites/Beasts/Unicorn.png'),
	(3,'Gorilla',3,3,0,30,'sprites/Beasts/Gorilla.png'),
	(4,'Beaver',3,3,0,30,'sprites/Beasts/Beaver.png'),
	(5,'Big Beast',3,3,0,30,'sprites/Beasts/BigBeast.png'),
	(6,'Charizard',3,3,0,30,'sprites/Beasts/Charizard.png'),
	(7,'Elephant',3,3,0,30,'sprites/Beasts/Elephant.png'),
	(8,'Fire Cheetah',3,3,0,30,'sprites/Beasts/FireCheetah.png'),
	(9,'Furby',3,3,0,30,'sprites/Beasts/Furby.png'),
	(10,'Gopher',3,3,0,30,'sprites/Beasts/Gopher.png'),
	(11,'Gorilla',3,3,0,30,'sprites/Beasts/Gorilla.png'),
	(12,'Grey Guy',3,3,0,30,'sprites/Beasts/GreyGuy.png'),
	(13,'Grizzly',3,3,0,30,'sprites/Beasts/Grizzly.png'),
	(14,'Horn Bird',3,3,0,30,'sprites/Beasts/HornBird.png'),
	(15,'Kangaroo',3,3,0,30,'sprites/Beasts/Kangaroo.png'),
	(16,'KKKHammer',3,3,0,30,'sprites/Beasts/KKKHammer.png'),
	(17,'Lion',3,3,0,30,'sprites/Beasts/Lion.png'),
	(18,'Mousicorn',3,3,0,30,'sprites/Beasts/Mousicorn.png'),
	(19,'Ram',3,3,0,30,'sprites/Beasts/Ram.png'),
	(20,'Shoveler',3,3,0,30,'sprites/Beasts/Shoveler.png'),
	(21,'Snopher',3,3,0,30,'sprites/Beasts/Snopher.png'),
	(22,'Snow Man',3,3,0,30,'sprites/Beasts/SnowMan.png'),
	(23,'Stinger',3,3,0,30,'sprites/Beasts/Stinger.png'),
	(24,'Tornadus',3,3,0,30,'sprites/Beasts/Tornadus.png'),
	(25,'Tree',3,3,0,50,'sprites/Beasts/Tree.png'),
	(26,'Turtle',3,3,0,20,'sprites/Beasts/Turtle.png'),
	(27,'Weird Bug',3,3,0,10,'sprites/Beasts/WeirdBug.png'),
	(28,'Aerodactyl',25,15,0,200,'sprites/Dragons/Aerodactyl.png'),
	(29,'Axe Dragon',25,15,0,200,'sprites/Dragons/AxeDragon.png'),
	(30,'Big Snake',25,15,0,200,'sprites/Dragons/BigSnake.png'),
	(31,'Bloated Dragon',25,15,0,200,'sprites/Dragons/BloatedDragon.png'),
	(32,'ButterDragon',25,15,0,200,'sprites/Dragons/ButterDragon.png'),
	(33,'Cobra',25,15,0,200,'sprites/Dragons/Cobra.png'),
	(34,'Dinosaur',25,15,0,200,'sprites/Dragons/Dinosaur.png'),
	(35,'Dragonfly',25,15,0,200,'sprites/Dragons/Dragonfly.png'),
	(36,'Dragonite',25,15,0,200,'sprites/Dragons/Dragonite.png'),
	(37,'Gargoyle Dragon',25,15,0,200,'sprites/Dragons/GargoyleDragon.png'),
	(38,'Green Lizard',25,15,0,200,'sprites/Dragons/GreenLizard.png'),
	(39,'Hydra',25,15,0,200,'sprites/Dragons/Hydra.png'),
	(40,'Ice Dragon',25,15,0,200,'sprites/Dragons/IceDragon.png'),
	(41,'Light Green Dragon',25,15,0,200,'sprites/Dragons/LightGreenDragon.png'),
	(42,'Lizard',25,15,0,200,'sprites/Dragons/Lizard.png'),
	(43,'MedusaSnake',25,15,0,200,'sprites/Dragons/MedusaSnake.png'),
	(44,'Orange Dragon',25,15,0,200,'sprites/Dragons/OrangeDragon.png'),
	(45,'Salamence',25,15,0,200,'sprites/Dragons/Salamence.png'),
	(46,'Shield Dragon',25,15,0,200,'sprites/Dragons/ShieldDragon.png'),
	(47,'SmallDinosaur',25,15,0,200,'sprites/Dragons/SmallDinosaur.png'),
	(48,'Snake Dragon',25,15,0,200,'sprites/Dragons/SnakeDragon.png'),
	(49,'Triceratops',25,15,0,200,'sprites/Dragons/Triceratops.png'),
	(50,'Yellow Dragon',25,15,0,200,'sprites/Dragons/YellowDragon.png'),
	(51,'Falcon',50,35,3,500,'sprites/Bosses/1.png'),
	(52,'Goblin',50,35,3,500,'sprites/Bosses/2.png'),
	(53,'Buff Dragon',50,35,3,500,'sprites/Bosses/3.png'),
	(54,'Multi-Arm Dragon',50,35,3,500,'sprites/Bosses/4.png'),
	(55,'Fire Breath',50,35,3,500,'sprites/Bosses/5.png'),
	(56,'Tribal Doctor',50,35,3,500,'sprites/Bosses/6.png'),
	(57,'Royal Guard',50,35,3,500,'sprites/Bosses/7.png'),
	(58,'Glutton Dragon',50,35,3,500,'sprites/Bosses/8.png'),
	(59,'Orb Guy',50,35,3,500,'sprites/Bosses/9.png'),
	(60,'Mystic',50,35,3,500,'sprites/Bosses/10.png'),
	(61,'Ranger',50,35,3,500,'sprites/Bosses/11.png'),
	(62,'Sorcerer',50,35,3,500,'sprites/Bosses/12.png'),
	(63,'Toothy',50,35,3,500,'sprites/Bosses/13.png'),
	(64,'Double Trouble',50,35,3,500,'sprites/Bosses/14.png'),
	(65,'Dark Knight',50,35,3,500,'sprites/Bosses/15.png'),
	(66,'Kid in Costume',50,35,3,500,'sprites/Bosses/16.png'),
	(67,'Badass Haunter',50,35,3,500,'sprites/Bosses/BadassHaunter.png'),
	(68,'Belly Mouth',50,35,3,500,'sprites/Bosses/BellyMouth.png'),
	(69,'Bigger Dragon Dude',50,35,3,500,'sprites/Bosses/BiggerDragonDude.png'),
	(70,'Dragon',50,35,3,500,'sprites/Bosses/Dragon.png'),
	(71,'Dragon Dude',50,35,3,500,'sprites/Bosses/Dragon Dude.png'),
	(72,'Dude With Bat Robe',50,35,3,500,'sprites/Bosses/DudeWithBatRobe.png'),
	(73,'Evil Preacher Man',50,35,3,500,'sprites/Bosses/EvilPreacherMan.png'),
	(74,'Fat Piglet',50,35,3,500,'sprites/Bosses/FatPiglet.png'),
	(75,'Guy With Balls',50,35,3,500,'sprites/Bosses/GuyWithBalls.png'),
	(76,'Mage Guy',50,35,3,500,'sprites/Bosses/MageGuy.png'),
	(77,'Paladin',50,35,3,500,'sprites/Bosses/Paladin.png'),
	(78,'Preacher Man',50,35,3,500,'sprites/Bosses/PreacherMan.png'),
	(79,'Red Mage',50,35,3,500,'sprites/Bosses/RedMage.png'),
	(80,'Sword Man',50,35,3,500,'sprites/Bosses/SwordMan.png'),
	(81,'Sword Man 2',50,35,3,500,'sprites/Bosses/SwordMan2.png'),
	(82,'Weird Dude',50,35,3,500,'sprites/Bosses/WeirdDude.png'),
	(83,'Two Legs',25,15,0,200,'sprites/Birds/2Legs.png'),
	(84,'Articuno',25,15,0,200,'sprites/Birds/Articuno.png'),
	(85,'Bat',25,15,0,200,'sprites/Birds/Bat.png'),
	(86,'Blue Bird',25,15,0,200,'sprites/Birds/BlueBird.png'),
	(87,'Bull Bird',25,15,0,200,'sprites/Birds/BullBird.png'),
	(88,'Monkey Bird',25,15,0,200,'sprites/Birds/ButterflyBird.png'),
	(89,'Fat Bird',25,15,0,200,'sprites/Birds/FatBird.png'),
	(90,'Fearow',25,15,0,200,'sprites/Birds/Fearow.png'),
	(91,'Flame Bird',25,15,0,200,'sprites/Birds/FlameBird.png'),
	(92,'FlowerBird',25,15,0,200,'sprites/Birds/FlowerBird.png'),
	(93,'GreenBird',25,15,0,200,'sprites/Birds/GreenBird.png'),
	(94,'Grizzly Bird',25,15,0,200,'sprites/Birds/GrizzlyBird.png'),
	(95,'Land Bird',25,15,0,200,'sprites/Birds/LandBird.png'),
	(96,'Moltres',25,15,0,200,'sprites/Birds/Moltres.png'),
	(97,'Peacock Bird',25,15,0,200,'sprites/Birds/PeacockBird.png'),
	(98,'Surfer Penguin',25,15,0,200,'sprites/Birds/Penguin.png'),
	(99,'Pidgeotto',25,15,0,200,'sprites/Birds/Pidgeotto.png'),
	(100,'Purple Bird',25,15,0,200,'sprites/Birds/Purple Bird.png'),
	(101,'Skill Bird',25,15,0,200,'sprites/Birds/SkullBird.png'),
	(102,'Snake Bird',25,15,0,200,'sprites/Birds/SnakeBird.png'),
	(103,'Ant',3,3,3,30,'sprites/Bugs/Antpng'),
	(104,'Beadrill',3,3,3,30,'sprites/Bugs/Beadrill.png'),
	(105,'Big Purple Claw Bug',3,3,3,30,'sprites/Bugs/BigPurpleClawBug.png'),
	(106,'Dung Beatle',3,3,3,30,'sprites/Bugs/BigStag.png'),
	(107,'Angry Butterfly',3,3,3,30,'sprites/Bugs/BigWingBug.png'),
	(108,'Butterfly',3,3,3,30,'sprites/Bugs/Butterfly.png'),
	(109,'Centipede',3,3,3,30,'sprites/Bugs/Centipede.png'),
	(110,'Crab',3,3,3,30,'sprites/Bugs/Crab.png'),
	(111,'Ekans',3,3,3,30,'sprites/Bugs/Ekans.png'),
	(112,'Flower Bug',3,3,3,30,'sprites/Bugs/FlowerBug.png'),
	(113,'Frog',3,3,3,30,'sprites/Bugs/Frog.png'),
	(114,'Fuzzy Bug',3,3,3,30,'sprites/Bugs/FuzzyBug.png'),
	(115,'Grasshopper',3,3,3,30,'sprites/Bugs/Grasshopper.png'),
	(116,'Little Buy',3,3,3,30,'sprites/Bugs/LittleBug.png'),
	(117,'Red Buy',3,3,3,30,'sprites/Bugs/RedBug.png'),
	(118,'Scorpion',3,3,3,30,'sprites/Bugs/Scorpion.png'),
	(119,'Sea Bug',3,3,3,30,'sprites/Bugs/SeaBug.png'),
	(120,'Slug',3,3,3,30,'sprites/Bugs/Slug.png'),
	(121,'Leader Ant',3,3,3,30,'sprites/Bugs/Stag.png'),
	(122,'Snail of Doom',3,3,3,30,'sprites/Bugs/WildEyes.png');

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
