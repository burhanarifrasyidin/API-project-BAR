var db = require('./../database')
var transporter = require('./../helpers/nodemailer')


module.exports = {
    //AS ADMIN
    getTransaksi: (req, res) => {
        var sql = `select t.id,tanggal,u.id as iduser,u.username, item, total_harga, bukti_transaksi, status,order_number,waktu,email from transaksi as t
        join user as u on id_user = u.id where status NOT LIKE 'Approved';`
        db.query(sql, (err, hasil) => {
            res.send(hasil)
        })
    },
    approveTransaction : (req,res) => {
        var sql = `update transaksi set status = '${req.body.status}' where id = ${req.params.id}`
            db.query(sql, (err, hasil) => {
                if(err) throw err
                res.send('Transaction has been Approved')
            })
    }, 
    rejectTransaction : (req,res) => {
        var sql = `update transaksi set status = '${req.body.status}' where id = ${req.params.id}`
            db.query(sql, (err,hasil) => {
                if(err) throw err
                var Mailoptions = {
                    from : 'OnOSepeda.com',
                    to : req.body.email,
                    subject : `Invoice ${req.body.no} (Status : Rejected)`,
                    html : `<h3> Dear ${req.body.username}, </h3>
                    
                    <p>Tampaknya transaksi Anda telah ditolak oleh Admin kami. Untuk menyelesaikan transaksi Anda lagi, silakan kunjungi halaman transaksi Anda di
                    <a href="http://localhost:3000/payment/${req.body.no}">sini</a> </p>`
                }
                transporter.sendMail(Mailoptions, (err,hasiltMail) => {
                    // if(err) throw err
                    res.send('Transaction Rejected')
                })
            })
    }, 
    //AS USER
    getTransactionsByUser : (req,res) => {
        var sql = `select * from transaksi
        where id = '${req.params.id}';`
        db.query(sql, (err,hasil) => {
            if(err) throw err
            res.send(hasil)
        })
    },
    getTransactionDetail : (req,res) => {
        var sql = `select nama_product,harga_product,quantity from transaksi_detail where id = '${req.params.id}';`
        db.query(sql, (err,hasil) => {
            if(err) throw err
            res.send(hasil)
        })
    },
    // getTransactionPayment : (req,res) => {
    //     var sql = `select * from transaksi_detail where id = '${req.params.id}';`
    //     db.query(sql, (err,hasil) => {
    //         if(err) throw err
    //         res.send(hasil)
    //     })
    // },
    uploadPayment : (req,res) => {
        var newData = JSON.parse(req.body.data)
        newData.bukti_transaksi = req.file.path
        var sql = `update transaksi set ? where order_number = '${req.params.id}'`
            db.query(sql, newData, (err,hasil) => {
                if(err) throw err
                var sql2 = `update transaksi_detail set tanggal_bayar = '${newData.tanggal_bayar}' 
                            where order_number = '${req.params.id}'`
                    db.query(sql2, (err, hasil1) => {
                        if(err) throw err
                        res.send('Upload Receipt Successful, Thank You For Shopping')
                    })
            })
    },
    getTransactionsHistory : (req,res) => {
        var sql = `select id_user,tanggal, tanggal_bayar, item, total_harga, order_number,waktu from transaksi where id_user = ${req.params.id} and status = 'Approved';`
            db.query(sql, (err,hasil) => {
                if(err) throw err
                res.send(hasil)
            })
    },
    unapprovedTransactionsUser : (req,res) => {
        var sql = `select tanggal, item, total_harga, order_number, status from transaksi where id_user = ${req.params.id} and status NOT LIKE 'Approved';`
        db.query(sql, (err,result) => {
            if(err) throw err
            res.send(result)
        })
    },
    filterHistory : (req,res) => {
        var sql = `select * from transaksi where id_user = '${req.query.id_user}' and status = 'Approved' and tanggal like '%-${req.query.month}-%';`
            db.query(sql, (err,result) => {
                if(err) throw err
                res.send(result)
            })
    }
}