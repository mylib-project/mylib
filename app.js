const express= require('express')
const app= express()
const port= 3000
const customerRoute = require('./router/customerRoute')
const employeeRoute = require('./router/employeeRoute')
const session = require('express-session')
const multer = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
      console.log(req);
      callback(null, './uploads')
  },
  filename: (req, file, callback) => {
      console.log(req)
      callback(null, Date.now() + file.originalname)
  }
});
var upload = multer({storage:storage}).single('myFile')


app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname+'/public'))
app.use(session({
    secret: 'mylib.id',
    resave: false,
    saveUninitialized: true
  })
)

app.get('/', (req, res)=>{
    res.render('index.ejs')
})


app.use('/employee', employeeRoute)
app.use('/customer', customerRoute)


app.listen(port, () => console.log(`Server running on port port: ${port}`))