# TEST-API
I have created various Endpoints to psrform the following operations on data models Accounts and Transactions stored in MongoDB as separate collections.
- Get a User Account and its current balance based on the user ID
- A transaction that send tokens from a User Account 
- Recieve tokens to a User Account through a transcation
- Update a User Accounts status field in the database
 
I have Node.js as the runtime environment and Mongoose Library for Object Data Modeling in MongoDB. I have implemeted Optimistic Concurrency to ensure that multiple users make changes to User data.   
