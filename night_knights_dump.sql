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
	(1,'picoriley',0,0,1),
	(2,'wspurgin',205,12185,22),
	(3,'Sgt. Mom',375,5079,14),
	(4,'TheDogeFormerlyKnownasMarfleBark',250,0,1),
	(5,'^C',176,139,2),
	(9,'thingssssss',250,0,1),
	(11,'Sarah',1193,18424,27),
	(12,'test',250,0,1),
	(13,'$_username',193,67,2),
	(14,'ellyonia',266,0,1),
	(15,'jsmith',0,0,1),
	(18,'LelzMarfs',250,0,1),
	(19,'Porcupine^2',250,0,1),
	(20,'Nergal_the_Cowardly',250,0,1);

/*!40000 ALTER TABLE `Characters` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Inventories
# ------------------------------------------------------------

LOCK TABLES `Inventories` WRITE;
/*!40000 ALTER TABLE `Inventories` DISABLE KEYS */;

INSERT INTO `Inventories` (`item_id`, `character_id`, `is_equipped`)
VALUES
	(1,2,0),
	(1,3,1),
	(1,17,0),
	(2,3,0),
	(2,11,0),
	(2,17,0),
	(3,2,0),
	(3,3,0),
	(3,5,0),
	(3,11,0),
	(3,17,0),
	(4,3,0),
	(4,13,1),
	(5,2,1),
	(5,5,1),
	(5,11,0),
	(5,17,1),
	(6,2,0),
	(6,3,0),
	(6,11,0),
	(6,17,0),
	(7,1,1),
	(7,2,0),
	(7,3,0),
	(7,4,1),
	(7,5,0),
	(7,9,1),
	(7,11,1),
	(7,12,1),
	(7,13,0),
	(7,14,1),
	(7,15,1),
	(7,17,0),
	(7,18,1),
	(7,19,1),
	(7,20,1);

/*!40000 ALTER TABLE `Inventories` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Items
# ------------------------------------------------------------

LOCK TABLES `Items` WRITE;
/*!40000 ALTER TABLE `Items` DISABLE KEYS */;

