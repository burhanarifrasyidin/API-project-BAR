const router = require('express').Router()
const {
    getTransaksi,
    getTransactionDetail,
    getTransactionsByUser,
    getTransactionsHistory,
    uploadPayment,
    approveTransaction,getTransactionPayment
} = require('./../controller').transaksiController
const upload = require('./../helpers/uploader')


router.get('/transaction', getTransaksi)
router.get('/transUser/:id', getTransactionsByUser)
router.get('/transdetail/:order_number', getTransactionDetail)
router.get('/transdetailpay/:id', getTransactionPayment)
router.get('/history/:id', getTransactionsHistory)
router.put('/completePayment/:id', upload.single('receipt'), uploadPayment)
router.put('/approve/:id', approveTransaction)


module.exports = router