const router= require('express').Router()
const {Customer, Book, bookTag, bookRent, Favourite, Tag, Employee} = require('../models')
const bcryt= require('bcrypt')
const Sequelize= require('sequelize')
const Op= Sequelize.Op
const cekStatus= require('../helpers/cekStatus')
const getFormatDate= require('../helpers/getFormatDate')
const checkLogin = require('../middleware/checkLogin')
const countDay= require('../helpers/countDay')
const getFormatRupiah= require('../helpers/getFormatRupiah')


router.get('/login', (req, res)=>{
    res.render('login.ejs',{
        postRoute: '/customer/login',
        registerRoute: '/customer/register'
    })
})

router.post('/login', (req, res)=>{
    Customer.findOne({where: {email: req.body.email}})
    .then(customer=>{
        if(!customer) throw new Error ('Email is wrong')
        else{
            let checkPassowrd= bcryt.compareSync(req.body.password, customer.password)
            console.log(checkPassowrd)
            if(checkPassowrd){
                console.log(req.session)
                req.session.user = {
                    id: customer.id,
                    name: `${customer.firstName} ${customer.lastName}`,
                    role: `customer`,
                    status: 'login'
                }
                console.log(req.session)
                res.redirect('/customer/catalog')
            }else{
                throw new Error ('Wrong password')
            }
        }
    })
    .catch(err=>{
        res.send(err)
    })
})

router.get('/register', (req, res)=>{
    res.render('register.ejs',{
        postRoute: '/customer/register'
    })
})

router.post('/register', (req, res)=>{
    let newCustomer={
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        email: req.body.email,
        password: req.body.password,
        point: 0,
        balance: 0
    }
    Customer.create(newCustomer)
    .then(newCustomer=>{
        req.session.user = {
            id: customer.id,
            name: `${customer.firstName} ${customer.lastName}`,
            role: `customer`,
            status: 'login'
        }
        res.redirect('/customer/catalog')
    })
    .catch(err=>{
        res.send(err)
    })
})

// router.get('/catalog', (req, res)=>{
//     let status= req.query.status
//     let bookTitle= req.query.title
//     let tag= req.query.tag
//     console.log(bookTitle, 'status')
//     let dataBuku=null
//     let dataTag= null

//     Promise.all([Book.findAll({include:[bookTag]}), Tag.findAll()])
//         .then((data)=>{
//             dataBuku= data[0]
//             dataTag= data[1]
//         })
//         .catch(err=>{
//             res.send(err)
//         })


//     if(status == undefined){
//         if(bookTitle == undefined){

//         }else{
//             if(tag== undefined){

//             }else{
//                 if(typeof tag != 'object'){

//                 }else{

//                 }
//             }
//         }
//     }else{
        
//     }
// })

router.get('/catalog', checkLogin ,(req,res)=>{
    let status= req.query.status
    let bookTitle= req.query.title
    let tag= req.query.tag
    let userId= req.session.user.id
    if(tag == undefined){
        if(bookTitle== undefined){
            Promise.all([Book.findAll(), Tag.findAll(), Customer.findByPk(userId)])
            .then((data)=>{
                console.log(data[0])
                res.render('./customer/catalog.ejs',{
                    books:data[0],
                    tags: data[1],
                    customer: data[2]
                })
            })
            .catch(err=>{
                res.send(err)
            })
        }else{
            Promise.all([Book.findAll({where: { title: { [Op.like]: `%${bookTitle}%` }}}), Tag.findAll(), Customer.findByPk(userId)])
            .then((data)=>{
                res.render('./customer/catalog.ejs',{
                    books:data[0],
                    tags: data[1],
                    customer: data[2]
                })
            })
            .catch(err=>{
                res.send(err)
            })
        }
        
    }else{
        if(typeof tag != 'object'){
            if(bookTitle== undefined){
                Promise.all([Book.findAll({include: {
                    model:bookTag,
                    where:{tagId: tag}
                     }
                }), Tag.findAll(), Customer.findByPk(userId)])
                .then((data)=>{
                    res.render('./customer/catalog.ejs',{
                        books:data[0],
                        tags: data[1],
                        customer: data[2]
                    })
                })
                .catch(err=>{
                    res.send(err)
                })
            }else{
                Promise.all([Book.findAll({include: {
                    model:bookTag,
                    where:{tagId: tag}
                     }, where: { title: { [Op.like]: `%${bookTitle}%` }}
                }), Tag.findAll(), Customer.findByPk(userId)])
                .then((data)=>{
                    res.render('./customer/catalog.ejs',{
                        books:data[0],
                        tags: data[1],
                        customer: data[2]
                    })
                })
                .catch(err=>{
                    res.send(err)
                })
            }
            
        }else{
            if(bookTitle == undefined){
                Promise.all([Book.findAll({include: {
                    model:bookTag,
                    where:{tagId:{[Op.or]: tag}}
                     }
                }), Tag.findAll(), Customer.findByPk(userId)])
                .then((data)=>{
                    res.render('./customer/catalog.ejs',{
                        books:data[0],
                        tags: data[1],
                        customer: data[2]
                    })
                })
                .catch(err=>{
                    res.send(err)
                })
            }else{
                Promise.all([Book.findAll({include: {
                    model:bookTag,
                    where:{tagId:{[Op.or]: tag}}
                     },  where: { title: { [Op.like]: `%${bookTitle}%` }}
                }), Tag.findAll(), Customer.findByPk(userId)])
                .then((data)=>{
                    res.render('./customer/catalog.ejs',{
                        books:data[0],
                        tags: data[1],
                        customer: data[2]
                    })
                })
                .catch(err=>{
                    res.send(err)
                })
            }
            
        }
    }
})

