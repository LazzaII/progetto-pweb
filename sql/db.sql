drop database if exists BloodBankLab;
create schema BloodBankLab default character set utf8;
use BloodBankLab;

set foreign_key_checks = 0; -- per rimuovere il controllo sulle fk

--  ----------------- --
--  CITY              --
-- ------------------ --

create table if not exists `region` (
    `_id` int auto_increment,
    `name` varchar(25),
    primary key (`_id`)
) engine = InnoDB;

create table if not exists `city` (
    `_id` int auto_increment,
    `name` varchar(29) not null,
    `lat` float  not null,
    `lng` float  not null,
    `region_` int not null, -- fk
    primary key (`_id`),
    foreign key (`region_`) references `region` (`_id`)
        on update cascade
        on delete cascade
) engine = InnoDB;

create index `index_region` ON `city` (`region_`);

--  ----------------- --
--  USER              --
-- ------------------ --

create table if not exists `admin` (
    `_id` int not null auto_increment,
    `first_name` varchar(30) not null,
    `second_name` varchar(30) not null,
    `type` tinyint default 1 check (`type` in (0,1)), -- 0 super admin, 1 admin
    `email` varchar(50) not null,
    `hash_pwd` tinytext not null,
    primary key (`_id`)
) engine = InnoDB;

create table if not exists `donator` (
    `_id` int not null auto_increment,
    `first_name` varchar(30) not null,
    `second_name` varchar(30) not null,
    `email` varchar(50) not null,
    `phone` int not null,
    `hash_pwd` tinytext not null,
    `blood_group` varchar(3) not null,
    `isAuth` tinyint not null default 0 check (`isAuth` in (0,1)), -- 0 non attivato, 1 attivato
    primary key (`_id`)
) engine = InnoDB;

create table if not exists `hospital` (
    `_id` int not null auto_increment,
    `name` varchar(30) not null,
    `email` varchar(50) not null,
    `phone` varchar(11) not null,
    `hash_pwd` tinytext not null,
    `address` varchar(45) not null,
    `city_` int default null, -- fk
    `isAuth` tinyint not null default 0 check (`isAuth` in (0,1)), -- 0 non attivato, 1 attivato
    primary key (`_id`),
    foreign key (`city_`) references `city` (`_id`)
        on update cascade
        on delete cascade
) engine = InnoDB;

create index `index_city_2` ON `hospital` (`city_`);

--  ----------------- --
--  STOCKS            --
-- ------------------ --

create table if not exists `site` (
    `_id` int not null auto_increment,
    `address` varchar(45) not null,
    `city_` int default null,
    primary key (`_id`),
    foreign key (`city_`) references `city` (`_id`)
        on update cascade
        on delete cascade
) engine = InnoDB;

create index `index_city_3` ON `site` (`city_`);

--  ----------------- --
--  BLOOD             --
-- ------------------ --

create table if not exists `blood_request` (
    `_id` int not null auto_increment,
    `date` date not null,
    `blood_type` varchar(3) not null,
    `quantity` int not null,
    `deliveryTime` int not null, -- tempo di arrivo espresso in minuti
    `cost` int,
    `hospital_` int not null, -- fk
    `site_` int default null, -- fk
    `isPending` tinyint default 0 check (`isPending` in (0,1,2,3)), -- 0 in attesa, 1 accettat, 2 non accettato da un admin
    primary key (`_id`),
    foreign key (`hospital_`) references `hospital` (`_id`)
        on update cascade
        on delete cascade,
    foreign key (`site_`) references `site` (`_id`)
        on update cascade
        on delete cascade
) engine = InnoDB;

create index `index_hospital` ON `blood_request` (`hospital_`);
create index `index_site_1` ON `blood_request` (`site_`);

create table if not exists `donation` (
    `_id` int not null auto_increment,
    `date` date not null, --  data della donazione perchè non può donare entro tot mesi controllare ultima data e bloccare tasto dona
    `donator_` int, -- fk
    `site_` int not null, -- fk
    `isUsed` tinyint default 0 check (`isUsed` in (0, 1)), -- 0 non usato, 1 usato
    primary key (`_id`),
    foreign key (`donator_`) references `donator` (`_id`)
        on update cascade
        on delete cascade,
    foreign key (`site_`) references `site` (`_id`)
        on update cascade
        on delete cascade
) engine = InnoDB;

create index `index_donator` ON `donation` (`donator_`);
create index `index_site_1` ON `donation` (`site_`);

--  ----------------- --
--  MESSAGE           --
-- ------------------ --

create table if not exists `message` (
    `_id` int not null auto_increment,
    `object` varchar(140) not null,
    `body` text not null,
    `first_name` varchar(30) not null,
    `second_name` varchar(30) not null,
    `email` varchar(60) not null,
    primary key (`_id`)
) engine = InnoDB;

--  ----------------- --
--  NEWS              --
-- ------------------ --

create table if not exists `news` (
    `_id` int not null auto_increment,
    `title` varchar(140) not null,
    `body` text not null,
    `img_uri` tinytext not null,
    `author_` int not null, -- fk ad admin
    primary key (`_id`),
    foreign key (`author_`) references `admin` (`_id`)
        on update cascade
        on delete cascade
) engine = InnoDB;

create index `index_author` ON `news` (`author_`);