const express= require('express')
const app= express()
const port= 3000
const employeeRoute = require('./router/employeeRoute')
const customerRoute = require('./router/customerRoute')

app.use(express.urlencoded({ extended: false }));
app.listen(port, () => console.log(`Server running on port port: ${port}`))

app.get('/', (req, res) => {
    res.render('home, login.')
})
app.use('/employee', employeeRoute)
app.use('/customer', customerRoute)