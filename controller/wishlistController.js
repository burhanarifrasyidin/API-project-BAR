var db = require('./../database')

module.exports = {
    ShowWish: (req, res) => {
        var sql = `select wishlist.id,p.nama_product, p.harga_product, p.discount_product, p.deskripsi_product, p.category_product, quantity,image from wishlist
        join user as u on wishlist.id_user = u.id 
        join product as p on wishlist.id_product = p.id
        where wishlist.id_user = ${req.params.id};`
        db.query(sql, (err, result) => {
            if (err) throw err
            res.send(result)
        })
    },
    AddToWish: (req, res) => {
        var sql = `select * from wishlist where id_user = ${req.body.id_user} and id_product = ${req.body.id_product};`
        db.query(sql, (err, result) => {
            if (result.length > 0) {
                var sql2 = `update wishlist set quantity = quantity + ${req.body.quantity} where id_user = ${req.body.id_user} and id_product = ${req.body.id_product};`
                db.query(sql2, (err, result1) => {
                    if (err) throw err
                    res.send('Add Wishlist Success')
                })
            } else {
                var sql1 = `insert into wishlist set ?`
                db.query(sql1, req.body, (err, result2) => {
                    if (err) throw err
                    res.send('Add Wishlist Success')
                })
            }
        })
    },
    DeleteWish: (req, res) => {
        var sql = `delete from wishlist where id = ${req.params.id}`
        db.query(sql, (err, result) => {
            if (err) throw err
            res.send('Delete Wishlist Sukses')
        })
    }
}


