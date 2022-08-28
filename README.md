# book_management_system practise project 

this is a book record management API backend for the management of records and books 

# routes and endpoints

## /users
POST : create a new user 
GET : get list of all users ✅

## /users/{id} 
dynamic user -> to get a specific user with a unique value id eg : /user/1
GET : get a user by id ✅
PUT : update a user by id  
DELETE : delete a user by id (check if he /she still has an issued book) (is there any fine to be paid)

## /users/subscriptions-details/{id}
GET : get user subs details 
1. date of subs
2. valid till 
3. fine if any 

## /books
GET : get all the books 
POST : create a new book 

## /books/{id}
GET : get a book by id 
POST : update a book by id 

## /books/issued
GET : get all issued books 


## /books/issued/withfine
GET : all issued books with fine 

# subscription types
Basic (3 months)
statndard (6 months)
premium (12 months)


if the subscription date is 01/08/22
and the subscription type is standard 
the valid till date will be 01/02/23

if he has an issued book and that issued book is to be returned at 01/01/23
and he missed it then he gets  a fine of rs 100

if he has an issued book and that issued book is to be returned at 01/01/23
if he missed it and the subs also expires then he gets  a fine of rs 200