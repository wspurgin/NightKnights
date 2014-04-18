-- start of night knights code
DROP DATABASE IF EXISTS night_knights;
CREATE DATABASE IF NOT EXISTS night_knights DEFAULT CHARSET=utf8;
USE night_knights;

CREATE TABLE Users(
    `id` int(11) AUTO_INCREMENT PRIMARY KEY,
    `username` varchar(32) NOT NULL,
    `email` varchar(64) NOT NULL,
    `password` varchar(128) NOT NULL,
    
    UNIQUE KEY `username_UNIQUE` (`username`),
    UNIQUE KEY `email_UNIQUE` (`email`)

) ENGINE=INNODB DEFAULT CHARSET=utf8;

CREATE TABLE Characters(
    `id` int(11) AUTO_INCREMENT PRIMARY KEY,
    `name` varchar(32) NOT NULL UNIQUE KEY,
    `energy` int(11) NOT NULL DEFAULT 250,
    `experience` int(11) NOT NULL DEFAULT 0,
    `level` int(11) NOT NULL DEFAULT 1,
    
    CONSTRAINT character_fk_user
    FOREIGN KEY (`id`)
        REFERENCES Users(`id`)
        ON UPDATE CASCADE ON DELETE CASCADE,

    CONSTRAINT character_fk_username
    FOREIGN KEY (`name`)
        REFERENCES Users(`username`)
        ON UPDATE CASCADE ON DELETE CASCADE

) ENGINE=INNODB DEFAULT CHARSET=utf8;

CREATE TABLE Monsters(
    `id` int(11) AUTO_INCREMENT PRIMARY KEY,
    `name` varchar(32) NOT NULL,
    `attack_seed` int(11) NOT NULL DEFAULT 1,
    `defense_seed` int(11) NOT NULL DEFAULT 0,
    `magic_seed` int(11) NOT NULL DEFAULT 0,
    `health_seed` int(11) NOT NULL DEFAULT 10,
    `img_url` varchar(128) NOT NULL

) ENGINE=INNODB DEFAULT CHARSET=utf8;

CREATE TABLE Items(
    `id` int(11) AUTO_INCREMENT PRIMARY KEY,
    `name` varchar(32) NOT NULL,
    `attack_stat` int(11) NOT NULL DEFAULT 1,
    `defense_stat` int(11) NOT NULL DEFAULT 0,
    `magic_stat` int(11) NOT NULL DEFAULT 0,
    `classification` varchar(32) NOT NULL,
    `img_url` varchar(128) NOT NULL

) ENGINE=INNODB DEFAULT CHARSET=utf8;

CREATE TABLE Areas(
    `id` int(11) AUTO_INCREMENT PRIMARY KEY,
    `name` varchar(32) NOT NULL,
    `img_url` varchar(128) NOT NULL
    
) ENGINE=INNODB DEFAULT CHARSET=utf8;

CREATE TABLE Areas_Monsters(
    `area_id` int(11) NOT NULL,
    `monster_id` int(11) NOT NULL,
    
    CONSTRAINT pk_area_monster_id 
    PRIMARY KEY (`area_id`, `monster_id`),

    INDEX(`area_id`),
    INDEX(`monster_id`),

    CONSTRAINT area_monster_fk_area
    FOREIGN KEY (`area_id`)
        REFERENCES Areas(`id`)
        ON UPDATE CASCADE ON DELETE CASCADE,

    CONSTRAINT area_monster_fk_monster
    FOREIGN KEY (`monster_id`)
        REFERENCES Monsters(`id`)
        ON UPDATE CASCADE ON DELETE CASCADE
    
) ENGINE=INNODB DEFAULT CHARSET=utf8;

CREATE TABLE World_Bosses(
    `id` int(11) AUTO_INCREMENT PRIMARY KEY,
    `monster_id` int(11) NOT NULL,
    `boss_health` int(11) NOT NULL,
    `boss_attack` int(11) NOT NULL,
    `boss_defense` int(11) NOT NULL,
    `boss_magic` int(11) NOT NULL,
    `achievable_item_id` int(11) NOT NULL,

    INDEX(`monster_id`),
    INDEX(`achievable_item_id`),

    CONSTRAINT world_boss_fk_monster
    FOREIGN KEY (`monster_id`)
        REFERENCES Monsters(`id`)
        ON UPDATE CASCADE ON DELETE CASCADE,
        
    CONSTRAINT world_boss_fk_item
    FOREIGN KEY (`achievable_item_id`)
        REFERENCES Items(`id`)
        ON UPDATE CASCADE ON DELETE CASCADE
    
) ENGINE=INNODB DEFAULT CHARSET=utf8;

