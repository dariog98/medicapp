drop database if exists medicapp;
-- start transaction;
-- rollback;
create database medicapp;
-- show tables;
use medicapp;

-- Tablas
create table charges (
    id int auto_increment primary key,
    description varchar(20) not null unique
);

create table roles (
    id int auto_increment primary key,
    description varchar(20) not null unique
);

create table users (
    id int auto_increment primary key,
    username varchar(15) not null unique,
    password varchar(60) not null,
    names varchar(50) null,
    surnames varchar(50) null,
    mail varchar(50) not null unique,
    phone varchar(20) null,
    idCharge int null,
    idRole int null,
    isDeleted boolean not null default 0,
    constraint fk_users_charges foreign key (idCharge) references charges(id),
    constraint fk_users_roles foreign key (idRole) references roles(id)
);

create table patients (
    id int auto_increment primary key,
    names varchar(50) not null,
    surnames varchar(50) not null, 
    dni varchar(20) not null unique,
    birthdate date not null,
    mail varchar(50) null unique,
    phone varchar(20) null,
    address varchar(150) null 
);

create table notes (
    id int auto_increment primary key,
    idPatient int not null,
    content mediumtext not null,
    createdBy int not null,
    modifiedBy int null,
    createdAt timestamp not null default current_timestamp,
    updatedAt timestamp not null default current_timestamp,
    constraint fk_notes_created foreign key (createdBy) references users(id),
    constraint fk_notes_modified foreign key (modifiedBy) references users(id),
    constraint fk_notes_patients foreign key (idPatient) references patients(id)
);

create table files (
    id int auto_increment primary key,
    name varchar(150) not null,
    filename varchar(23) not null,
    description varchar(300) null,
    createdBy int not null,
    modifiedBy int null,
    type varchar(10) not null default 'other',
    idPatient int not null,
    createdAt timestamp not null default current_timestamp,
    updatedAt timestamp not null default current_timestamp,
    constraint fk_files_created foreign key (createdBy) references users(id),
    constraint fk_files_modified foreign key (modifiedBy) references users(id),
    constraint fk_files_patients foreign key (idPatient) references patients(id),
    unique key files_unique_patient_name (idPatient, name)
);

create table treatments (
    id int auto_increment primary key,
    idProfesional int not null,
    description varchar(300) not null,
    price float not null default 0,
    constraint fk_treatments_profesionals foreign key (idProfesional) references users(id),
    unique key treatments_unique_profesional_description (idProfesional, description)
);

create table turns (
    id int auto_increment primary key,
    createdBy int not null,
    modifiedBy int null,
    idProfesional int not null,
    idPatient int not null,
    idTreatment int null,
    dateTime datetime not null,
    duration time not null,
    description varchar(300) null,
    status int not null default 0,
    createdAt timestamp not null default current_timestamp,
    updatedAt timestamp null,
    constraint fk_turns_created foreign key (createdBy) references users(id),
    constraint fk_turns_modified foreign key (modifiedBy) references users(id),
    constraint fk_turns_profesionals foreign key (idProfesional) references users(id),
    constraint fk_turns_patients foreign key (idPatient) references patients(id),
    constraint fk_turns_treatment foreign key (idTreatment) references treatments(id),
    unique key turns_unique_idProfesional_dateTime (idProfesional, dateTime)
);

create table exceptions (
    id int auto_increment primary key,
    createdBy int not null,
    modifiedBy int null,
    idProfesional int null,
    startDateTime datetime not null,
    endDateTime datetime not null,
    description varchar(300) null,
    createdAt timestamp not null default current_timestamp,
    updatedAt timestamp null,
    constraint fk_exceptions_created foreign key (createdBy) references users(id),
    constraint fk_exceptions_modified foreign key (modifiedBy) references users(id),
    constraint fk_exceptions_profesionals foreign key (idProfesional) references users(id)
);

