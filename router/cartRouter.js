const router = require('express').Router()
const {
    AddToCart,
    ShowCart,
    CartCount,
    DeleteCart,
    UpdateCart,
    AddToCartFromWish,
    AddToCartFromHome,
    AddToCartFromSearch,AddToCartFromListProduct,CheckOut,AddToTransactionDetail
} = require('./../controller').cartController

router.post('/addtocart', AddToCart)
router.get('/showcart/:id', ShowCart)
router.get('/cartcount/:id', CartCount)
router.delete('/deletecart/:id', DeleteCart)
router.put('/updatecart/:id', UpdateCart)
router.post('/addtocartfromwish', AddToCartFromWish)
router.post('/addtocartfromhome', AddToCartFromHome)
router.post('/addtocartfromsearch', AddToCartFromSearch)
router.post('/addtocartfromlistproduct', AddToCartFromListProduct)
router.post('/checkout', CheckOut)
router.post('/addtransdetail', AddToTransactionDetail)

module.exports = router

