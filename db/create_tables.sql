CREATE TABLE customers(
  id integer primary key NOT NULL,
  username NOT NULL UNIQUE,
  name text NOT NULL,
  points integer
);

ALTER TABLE customers
ADD COLUMN ui_theme text;

CREATE TABLE tasks(
    id integer primary key NOT NULL,
    name text NOT NULL,
    price integer NOT NULL,
    description text
);

CREATE TABLE rewards(
    id integer primary key NOT NULL,
    name text NOT NULL,
    price integer NOT NULL,
    description text
);

CREATE TABLE penalties(
  id integer primary key NOT NULL,
  name text NOT NULL,
  price integer NOT NULL,
  description text
);

CREATE TABLE transaction_item()