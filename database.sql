create table email_validation_v1 (
	ID SERIAL PRIMARY KEY,
	email_address varchar(100),
	domain varchar(4),
	valid_syntax boolean
);
