var db = require('./../database')

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
        var sql = `select * from transaksi_detail where order_number = '${req.params.order_number}';`
        db.query(sql, (err,hasil) => {
            if(err) throw err
            res.send(hasil)
        })
    },
    getTransactionPayment : (req,res) => {
        var sql = `select * from transaksi_detail where id = '${req.params.id}';`
        db.query(sql, (err,hasil) => {
            if(err) throw err
            res.send(hasil)
        })
    },
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
        var sql = `select id_user,tanggal, tanggal, item, total_harga, order_number,waktu from transaksi 
                    where id_user = ${req.params.id} and status = 'Approved';`
            db.query(sql, (err,hasil) => {
                if(err) throw err
                res.send(hasil)
            })
    }
}