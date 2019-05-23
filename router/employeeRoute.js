const router = require('express').Router()
const {Employee, Customer, Tag, bookrent, Book, bookTag} = require('../models')
const checkLogin = require('../middleware/checkLogin')
let bcrypt = require('bcrypt')

router.get('/', checkLogin, (req, res) => {
    Book.findAll({
        include: {
            model: bookTag,
            include: {
                model: Tag
            }
        }
    })
    .then( (allBook) => {
        // res.send(allBook)
        res.render('list.ejs', {
            books: allBook
        })
    })
    .catch( (err) => {
        res.send(err)
    })
})

router.get('/edit/:bookId', checkLogin, (req, res) => {
    Book.findByPk(Number(req.params.bookId))
    .then( (oneBook) => {
        Tag.findAll()
        .then( (allTag) => {
            res.render('editBook.ejs', {
                postRoute: `/employee/edit/${oneBook.id}`,
                tags: allTag,
                book: oneBook
            })
        })
        .catch( (err) => {
            res.send(err)
        })
    })
    .catch( (err) => {
        res.send(err)
    })
})

router.post('/edit/:bookId', checkLogin, (req, res) => {
    Book.findByPk(Number(req.params.bookId))
    .then( (oneBookToUpdate) => {
        bookTag.findAll({
            where: {
                bookId: oneBookToUpdate.id
            }
        })
        .then( (allBookTag) => {
            allBookTag.forEach( (bookTag) => {
                bookTag.destroy()
            })
            if (typeof req.body.tag !== 'object') {
                booktag = new bookTag()
                booktag.tagId = Number(req.body.tag)
                booktag.bookId = Number(oneBookToUpdate.id)
                booktag.save()
            } else if (typeof req.body.tag == 'object') {
                req.body.tag.forEach( (singleTag) => {
                    booktag = new bookTag()
                    booktag.tagId = Number(singleTag)
                    booktag.bookId = Number(oneBookToUpdate.id)
                    booktag.save()
                })
            }
            res.redirect('/employee')
            
        })
    })
})

router.get('/addBook', checkLogin, (req, res) => {
    Tag.findAll()
    .then( (allTag) => {
        res.render('addBook.ejs', {
            postRoute: '/employee/addBook',
            tags: allTag
        })
    })
    .catch( (err) => {
        res.send(err)
    })
})

router.post('/addBook', checkLogin, (req, res) => {
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
        if (typeof req.body.tag !== 'object') {
            booktag = new bookTag()
            booktag.tagId = Number(req.body.tag)
            booktag.bookId = Number(newBook.id)
            booktag.save()
        } else if (typeof req.body.tag !== 'object') {
            req.body.tag.forEach( (singleTag) => {
                booktag = new bookTag()
                booktag.tagId = Number(singleTag)
                booktag.bookId = Number(newBook.id)
                booktag.save()
            })
        }
        
        res.redirect('/employee')
    })
    .catch( (err) => {
        res.send(err)
    })
})

router.get('/delete/:bookId', checkLogin, (req, res) => {
    Book.findByPk(Number(req.params.bookId))
    .then( (oneBookToDelete) => {
        bookTag.findAll({
            where: {
                bookId: oneBookToDelete.id
            }
        })
        .then( (allBookTag) => {
            allBookTag.forEach( (bookTag) => {
                bookTag.destroy()
            })
            return oneBookToDelete.destroy()
        })
        .then( (deletedBook) => {
            res.redirect('/employee')
        })
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
            let checkPassword= bcrypt.compareSync(req.body.password, oneEmployee.password)
            if(checkPassword){
                req.session.user = {
                    id: oneEmployee.id,
                    name: `${oneEmployee.firstName} ${oneEmployee.lastName}`,
                    role: `Employee`
                }
                // res.send(req.session.employee)
                res.redirect('/employee')
            } else {
                throw new Error ('Wrong password')
            }
        }
        // res.send(oneEmployee)
    })
    .catch( (err) => {
        res.send(err)
    })
})

router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/')
})

router.get('/register', (req, res) => {
    res.render('register.ejs', {
        postRoute: '/employee/register'
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
    .catch( (err) => {
        res.send(err)
    })
})

module.exports = router