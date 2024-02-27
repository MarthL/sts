# Project Management SaaS with React and Nest

## Table of Contents

- [Introduction](#intro)
- [Overview](#overview)
- [Built With](#builtwith)
- [Requirements](#requirements)
- [Get Started](#getstarted)
- [Installation / Usage](#installationusage)


## Introduction <a name="intro"></a>

Welcome to our Project Management Software as a Service (SaaS) built on the powerful combination of React and Nest! This platform is designed to streamline and enhance your project management experience, providing a seamless and efficient workflow for teams of all sizes.

### Overview <a name="overview"></a>

Our SaaS solution brings together the flexibility and interactivity of React on the front end, coupled with the robustness and scalability of Nest on the backend. Whether you're a small startup or a large enterprise, our goal is to empower your team with the tools needed to efficiently plan, collaborate, and execute projects.

## Built With <a name="builtwith"></a>

* [![React][React.js]][React-url]
* [![npm][npm.js]][npm-url]
* [![typescript][typescript.js]][typescript-url]
* [![nest][nest.js]][nest-url]
* [![mui][mui.js]][mui-url]


## Requirements <a name="requirements"></a>

Requirements Windows:
- wampp64
- npm
- nodeJS

Requirements Linux/MacOS:
- mySQL
- npm
- nodeJS



## Get Started <a name="getstarted"></a>

To get started, clone this repository using the command:
````sh
git clone git@github.com:MarthL/sts.git
````

This project using several libraries such as React, NestJS, TypeORM, Material-UI... you'll have to install all of them using npm install

````sh
npm install
````

We recommand you to install globally NestJS in order to be able to use their own CLI.

````sh
npm install -g @nestjs/cli
````
## Installation / Usage <a name="installationusage"></a>

Secondly, you'll have to create a database and setup your .env files in the backend folder. Here is a template of the value you need to fill :

```SQL
CREATE DATABASE NAMEOFTHEDB;
USE NAMEOFTHEDB;
```

.env configuration :

TYPE=mysql
HOST=localhost
PORT=DBPORT
DBUSERNAME=DBUSERNAME
DBNAME=NAMEOFTHEDB
JWT_SECRET=JWTSECRET

You can find in the root foler of this project a sql file. This is a sample of some datas so you can just import it using mySQL. Hence, you'll have already some Projects, Users, etc...

To start the backend, run the following command :  

```sh
# First time install the missing node modules using:
# npm i
npm run start:dev
```

Wait until the backend connects with the database then go to the frontend ["./frontend"](./frontend)
and execute the following commands

```sh
# First time install the missing node modules using:
# npm i
npm run start
```

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[npm.js]: https://img.shields.io/npm/v/npm.svg?logo=npm
[npm-url]: https://www.npmjs.com/
[typescript.js]: https://badgen.net/badge/-/TypeScript?icon=typescript&label&labelColor=blue&color=555555
[typescript-url]: https://www.typescriptlang.org/
[nest.js]: https://img.shields.io/badge/NestJs-FF0000
[nest-url]: https://nestjs.com/
[mui.js]: https://img.shields.io/badge/MUI_Material_UI-007FFF
[mui-url]: https://mui.com/material-ui/getting-started/
