const express= require('express')
const app= express()
const port= 3000
const customerRoute = require('./router/customerRoute')


app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res)=>{
    res.render('index.ejs')
})

app.use('/customer', customerRoute)

app.listen(port, () => console.log(`Server running on port port: ${port}`))
