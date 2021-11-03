# g2i-node

- The Project is built using express on node-js
- Database mongodb and Redis for caching

- clone the project and follow the steps below
- Please check `.example.env` for `.env` sample input

- to start the project using yarn package manager:
    ```
    - run the `docker-compose up` command before starting project (so as to enable `mongo` and `redis` connection)

        run : 
            - yarn // to install dependencies
            - yarn start // to start local server
            or
            - DEBUG=g2i-node:server node ./bin/www // to see more debug logs


    ```
- to start the project using docker-compose:
    ```
        run: docker-compose up -d // listen for app on port 3030

        ### OR 

        run: 
            - yarn // to install dependencies
            - yarn start:docker // to run docker-compose up -d
            - yarn stop:docker // to stop the running docker-compose process

        listen:
            - on port 3030 for your local endpoint testing
    ```

# Testing the paths

- GET `/acronym?from=50&limit=10&search=:search`:
    - When testing this endpoint it creates a `token` which is also sent back with the response
    - You are required to provide the `token` when making a `PUT (update)` and `DELETE request`
    - If the `query-strings` as specified are not provided, you get an error:
        ```
        {
            "error": "Bad Request",
            "message": "Bad URL string"
        }
        ```

- POST `/acronym`:
    - When testing this endpoint it creates a `token` which is also sent back with the response
    - You are required to provide the `token` when making a `PUT (update)` and `DELETE request`
    - This `request` requires a `body` with: 
        ```
            {
                "acronym":string,
                "description":string
            }
        ```
    - If the `body` is empty or not provided, you get an error:
        ```
        {
             "error": "Bad Request",
             "message": "empty request body"
        }
        ```

- The following request below requires Authorization headers. If not provided, you'll get an Error:
    ```
    {
        "error": "Unauthorized",
        "message": "user not Authorized"
    }
    ```

- PUT /acronym/:acronym :
    - When testing this endpoint it takes a `header` you're required to provide the `token` gotten from either `PUT` or `GET` `request`:
    ```
    - headers: Authorization: Bearer **token**
    ```
    - This`request` requires a `body` with: 
        ```
            {
                "description":string
            }
        ```
        and an acronym id attached to the URL params: as `baseURL/acronym/:id`
    - If the `body` is empty or not provided or params `id` is not provided, you get an error:
        ```
        {
             "error": "Bad Request",
             "message": "empty request body/params"
        }
        ```
    - To confirm if an acronym was updated, you'll have to wait for 1 min since it was cached for GET / route. (You can change the timing in the env section - in seconds)

- DELETE /acronym/:acronym;
    - When testing this endpoint it takes a `header` you're required to provide the `token` gotten from either `PUT` or `GET` `request`:
    ```
    - headers: Authorization: Bearer **token**
    ```
    - This`request` requires an acronym id attached to the URL params: as `baseURL/acronym/:id`
    - If the `id` is not provided, you get an error:
        ```
        {
             "error": "Bad Request",
             "message": "empty request params"
        }
        ```
    - To confirm if an acronym was deleted, you'll have to wait for 1 min since it was cached for GET / route. (You can change the timing in the env section - in seconds)