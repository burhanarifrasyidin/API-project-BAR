const router = require('express').Router()
const {
    addProducts,
    getProducts,
    editProducts,
    deleteProducts,
    productDetail,filterProd,saleProduct
} = require('./../controller').productController
const upload = require('./../helpers/uploader')


router.get('/products', getProducts)
router.get('/saleProduct', saleProduct)
router.get('/filterprod', filterProd)
router.get('/product-detail/:id', productDetail)
router.post('/addproduct', upload.single('image'), addProducts)
router.put('/editproduct/:id', upload.single('edit'), editProducts)
router.delete('/deleteproduct/:id', deleteProducts)

module.exports = router