INSERT INTO `Items` (`id`, `name`, `attack_stat`, `defense_stat`, `magic_stat`, `classification`, `img_url`)
VALUES
	(1,'Iron Sword',2,2,0,'Weapon','sword0'),
	(2,'Bastard Sword',8,5,0,'Weapon','sword7'),
	(3,'Dire Knige',7,0,0,'Weapon','dagger6'),
	(4,'Trident',0,1,2,'Weapon','spear6'),
	(5,'Sword of Truth',20,20,15,'Weapon','spear13'),
	(6,'Cutless',10,10,10,'Weapon','sword13'),
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
	(2,'Unicorn',30,15,5,200,'sprites/Beasts/Unicorn.png'),
	(3,'Gorilla',5,3,0,30,'sprites/Beasts/Gorilla.png'),
	(4,'Beaver',5,3,0,30,'sprites/Beasts/Beaver.png'),
	(5,'Big Beast',5,3,0,30,'sprites/Beasts/BigBeast.png'),
	(6,'Charizard',5,3,0,30,'sprites/Beasts/Charizard.png'),
	(7,'Elephant',5,3,0,30,'sprites/Beasts/Elephant.png'),
	(8,'Fire Cheetah',5,3,0,30,'sprites/Beasts/FireCheetah.png'),
	(9,'Furby',5,3,0,30,'sprites/Beasts/Furby.png'),
	(10,'Gopher',5,3,0,30,'sprites/Beasts/Gopher.png'),
	(11,'Gorilla',5,3,0,30,'sprites/Beasts/Gorilla.png'),
	(12,'Grey Guy',5,3,0,30,'sprites/Beasts/GreyGuy.png'),
	(13,'Grizzly',5,3,0,30,'sprites/Beasts/Grizzly.png'),
	(14,'Horn Bird',5,3,0,30,'sprites/Beasts/HornBird.png'),
	(15,'Kangaroo',5,3,0,30,'sprites/Beasts/Kangaroo.png'),
	(16,'Hammer Ghost',5,3,0,30,'sprites/Beasts/KKKHammer.png'),
	(17,'Lion',5,3,0,30,'sprites/Beasts/Lion.png'),
	(18,'Mousicorn',5,3,0,30,'sprites/Beasts/Mousicorn.png'),
	(19,'Ram',5,3,0,30,'sprites/Beasts/Ram.png'),
	(20,'Shoveler',5,3,0,30,'sprites/Beasts/Shoveler.png'),
	(21,'Snopher',5,3,0,30,'sprites/Beasts/Snopher.png'),
	(22,'Snow Man',5,3,0,30,'sprites/Beasts/SnowMan.png'),
	(23,'Stinger',5,3,0,30,'sprites/Beasts/Stinger.png'),
	(24,'Tornadus',5,3,0,30,'sprites/Beasts/Tornadus.png'),
	(25,'Tree',5,3,0,50,'sprites/Beasts/Tree.png'),
	(26,'Turtle',5,3,0,20,'sprites/Beasts/Turtle.png'),
	(27,'Grep',5,3,0,10,'sprites/Beasts/WeirdBug.png'),
	(28,'Aerodactyl',20,15,0,200,'sprites/Dragons/Aerodactyl.png'),
	(29,'Axe Dragon',20,15,0,200,'sprites/Dragons/AxeDragon.png'),
	(30,'Big Snake',20,15,0,200,'sprites/Dragons/BigSnake.png'),
	(31,'Bloated Dragon',20,15,0,200,'sprites/Dragons/BloatedDragon.png'),
	(32,'Butterfly Dragon',20,15,0,200,'sprites/Dragons/ButterDragon.png'),
	(33,'Cobra',20,15,0,200,'sprites/Dragons/Cobra.png'),
	(34,'Dinosaur',20,15,0,200,'sprites/Dragons/Dinosaur.png'),
	(35,'Dragonfly',20,15,0,200,'sprites/Dragons/Dragonfly.png'),
	(36,'Dragonite',20,15,0,200,'sprites/Dragons/Dragonite.png'),
	(37,'Gargoyle Dragon',20,15,0,200,'sprites/Dragons/GargoyleDragon.png'),
	(38,'Green Lizard',20,15,0,200,'sprites/Dragons/GreenLizard.png'),
	(39,'Hydra',20,15,0,200,'sprites/Dragons/Hydra.png'),
	(40,'Ice Dragon',20,15,0,200,'sprites/Dragons/IceDragon.png'),
	(41,'Light Green Dragon',20,15,0,200,'sprites/Dragons/LightGreenDragon.png'),
	(42,'Lizard',20,15,0,200,'sprites/Dragons/Lizard.png'),
	(43,'Medusa Snake',20,15,0,200,'sprites/Dragons/MedusaSnake.png'),
	(44,'Orange Dragon',20,15,0,200,'sprites/Dragons/OrangeDragon.png'),
	(45,'Salamence',20,15,0,200,'sprites/Dragons/Salamence.png'),
	(46,'Shield Dragon',20,15,0,200,'sprites/Dragons/ShieldDragon.png'),
	(47,'Small Dinosaur',20,15,0,200,'sprites/Dragons/SmallDinosaur.png'),
	(48,'Snake Dragon',20,15,0,200,'sprites/Dragons/SnakeDragon.png'),
	(49,'Triceratops',20,15,0,200,'sprites/Dragons/Triceratops.png'),
	(50,'Yellow Dragon',25,15,0,200,'sprites/Dragons/YellowDragon.png'),
	(51,'Falcon',40,35,3,500,'sprites/Bosses/1.png'),
	(52,'Goblin',40,35,3,500,'sprites/Bosses/2.png'),
	(53,'Buff Dragon',40,35,3,500,'sprites/Bosses/3.png'),
	(54,'Multi-Arm Dragon',40,35,3,500,'sprites/Bosses/4.png'),
	(55,'Fire Breath',40,35,3,500,'sprites/Bosses/5.png'),
	(56,'Tribal Doctor',40,35,3,500,'sprites/Bosses/6.png'),
	(57,'Royal Guard',40,35,3,500,'sprites/Bosses/7.png'),
	(58,'Glutton Dragon',40,35,3,500,'sprites/Bosses/8.png'),
	(59,'Orb Guy',40,35,3,500,'sprites/Bosses/9.png'),
	(60,'Mystic',40,35,3,500,'sprites/Bosses/10.png'),
	(61,'Ranger',40,35,3,500,'sprites/Bosses/11.png'),
	(62,'Sorcerer',40,35,3,500,'sprites/Bosses/12.png'),
	(63,'Toothy',40,35,3,500,'sprites/Bosses/13.png'),
	(64,'Double Trouble',40,35,3,500,'sprites/Bosses/14.png'),
	(65,'Dark Knight',40,35,3,500,'sprites/Bosses/15.png'),
	(66,'Kid in Costume',40,35,3,500,'sprites/Bosses/16.png'),
	(67,'Haunter',40,35,3,500,'sprites/Bosses/BadassHaunter.png'),
	(68,'Belly Mouth',40,35,3,500,'sprites/Bosses/BellyMouth.png'),
	(69,'Bigger Dragon Dude',40,35,3,500,'sprites/Bosses/BiggerDragonDude.png'),
	(70,'Dragon',40,35,3,500,'sprites/Bosses/Dragon.png'),
	(71,'Dragon Dude',40,35,3,500,'sprites/Bosses/Dragon Dude.png'),
	(72,'Dude With Bat Robe',40,35,3,500,'sprites/Bosses/DudeWithBatRobe.png'),
	(73,'Evil Preacher Man',40,35,3,500,'sprites/Bosses/EvilPreacherMan.png'),
	(74,'Fat Piglet',40,35,3,500,'sprites/Bosses/FatPiglet.png'),
	(75,'Guy With Balls',40,35,3,500,'sprites/Bosses/GuyWithBalls.png'),
	(76,'Mage Guy',40,35,3,500,'sprites/Bosses/MageGuy.png'),
	(77,'Paladin',40,35,3,500,'sprites/Bosses/Paladin.png'),
	(78,'Preacher Man',40,35,3,500,'sprites/Bosses/PreacherMan.png'),
	(79,'Red Mage',40,35,3,500,'sprites/Bosses/RedMage.png'),
	(80,'Sword Man',40,35,3,500,'sprites/Bosses/SwordMan.png'),
	(81,'Sword Man 2',40,35,3,500,'sprites/Bosses/SwordMan2.png'),
	(82,'Weird Dude',40,35,3,500,'sprites/Bosses/WeirdDude.png'),
	(83,'Two Legs',20,15,0,200,'sprites/Birds/2Legs.png'),
	(84,'Articuno',20,15,0,200,'sprites/Birds/Articuno.png'),
	(85,'Bat',20,15,0,200,'sprites/Birds/Bat.png'),
	(86,'Blue Bird',20,15,0,200,'sprites/Birds/BlueBird.png'),
	(87,'Bull Bird',20,15,0,200,'sprites/Birds/BullBird.png'),
	(88,'Monkey Bird',20,15,0,200,'sprites/Birds/ButterflyBird.png'),
	(89,'Fat Bird',20,15,0,200,'sprites/Birds/FatBird.png'),
	(90,'Fearow',20,15,0,200,'sprites/Birds/Fearow.png'),
	(91,'Flame Bird',20,15,0,200,'sprites/Birds/FlameBird.png'),
	(92,'FlowerBird',20,15,0,200,'sprites/Birds/FlowerBird.png'),
	(93,'GreenBird',20,15,0,200,'sprites/Birds/GreenBird.png'),
	(94,'Grizzly Bird',20,15,0,200,'sprites/Birds/GrizzlyBird.png'),
	(95,'Land Bird',20,15,0,200,'sprites/Birds/LandBird.png'),
	(96,'Moltres',20,15,0,200,'sprites/Birds/Moltres.png'),
	(97,'Peacock Bird',20,15,0,200,'sprites/Birds/PeacockBird.png'),
	(98,'Surfer Penguin',20,15,0,200,'sprites/Birds/Penguin.png'),
	(99,'Pidgeotto',20,15,0,200,'sprites/Birds/Pidgeotto.png'),
	(100,'Purple Bird',20,15,0,200,'sprites/Birds/PurpleBird.png'),
	(101,'Skill Bird',20,15,0,200,'sprites/Birds/SkullBird.png'),
	(102,'Snake Bird',25,15,0,200,'sprites/Birds/SnakeBird.png'),
	(103,'Ant',5,3,0,30,'sprites/Bugs/Ant.png'),
	(104,'Beadrill',5,3,0,30,'sprites/Bugs/Beadrill.png'),
	(105,'Big Purple Claw Bug',5,3,0,30,'sprites/Bugs/BigPurpleClawBug.png'),
	(106,'Dung Beatle',5,3,0,30,'sprites/Bugs/BigStag.png'),
	(107,'Angry Butterfly',5,3,0,30,'sprites/Bugs/BigWingBug.png'),
	(108,'Butterfly',5,3,0,30,'sprites/Bugs/Butterfly.png'),
	(109,'Centipede',5,3,0,30,'sprites/Bugs/Centipede.png'),
	(110,'Crab',5,3,0,30,'sprites/Bugs/Crab.png'),
	(111,'Ekans',5,3,0,30,'sprites/Bugs/Ekans.png'),
	(112,'Flower Bug',5,3,0,30,'sprites/Bugs/FlowerBug.png'),
	(113,'Frog',5,3,0,30,'sprites/Bugs/Frog.png'),
	(114,'Fuzzy Bug',5,3,0,30,'sprites/Bugs/FuzzyBug.png'),
	(115,'Grasshopper',5,3,0,30,'sprites/Bugs/Grasshopper.png'),
	(116,'Little Buy',5,3,0,30,'sprites/Bugs/LittleBug.png'),
	(117,'Red Buy',5,3,0,30,'sprites/Bugs/RedBug.png'),
	(118,'Scorpion',5,3,0,30,'sprites/Bugs/Scorpion.png'),
	(119,'Sea Bug',5,3,0,30,'sprites/Bugs/SeaBug.png'),
	(120,'Slug',5,3,0,30,'sprites/Bugs/Slug.png'),
	(121,'Leader Ant',5,3,0,30,'sprites/Bugs/Stag.png'),
	(122,'Snail of Doom',5,3,0,30,'sprites/Bugs/WideEyes.png');

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
	(5,'^C','me@theboss.com','$2y$10$/6vepUUa/EcK21KFSHURIuFc5j6cZ4O.xLS0845xLqmf6XDrenINO'),
	(9,'thingssssss','a@a.abd','$2y$10$bJ.OxfmoBDaSQ4BMMuZtYeX/YEgYy0mHuxcbw9z0XombkwNDvNykG'),
	(11,'Sarah','lovely@luscious.lips','$2y$10$poDT1G9z.slDbw1It4MbkOnT4OS3DsSdn7q8G3JYUzX0dxfoCkIyK'),
	(12,'test','test@testing.com','$2y$10$lNBsCPPWNFse35/Y4PXBueZGnXLzB7GsCtWTBVKGXGZyoFESrL1mi'),
	(13,'$_username','asdf@jkl.com','$2y$10$K2yUrEG4qOo.mHoV7hmX/OmaFOdfj/mI8tlOXqFJ9dbt7sfRlRA.W'),
	(14,'ellyonia','camikeith@gmail.com','$2y$10$ODUS4QF1.r3oHNn5.UdZ7.YLX7IMAgw.VoMJHNB33GHdTGzCANjiq'),
	(15,'jsmith','jsmith@me.com','$2y$10$C1p9xTlYXBXbt.x3l4T7YO8DZ7/5.jc7PQheWKE.fJE8nY2gXsuYW'),
	(17,'fuckyou','fuck@you.com','$2y$10$EOHunULJR1PeDIJrpv/V5O1CY2ccs4PEP/Masx6JJhDS/ioxHXozi'),
	(18,'LelzMarfs','Ethan.busbee@gmail.com','$2y$10$mZd7.KdYkdH6mPTT0lKodOA0vfSDxbIp7KTyOs.a.okAkqIiRLgGu'),
	(19,'Porcupine^2','a@b.c','$2y$10$64zZ.mzV8ZT1TvMLIP1nS.N9T9mdn0H2QzR7Np.0iY23hzECLVdSe'),
	(20,'Nergal_the_Cowardly','b.@rh','$2y$10$RHoonUdURpYM.ikIU9lCQOCzxh2nzQHkFVaiuae8yWszu4.QwNV9y');

/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table World_Bosses
# ------------------------------------------------------------

LOCK TABLES `World_Bosses` WRITE;
/*!40000 ALTER TABLE `World_Bosses` DISABLE KEYS */;

INSERT INTO `World_Bosses` (`id`, `monster_id`, `boss_health`, `boss_attack`, `boss_defense`, `boss_magic`, `achievable_item_id`)
VALUES
	(1,55,0,25,5,1,3),
	(2,57,0,25,5,1,5),
	(3,46,1872,20,3,1,4),
	(4,85,0,20,3,1,7),
	(5,87,2000,20,3,1,5),
	(6,15,300,20,3,1,4),
	(7,28,2000,20,3,1,6);

/*!40000 ALTER TABLE `World_Bosses` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table World_Fights
# ------------------------------------------------------------

LOCK TABLES `World_Fights` WRITE;
/*!40000 ALTER TABLE `World_Fights` DISABLE KEYS */;

INSERT INTO `World_Fights` (`boss_id`, `character_id`, `damage_done`, `active`)
VALUES
	(1,11,4000,0),
	(2,11,4000,0),
	(3,15,128,1),
	(4,3,2000,0);

/*!40000 ALTER TABLE `World_Fights` ENABLE KEYS */;
UNLOCK TABLES;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
