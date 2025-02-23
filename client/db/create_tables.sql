CREATE TABLE users(
  id integer primary key,
  name text NOT NULL,
  points integer
);

CREATE TABLE tasks(
    id integer primary key,
    name text NOT NULL,
    price integer NOT NULL,
    description text
);

CREATE TABLE rewards(
    id integer primary key,
    name text NOT NULL,
    price integer NOT NULL,
    description text
);