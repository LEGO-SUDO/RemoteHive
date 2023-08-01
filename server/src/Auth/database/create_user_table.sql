-- CREATE DATABASE remotehive;

-- CREATE TABLE users (
--     id SERIAL PRIMARY KEY,
--     firstname VARCHAR(30),
--     lastname VARCHAR(30),
--     username VARCHAR(30) NOT NULL UNIQUE,
--     email VARCHAR(100) NOT NULL UNIQUE,
--     password VARCHAR(100) NOT NULL,
--     role VARCHAR(100),
--     avatar VARCHAR(200)
-- );

INSERT INTO users (firstname, lastname, username, email, password, role)
VALUES ('nakul', 'singh', 'lego', 'lego@gmail.com', 'lego', 'admin');