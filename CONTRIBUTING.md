<h1>Prerequisites</h1>
 <ul>
    <li>Docker/Docker Compose</li>
    <li>Node.js</li>
 </ul>

<h1>Steps</h1>
<ul>
 <li>Clone repo - git clone https://github.com/ShaneC0/recallAPI</li>
  

<li>Run npm install - npm i</li>
  

<li>Copy example.env to a proper .env and fill in values - cp env.example .env</li>


<li>Build js from ts - tsc OR npm run watch</li>
  

<li>Run docker compose - docker-compose up -d</li>
  
  
<li>Run the app - npm run dev</li>
  
</ul>
    
IF ADDING OR REMOVING ENVIRONMENT VARIABLES
  - npm run gen-env
