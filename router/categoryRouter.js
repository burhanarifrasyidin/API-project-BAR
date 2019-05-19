const router = require('express').Router()
const   {getCategory, 
        addCategory,
        editCategory,
        deleteCategory,filterCatProd,filterCat} = require('./../controller').categoryController

router.get('/category', getCategory)
router.post('/addcategory', addCategory)
router.put('/editcategory/:id', editCategory)
router.delete('/deletecategory/:id', deleteCategory)
router.get('/filterCat', filterCat)
router.get('/filterCatProd', filterCatProd)

module.exports = router
