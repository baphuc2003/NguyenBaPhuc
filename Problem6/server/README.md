# API shows the top 10 user’s scores.

[I. Introduction](#introduction)

- [1. Illustrative diagram](#diagram)
- [2. Install](#install)
- [3. Run server](#runserver)

<a name="diagram"></a>

#### Below is a diagram illustrating the flow of the application when the user interacts with the server.

    +-------------------+        +-------------------------+       +---------------------+
    | Client            |         | API Service             |       | Database            |
    +-------------------+                +-------------------------+       +---------------------+
            |                            |                                        |
            |                            |                                        |
            |Dispatch action(update point)        |                               |
            |--------------------------->|                                        |
            |                            |                                        |
            |                            |Authenticate user(user_id & access_token)
            |                            |--------------------------------------->|
            |                            |                                        |
            |                            |   Update user score                    |
            |                            |<-------------------------------        |
            |                            |                                        |
            |                            |   Broadcast updated scores             |
            |                            |------------------------------->        |
            |                            |                                        |
            |                            |                                        |
            |                            |                                        |
            |     Display updated        |                                        |
            |     scores on scoreboard   |                                        |
            |<---------------------------|                                        |
            |                            |                                        |

<a name="install"></a>

## II. Install

Create a project Node.js(v16.20.1)

> npm init -y

Add TypeScript as a dev dependency

> npm install typescript --save-dev

Install TypeScript data types for Node.js

> npm install @types/node --save-dev

Install express

> npm i express <br>
> npm i @types/express

Install the remaining necessary config packages

> npm install eslint prettier eslint-config-prettier eslint-plugin-prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser ts-node tsc-alias tsconfig-paths rimraf nodemon --save-dev

Install body-parser

> npm i body-parser <br>
> npm i @types/body-parser

Install dotenv

> npm i dotenv

Install lodash

> npm i lodash <br>
> npm i @types/lodash

Install express-validator

> npm i express-validator

Install mongodb

> npm i mongodb

Install jsonwebtoken

> npm i jsonwebtoken <br>
> npm i @types/jsonwebtoken

Install bcrypt

> npm i bcrypt <br>
> npm i @types/bcrypt

Install cors

> npm i cors <br>
> npm i @types/cors

Install socket.io

> npm install socket.io <br>
> npm install --save-optional bufferutil utf-8-validate

<a name="runserver"></a>

## III. Run app

Step 1:

> cd folder server

Step 2:

> npm run dev
