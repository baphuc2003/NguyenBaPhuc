# CRUD MANAGEMENT PRODUCT

## Table of contents

[I. Introduction](#introduction)

- [1. List API](#listapi)
- [2. Install](#install)
- [3. Run app](#runapp)

<a name="introduction"></a>

## I. Introduction

## List API CRUD:

**Create a new product with method POST http://localhost:4000/product/create-new-a-product**
**Get all products with method GET http://localhost:4000/product/get-all-product**
**Get product by ID with method GET http://localhost:4000/product/get-product/:id**
**Update product by ID with method PUT http://localhost:4000/product/update-product/:id**
**Delete product by ID with method DELETE http://localhost:4000/product/delete-product/:id**

<a name="install"></a>

## II. Install

Create a project Node.js(v16.20.1)

> npm init -y

Add TypeScript as a dev dependency

> npm install typescript --save-dev

Install TypeScript data types for Node.js

> npm install @types/node --save-dev

Install express

> npm i express
> npm i @types/express

Install the remaining necessary config packages

> npm install eslint prettier eslint-config-prettier eslint-plugin-prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser ts-node tsc-alias tsconfig-paths rimraf nodemon --save-dev

Install body-parser

> npm i body-parser
> npm i @types/body-parser

Install dotenv

> npm i dotenv

Install lodash

> npm i lodash
> npm i @types/lodash

Install express-validator

> npm i express-validator

Install mongodb

> npm i mongodb

<a name="runapp"></a>

## III. Run app

Step 1:

> cd folder server

Step 2:

> npm run dev