create table reminders (
    id int auto_increment primary key,
    createdBy int not null,
    modifiedBy int null,
    idProfesional int not null,
    idPatient int null,
    dateTime datetime not null,
    description varchar(300) null,
    createdAt timestamp not null default current_timestamp,
    updatedAt timestamp null,
    constraint fk_reminders_created foreign key (createdBy) references users(id),
    constraint fk_reminders_modified foreign key (modifiedBy) references users(id),
    constraint fk_reminders_profesionals foreign key (idProfesional) references users(id),
    constraint fk_reminders_patients foreign key (idPatient) references patients(id)
);

-- Vista que une turnos y excepcions
create view turns_and_exceptions as (
    select id, idProfesional, 'turn' as type, dateTime as startDateTime, ADDTIME(dateTime, duration) as endDateTime
    from turns
    union
    select id, idProfesional, 'exception' as type, startDateTime, endDateTime
    from exceptions
);

drop trigger if exists controlTurnInsert;
delimiter //
create trigger controlTurnInsert before insert on turns
for each row
if exists(
	select id from turns_and_exceptions as te
	where te.idProfesional = new.idProfesional and 
	(
		(new.dateTime < te.startDateTime and ADDTIME(new.dateTime, new.duration) > te.startDateTime) or
		(ADDTIME(new.dateTime, new.duration) >= te.endDateTime and new.dateTime < te.endDateTime) or
		(new.dateTime >= te.startDateTime and ADDTIME(new.dateTime, new.duration) <= te.endDateTime)
	)
) then
	signal sqlstate '50001' set MESSAGE_TEXT = 'The turn can not be inserted. The schedule is busy.';
end if; //
delimiter ;

drop trigger if exists controlTurnUpdate;
delimiter //
create trigger controlTurnUpdate before update on turns
for each row
if exists(
	select id from turns_and_exceptions as te
	where not (te.id = new.id and te.type = 'turn')
	and te.idProfesional = new.idProfesional and
	(
		(new.dateTime < te.startDateTime and ADDTIME(new.dateTime, new.duration) > te.startDateTime) or
		(ADDTIME(new.dateTime, new.duration) >= te.endDateTime and new.dateTime < te.endDateTime) or
		(new.dateTime >= te.startDateTime and ADDTIME(new.dateTime, new.duration) <= te.endDateTime)
	)
) then
	signal sqlstate '50001' set MESSAGE_TEXT = 'The turn can not be updated. The schedule is busy.';
end if; //
delimiter ;

drop trigger if exists controlExceptionInsert;
delimiter //
create trigger controlExceptionInsert before insert on exceptions
for each row
if exists(
	select id from turns_and_exceptions as te
	where te.idProfesional = new.idProfesional and 
	(
		(new.startDateTime < te.startDateTime and new.endDateTime > te.startDateTime) or
		(new.endDateTime >= te.endDateTime and new.startDateTime < te.endDateTime) or
		(new.startDateTime >= te.startDateTime and new.endDateTime <= te.endDateTime)
	)
) then
	signal sqlstate '50001' set MESSAGE_TEXT = 'The exception can not be inserted. The schedule is busy.';
end if; //
delimiter ;

drop trigger if exists controlExceptionUpdate;
delimiter //
create trigger controlExceptionUpdate before update on exceptions
for each row
if exists(
	select id from turns_and_exceptions as te
	where not (te.id = new.id and te.type = 'exception')
	and te.idProfesional = new.idProfesional and
	(
		(new.startDateTime < te.startDateTime and new.endDateTime > te.startDateTime) or
		(new.endDateTime >= te.endDateTime and new.startDateTime < te.endDateTime) or
		(new.startDateTime >= te.startDateTime and new.endDateTime <= te.endDateTime)
	)
) then
	signal sqlstate '50001' set MESSAGE_TEXT = 'The exception can not be updated. The schedule is busy.';
end if; //
delimiter ;

-- Datos solo para testeo
insert into roles (description)
values ("User"), ("Admin");

insert into charges (description)
values ("Administrador"), ("Médico"), ("Cirujano"), ("Enfermero"), ("Secretario");

insert into users (username, password, names, surnames, mail, phone, idCharge, idRole)
value
("admin", "$2a$10$3xgONQ80GE5oPhTX4Mc4huakytpPD0G.Md/TjxARQaUzlp1rPtPvS", "Adam", "Administrador", "admin@email.com", "+5493764123456", 1, 2);