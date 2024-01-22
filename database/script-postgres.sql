drop table notes;
drop table files;
drop table reminders;
drop table exceptions;
drop table appointments;
drop table treatments;
drop table patients;
drop table users;
drop table charges;
drop table roles;

create table charges (
    id serial primary key,
    description varchar(20) not null unique
);

create table roles (
    id serial primary key,
    description varchar(20) not null unique
);

create table users (
    id serial primary key,
    username varchar(15) not null unique,
    password varchar(60) not null,
    names varchar(50) null,
    surnames varchar(50) null,
    mail varchar(50) not null unique,
    phone varchar(20) null,
    id_charge int null,
    id_role int null,
    is_deleted boolean not null default false,
    constraint fk_users_charges foreign key (id_charge) references charges(id),
    constraint fk_users_roles foreign key (id_role) references roles(id)
);

create table treatments (
    id serial primary key,
    id_profesional int not null,
    description varchar(300) not null,
    price float not null default 0,
    constraint fk_treatments_profesionals foreign key (id_profesional) references users(id),
    unique (id_profesional, description)
);

create table patients (
    id serial primary key,
    names varchar(50) not null,
    surnames varchar(50) not null, 
    dni varchar(20) not null unique,
    birthdate date not null,
    mail varchar(50) null unique,
    phone varchar(20) null,
    address varchar(150) null 
);

create table notes (
    id serial primary key,
    id_patient int not null,
    content text not null,
    created_by int not null,
    modified_by int null,
    created_at timestamp not null default current_timestamp,
    updated_at timestamp not null default current_timestamp,
    constraint fk_notes_created foreign key (created_by) references users(id),
    constraint fk_notes_modified foreign key (modified_by) references users(id),
    constraint fk_notes_patients foreign key (id_patient) references patients(id)
);

create table files (
    id serial primary key,
    name varchar(150) not null,
    filename varchar(23) not null,
    description varchar(300) null,
    created_by int not null,
    modified_by int null,
    type varchar(10) not null default 'other',
    id_patient int not null,
    created_at timestamp not null default current_timestamp,
    updated_at timestamp not null default current_timestamp,
    constraint fk_files_created foreign key (created_by) references users(id),
    constraint fk_files_modified foreign key (modified_by) references users(id),
    constraint fk_files_patients foreign key (id_patient) references patients(id),
    unique (id_patient, name)
);

create table appointments (
    id serial primary key,
    created_by int not null,
    modified_by int null,
    id_profesional int not null,
    id_patient int not null,
    id_treatment int null,
    date_time timestamp not null,
    duration time not null,
    description varchar(300) null,
    status int not null default 0,
    created_at timestamp not null default current_timestamp,
    updated_at timestamp null,
    constraint fk_appointments_created foreign key (created_by) references users(id),
    constraint fk_appointments_modified foreign key (modified_by) references users(id),
    constraint fk_appointments_profesionals foreign key (id_profesional) references users(id),
    constraint fk_appointments_patients foreign key (id_patient) references patients(id),
    constraint fk_appointments_treatment foreign key (id_treatment) references treatments(id),
    unique (id_profesional, date_time)
);

create table reminders (
    id serial primary key,
    created_by int not null,
    modified_by int null,
    id_profesional int not null,
    id_patient int null,
    date_time timestamp not null,
    description varchar(300) null,
    created_at timestamp not null default current_timestamp,
    updated_at timestamp null,
    constraint fk_reminders_created foreign key (created_by) references users(id),
    constraint fk_reminders_modified foreign key (modified_by) references users(id),
    constraint fk_reminders_profesionals foreign key (id_profesional) references users(id),
    constraint fk_reminders_patients foreign key (id_patient) references patients(id)
);

create table exceptions (
    id serial primary key,
    created_by int not null,
    modified_by int null,
    id_profesional int null,
    start_date_time timestamp not null,
    end_date_time timestamp not null,
    description varchar(300) null,
    created_at timestamp not null default current_timestamp,
    updated_at timestamp null,
    constraint fk_exceptions_created foreign key (created_by) references users(id),
    constraint fk_exceptions_modified foreign key (modified_by) references users(id),
    constraint fk_exceptions_profesionals foreign key (id_profesional) references users(id)
);

insert into charges (description) values
('Administrador'), ('Médico'), ('Cirujano'), ('Enfermero'), ('Secretario');

insert into roles (description)
values ('User'), ('Admin');

insert into users (username, password, names, surnames, mail, phone, id_charge, id_role) values
('admin', '$2a$10$3xgONQ80GE5oPhTX4Mc4huakytpPD0G.Md/TjxARQaUzlp1rPtPvS', 'Adam', 'Administrador', 'admin@mail.com', '+5493764123456', 1, 2),
('motta', '$2a$10$3xgONQ80GE5oPhTX4Mc4huakytpPD0G.Md/TjxARQaUzlp1rPtPvS', 'Gustavo', 'Motta', 'motta@mail.com', '+5493764334455', 1, 1),
('rafael', '$2a$10$3xgONQ80GE5oPhTX4Mc4huakytpPD0G.Md/TjxARQaUzlp1rPtPvS', 'Rafael', 'Fernandes', 'zakk@mail.com', '+5493764778899', 1, 1),
('rodrigo', '$2a$10$3xgONQ80GE5oPhTX4Mc4huakytpPD0G.Md/TjxARQaUzlp1rPtPvS', 'Rodrigo', 'Manarino', 'pino@mail.com', '+5493764778899', 1, 1);