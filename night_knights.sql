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
    `energy` int(11) NOT NULL DEFAULT 0,
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
    (1, 'picoriley', 'acloudy@smu.edu', '$2y$10$eGtIfbkb9Ou11VdEzhi2p.WbeOw/8a8d5ON9mnFZtQKalSCmOiuP.');


INSERT INTO `Characters` (`id`, `name`, `energy`, `experience`, `level`)
VALUES
    (1, 'picoriley', 0, 0, 1);

-- end of night-knights code
