# Summary

<details>
  <summary>Table of Contents</summary>
    <ul>
        <li><a href="#Built-With">Built With</a></li>
        <li><a href="#GetStarted">Get Started</a></li>
        <li><a href="#Requirements">Requirements</a></li>
        <li><a href="#Installation/Usage">Installation / Usage</a></li>
        <li><a href="#Todo-List">Todo list</a></li>
    </ul>
</details>

## Built With <a name="Built-With"></a>

* [![React][React.js]][React-url]
* [![npm][npm.js]][npm-url]
* [![typescript][typescript.js]][typescript-url]
* [![nest][nest.js]][nest-url]


## Get Started <a name="GetStarted"></a>

To get started, clone this repository using the command:
````sh
git@github.com:MarthL/sts.git
````
This project utilizes several libraries such as React, NestJS, TypeORM, Material-UI...

If this is not the case, using the command
````sh
npm install -g @nestjs/cli
````

## Requirements <a name="Requirements"></a>

Requirements Windows:
- wampp64
- npm
- nodeJS

Requirements Linux/MacOS:
- mySQL
- npm
- nodeJS

## Installation / Usage <a name="Installation/Usage"></a>

First, Make sure that mySQL is up and running, then create a database with the name "sts"

```SQL
CREATE DATABASE sts;
USE sts;
```

Next, Run the backend by going into ["./backend"](./backend) and executing the following

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

## Todo List <a name="Todo-List"></a>

Frontend       | Progression | Comment
-------------  | ----------- | ------------------------------------------------------------
<img width=200/>|<img width=500/>
HomePage       | ✅          | -
Light / Dark mode   | ✅       | -
ThemeSaver | ✅   | Should save the state of the load when Refresh
CollaboratorPage | In progress | Display just the collection atm
ProfilePage    | In progress | Must handle error from FE with redlabel error
ProjectsPage   | In progress | Display the informations and need design
Loader    | To do | Implement for Homepage, editProfile...
Pagination | To do | Implement pagination for homepage.
ConfirmModalProfile    | To do | Implement modal to inform user and changes are saved (or not).
Jest    | To do | Implement tests for FE.


<br><br><br>

Backend        | Progression | Comment
-------------  | ----------- | ------------------------------------------------------------
<img width=200/>|<img width=500/>
Auth           | ✅          | -
Users          | ✅ | -
Projects       | ✅ | -
Job            | ✅       | -
loggedUser           | In progress          | Provide informations through profilepage
Docker         | In progress | Need to solve the errors with Ios Env
Roles          | To do       | Need to make the backend
JobField       | To do       | Need to make the backend
Address + CP + zipcode            | ✅       | -
Method add job to user       | ✅       | -
allUsersfromSameJob       | To do       | Need to make the backend
EditProfile       | ✅ | Adapt User entity with edit profile fields + create patch method

<br><br><br>

Backlog       | ID | Description
-------------  | ----------- | ------------------------------------------------------------
<img width=200/>|<img width=500/>
EnvConfig       | 02          | Need to make configuration with .env for DB connexion
Set up Husky       | 03          | Set up Husky and permit people to contribute easily with test before using git on this project

PlotlyJS

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[npm.js]: https://img.shields.io/npm/v/npm.svg?logo=npm
[npm-url]: https://www.npmjs.com/
[typescript.js]: https://img.shields.io/badge/Typescript-0000FF
[typescript-url]: https://www.typescriptlang.org/
[nest.js]: https://img.shields.io/badge/NestJs-FF0000
[nest-url]: https://nestjs.com/
