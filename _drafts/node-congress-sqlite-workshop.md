# SQLite from inside out

Brownbag: Everything You should know about Node.JS bult-in SQLite module, by Edy
Node.JS SQLite: internals, externals and all the things in between, by Edy
SQLite built-in support in Node.js: Zero Dependencies, Full Power, by Edy
SQLite Node.js built-in support: Zero Dependencies, Full Power, by Edy

## SQLite Renaissance

- SQLite is having a comeback
- SQLite in: turso, ruby on rails and node.js

- https://x.com/dhh/status/1782033353606382011
- https://www.youtube.com/watch?v=0rlATWBNvMw

## What is SQLite good for?

- embedded and mobile applications

- https://www2.sqlite.org/cvstrac/wiki?p=BigNameUsers
- https://sqlite.org/whentouse.html

## The `node:sqlite` module

- Why was it created?

https://github.com/nodejs/node/issues/53264

### Features

#### Basics

#### Statements

#### Session - changesets and patchsets

#### User defined functions

#### Aggregate and window functions

#### Backup

Great question — on the surface it seems like copying the SQLite database file should be enough. After all, it's just a file. But the truth is, using the Backup API is way safer and more robust than just copying the file.

Feature	File Copy (cp)	SQLite Backup API
Database lock awareness	❌ Can copy a partially-written file	✅ Works with live database (even in use)
Corruption risk	❌ High if copied during write transaction	✅ None – uses safe snapshot technique
Incremental backup	❌ Always full copy	✅ Can be done in chunks (low impact)
Can run inside app logic	❌ External shell process	✅ Yes – you can trigger it programmatically
Backup while online	❌ Dangerous without closing DB	✅ Designed for live backups



### Future

- Async API?
- Optimizations


# References

- https://highperformancesqlite.com/
https://www.bmpi.dev/en/dev/renaissance-sqlite/

---

# Script
