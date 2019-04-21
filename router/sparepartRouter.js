const router = require('express').Router()
const {
    getSparepart,sparepartDetail,addSparepart,editSparepart,deleteSparepart
} = require('./../controller').sparepartController
const upload = require('./../helpers/uploader')


router.get('/spareparts',getSparepart)
router.get('/sparepart-detail/:id', sparepartDetail)
router.post('/addsparepart', upload.single('image'),addSparepart)
router.put('/editsparepart/:id', upload.single('edit'),editSparepart)
router.delete('/deletesparepart/:id', deleteSparepart)

module.exports = router


