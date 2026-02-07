/*
    server start hota h

    command line for starting server:
        - node server.js
        - problem with node server.js, run server again and again manually, to use the changes in code.
        
        - solution: 
            - npx nodemon server.js, run server again and again automatically.
            - problem with npx nodemon server.js, for production we can't run this script in terminal.
            
            - solution:
                - open package.json file.
                - find "scripts" keyword
                - add "dev" : "npx nodemon server.js"
                - key -> "dev" and value -> "npx nodemon server.js"
                - In terminal command -> npm run dev
*/

const app = require('./src/app.js');

app.listen(3000, () => {
    console.log("server is running on port 3000");
})