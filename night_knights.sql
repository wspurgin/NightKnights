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

CREATE TABLE Messages(
    `character_id` INT(11),
    `date_created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
    `message` TEXT NOT NULL,
    `unread` TINYINT(1) NOT NULL DEFAULT 1,

    PRIMARY KEY (`character_id`, `date_created`),

    CONSTRAINT message_fk_character
    FOREIGN KEY (`character_id`)
        REFERENCES Characters(`id`)
        ON UPDATE CASCADE ON DELETE CASCADE

) ENGINE=INNODB CHARSET=utf8;

-- Data dump

SOURCE night_knights_dump.sql;

-- Functions

DELIMITER ;;
CREATE FUNCTION `calculate_level`(v_exp INT) RETURNS int(11)
BEGIN
    DECLARE v_level INT;
    SELECT FLOOR((SQRT(625+100*v_exp)-25)/50)+1 INTO v_level;
    RETURN v_level;
END;;
DELIMITER ;

-- Procedures

DELIMITER ;;
CREATE PROCEDURE `equip_item`(IN p_item_id INT, IN p_character_id INT)
BEGIN
    DECLARE p_category VARCHAR(32);
    DECLARE p_check INT(11);
    
    # equip item
    UPDATE Inventories SET `is_equipped`=1 WHERE `item_id`=p_item_id AND `character_id`=p_character_id;
    
    # check if any rows were update (if none, then the character_id or item_id wasn't found)
    SELECT ROW_COUNT() INTO p_check;
    
    IF (p_check != 0)
    THEN 
        # get item category
        SELECT `classification` INTO p_category FROM Items WHERE `id`=p_item_id;
        
        # unequip all items of the same category
        UPDATE Inventories inv INNER JOIN Items i SET `is_equipped`=0 WHERE inv.`character_id`=p_character_id AND inv.`item_id`!=p_item_id AND i.`classification`=p_category;
    END IF;
END;;
DELIMITER ;

DELIMITER ;;
CREATE PROCEDURE `create_user`(IN p_username VARCHAR(256), IN p_email VARCHAR(256), IN p_password VARCHAR(256))
BEGIN
    DECLARE p_check INT(11);
    DECLARE p_user_id INT(11);
    
    # create user
    INSERT INTO `Users`(`email`, `username`, `password`) VALUES (p_email, p_username, p_password);
    
    # get user id
    SELECT LAST_INSERT_ID() INTO p_user_id;
    
    # check if any rows were inserted (if none, then there was an error)
    SELECT ROW_COUNT() INTO p_check;
    
    IF (p_check != 0)
    THEN 
        # create characters
        INSERT INTO `Characters`(`id`, `name`) VALUES (p_user_id, p_username);
        
        # give them default item
        INSERT INTO `Inventories`(`item_id`, `character_id`, `is_equipped`) VALUES (7, p_user_id, 1);
    END IF;

    SELECT p_user_id AS `id`;
END;;
DELIMITER ;

DELIMITER ;;
CREATE PROCEDURE `create_message`(IN p_character_id INT, IN p_message TEXT)
BEGIN
    INSERT INTO `Messages`(`character_id`, `message`) VALUES (p_character_id, p_message);
END;;
DELIMITER ;

DELIMITER ;;
CREATE PROCEDURE `create_inventory_item`(IN p_item_id INT, IN p_character_id INT)
BEGIN
    DECLARE CONTINUE HANDLER FOR SQLSTATE '23000' SET @item_exists = 1;
    SET @item_exists = 0;
    INSERT INTO Inventories(`item_id`, `character_id`) VALUES (p_item_id, p_character_id);
    SELECT @item_exists AS `item_already_existed`;
END;;
DELIMITER ;


DELIMITER ;;
CREATE PROCEDURE `deactivate_boss`(IN p_boss_id INT)
BEGIN
    # Deactivate fights that have boss_id = p_boss_id
    UPDATE `World_Fights` f SET f.`active`=0 WHERE f.`boss_id`=p_boss_id;
    
    # Payout characters with items
    INSERT INTO `Inventories` (`item_id`, `character_id`)
    SELECT b.`achievable_item_id`, fh.`character_id`
    FROM (
        SELECT `character_id` FROM `World_Fights` WHERE `boss_id`=p_boss_id
        ) AS fh
    JOIN `World_Bosses` b
    WHERE b.`id`=p_boss_id
    ON DUPLICATE KEY
    UPDATE `Inventories`.`item_id`=`Inventories`.`item_id`, `Inventories`.`character_id`= `Inventories`.`character_id`;

    # Create messages
    INSERT INTO `Messages` (`character_id`, `message`) 
    SELECT `character_id`, "Boss was defeated! There's a new Item in your inventory!"
    FROM `World_Fights` WHERE `boss_id`=p_boss_id;

END;;
DELIMITER ;

DELIMITER ;;
CREATE PROCEDURE `add_more_bosses`()
BEGIN
    DECLARE t_check INT(11);
    SELECT COUNT(`id`) INTO t_check FROM `World_Bosses` WHERE `boss_health` > 0;
    IF(t_check < 2)
    THEN
        INSERT INTO `World_Bosses` (`monster_id`, `boss_health`, `boss_attack`, `boss_defense`, `boss_magic`, `achievable_item_id`)
            SELECT m.`id`, 10 * m.`health_seed`, 20,
                3, 1, i.`id`
                FROM `Monsters` m JOIN (SELECT `id` FROM `Items` ORDER BY RAND() LIMIT 5) AS i
                ORDER BY RAND() LIMIT 5;
    END IF;
END;;
DELIMITER ;

DELIMITER ;;
CREATE PROCEDURE `save_fight`(IN p_boss_id INT, IN p_character_id INT, IN p_add_damage INT)
BEGIN
    # First update fight
    INSERT INTO `World_Fights`(`boss_id`, `character_id`, `damage_done`) VALUES (p_boss_id, p_character_id, p_add_damage)
    ON DUPLICATE KEY
    UPDATE `damage_done` = `damage_done`+ p_add_damage;
    
    # Update boss' health
    UPDATE `World_Bosses` SET `boss_health` = `boss_health` - p_add_damage
        WHERE `id` = p_boss_id;
    
    # call procedure that checks number of active bosses and will add more if needed.
    CALL `add_more_bosses`();
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

DELIMITER ;;
CREATE TRIGGER `payout_xp` BEFORE UPDATE ON `World_Fights`
 FOR EACH ROW BEGIN
    IF(new.`active` = 0 & old.`active` = 1)
    THEN
        UPDATE `Characters` SET `experience`=`experience`+ new.`damage_done` WHERE `id`=old.`character_id`;
    END IF;
END;;
DELIMITER ;

DELIMITER ;;
CREATE TRIGGER `update_boss` BEFORE UPDATE ON `World_Bosses`
 FOR EACH ROW BEGIN
    IF(new.`boss_health` <= 0 & old.`boss_health` > 0)
    THEN
        CALL deactivate_boss(old.`id`);
    END IF;
END;;
DELIMITER ;

-- end of night-knights code
