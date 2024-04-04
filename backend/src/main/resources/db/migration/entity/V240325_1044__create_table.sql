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

