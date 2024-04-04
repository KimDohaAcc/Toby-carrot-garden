create table rabbit.member
(
    id              int auto_increment
        primary key,
    created_time    datetime(6) null,
    updated_time    datetime(6) null,
    birth_date      date null,
    nickname        varchar(30) null,
    parent_password varchar(255) null,
    serial_number   bigint null,
    constraint UK_5mb6dtpv7rh76xaom4iavqkk9
        unique (serial_number)
);