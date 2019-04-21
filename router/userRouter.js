const router = require('express').Router()
const { userController } = require('./../controller')

router.get('/getAll', userController.getAllUser)
router.get('/getUser', userController.getUserByUsername)
router.get('/getID/:id', userController.getUserById)
router.post('/addUser', userController.addUser)
router.put('/editUser/:id', userController.editUser)
router.delete('/deleteUser/:id', userController.deleteUser)
router.get('/loginUser', userController.userLogin)
router.get('/keepLogin', userController.keepLogin)
router.put('/verifyUser', userController.verifyUser)

module.exports = router