const booksController = (Book) => { 
  
  const getBooks = async (req, res)=>{
    const {query} = req; 
    const response = await Book.find(query);
    res.json(response);
  };
 
  const postBooks = async (req, res) =>{
    const book = new Book(req.body);
    await book.save();
    res.json(book);
  };
 
  const getBookByName = async (req, res) =>{
    const {query} = req;
    console.log(query); 
    const response = await Book.findByName({query});
    res.json(response);
  };
 
  const getBookByAuthor = async (req, res) =>{
    const {query} = req;
    console.log(query); 
    const response = await Book.findByAuthor({query});
    res.json(response);
  };

  const putBook = async (req, res) => { 
    const {body} = req;
    const response = await Book.updateOne({
      _id: req.params.bookId,
    },
    {
      $set: {
        title: body.title,
        genre: body.genre,
        author: body.author,
        read: body.read,
      },
    });
    res.json(response);
  };
   
  const deleteBook = async (req, res) =>{ 
    const id = req.params.bookId;
    await Book.findByIdAndDelete(id);
    res.status(202).json('the book has been deleted.');
  };

  return {getBooks, postBooks, putBook, deleteBook, getBookByName, getBookByAuthor};
};

module.exports = booksController;
