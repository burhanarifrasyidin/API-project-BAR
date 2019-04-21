const router = require('express').Router()
const {
    getFrame,frameDetail,addFrame,editFrame,deleteFrame
} = require('./../controller').frameController
const upload = require('./../helpers/uploader')


router.get('/frames',getFrame)
router.get('/frame-detail/:id', frameDetail)
router.post('/addframe', upload.single('image'),addFrame)
router.put('/editframe/:id', upload.single('edit'),editFrame)
router.delete('/deleteframe/:id', deleteFrame)

module.exports = router
