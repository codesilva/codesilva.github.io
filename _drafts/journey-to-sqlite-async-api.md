ref: notes-sqlite-async-implementation.md

we need an async api for cases in which people have multiple databases or things like that (see the issue)

my plan is to get operations separated in two categories:

- pure sqlite operations
- v8/nodejs things (using Local<T> things)

sqlite module was created as sync so, adding async capabilities is a taks that involves changing some internals.

we have baiscally the following operations

- DatabaseSync
  - DatabaseSync.prototype.exec
- StatementSync (returned by DatabaseSync.prototype.prepare)
  - StatementSync.prototype.run
  - StatementSync.prototype.get
  - StatementSync.prototype.all

My plan is to get a classe callse Statement which can handle both sync and async depending on a flag. For that it will leverage another class which I'm calling `SQLiteAsyncWork`.

Fo, let's say the `run` method. The SQLite part should be separated into a single method. Thus both async and sync can
call it. The async one will use the `SQLiteAsyncWork` to schedule the work in a thread pool, the sync one will do
a regular call.

Honestly, I didn't think too much about the public interface. I'm not sure if there will be `Database` class that will
return a `Statement` object with the `async` flag set to true or anything elese. That's something I want to discuss in
the PR.

For now, I'm just passing a second parameter to the `DatabaseSync.prototype.prepare` method to indicate if the
`Statement` should be async or not.

> noticed that some, even though calling sqlite functions cannot be put in the thread pool. in the bind part, for example, it is directly interacting with the Isolate. So, it has to be done in the main thread.
> i think it is not that bad since it does not do anything heavy or I/O.

I just realized that the backup job is, indeed, a sqliteasyncwork operation... maybe we can do this
