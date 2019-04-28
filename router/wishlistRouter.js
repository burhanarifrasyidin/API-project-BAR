const router = require('express').Router()
const {
    AddToWish,
    ShowWish,
    DeleteWish
} = require('./../controller').wishController

router.post('/addtoWish', AddToWish)
router.get('/showWish/:id', ShowWish)
router.delete('/deleteWish/:id', DeleteWish)

module.exports = router