CREATE TABLE World_Fights(
    `boss_id` int(11) NOT NULL,
    `character_id` int(11) NOT NULL,
    `damage_done` int(11) NOT NULL DEFAULT 0,
    `active` tinyint(1) NOT NULL DEFAULT 1,
    
    CONSTRAINT pk_world_fights_id 
    PRIMARY KEY (`boss_id`, `character_id`),

    INDEX(`boss_id`),
    INDEX(`character_id`),

    CONSTRAINT world_fight_fk_world_boss
    FOREIGN KEY (`boss_id`)
        REFERENCES World_Bosses(`id`)
        ON UPDATE CASCADE ON DELETE CASCADE,

    CONSTRAINT world_fight_fk_character
    FOREIGN KEY (`character_id`)
        REFERENCES Characters(`id`)
        ON UPDATE CASCADE ON DELETE CASCADE
    
) ENGINE=INNODB DEFAULT CHARSET=utf8;

CREATE TABLE Inventories(
    `item_id` int(11) NOT NULL,
    `character_id` int(11) NOT NULL,
    `is_equipped` tinyint(1) NOT NULL DEFAULT 0,
    
    CONSTRAINT pk_inventories_id 
    PRIMARY KEY (`item_id`, `character_id`),

    INDEX(`item_id`),
    INDEX(`character_id`),

    CONSTRAINT inventory_fk_item
    FOREIGN KEY (`item_id`)
        REFERENCES Items(`id`)
        ON UPDATE CASCADE ON DELETE CASCADE,

    CONSTRAINT inventory_fk_character
    FOREIGN KEY (`character_id`)
        REFERENCES Characters(`id`)
        ON UPDATE CASCADE ON DELETE CASCADE
    
) ENGINE=INNODB DEFAULT CHARSET=utf8;

INSERT INTO `Users` (`id`, `username`, `email`, `password`)
VALUES
    (1, 'picoriley', 'acloudy@smu.edu', '$2y$10$ewAtLrK7Xojl.fj2330hGumzMCJfR35vn4e7sbNee9Wlvm30yFzvO');


INSERT INTO `Characters` (`id`, `name`, `energy`, `experience`, `level`)
VALUES
    (1, 'picoriley', 0, 0, 1);

INSERT INTO `Areas` (`id`, `name`, `img_url`)
VALUES
    (1, 'Forest', '/game/backgrounds/ForestMap.png'),
    (2, 'Mountain', '/game/backgrounds/MountainMap.png'),
    (3, 'Castle', '/game/backgrounds/CastleMap.png');

INSERT INTO `Items` (`id`, `name`, `attack_stat`, `defense_stat`, `magic_stat`, `classification`, `img_url`)
VALUES
    (1, 'Iron Sword', 1, 0, 0, 'Weapon', 'Sword.png'),
    (2, 'Iron Staff', 0, 0, 1, 'Weapon', 'Staff.png'),
    (3, 'Steel Sword', 2, 1, 0, 'Weapon', 'SSword.png'),
    (4, 'Steel Staff', 0, 1, 2, 'Weapon', 'SStaff.png'),
    (5, 'Sword of Truth', 10, 5, 0, 'Weapon', 'SwordOfTruth.png'),
    (6, 'Magical Staff of Power', 0, 5, 10, 'Weapon', 'StaffOfPower.png');

-- img guidelines: sprites/folder/name.png

