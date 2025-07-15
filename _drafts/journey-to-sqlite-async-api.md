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

---

This is july 14, and today i got a rough implementation of Statement::All. Task deals with everything and returns
a std::vector&lt;Row&gt;

```cpp
using RowArray = std::vector<sqlite3_value*>;
using RowObject = std::vector<std::pair<std::string, sqlite3_value*>>;
using Row = std::variant<RowArray, RowObject>;
```

It's all on top of `sqlite3_value*` returned from `sqlite3_column_value`<sup>[1][],[2][]<sup>.

A dup was needed just to make sure we are dealing with valid values [https://www.sqlite.org/c3ref/value_dup.html](https://www.sqlite.org/c3ref/value_dup.html)

Retrieving the actual values is something I will still do and for that I will use the functions that allows us to
extract type and the value from the `sqlite3_value*` object<sup>[3][]</sup>.

[1]: https://www.sqlite.org/c3ref/column_blob.html
[2]: https://www.sqlite.org/c3ref/value.html
[3]: https://www.sqlite.org/c3ref/value_blob.html

I need to remember that values still have to be freed.

Chagpt gave me a good idea for conversion:

```cpp
for (auto& row : rows) {
    v8::Local<v8::Array> jsRow = v8::Array::New(isolate, row.size());

    for (size_t i = 0; i < row.size(); ++i) {
        sqlite3_value* val = row[i];

        // Convert sqlite3_value to V8 Local<Value>
        v8::Local<v8::Value> v8Value;

        switch (sqlite3_value_type(val)) {
            case SQLITE_INTEGER:
                v8Value = v8::Number::New(isolate, sqlite3_value_int64(val));
                break;
            case SQLITE_FLOAT:
                v8Value = v8::Number::New(isolate, sqlite3_value_double(val));
                break;
            case SQLITE_TEXT:
                v8Value = v8::String::NewFromUtf8(isolate,
                            reinterpret_cast<const char*>(sqlite3_value_text(val)),
                            v8::NewStringType::kNormal).ToLocalChecked();
                break;
            case SQLITE_NULL:
                v8Value = v8::Null(isolate);
                break;
            case SQLITE_BLOB:
                // you might want to handle blobs differently here
                v8Value = v8::Undefined(isolate);
                break;
        }

        // Add to JS array
        jsRow->Set(context, static_cast<uint32_t>(i), v8Value).Check();

        // Immediately free the sqlite3_value after converting
        sqlite3_value_free(val);
    }

    // You could push jsRow into a result JS array here
    resultArray->Set(context, resultArray->Length(), jsRow).Check();
}

// Now, after all rows processed:
rows.clear();  // clear vector of vectors (no need to free sqlite3_value* again — already freed)
```

    TL;DR:
    Fetch and dup values → sqlite3_value_dup()

    Convert on V8 thread:

    For each value: sqlite3_value_type(), sqlite3_value_*(), create Local<Value>

    Immediately free with sqlite3_value_free()

    After all rows: rows.clear()

    This is the cleanest, idiomatic, and resource-safe way to bridge SQLite → C++ → V8
