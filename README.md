# Book-Record-Management-System
>> server

Storing Book Data.
User Registration.
Subscription.

## Routes and Endpoints.

# /users
GET: Get all list of users.
POST: Create a new user.

# /users/{id}
GET: Get a user by their ID.
PUT: Update a user by ID.
DELETE: Delete a user By ID.(check he/she still have an issued book) && (is there any fine to be collected from him/her)
# Subscription Types:
3 months.(Basic Subscription)
6 months.(Standard Subscription)
12 months.(Premium Subscription)
# /users/subscription-details{id}.
GET: Get users subscription details.

Data of Subscriptions.
Valid Till.
Fine if any.
## Book details.
# books/
GET: Get all books.
POST: Create/Add a new Book to a system.
# /books/{id}
GET: Get a book by ID.
PUT: Update a by its ID.
# /books/issued.
GET: Get all issued books.
# /books/issued/withFine
GET: Get all issued book with fine.
# Fine Calculation.
If the user has an issued book and issued book is to be returned at 1/01/2024. If he missed the date of renewal/return, then he needs to pay a penalty of Rs. 100/-

If the user has an issued book and issued book is to be returned at 1/01/2024. If he missed the date of renewal/return and his subscription also expires, then he needs to pay a penalty of Rs. 200/-

# commands:
npm init
npm i express
npm i nodemon--save-dev
# Run Command
npm run dev

