begin;

	select _versioning.migrate(1);

	create table stores (
		id bigserial not null primary key,
		name varchar not null constraint name_len check (length(name) > 0),
		description text not null,
		onlineshop boolean not null default false,
		website_url varchar constraint website_len check (website_url is null or length(website_url) > 0),
		email varchar not null,
		phone varchar constraint phone_len check (phone is null or length(phone) > 0),
		address varchar not null constraint address_len check (length(address) > 0),
		zip varchar not null constraint zip_len check (length(zip) > 0),
		city varchar not null constraint city_len check (length(city) > 0)
	);

commit;
