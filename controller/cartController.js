var db = require('./../database')

module.exports = {
    ShowCart: (req, res) => {
        var sql = `select cart.id,p.nama_product, p.harga_product, p.discount_product, p.category_product, quantity from cart
        join user as u on cart.id_user = u.id 
        join product as p on cart.id_product = p.id
        where cart.id_user = ${req.params.id};`
        db.query(sql, (err, result) => {
            if (err) throw err
            res.send(result)
        })
    },
    AddToCart: (req, res) => {
        var sql = `select * from cart where id_user = ${req.body.id_user} and id_product = ${req.body.id_product};`
        db.query(sql, (err, result) => {
            if (result.length > 0) {
                var sql2 = `update cart set quantity = quantity + ${req.body.quantity} where id_user = ${req.body.id_user} and id_product = ${req.body.id_product};`
                db.query(sql2, (err, result1) => {
                    if (err) throw err
                    res.send('Add Product Success')
                })
            } else {
                var sql1 = `insert into cart set ?`
                db.query(sql1, req.body, (err, result2) => {
                    if (err) throw err
                    res.send('Add Product Success')
                })
            }
        })
    },
    CartCount: (req, res) => {
        var sql = `select cart.id, u.username, id_product,quantity from cart
        join user as u on id_user = u.id
        where u.username = '${req.params.id}';`
        db.query(sql, (err, result) => {
            if (err) throw err
            res.send(result)
        })
    },
    DeleteCart: (req, res) => {
        var sql = `delete from cart where id = ${req.params.id}`
        db.query(sql, (err, result) => {
            if (err) throw err
            res.send('Delete Cart Sukses')
        })
    },
    UpdateCart : (req,res)=>{
        var id = req.params.id
        var data = req.body.quantity
        var sql = `update cart set ? where Id=${id};`
        db.query(sql, data, (err, hasil) => {
            if (err) throw err
            res.send('Update Quantity Sukses')
        })
    }
}
