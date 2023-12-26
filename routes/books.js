const express = require("express");

//json data  import
const {books}= require("../data/books.json");
const {users} = require("../data/users.json");

const router = express.Router();

/**
 * Route: /books
 * Method: GET
 * Description: Get all books
 * Access: Public
 * Parameters: none
 */
router.get("/",(req,res)=>{
    res.status(200).json({
        success : true,
        data: books
    })
})

/**
 * Route: /books/:id
 * Method: GET
 * Description: Get all books by its id
 * Access: Public
 * Parameters: Id
 */
router.get("/:id",(req,res)=>{
    const {id} = req.params;
    const book = books.find((each)=> each.id === id)
    if(!book){
      return  res.status(404).json({
            success:false,
            message: "Books Not Found"
        })
    }
    res.status(200).json({
        success: true,
        data: book
    })
})

/**
 * Route: /books/issued
 * Method: GET
 * Description: Get all issued book
 * Access: Public
 * Parameters: none
 */
//here we making relationship with foreign key.
router.get("/issued/books",(req,res)=>{
    const usersWithIssuedBooks =  users.filter((each)=>{
        if(each.issuedBook) {
            return each;
        }
    })
    const issuedBooks =  [];
    usersWithIssuedBooks.forEach((each)=>{
        const book = books.find((book)=> book.id === each.issuedBook);

        book.issuedBy = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;

        issuedBooks.push(book)
    })
    if(issuedBooks.length === 0){
        return res.status(404).json({
            success: false,
            message:"No Issued Book"
        })
    }
    return res.status(200).json({
        success: true,
        data: issuedBooks
    })
})
/**
 * Route: /books/:id
 * Method: POST
 * Description: Create a New Books
 * Access: Public
 * Parameters: none
 */

router.post("/",(req,res)=>{
    const {data} = req.body;
    if(!data){
        return res.status(404).json({
            success:false,
            message: "No Data provided"
        })
    }
    const book= books.find((each)=> each.id === data.id);
     if(book){
        return res.status(404).json({
            success: false,
            message: "Book already exist with the given Id"
        })
    }
    const allBooks = [...books, data]
    res.status(200).json({
        success: true,
        data: allBooks
    })
})

/**
 * Route: /books/:id
 * Method: PUT
 * Description: Update a Book
 * Access: Public
 * Parameters: Id
 */
router.put("/:id",(req,res)=>{
    const{id}= req.params;
    const{data}= req.body;
    const book = books.find((each)=>each.id === id);
    if(!book){
        return res.status(200).json({
            success: false,
            message: "Books not found"
        })
    }
      const updatedBook = books.map((each)=>{
        if(each.id===id){
            return {
                ...each,
                ...data
            };
        }
        return each
    })
    return res.status(200).json({
        success: true,
        data: updatedBook
    })
})

module.exports = router;