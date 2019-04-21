const router = require('express').Router()
const   {getCategory, 
        addCategory,
        editCategory,
        deleteCategory} = require('./../controller').categoryController

router.get('/category', getCategory)
router.post('/addcategory', addCategory)
router.put('/editcategory/:id', editCategory)
router.delete('/deletecategory/:id', deleteCategory)

module.exports = router