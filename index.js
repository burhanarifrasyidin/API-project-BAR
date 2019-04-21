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
    sparepartRouter,
    frameRouter,
    aksesorisRouter,
    categoryRouter
} = require('./router')

app.use('/upload', express.static('upload'))
app.use('/user', userRouter)
app.use('/product', productRouter)
app.use('/sparepart', sparepartRouter)
app.use('/frame', frameRouter)
app.use('/aksesori', aksesorisRouter)
app.use('/category', categoryRouter)



app.listen(port, () => console.log('aktif di port' + port))
