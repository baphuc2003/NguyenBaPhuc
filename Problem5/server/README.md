# CRUD MANAGEMENT PRODUCT

## Table of contents

[I. Introduction](#introduction)

- [1. List API](#listapi)
- [2. Install](#install)
- [3. Run app](#runapp)
- [4. Test API by Postman](#test)

<a name="introduction"></a>

## I. Introduction

## List API CRUD and API user:

`Create a new product with method POST http://localhost:4001/product/create-new-a-product` <br>
`Get all products with method GET http://localhost:4001/product/get-all-product.` <br>
`Get product by ID with method GET http://localhost:4001/product/get-product/:id.` <br>
`Update product by ID with method PUT http://localhost:4001/product/update-product/:id.` <br>
`Delete product by ID with method DELETE http://localhost:4001/product/delete-product/:id.` <br>

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

<a name="runapp"></a>

## III. Run app

Step 1:

> cd folder server

Step 2:

> npm run dev

<a name="test"></a>

## IV. Test API by Postman

### Note: Must have a user account and log in to receive AccessToken.

#### For example

- Register for new a user. <br>

`Method : POST` <br>
`Url : http://localhost:4001/user/register` <br>
`Body : {
  firstName : Nguyen,
  lastName : Ba Phuc,
  email : abc10@gmail.com,
  password : @Phuc123,
  sex : male
}`

- Login user. <br>

  `Method : POST` <br>
  `Url : http://localhost:4001/user/login` <br>
  `Body : {
  email : abc10@gmail.com,
  password : @Phuc123
}`

- Create new a product. <br>

  `Method : POST` <br>
  `Url : http://localhost:4001/product/create-new-a-product` <br>
  `Authorization : Bearer your_accesstoken` <br>
  `Headers : {user_id : ???}`<br>
  `Body : {
   name : ???,
   price : ???,
   description : ???,
   model : ???,
}`<br>
  `Note: user_id == _id document of user in database or when you log in, the result returned will have user_id`

- Get all product. <br>

  `Method : GET` <br>
  `Url : http://localhost:4001/product/get-all-product` <br>
  `Authorization : Bearer your_accesstoken` <br>
  `Headers : {user_id : ???}`<br>
  `Note: user_id == _id document of user in database or when you log in, the result returned will have user_id`

- Get product with id <br>

  `Method : GET` <br>
  `Url : http://localhost:4001/product/get-product/:id` <br>
  `Authorization : Bearer your_accesstoken` <br>
  `Headers : {user_id : ???}`<br>
  `Note: user_id == _id document of user in database or when you log in, the result returned will have user_id`

- Update a product with id<br>

  `Method : UPDATE` <br>
  `Url : http://localhost:4001/product/update-product/:id` <br>
  `Authorization : Bearer your_accesstoken` <br>
  `Headers : {user_id : ???}`<br>
  `Body : {
  name : ???,
  price : ???,
  description : ???,
  model : ???
}` <br>
  `Note: user_id == _id document of user in database or when you log in, the result returned will have user_id`

- Delete a product with id<br>

  `Method : DELETE` <br>
  `Url : http://localhost:4001/product/delete-product/:id` <br>
  `Authorization : Bearer your_accesstoken` <br>
  `Headers : {user_id : ???}`<br>
  `Note: user_id == _id document of user in database or when you log in, the result returned will have user_id`
