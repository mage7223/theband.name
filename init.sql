//create simple table
create table band_names(
    id serial primary key,
    band_name character varying(255) not null unique,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updates_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

create table users(
    id serial primary key,
    email character varying(255) UNIQUE NOT NULL,
    created_ad timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL);

