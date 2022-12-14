drop database if exists BloodBankPisa;
create schema BloodBankPisa default character set utf8;
use BloodBankPisa;

set foreign_key_checks = 0; -- to remove fk check
set global event_scheduler = on; -- start scheduler event

--  ----------------- --
--  USER              --
-- ------------------ --

create table if not exists `user` {
    `_id` int not null auto_increment,
    `first_name` varchar(30) not null,
    `second_name` varchar(30) not null,
    `type` tinyint not null check (`type` in (0,1,2, 3)), -- 0 super admin, 1 admin, 2 donator, 3 applicant
    `email` varchar(50) not null,
    `country` varchar(20) not null,
    `city` varchar(40) not null,
    `phone` varchar(11) not null,
    `hash_pwd` tinytext not null,
    `auth` tinyint not null check (`auth` in (0,1)), -- 0 not enabled, 1 enable to use account
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
    foreign key (`author_`) references `user` (`_id`)
} engine = InnoDB;

create index `index_author_1` ON `news` (`author_`);

--  ----------------- --
--  REQUEST           --
-- ------------------ --

create table if not exists `request` {
    `_id` int not null auto_increment,
    `why` text default null, -- null = donator, not null = applicant
    `pending` tinyint not null check (`auth` in (0,1)), -- 0 pending, 1 accepted
    `users_` int not null,
    primary key (`_id`),
    foreign key (`author_`) references `user` (`_id`)
}

create index `index_author_2` ON `request` (`author_`);

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