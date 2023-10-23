## Requirements

Requirements Windows:
- wampp64
- npm
- nodeJS

Requirements Linux/MacOS:
- mySQL
- npm
- nodeJS

## Installation/Usage

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

## Todo List

Frontend       | Progression | Comment
-------------  | ----------- | ------------------------------------------------------------
<img width=200/>|<img width=500/>
HomePage       | ✅          | -
Light / Dark mode   | ✅       | -
CollaboratorPage | In progress | Display just the collection atm 
ProfilePage    | In progress | Display some informations and need design 
ProjectsPage   | In progress | Display the informations and need design
Loader    | To do | Check if BE is ok or not

<br><br><br>

Backend        | Progression | Comment
-------------  | ----------- | ------------------------------------------------------------
<img width=200/>|<img width=500/>
Auth           | ✅          | -
Users          | ✅ | - 
Projects       | ✅ | -
Job            | ✅       | - 
loggedUser           | In progress          | Provide informations through profilepage
Docker         | In progress | Need to solve the errors 
Roles          | To do       | Need to make the backend 
JobField       | To do       | Need to make the backend
Method add job to user       | To do       | Need to make the backend
allUsersfromSameJob       | To do       | Need to make the backend
EditProfile       | To do       | Adapt User entity with edit profile fields + create patch method

<br><br><br>

Backlog       | ID | Description
-------------  | ----------- | ------------------------------------------------------------
<img width=200/>|<img width=500/>
EnvConfig       | 02          | Need to make configuration with .env for DB connexion  

PlotlyJS


