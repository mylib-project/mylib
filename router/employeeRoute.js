const router = require('express').Router()
const {Employee, Customer, Bookrent, Book} = require('../models')
const bcrypt= require('bcrypt')

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

router.get('/login', (req, res) => {
    res.render('login.ejs', {
        postRoute: '/employee/login',
        registerRoute: '/employee/register'
    })
})

router.post('/login', (req, res) => {
    Employee.findOne({
        where: {
            email: req.body.email
        }
    })
    .then( (oneEmployee) => {
        if(!oneEmployee) {
            throw new Error(`Email is wrong`)
        } else {
            let checkPassowrd= bcrypt.compareSync(req.body.password, oneEmployee.password)
            if(checkPassowrd){
                req.session.employee = {
                    id: oneEmployee.id,
                    name: `${oneEmployee.firstName} ${oneEmployee.lastName}`,
                    role: `Employee`
                }
                // res.send(req.session.employee)
                res.render('employee.ejs', {
                    session: req.session.employee
                })
            }else{
                throw new Error ('Wrong password')
            }
        }
    })
    .catch( (err) => {
        res.send(err)
    })
})

router.get('/register', (req, res) => {
    res.render('register.ejs', {
        postRoute: '/employee/login'
    })
})

router.post('/register', (req, res) => {
    Employee.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        email: req.body.email,
        password: req.body.password,
        isLogin: 'false'
    })
    .then( (newEmployee) => {
        res.redirect('/employee/login')
    })
})
module.exports = router