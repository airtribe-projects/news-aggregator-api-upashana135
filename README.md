[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=18807726&assignment_repo_type=AssignmentRepo)


NEWS-AGGREGATOR-API-UPASHANA135
---------------------------------------
In this project, multiple API endpoints have been developed to manage user-related operations. The user data is securely stored in a MongoDB database, where various database operations are performed. For enhanced security, user passwords are hashed before being saved in the database.

To ensure secure access to protected resources, JWT (JSON Web Token) authentication is implemented, allowing only authorized users to perform database operations. Additionally, the project integrates an external News API, which is fetched using Axios to provide real-time news updates.

This system ensures both security and efficiency, combining authentication, data management, and external API integration to deliver a seamless user experience. 

📌 Features
Register an User: An user is registered with name, email, password and news preferences.
Login an user: A registered user can logged in using email & password. A token will be generated after login.
Get user preferences: Retrive details of all the news preferences of the user. The user is authorized using the token.
Update user preferences: Update the preferences of the user. The user is authorized using the token.
Get the news headers: Get the news headers from an external API endpoint based on the preferences of the user.

🚀 Getting Started
1. Install dependencies by "npm install"
2. Run "npm run test" to check the test cases.
3. Run "node server.js" to check the api endpoints in the postman.

API Endpoints
------------------
1. Method: post
   Endpoint: /users/signup
   Description: Register an user.

2. Method: post
   Endpoint: /users/login
   Description: Logged in an user

3. Method: get
   Endpoint: /users/preferences
   Description: Get user preferences. 

4. Method: put
   Endpoint: /users/preferences
   Description: Update user preferences.

5. Method: get
   Endpoint: /news
   Description: Get the news from an external api endpoint based on the user preferences.

🛠 Testing API Endpoints in Postman
1. Open Postman.
2. Enter the API URL as mentioned above.
3. Select the HTTP Method as mentioned above. 
4. Click "Send" to test the request.
5. View Response in the Postman window.
