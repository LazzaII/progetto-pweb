drop database if exists bloodbank;
create schema bloodbank default character set utf8;
use bloodbank;

set foreign_key_checks = 0; -- to remove fk check

--  ----------------- --
--  USER              --
-- ------------------ --

create table if not exists `admin` (
    `_id` int not null auto_increment,
    `first_name` varchar(30) not null,
    `second_name` varchar(30) not null,
    `type` tinyint not null check (`type` in (0,1)), -- 0 super admin, 1 admin, 2 donator, 3 applicant
    `email` varchar(50) not null,
    `hash_pwd` tinytext not null,
    primary key (`_id`)
) engine = InnoDB;

create table if not exists `donator` (
    `_id` int not null auto_increment,
    `first_name` varchar(30) not null,
    `second_name` varchar(30) not null,
    `email` varchar(50) not null,
    `phone` varchar(11) not null,
    `hash_pwd` tinytext not null,
    `blood_group` varchar(3) not null,
    `isAuth` tinyint not null default 0 check (`isAuth` in (0,1,2)), -- 0 not enabled, 1 enable to use account, 2 blocked
    `address` varchar(45) not null,
    `city_` int not null,
    primary key (`_id`),
    foreign key (`city_`) references `city` (`_id`)
        on update cascade
        on delete no action
) engine = InnoDB;

create index `index_city_1` ON `donator` (`city_`);

create table if not exists `hospital` (
    `_id` int not null auto_increment,
    `name` varchar(30) not null,
    `email` varchar(50) not null,
    `phone` varchar(11) not null,
    `hash_pwd` tinytext not null,
    `isAuth` tinyint not null default 0 check (`isAuth` in (0,1,2)), -- 0 not enabled, 1 enable to use account, 2 blocked
    `address` varchar(45) not null,
    `city_` int not null,
    primary key (`_id`),
    foreign key (`city_`) references `city` (`_id`)
        on update cascade
        on delete no action
) engine = InnoDB;

create index `index_city_2` ON `hospital` (`city_`);

--  ----------------- --
--  SITE              --
-- ------------------ --

create table if not exists `site` (
    `_id` int not null auto_increment,
    `address` varchar(45) not null,
    `city_` int not null,
    primary key (`_id`),
    foreign key (`city_`) references `city` (`_id`)
        on update cascade
        on delete no action
) engine = InnoDB;

create index `index_city_3` ON `site` (`city_`);

--  ----------------- --
--  CITY              --
-- ------------------ --

create table if not exists `city` (
    `_id` int auto_increment,
    `city` varchar(29) not null,
    `lat` float  not null,
    `lng` float  not null,
    `region` varchar(21) not null,
    `capital`varchar(7),
    primary key (`_id`)
) engine=InnoDB;

--  ----------------- --
--  REQUEST           --
-- ------------------ --

create table if not exists `blood_request` (
    `_id` int not null auto_increment,
    `date` date default null,
    `isPending` tinyint not null check (`isPending` in (0,1,2,3)), -- 0 pending, 1 accepted, 2 cancelled by hospital, 3 not accepted by admin
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
) engine = InnoDB;

create index `index_hospital` ON `blood_request` (`hospital_`);
create index `index_site_1` ON `blood_request` (`_site_`);

create table if not exists `donation` (
    `_date` date not null, --  data della donazione perchè non può donare entro tot mesi controllare ultima data e bloccare tasto dona
    `_donator_` int not null,
    `_site_` int not null,
    `isUsed` tinyint not null check(`isUsed` in (0, 1)), -- 0 blood not used, 1 blood used
    primary key (`_date`, `_donator_`, `_site_`),
    foreign key (`_donator_`) references `donator` (`_id`),
        on update cascade
        on delete no action
    foreign key (`_site_`) references `site` (`_id`)
        on update cascade
        on delete no action
)

create index `index_donator` ON `donation` (`_donator_`);
create index `index_site_1` ON `donation` (`_site_`);

--  ----------------- --
--  MESSAGE           --
-- ------------------ --

create table if not exists `message` (
    `_id` int not null auto_increment
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
    `img` tinytext default null,
    `author_` int not null,
    primary key (`_id`),
    foreign key (`author_`) references `admin` (`_id`)
        on update cascade
        on delete no action
) engine = InnoDB;

create index `index_author` ON `news` (`author_`);