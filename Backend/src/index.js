const express = require('express')
const bodyParser = require('body-parser')
const responseTime = require('response-time')
const db = require('./config/db_config')
const {PORT, DB_FORCE, DB_ALTER} = require('./config/serverConfig')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const path = require('path')
const ApiRouter = require('./routes/api_router')

const Models = require('./models/index')
const Category = require('./models/category')

const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true   
}))

// app.use(responseTime((req, res, time) => {
//     console.log("Time elapsed: ", time)
//     res.setHeader('X-Response-Time', time)
// }))

app.use(responseTime())

app.use(bodyParser.json()) // application level middleware
app.use(bodyParser.text()) // application level middleware
app.use(bodyParser.urlencoded({extended: true})) // application level middleware

app.use(cookieParser())

app.use('/api', ApiRouter)


app.listen(PORT, async() => {
    console.log("Server for shop cart is up")

    if(DB_FORCE === "true"){
      // console.log("FORCE")
      await db.sync({force: true})
    }else if(DB_ALTER === "true"){
      // console.log("ALTER")
      await db.sync({alter: true})
    }else{
      // console.log("SYNC")
      await db.sync()
    }

    console.log('db connected')

    // const res = await Category.create({
    //     name: 'Electronics',
    //     description: 'Category for electronic products'
    // })
    // console.log(res)
})