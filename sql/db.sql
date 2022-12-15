drop database if exists BloodBankPisa;
create schema BloodBankPisa default character set utf8;
use BloodBankPisa;

set foreign_key_checks = 0; -- to remove fk check
-- set global event_scheduler = on; -- start scheduler event

--  ----------------- --
--  USER              --
-- ------------------ --

create table if not exists `admin` {
    `_id` int not null auto_increment,
    `first_name` varchar(30) not null,
    `second_name` varchar(30) not null,
    `type` tinyint not null check (`type` in (0,1)), -- 0 super admin, 1 admin, 2 donator, 3 applicant
    `email` varchar(50) not null,
    `hash_pwd` tinytext not null,
    primary key (`_id`)
} engine = InnoDB;

create table if not exists `donator` {
    `_id` int not null auto_increment,
    `first_name` varchar(30) not null,
    `second_name` varchar(30) not null,
    `email` varchar(50) not null,
    `country` varchar(20) not null,
    `city` varchar(40) not null,
    `phone` varchar(11) not null,
    `hash_pwd` tinytext not null,
    `blood_group` varchar(3) not null,
    `isAuth` tinyint not null check (`auth` in (0,1)), -- 0 not enabled, 1 enable to use account
    primary key (`_id`)
} engine = InnoDB;

create table if not exists `hospital` {
    `_id` int not null auto_increment,
    `name` varchar(30) not null,
    `email` varchar(50) not null,
    `country` varchar(20) not null,
    `city` varchar(45) not null,
    `address` varchar(45) not null,
    `phone` varchar(11) not null,
    `hash_pwd` tinytext not null,
    `isAuth` tinyint not null check (`auth` in (0,1)), -- 0 not enabled, 1 enable to use account
    primary key (`_id`)
} engine = InnoDB;

--  ----------------- --
--  SITE              --
-- ------------------ --

create table if not exists `site` {
    `_id` int not null auto_increment,
    `city` varchar(45) not null,
    `nbs_Ap` int not null default 0, -- number os a+ blood sack -- gestire tutto dai trigger per aumentare e togliere
    `nbs_Am` int not null default 0, -- number os a- blood sack
    `nbs_Bp` int not null default 0, -- number os b+ blood sack
    `nbs_Bm` int not null default 0, -- number os b- blood sack
    `nbs_ABp` int not null default 0, -- number os ab+ blood sack
    `nbs_ABm` int not null default 0, -- number os ab- blood sack
    `nbs_Zp` int not null default 0, -- number os 0+ blood sack
    `nbs_Zm` int not null default 0, -- number os 0- blood sack
    primary key (`_id`)
}

--  ----------------- --
--  REQUEST           --
-- ------------------ --

create table if not exists `blood_request` {
    `_id` int not null auto_increment,
    `date` date default null,
    `isPending` tinyint not null check (`auth` in (0,1)), -- 0 pending, 1 accepted
    `blood_type` varchar(3) not null,
    `quantity` int not null,
    `site_` int not null, -- aggiunto dopo l'accettazione
    `hospital_` int not null,
    primary key (`_id`),
    foreign key (`hospital_`) references `hospital` (`_id`)
        on update cascade
        on delete no action,
    foreign key (`site_`) references `site` (`_id`)
        on update cascade
        on delete no action
}

create index `index_hospital` ON `blood_request` (`hospital_`);
create index `index_site_1` ON `blood_request` (`_site_`);


create table if not exists `donation` {
    `_donator_` int not null,
    `_site_` int not null,
    `date` date int not null, --  data della donazione perchè non può donare entro tot mesi controllare ultima data e bloccare tasto dona
    primary key (`_donator_`, `_site_`),
    foreign key (`_donator_`) references `donator` (`_id`),
        on update cascade
        on delete no action
    foreign key (`_site_`) references `site` (`_id`)
        on update cascade
        on delete no action
}

create index `index_donator` ON `donation` (`_donator_`);
create index `index_site_1` ON `donation` (`_site_`);

--  ----------------- --
--  MESSAGE           --
-- ------------------ --

create table if not exists `message` {
    `_id` int not null auto_increment
    `object` varchar(140) not null,
    `body` text not null,
    `first_name` varchar(30) not null,
    `second_name` varchar(30) not null,
    `email` varchar(60) not null,
    primary key (`_id`)
} engine = InnoDB;

--  ----------------- --
--  NEWS              --
-- ------------------ --

create table if not exists `news` {
    `_id` int not null auto_increment,
    `title` varchar(140) not null,
    `body` text not null,
    `img` tinytext default null,
    `author_` int not null,
    primary key (`_id`),
    foreign key (`author_`) references `admin` (`_id`)
        on update cascade
        on delete no action
} engine = InnoDB;

create index `index_author` ON `news` (`author_`);