
create database miglenest;

\c miglenest

create table usuario(
    id_usuario serial primary key ,
    username varchar(50) unique not null,
    email varchar(255) unique not null,
    password varchar(255) not null,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    profile_img text default 'default.png',
    descripcion varchar (300)
);

create table categoria(
    id_categoria int primary key ,
    nombre_categoria varchar(50)
);

create table post(
    id_post int primary key,
    titulo varchar(100) not null,
    descripcion varchar(100),
    fecha_creacion TIMESTAMP default CURRENT_TIMESTAMP,
    id_usuario int, foreign key (id_usuario) references usuario(id_usuario),
    id_categoria int, foreign key (id_categoria) references categoria(id_categoria)
);

CREATE TABLE likes (
    id_like SERIAL PRIMARY KEY ,
    user_id INT, foreign key (user_id) references usuario(id_usuario),
    post_id INT, foreign key (post_id) references post(id_post),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comentarios (
    id_comentarios SERIAL PRIMARY KEY ,
    contenido TEXT,
    user_id INT, foreign key (user_id) references usuario(id_usuario),
    post_id INT, foreign key (post_id) references post(id_post),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE follows (
    id SERIAL PRIMARY KEY,
    follower_id int, foreign key (follower_id) references usuario(id_usuario),
    followed_id int, foreign key (followed_id) references usuario(id_usuario),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);