CREATE TABLE users (
    id serial PRIMARY KEY, 
    username VARCHAR ( 50 ) UNIQUE NOT NULL, 
    roles json,
    password VARCHAR ( 50 ) NOT NULL,
    salt VARCHAR ( 50 ) NOT NULL,
    email VARCHAR ( 255 ) UNIQUE NOT NULL, 
    created_on TIMESTAMP NOT NULL, 
    last_login TIMESTAMP
);