Some stuff will have to remain in the main thread since they interact with the Isolate.
    eg the BindParams which takes the arguments and bind to the sqlite

The sqlite operations will be splitter into an specific namespace?
    ```cpp
    namespace node {
        namespace sqlite {
            namespace operations {
                void StatementRun() {}
                void StatementGet() {}
                void DatabaseExec() {}
            }
        }
    }
    ```

In the above scenario, node::sqlite::operations methods will only contain the IO part, that one which deals with SQLite
itself.

The execution will be like

- get the needed params for the operation (in the main thread)
- schedule work for the thread open to perform the operation providing the work function (the operation) and the after
    function
- returns the promise
- performs the operation in the thread pool calling the `work` function
- after finishing the work in the thread pool, call the `after` function to wrap the result into JS-values in order to
    Resolve or reject the promise

if the operation is made in the sync api, it remains as it is. except that no working schedule is made
