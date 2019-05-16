const router = require('express').Router()
const upload = require('./../helpers/uploader')
const   {getProfile, 
        addProfile,
        editProfile,
        deleteProfile} = require('./../controller').profilController

router.get('/profiles/:id', getProfile)
router.post('/addProfile',upload.single('image'), addProfile)
router.put('/editProfile/:id',upload.single('edit'), editProfile)
router.delete('/delProfile/:id', deleteProfile)

module.exports = router