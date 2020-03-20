begin;
	create schema _versioning;

	create table _versioning.migrations (
		version int unique not null,
		created_at timestamp with time zone not null default now()
	);

	insert into _versioning.migrations (version) values (0);

	create function _versioning.migrate(version int) returns varchar as $$
	declare
		latest_version int;
	begin
		select max(m.version) from _versioning.migrations m into latest_version;
		assert latest_version = version - 1, 'Applied migrations in the wrong order.';
		insert into _versioning.migrations (version) values (version);
		return 'ok';
	end
	$$ language plpgsql;

commit;
