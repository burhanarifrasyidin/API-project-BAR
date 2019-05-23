var db = require('./../database')
var transporter = require('./../helpers/nodemailer')


module.exports = {
    // =============== Get Data Transaksi =============== 

    getTransaksi: (req, res) => {
        var sql = `select t.id,tanggal,u.id as iduser,u.username, item, total_harga, bukti_transaksi, status,order_number,waktu,email from transaksi as t
        join user as u on id_user = u.id where status NOT LIKE 'Sudah Diproses';`
        db.query(sql, (err, hasil) => {
            res.send(hasil)
        })
    },

    // =============== Edit Data transaksi =============== 

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
                    
                    <p>Tampaknya transaksi Anda telah ditolak oleh Admin kami. Untuk menyelesaikan transaksi Anda lagi, silakan kunjungi halaman transaksi untuk upload ulang bukti transaksi Anda di
                    <a href="http://localhost:3000/payment?status=${req.body.status}">sini dengan cara : pastikan kolom filter tertuju pada rejected lalu klik filter</a> </p>`
                }
                transporter.sendMail(Mailoptions, (err,hasiltMail) => {
                    // if(err) throw err
                    res.send('Transaction Rejected')
                })
            })
    }, 

    // =============== Get Data transaksi =============== 

    getTransactionsByUser : (req,res) => {
        var sql = `select id_user,tanggal, tanggal_bayar, item, total_harga, order_number,waktu,status from transaksi where id_user = '${req.params.id}'`
        db.query(sql, (err,hasil) => {
            if(err) throw err
            res.send(hasil)
        })
    },
    // getTransactionDetail : (req,res) => {
    //     var sql = `select nama_product,harga_product,quantity from transaksi_detail where id = '${req.params.id}';`
    //     db.query(sql, (err,hasil) => {
    //         if(err) throw err
    //         res.send(hasil)
    //     })
    // },
    getTransactionPayment : (req,res) => {
        var sql = `select nama_product,harga_product,quantity from transaksi_detail where order_number = '${req.params.order_number}';`
        db.query(sql, (err,hasil) => {
            if(err) throw err
            res.send(hasil)
        })
    },

    // =============== Edit Data transaksi =============== 

    uploadPayment : (req,res) => {
        var newData = JSON.parse(req.body.data)
        newData.bukti_transaksi = req.file.path
        // console.log(newData)
        var sql = `update transaksi set? where order_number = '${req.params.order_number}'`
            db.query(sql, newData,(err,hasil) => {
                // console.log(hasil)
                if(err) throw err
                var sql2 = `update transaksi_detail set tanggal_bayar = '${newData.tanggal_bayar}' 
                            where order_number = '${req.params.order_number}'`
                    db.query(sql2, (err1, hasil1) => {
                        if(err1) throw err1
                        res.send('Upload Pembayaran Berhasil, Tunggu Proses From Admin')
                    })
            })
    },

    // =============== Get Data transaksi =============== 

    getTransactionsHistory : (req,res) => {
        var sql = `select id_user,tanggal, tanggal_bayar, item, total_harga, order_number,waktu,status from transaksi where id_user = '${req.params.id}' and status = 'Sudah Diproses';`
            db.query(sql, (err,hasil) => {
                if(err) throw err
                res.send(hasil)
            })
    },
    unapprovedTransactionsUser : (req,res) => {
        var sql = `select tanggal, item, total_harga, order_number, status from transaksi where id_user = ${req.params.id};`
        db.query(sql, (err,result) => {
            if(err) throw err
            res.send(result)
        })
    },
    // =============== Get Filter Data transaksi =============== 

    filterHistory : (req,res) => {
        var sql = `select * from transaksi where id_user = '${req.query.id_user}' and status = 'Sudah Diproses' and tanggal like '%-${req.query.month}-%';`
            db.query(sql, (err,result) => {
                if(err) throw err
                res.send(result)
            })
    },
    filterPayStatus: (req, res) => {
        var sql = `select * from transaksi where status like '${req.query.status}%';`
        db.query(sql, (err, hasil) => {
            if (err) throw err
            res.send(hasil)
        })
    },
}