--Data Base: miglenest
CREATE DATABASE miglenest;
\c miglenest

-- Table: user
CREATE TABLE normalUser (
    id_user SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    creation_date TIMESTAMP,
    profile_img TEXT DEFAULT 'default.png',
    background TEXT DEFAULT 'default.png',
    description VARCHAR(300)
);
-- Table: administrator
CREATE TABLE administrator (
    id_administrator SERIAL PRIMARY KEY,
    id_user INT NOT NULL REFERENCES normalUser(id_user) ON UPDATE CASCADE
);

-- Table: follower
CREATE TABLE follower (
    follower INT REFERENCES normalUser(id_user),
    followed INT REFERENCES normalUser(id_user),
    creation_date TIMESTAMP,
    PRIMARY KEY (follower, followed)
);


-- Table: category
CREATE TABLE category (
    id_category SERIAL PRIMARY KEY,
    category_name VARCHAR(50)
);


-- Table: post
CREATE TABLE post (
    id_post SERIAL PRIMARY KEY,
    title VARCHAR(100),
    description VARCHAR(300),
    creation_date TIMESTAMP,
    fyle text,
    typeFile text,
    id_category INT REFERENCES category(id_category),
    id_user INT REFERENCES normalUser(id_user)

);

-- Table: "like"
CREATE TABLE likes (
    id_user INT REFERENCES normalUser(id_user),
    id_post INT REFERENCES post(id_post),
    creation_date TIMESTAMP,
    PRIMARY KEY (id_user, id_post)

);

-- Table: comment
CREATE TABLE comment (
    id_comment SERIAL PRIMARY KEY,
    content TEXT,
    creation_date TIMESTAMP,
    id_user INT REFERENCES normalUser(id_user),
    id_post INT REFERENCES post(id_post)

);

ALTER TABLE likes
ALTER COLUMN creation_date SET DEFAULT CURRENT_TIMESTAMP;
