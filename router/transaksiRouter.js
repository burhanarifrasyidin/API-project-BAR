const router = require('express').Router()
const {
    getTransaksi,
    getTransactionDetail,
    getTransactionsByUser,
    getTransactionsHistory,
    uploadPayment,
    approveTransaction,getTransactionPayment,unapprovedTransactionsUser,rejectTransaction,filterHistory,filterPayStatus
} = require('./../controller').transaksiController
const upload = require('./../helpers/uploader')


router.get('/transaction', getTransaksi)
router.get('/transUser/:id', getTransactionsByUser)
router.get('/translist/:id', unapprovedTransactionsUser)
router.put('/rejecttrans/:id', rejectTransaction)
// router.get('/transdetail/:id', getTransactionDetail)
router.get('/transdetailpay/:order_number', getTransactionPayment)
router.get('/history/:id', getTransactionsHistory)
router.put('/completePayment/:order_number', upload.single('receipt'), uploadPayment)
router.put('/approve/:id', approveTransaction)
router.get('/filterhistory', filterHistory)
router.get('/filterstatus', filterPayStatus)

module.exports = router