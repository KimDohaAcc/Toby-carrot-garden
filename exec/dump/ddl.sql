create table rabbit.carrot_grade_data
(
    id           int auto_increment
        primary key,
    created_time datetime(6)                                        null,
    updated_time datetime(6)                                        null,
    max          int                                                not null,
    min          int                                                not null,
    name         enum ('SEED', 'SPROUT', 'BABY', 'ADULT', 'MASTER') null
);

create table rabbit.member
(
    id              int auto_increment
        primary key,
    created_time    datetime(6)  null,
    updated_time    datetime(6)  null,
    birth_date      date         null,
    name            varchar(30)  null,
    parent_password varchar(255) null,
    serial_number   bigint       null,
    constraint UK_5mb6dtpv7rh76xaom4iavqkk9
        unique (serial_number)
);

create table rabbit.place_data
(
    id           int auto_increment
        primary key,
    created_time datetime(6)  null,
    updated_time datetime(6)  null,
    name         varchar(255) null
);

create table rabbit.clear_image
(
    id              int auto_increment
        primary key,
    created_time    datetime(6)  null,
    updated_time    datetime(6)  null,
    clear_image_url varchar(255) null,
    member_id       int          null,
    place_data_id   int          null,
    constraint FKc9reg6vlqg3mx6mlk74g6ciim
        foreign key (place_data_id) references rabbit.place_data (id),
    constraint FKqxisouik54tl8qcrttb5ncs9e
        foreign key (member_id) references rabbit.member (id)
);

create table rabbit.member_carrot
(
    id            int auto_increment
        primary key,
    created_time  datetime(6) null,
    updated_time  datetime(6) null,
    count         int         not null,
    member_id     int         null,
    place_data_id int         null,
    constraint FK6s7qg0lo67l7pt1omgyclakc0
        foreign key (member_id) references rabbit.member (id),
    constraint FKsgmpn8eq0cn1bunas15qx1iwq
        foreign key (place_data_id) references rabbit.place_data (id)
);

create table rabbit.story_data
(
    id              int auto_increment
        primary key,
    created_time    datetime(6)  null,
    updated_time    datetime(6)  null,
    recommend_age   varchar(255) null,
    story_image_url varchar(255) null,
    title           varchar(255) null,
    place_data_id   int          null,
    constraint FKnso5j92s3duikd05a41b12dq
        foreign key (place_data_id) references rabbit.place_data (id)
);

create table rabbit.scene_data
(
    id              int auto_increment
        primary key,
    created_time    datetime(6)                      null,
    updated_time    datetime(6)                      null,
    content         varchar(255)                     null,
    scene_image_url varchar(255)                     null,
    scene_type      enum ('NORMAL', 'QUIZ', 'CLEAR') null,
    voice_url       varchar(255)                     null,
    story_data_id   int                              null,
    constraint FK35prabdysjwbtq2w2w53x06x8
        foreign key (story_data_id) references rabbit.story_data (id)
);

create table rabbit.quiz_data
(
    id             int auto_increment
        primary key,
    created_time   datetime(6)                                           null,
    updated_time   datetime(6)                                           null,
    correct_answer varchar(255)                                          null,
    quiz_type      enum ('DRAWINGS', 'OBJECTS', 'FEELINGS', 'EMERGENCY') null,
    scene_data_id  int                                                   null,
    constraint FKdegtn3bqxis40xssnaur9nvsd
        foreign key (scene_data_id) references rabbit.scene_data (id)
);

create table rabbit.member_quiz
(
    id           int auto_increment
        primary key,
    created_time datetime(6)  null,
    updated_time datetime(6)  null,
    image_url    varchar(255) null,
    score        double       not null,
    member_id    int          null,
    quiz_data_id int          null,
    constraint FKalplnr9rpc76cn8gb2l0f3ns7
        foreign key (member_id) references rabbit.member (id),
    constraint FKchkiicbwevl85xemtx4qcqfmy
        foreign key (quiz_data_id) references rabbit.quiz_data (id)
);

