# TEST-API
I have created various API Endpoints to perform the following operations on the data models such as Accounts and Transactions stored in MongoDB as collections.

API functions:
- Get a User Account and its current balance based on the user ID
- A transaction that send tokens from a User Account 
- Recieve tokens to a User Account through a transcation
- Update a User Accounts status field in the database
 
I have Node.js as the runtime environment and Mongoose Library for Object Data Modeling in MongoDB. I have implemeted Optimistic Concurrency to ensure that multiple users make changes to User data.   