INSERT INTO `Monsters` (`id`, `name`, `attack_seed`, `defense_seed`, `magic_seed`, `health_seed`, `img_url`)
VALUES
    (1, 'Dragon', 1, 1, 1, 1, 'sprites/Dragons/BigBlueDragon.png'),
    (2, 'Unicorn', 0, 0, 5, 3, 'sprites/Beasts/Unicorn.png'),
    (3, 'Gorilla', 5, 3, 0, 3, 'sprites/Beasts/Gorilla.png'),
    (4, 'Beaver', 5, 3, 0, 3, 'sprites/Beasts/Beaver.png'),
    (5, 'Big Beast', 3, 3, 3, 3, 'sprites/Beasts/BigBeast.png'),
    (6, 'Charizard', 3, 3, 3, 3, 'sprites/Beasts/Charizard.png'),
    (7, 'Elephant', 3, 3, 3, 3, 'sprites/Beasts/Elephant.png'),
    (8, 'Fire Cheetah', 3, 3, 3, 3, 'sprites/Beasts/FireCheetah.png'),
    (9, 'Furby', 3, 3, 3, 3, 'sprites/Beasts/Furby.png'),
    (10, 'Gopher', 3, 3, 3, 3, 'sprites/Beasts/Gopher.png'),
    (11, 'Gorilla', 3, 3, 3, 3, 'sprites/Beasts/Gorilla.png'),
    (12, 'Grey Guy', 3, 3, 3, 3, 'sprites/Beasts/GreyGuy.png'),
    (13, 'Grizzly', 3, 3, 3, 3, 'sprites/Beasts/Grizzly.png'),
    (14, 'Horn Bird', 3, 3, 3, 3, 'sprites/Beasts/HornBird.png'),
    (15, 'Kangaroo', 3, 3, 3, 3, 'sprites/Beasts/Kangaroo.png'),
    (16, 'KKKHammer', 3, 3, 3, 3, 'sprites/Beasts/KKKHammer.png'),
    (17, 'Lion', 3, 3, 3, 3, 'sprites/Beasts/Lion.png'),
    (18, 'Mousicorn', 3, 3, 3, 3, 'sprites/Beasts/Mousicorn.png'),
    (19, 'Ram', 3, 3, 3, 3, 'sprites/Beasts/Ram.png'),
    (20, 'Shoveler', 3, 3, 3, 3, 'sprites/Beasts/Shoveler.png'),
    (21, 'Snopher', 3, 3, 3, 3, 'sprites/Beasts/Snopher.png'),
    (22, 'Snow Man', 3, 3, 3, 3, 'sprites/Beasts/SnowMan.png'),
    (23, 'Stinger', 3, 3, 3, 3, 'sprites/Beasts/Stinger.png'),
    (24, 'Tornadus', 3, 3, 3, 3, 'sprites/Beasts/Tornadus.png'),
    (25, 'Tree', 3, 3, 3, 3, 'sprites/Beasts/Tree.png'),
    (26, 'Turtle', 3, 3, 3, 3, 'sprites/Beasts/Turtle.png'),
    (27, 'Weird Bug', 3, 3, 3, 3, 'sprites/Beasts/WeirdBug.png'),
    (28, 'Aerodactyl', 3, 3, 3, 3, 'sprites/Dragons/Aerodactyl.png'),
    (29, 'Axe Dragon', 3, 3, 3, 3, 'sprites/Dragons/AxeDragon.png'),
    (30, 'Big Snake', 3, 3, 3, 3, 'sprites/Dragons/BigSnake.png'),
    (31, 'Bloated Dragon', 3, 3, 3, 3, 'sprites/Dragons/BloatedDragon.png'),
    (32, 'ButterDragon', 3, 3, 3, 3, 'sprites/Dragons/ButterDragon.png'),
    (33, 'Cobra', 3, 3, 3, 3, 'sprites/Dragons/Cobra.png'),
    (34, 'Dinosaur', 3, 3, 3, 3, 'sprites/Dragons/Dinosaur.png'),
    (35, 'Dragonfly', 3, 3, 3, 3, 'sprites/Dragons/Dragonfly.png'),
    (36, 'Dragonite', 3, 3, 3, 3, 'sprites/Dragons/Dragonite.png'),
    (37, 'Gargoyle Dragon', 3, 3, 3, 3, 'sprites/Dragons/GargoyleDragon.png'),
    (38, 'Green Lizard', 3, 3, 3, 3, 'sprites/Dragons/GreenLizard.png'),
    (39, 'Hydra', 3, 3, 3, 3, 'sprites/Dragons/Hydra.png'),
    (40, 'Ice Dragon', 3, 3, 3, 3, 'sprites/Dragons/IceDragon.png'),
    (41, 'Light Green Dragon', 3, 3, 3, 3, 'sprites/Dragons/LightGreenDragon.png'),
    (42, 'Lizard', 3, 3, 3, 3, 'sprites/Dragons/Lizard.png'),
    (43, 'MedusaSnake', 3, 3, 3, 3, 'sprites/Dragons/MedusaSnake.png'),
    (44, 'Orange Dragon', 3, 3, 3, 3, 'sprites/Dragons/OrangeDragon.png'),
    (45, 'Salamence', 3, 3, 3, 3, 'sprites/Dragons/Salamence.png'),
    (46, 'Shield Dragon', 3, 3, 3, 3, 'sprites/Dragons/ShieldDragon.png'),
    (47, 'SmallDinosaur', 3, 3, 3, 3, 'sprites/Dragons/SmallDinosaur.png'),
    (48, 'Snake Dragon', 3, 3, 3, 3, 'sprites/Dragons/SnakeDragon.png'),
    (49, 'Triceratops', 3, 3, 3, 3, 'sprites/Dragons/Triceratops.png'),
    (50, 'Yellow Dragon', 3, 3, 3, 3, 'sprites/Dragons/YellowDragon.png'),
    (51, '1', 3, 3, 3, 3, 'sprites/Bosses/1.png'),
    (52, '2', 3, 3, 3, 3, 'sprites/Bosses/2.png'),
    (53, '3', 3, 3, 3, 3, 'sprites/Bosses/3.png'),
    (54, '4', 3, 3, 3, 3, 'sprites/Bosses/4.png'),
    (55, '5', 3, 3, 3, 3, 'sprites/Bosses/5.png'),
    (56, '6', 3, 3, 3, 3, 'sprites/Bosses/6.png'),
    (57, '7', 3, 3, 3, 3, 'sprites/Bosses/7.png'),
    (58, '8', 3, 3, 3, 3, 'sprites/Bosses/8.png'),
    (59, '9', 3, 3, 3, 3, 'sprites/Bosses/9.png'),
    (60, '10', 3, 3, 3, 3, 'sprites/Bosses/10.png'),
    (61, '11', 3, 3, 3, 3, 'sprites/Bosses/11.png'),
    (62, '12', 3, 3, 3, 3, 'sprites/Bosses/12.png'),
    (63, '13', 3, 3, 3, 3, 'sprites/Bosses/13.png'),
    (64, '14', 3, 3, 3, 3, 'sprites/Bosses/14.png'),
    (65, '15', 3, 3, 3, 3, 'sprites/Bosses/15.png'),
    (66, '16', 3, 3, 3, 3, 'sprites/Bosses/16.png'),
    (67, 'Badass Haunter', 3, 3, 3, 3, 'sprites/Bosses/BadassHaunter.png'),
    (68, 'Belly Mouth', 3, 3, 3, 3, 'sprites/Bosses/BellyMouth.png'),
    (69, 'Bigger Dragon Dude', 3, 3, 3, 3, 'sprites/Bosses/BiggerDragonDude.png'),
    (70, 'Dragon', 3, 3, 3, 3, 'sprites/Bosses/Dragon.png'),
    (71, 'Dragon Dude', 3, 3, 3, 3, 'sprites/Bosses/Dragon Dude.png'),
    (72, 'Dude With Bat Robe', 3, 3, 3, 3, 'sprites/Bosses/DudeWithBatRobe.png'),
    (73, 'Evil Preacher Man', 3, 3, 3, 3, 'sprites/Bosses/EvilPreacherMan.png'),
    (74, 'Fat Piglet', 3, 3, 3, 3, 'sprites/Bosses/FatPiglet.png'),
    (75, 'Guy With Balls', 3, 3, 3, 3, 'sprites/Bosses/GuyWithBalls.png'),
    (76, 'Mage Guy', 3, 3, 3, 3, 'sprites/Bosses/MageGuy.png'),
    (77, 'Paladin', 3, 3, 3, 3, 'sprites/Bosses/Paladin.png'),
    (78, 'Preacher Man', 3, 3, 3, 3, 'sprites/Bosses/PreacherMan.png'),
    (79, 'Red Mage', 3, 3, 3, 3, 'sprites/Bosses/RedMage.png'),
    (80, 'Sword Man', 3, 3, 3, 3, 'sprites/Bosses/SwordMan.png'),
    (81, 'Sword Man 2', 3, 3, 3, 3, 'sprites/Bosses/SwordMan2.png'),
    (82, 'Weird Dude', 3, 3, 3, 3, 'sprites/Bosses/WeirdDude.png');

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

-- Functions

DELIMITER ;;
CREATE FUNCTION `calculate_level`(v_exp INT) RETURNS int(11)
BEGIN
    DECLARE v_level INT;
    SELECT FLOOR((SQRT(625+100*v_exp)-25)/50)+1 INTO v_level;
    RETURN v_level;
END;;
DELIMITER ;

-- Triggers

DELIMITER ;;
CREATE TRIGGER `update_level` BEFORE UPDATE ON `Characters`
 FOR EACH ROW BEGIN
    IF(new.experience != old.experience)
    THEN
        SET new.level=calculate_level(new.experience);
    END IF;
END;;
DELIMITER ;

-- end of night-knights code
