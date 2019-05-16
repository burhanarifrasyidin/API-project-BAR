const productRouter = require('./productRouter')
const userRouter = require('./userRouter')
const categoryRouter = require('./categoryRouter')
const cartRouter = require('./cartRouter')
const wishRouter = require('./wishlistRouter')
const transaksiRouter = require('./transaksiRouter')
const profilRouter = require('./profileRouter')


module.exports = {
    userRouter,
    productRouter,categoryRouter,cartRouter,wishRouter,transaksiRouter,profilRouter
}