CREATE DATABASE newdatabase

-- CREATE TABLE productinfo (
--     id serial primary key,
--   	name text not null,
--     chairUpper text not null,
--   	chairLower text not null, 
--   	buttonsUpper text not null, 
--   	buttonsLower text not null, 
--   	frame text not null, 
--   	backing text not null
-- );

CREATE TABLE newdesigninfo (
    id serial primary key,
  	name text not null,
    item text not null,
  	chairPart text not null, 
  	colour text not null
);


insert into newdesigninfo (name, item, chairPart, colour)
values ('Watermelon', 'barcelonaChair', 'chairUpper', '#ffffff');

SELECT * FROM newdesigninfo

