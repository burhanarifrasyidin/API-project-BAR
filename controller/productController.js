var db = require('./../database')
var fs = require('fs')

module.exports = {
    getProducts: (req, res) => {
        var sql = 'select * from product;'
        db.query(sql, (err, hasil) => {
            res.send(hasil)
        })
    },
    addProducts: (req, res) => {
        try {
            var newData = JSON.parse(req.body.data)
            newData.image = req.file.path
            var sql = `insert into product set ?`
            db.query(sql, newData, (err, hasil) => {
                if (err) throw err
                res.send('Add Sukses')
            })
        } catch (err) {
            res.send(err)
        }
    },
    editProducts: (req, res) => {
        var id = req.params.id
        if (req.file) {
            console.log(req.file)
            var data = JSON.parse(req.body.data)
            data.image = req.file.path
            var sql1 = `update product set ? where id = ${id}`
            db.query(sql1, data, (err, hasil) => {
                if (err) throw err
                res.send('Update Data Sukses')
                fs.unlinkSync(req.body.imageBefore)
            })
        } else {
            var data = req.body
            var sql = `update product set ? where id = ${id}`
            db.query(sql, data, (err, hasil) => {
                if (err) throw err
                res.send('Edit Data Sukses')
            })
        }
    },
    deleteProducts: (req, res) => {
        var id = req.params.id
        var sql = `select * from product where id = ${id}`
        db.query(sql, (err, hasil) => {
            try {
                if (err) throw err
                var path = hasil[0].image
                var sql2 = `delete from product where id = ${id}`
                db.query(sql2, (err, hasil1) => {
                    if (err) throw err
                    res.send('Delete Data Sukses')
                    fs.unlinkSync(path)
                })
            } catch {
                console.log(err)
            }
        })
    },
    productDetail: (req, res) => {
        var id = req.params.id
        var sql = `select * from product where id = ${id}`
        db.query(sql, (err, hasil) => {
            if (err) throw err
            res.send(hasil)
        })
    }
}