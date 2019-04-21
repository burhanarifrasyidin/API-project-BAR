const router = require('express').Router()
const {
    getAksesoris,aksesorisDetail,addAksesoris,editAksesoris,deleteAksesoris
} = require('./../controller').aksesorisController
const upload = require('./../helpers/uploader')


router.get('/aksesoris',getAksesoris)
router.get('/aksesoris-detail/:id', aksesorisDetail)
router.post('/addaksesoris', upload.single('image'),addAksesoris)
router.put('/editaksesoris/:id', upload.single('edit'),editAksesoris)
router.delete('/deleteaksesoris/:id', deleteAksesoris)

module.exports = router


