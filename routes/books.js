const express = require("express");

const { books } = require("../data/books.json");
const { users } = require("../data/users.json");
const router = express.Router();

router.use(express.json());

/*
1. route :/books
    method : get : get all books 
    access : public  
    parameters : none 
*/

router.get("/",(req,res) => {
 return res.status(200).json({success : true, data : books,})
});

/*
1. route :/books/id
    method : get : get books by id 
    access : public  
    parameters : id
*/

router.get("/:id",(req,res) => {
    const {id} = req.params;
    const book = books.find((each) => each.id === id);
    if(!book){
        return res.status(404).json({
            success : false,
            message : "book not find"
        });
    }
    return res.status(200).json({success : true, data : book,});
   });

/*
1. route :/books/issued/books because the previous id route catches the issueed route cause id can be anything
    method : get : get all issued books 
    access : public  
    parameters : none
*/   
router.get("/issued/books",(req,res) => {
    const userswithissuedbook = users.filter((each) => {
        if(each.issuedBook){
            return each;
        }
    });
    const issuedbook = [];
    userswithissuedbook.forEach((each) => {
        const book = books.find((book) => book.id === each.issuedBook);
        book.issuedBy = each.name;
        book.issueddate = each.issuedDate;
        book.returndate = each.returnDate;

        issuedbook.push(book);
    });
    if(issuedbook.length === 0){
        return res.status(404).json({
            success : false,
            message : "no books issued",
        })
    }

    return res.status(200).json({success : true, data : issuedbook,});
   });

/*
1. route :/books
    method : post : create new book 
    access : public  
    parameters : none 
    data : author name genere price publishser id 
*/
router.post("/",(req,res) =>{
    const {data} = req.body;
    if(!data){
        return res.status(400).json({
            success : false,
            message : "no data entered",
        });
    }
    
    const book = books.find((each) => each.id === data.id);
    if(book){
        return res.status(404).json({
            success : false,
            message : "book alreaady exist with the same id",
        });
    }

    const allBooks = [...books, data];

    return res.status(201).json({
        success : true,
        data : allBooks,
    });
});

/*
1. route :/books/:id
    method : put : updatind a book 
    access : public  
    parameters : id
    data : author name genere price publishser id 
*/

router.put("/:id",(req,res) => {
    const {id} = req.params;
    const {data} = req.body;

    const book = books.find((each) => each.id === id);

    if(!book){
        return res.status(404).json({
            success : false,
            message : "books does not exist",
        });
    }
    const updateddata = books.map((each) => {
        if(each.id === id){
            return {...each, ...data};
        }
        return each;
    });
    return res.status(200).json({
        success : true,
        data  : updateddata,
    });

});

//default export 
module.exports = router;