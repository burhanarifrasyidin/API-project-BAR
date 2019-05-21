const router = require('express').Router()
const {
    getTransaksi,
    getTransactionDetail,
    getTransactionsByUser,
    getTransactionsHistory,
    uploadPayment,
    approveTransaction,getTransactionPayment,unapprovedTransactionsUser,rejectTransaction,filterHistory
} = require('./../controller').transaksiController
const upload = require('./../helpers/uploader')


router.get('/transaction', getTransaksi)
router.get('/transUser/:id', getTransactionsByUser)
router.get('/translist/:id', unapprovedTransactionsUser)
router.put('/rejecttrans/:id', rejectTransaction)
router.get('/transdetail/:id', getTransactionDetail)
// router.get('/transdetailpay/:id', getTransactionPayment)
router.get('/history/:id', getTransactionsHistory)
router.put('/completePayment/:id', upload.single('receipt'), uploadPayment)
router.put('/approve/:id', approveTransaction)
router.get('/filterhistory', filterHistory)

module.exports = router