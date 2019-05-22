const router= require('express').Router()
const {Customer} = require('../models')
const bcryt= require('bcrypt')

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
            if(checkPassowrd){
                res.redirect('/customer/book')
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
        res.redirect('/customer/book')
    })
    .catch(err=>{
        res.send(err)
    })
})

router.get('/book',(req,res)=>{
    res.send('success')
})


module.exports= router