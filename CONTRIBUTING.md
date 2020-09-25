<h1>Prerequisites</h1>
 <ul>
    <li>Docker/Docker Compose</li>
    <li>Node.js</li>
 </ul>

<h1>Steps</h1>
* Clone repo
    - git clone https://github.com/ShaneC0/recallAPI

* Run npm install
    - npm i

* Copy example.env to a proper .env and fill in values
    - cp env.example .env

* Build js from ts
    - tsc OR npm run watch

* Run docker compose
    - docker-compose up -d
  
* Run the app
    - npm run dev
    
IF ADDING OR REMOVING ENVIRONMENT VARIABLES
  - npm run gen-env
