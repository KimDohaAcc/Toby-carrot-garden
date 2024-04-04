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

create table rabbit.place_data
(
    id           int auto_increment
        primary key,
    created_time datetime(6)  null,
    updated_time datetime(6)  null,
    name         varchar(255) null
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

