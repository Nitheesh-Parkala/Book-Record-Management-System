const {BookModel,UserModel}= require("../models");
const IssuedBook = require("../dtos/book-dtos")
// (req,res)=>{
//     res.status(200).json({
//         success : true,
//         data: books
//     })
// }
exports.getAllBooks = async(req,res)=>{
    const books = await  BookModel.find();
    if(books.length === 0){
        return res.status(404).json({
            success: false,
            message: "No Books Found"
        })
    }
        return  res.status(200).json({
        success : true,
        data: books
    })
};

exports.getSingleBookById = async(req,res)=>{
    const{id}= req.params;

    const book = await BookModel.findById(id);
    if(!book){
        return res.status(404).json({
            success: false,
            message: "Book Not Found with the given Id"
        })
    }
     return  res.status(200).json({
        success : true,
        data: book
    })
}

exports.getAllIssuedBooks = async(req,res)=>{
    const users = await UserModel.find({
           issuedBook: {$exists: true},
    }).populate("issuedBook")

   //DTos(Data Transfer Object )
    const issuedBooks = users.map((each)=> new IssuedBook(each))
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
}

exports.addNewBook = async (req,res)=>{
    const {data} = req.body;

    if(!data){
        return res.status(404).json({
            success:false,
            message: "No Data provided"
        })
    }

    await BookModel.create(data);
    const allBooks = await BookModel.find();
    return res.status(201).json({
        success: true,
        data: allBooks
    })
}
//instead of writing  particular export statement like..
module.exports = {getAllBooks,getSingleBookById}