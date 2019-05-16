var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var app = express()

app.use(cors())
app.use(bodyParser.json())

const port = 2008
const {
    productRouter,
    userRouter,
    categoryRouter,cartRouter,wishRouter,transaksiRouter,profilRouter
} = require('./router')

app.use('/upload', express.static('upload'))
app.use('/user', userRouter)
app.use('/product', productRouter)
app.use('/category', categoryRouter)
app.use('/cart', cartRouter)
app.use('/wishlist', wishRouter)
app.use('/transaksi', transaksiRouter)
app.use('/profile', profilRouter)


app.listen(port, () => console.log('aktif di port' + port))
