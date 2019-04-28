const router = require('express').Router()
const {AddToCart, ShowCart, CartCount, DeleteCart,UpdateCart} = require('./../controller').cartController

router.post('/addtocart', AddToCart)
router.get('/showcart/:id',ShowCart)
router.get('/cartcount/:id', CartCount)
router.delete('/deletecart/:id', DeleteCart)
router.put('/updatecart/:id', UpdateCart)

module.exports = router


