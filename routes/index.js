const router = require('express').Router();
const library = require('../book');

router.get('/', async (req, res) => {
    let books = await library.myLibrary;
    
    console.log(books);

    res.render('home', { books });
})

router.post('/addBook', async (req, res) => {
    await library.addBookToLibrary(req.body.bookTitle, req.body.bookAuthor, req.body.bookPages)

    res.redirect('/');
})

router.get('/delete/:_id', async (req, res) => {
    let books = await library.myLibrary;
    let index = books.indexOf(req.params._id);
    await library.removeFromLibrary(index);
    res.redirect('/');
})

router.get('/update/:_id', async (req, res) => {
    let books = await library.myLibrary;
    let foundBook = books.find(book => book.id === req.params._id);

    console.log(foundBook);
    res.render('home', { foundBook });
})

module.exports = router