const router = require('express').Router()
const {Employee, Customer, Bookrent, Book} = require('../models')

router.get('/', (req, res) => {
    Book.findAll()
    .then( (allBook) => {
        res.render('list.ejs', {
            books: allBook
        })
    })
    .catch( (err) => {
        res.send(err)
    })
})

router.post('/edit/:bookId', (req, res) => {
    Book.findByPk(Number(req.params.bookId))
    .then( (oneBook) => {
        res.render('editBook.ejs', {
            book: oneBook
        })
    })
    .catch( (err) => {
        res.send(err)
    })
})

router.post('/edit/:bookId', (req, res) => {
    Book.findByPk(Number(req.params.bookId))
    .then( (oneBook) => {
        oneBook.update({
            title: req.body.title,
            author: req.body.author,
            publisher:  req.body.publisher,
            publicationYear:  req.body.publicationYear,
            numberOfPage:  req.body.numberOfPage,
            price:  req.body.price,
            stock:  req.body.stock
        })
        .then( (updatedBook) => {
            res.redirect('/')
        })
        .catch( (err) => {
            res.send(err)
        })
    })
    .catch( (err) => {
        res.send(err)
    })
})

router.get('/add', (req, res) => {
    res.render('addBook.ejs')
})

router.post('/add', (req, res) => {
    Book.create({
        title: req.body.title,
        author: req.body.author,
        publisher:  req.body.publisher,
        publicationYear:  req.body.publicationYear,
        numberOfPage:  req.body.numberOfPage,
        price:  req.body.price,
        stock:  req.body.stock
    })
    .then( (newBook) => {
        res.redirect('/')
    })
    .catch( (err) => {
        res.send(err)
    })
})

router.get('/delete/:bookId', (req, res) => {
    Book.findByPk(Number(req.params.bookId))
    .then( (oneBookToDelete) => {
        return oneBookToDelete.destroy()
    })
    .then( (deletedBook) => {
        res.redirect('/')
    })
    .catch( (err) => {
        res.send(err)
    })
})

module.exports = router