router.get('/book/:bookId', checkLogin ,(req, res)=>{
    Book.findByPk(req.params.bookId)
    .then(book=>{
        res.render('./customer/book.ejs',{
            book:book,
            publicationYear: book.publicationYear.getFullYear(),
            cekStatus: cekStatus
        })
    })
    .catch(err=>{
        res.send(err)
    })
})

router.post('/:bookId/favourite', checkLogin ,(req, res)=>{
        let userId= req.session.user.id
        Customer.findByPk(userId)
        .then(customer=>{
            Favourite.create({
                customerId: customer.id,
                bookId: req.params.bookId
            })
        })
        .then(newFav=>{
            res.redirect('/customer/catalog')
        })
        .catch(err=>{
            res.send(err)
        })

})

router.post('/:bookId/rent', checkLogin ,(req, res)=>{
    let userId= req.session.user.id
    console.log(userId)
    let bookId= req.params.bookId
        Employee.findOne({where:{isLogin: 'true'}})
        .then(employee=>{
            console.log(employee.dataValues)
            if(!employee){
                res.send('No admin is online')
            }else{
                let customer= null
                let book= null
                Customer.findByPk(userId)
                .then(data=>{
                    console.log(data.dataValues)
                    customer= data
                    Book.findByPk(bookId)
                    .then(dataBuku=>{
                         book= dataBuku
                        if(customer.balance< book.price){
                            res.send('Not enough balance. Please top up your balance!')
                        }else{
                            let cost= book.price
                            let earnPoint= book.price/1000
                            let returnDate= new Date()
                            returnDate.setDate(returnDate.getDate() + 7)
                            bookRent.create({
                                employeeId: employee.id,
                                customerId: customer.id,
                                bookId: book.id,
                                price: cost,
                                point: earnPoint,
                                returnDate: returnDate,
                                status: 'Borrowed',
                                denda: 0
                            })
                            .then(transaction=>{
                                console.log(customer.dataValues,'=====')
                                customer.balance= customer.balance- cost
                                customer.point= customer.point+earnPoint
                                book.stock= book.stock-1
                                return customer.save(), book.save()
                            })
                            .then(success=>{
                                res.send('Success Borrow a Book')
                            })
                            .catch(err=>{
                                res.send(err)
                            })
                        }
                    })
                })
            }
        })
        .catch(err=>{
            res.send(err)
        })    
})


router.get('/myfavourite', checkLogin ,(req, res)=>{
        let userId= req.session.user.id
        let books=[]
        let favouriteId=[]

        Favourite.findAll({
            include: {
                model: Book
            }
        })
        .then(data =>{
            for(let key in data){
                if(data[key].customerId == userId) {
                    books.push(data[key].Book)
                    favouriteId.push(data[key].id)
                }
            }
            res.render('./customer/favourite.ejs',{
                books:books,
                favouriteId:favouriteId,
                getFormatRupiah: getFormatRupiah
            })
        })
        .catch(err =>{
            res.send(err)
        })
})

router.get('/myhistory', checkLogin ,(req, res)=>{
        let userId= req.session.user.id
        Customer.findByPk(userId,{
            include:{
                model: bookRent,
                include:{
                    model: Book
                }
            }
        })
        .then(data=>{
            
            res.render('./customer/history.ejs',{
                // data : data
                data:data.bookRents,
                getFormatDate: getFormatDate,
                countDay:countDay,
                getFormatRupiah:getFormatRupiah
            })
        })
        .catch(err=>{
            res.send(err)
        })
})

router.get('/:rentId/return-book', checkLogin, (req, res)=>{
    bookRent.findByPk(req.params.rentId)
    .then(rent=>{
        rent.status= 'Returned'
        return Promise.all([rent.save(), Book.findByPk(rent.bookId)])
    })
    .then(([rents, book])=>{
        book.stock= book.stock+1
        return book.save()
    })
    .then(()=>{
        res.redirect('/customer/myhistory')
    })
    .catch(err=>{
        res.send(err)
    })
})


router.get('/top-up', checkLogin, (req, res)=>{
    Customer.findByPk(req.session.user.id)
    .then(customer=>{
        res.render('./customer/account.ejs',{
            customer: customer.dataValues,
            getFormatDate: getFormatDate,
            getFormatRupiah: getFormatRupiah
        })
    })
    .catch(err=>{
        res.send(err)
    })
})

router.post('/top-up', checkLogin, (req, res)=>{
    Customer.findByPk(req.session.user.id)
    .then(customer=>{
        customer.balance= customer.balance+Number(req.body.nominal)
        return customer.save()
    })
    .then(()=>{
        res.redirect('/customer/top-up')
    })
    .catch(err=>{
        res.send(err)
    })
})


router.get('/logout', checkLogin ,(req,res)=>{
    req.session.destroy()
    res.redirect('/')
})




module.exports= router