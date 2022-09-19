# TEST-API
I have created various API Endpoints to perform the following operations on the data models such as Accounts and Transactions stored in MongoDB.

API functions:
- Get a User Account and its current balance based on the user ID
- A transaction that can send tokens from a User Account 
- A User Account can recieve tokens through a transaction
- Update a User Account status field in the database
 
I have used Node.js as the runtime environment and Mongoose Library for Object Data Modeling in MongoDB. I have implemeted Optimistic Concurrency to ensure that when multiple try users make changes to User data no conflict occurs. 
The get_information.js file inside the routes folder within the source folder has the main code for all the API functions.
