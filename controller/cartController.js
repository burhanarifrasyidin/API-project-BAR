var db = require('./../database')
const fs = require('fs')
const hbrs = require('handlebars')
const pdf = require('html-pdf')
const transporter = require('./../helpers/nodemailer')

module.exports = {
    ShowCart: (req, res) => {
        var sql = `select cart.id,p.nama_product, p.harga_product, p.discount_product, p.category_product, quantity from cart
        join user as u on cart.id_user = u.id 
        join product as p on cart.id_product = p.id
        where cart.id_user = ${req.params.id};`
        db.query(sql, (err, hasil) => {
            if (err) throw err
            res.send(hasil)
        })
    },
    AddToCart: (req, res) => {
        var sql = `select * from cart where id_user = ${req.body.id_user} and id_product = ${req.body.id_product};`
        db.query(sql, (err, hasil) => {
            if (hasil.length > 0) {
                var sql2 = `update cart set quantity = quantity + ${req.body.quantity} where id_user = ${req.body.id_user} and id_product = ${req.body.id_product};`
                db.query(sql2, (err, hasil1) => {
                    if (err) throw err
                    res.send('Add Product Success')
                })
            } else {
                var sql1 = `insert into cart set ?`
                db.query(sql1, req.body, (err, hasil2) => {
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
        db.query(sql, (err, hasil) => {
            if (err) throw err
            res.send(hasil)
        })
    },
    DeleteCart: (req, res) => {
        var sql = `delete from cart where id = ${req.params.id}`
        db.query(sql, (err, hasil) => {
            if (err) throw err
            res.send('Delete Cart Sukses')
        })
    },
    UpdateCart : (req,res)=>{
        var id = req.params.id
        var sql = `update cart set quantity = ${req.body.quantity} where Id = ${id};`
        db.query(sql, (err, hasil) => {
            if (err) throw err
            res.send('Update Quantity Sukses')
        })
    },
    AddToCartFromWish:(req,res)=>{
        var sql = `select * from cart where id_user = ${req.body.id_user} and id_product = ${req.body.id_product};`
        db.query(sql, (err, hasil) => {
            if (hasil.length > 0) {
                var sql2 = `update cart set quantity = quantity + 1 where id_user = ${req.body.id_user} and id_product = ${req.body.id_product};`
                db.query(sql2, (err, hasil1) => {
                    if (err) throw err
                    res.send('Add Product Success')
                })
            } else {
                var sql1 = `insert into cart (id_user,id_product,quantity) values ('${req.body.id_user}','${req.body.id_product}',1);`
                db.query(sql1, req.body, (err, hasil2) => {
                    if (err) throw err
                    res.send('Add Product Success')
                })
            }
        })
    },
    AddToCartFromHome:(req,res)=>{
        var sql = `select * from cart where id_user = ${req.body.id_user} and id_product = ${req.body.id_product};`
        db.query(sql, (err, hasil) => {
            if (hasil.length > 0) {
                var sql2 = `update cart set quantity = quantity + 1 where id_user = ${req.body.id_user} and id_product = ${req.body.id_product};`
                db.query(sql2, (err, hasil1) => {
                    if (err) throw err
                    res.send('Add Product Success')
                })
            } else {
                var sql1 = `insert into cart (id_user,id_product,quantity) values ('${req.body.id_user}','${req.body.id_product}',1);`
                db.query(sql1, req.body, (err, hasil2) => {
                    if (err) throw err
                    res.send('Add Product Success')
                })
            }
        })
    },
    AddToCartFromSearch:(req,res)=>{
        var sql = `select * from cart where id_user = ${req.body.id_user} and id_product = ${req.body.id_product};`
        db.query(sql, (err, hasil) => {
            if (hasil.length > 0) {
                var sql2 = `update cart set quantity = quantity + 1 where id_user = ${req.body.id_user} and id_product = ${req.body.id_product};`
                db.query(sql2, (err, hasil1) => {
                    if (err) throw err
                    res.send('Add Product Success')
                })
            } else {
                var sql1 = `insert into cart (id_user,id_product,quantity) values ('${req.body.id_user}','${req.body.id_product}',1);`
                db.query(sql1, req.body, (err, hasil2) => {
                    if (err) throw err
                    res.send('Add Product Success')
                })
            }
        })
    },
    AddToCartFromListProduct:(req,res)=>{
        var sql = `select * from cart where id_user = ${req.body.id_user} and id_product = ${req.body.id_product};`
        db.query(sql, (err, hasil) => {
            if (hasil.length > 0) {
                var sql2 = `update cart set quantity = quantity + 1 where id_user = ${req.body.id_user} and id_product = ${req.body.id_product};`
                db.query(sql2, (err, hasil1) => {
                    if (err) throw err
                    res.send('Add Product Success')
                })
            } else {
                var sql1 = `insert into cart (id_user,id_product,quantity) values ('${req.body.id_user}','${req.body.id_product}',1);`
                db.query(sql1, req.body, (err, hasil2) => {
                    if (err) throw err
                    res.send('Add Product Success')
                })
            }
        })
    },
    CheckOut : (req,res) => {
        var newData = {
            order_number : req.body.order_number,
            tanggal : req.body.tanggal,
            waktu : req.body.waktu,
            id_user : req.body.id_user,
            total_harga : req.body.total_harga,
            item : req.body.item,
            status : req.body.status
         }
        var sql = `insert into transaksi set ?`
            db.query(sql, newData, (err,result) => {
                if(err) throw err
                fs.readFile('./template/invoice.html' , {encoding : 'utf-8'}, (err,hasilRead) => {
                    if(err) throw err
                    var template = hbrs.compile(hasilRead)
                    var data = {
                        no : req.body.order_number,
                        nama : req.body.username,
                        tanggal : newData.tanggal,
                        total : newData.total_harga
                    }
                    var hasilHbrs = template(data)
                    var option = {
                        format : 'A4',
                        orientation : 'landscape',
                        border : {
                            top: "0,1in",
                            left : "0,1in",
                            right : "0,1in",
                            bottom : "0,1in"
                        }
                    }
                    pdf.create(hasilHbrs, option).toStream((err,hasilStream) => {
                        if(err) throw err
                        var optionNodemailer = {
                            from : 'Test.com',
                            // to : req.body.email,
                            to : 'burhan.d3mits@gmail.com',
                            subject : 'Invoice Pembayaran untuk ' + data.nama,
                            html : `<h3> Dear ${data.nama}, </h3>
                            
                            <p>Terima kasih telah membeli produk kami, Untuk menyelesaikan transaksi Anda silahkan upload bukti pembayaran Anda di <a href="http://localhost:3000/payment/${data.no}">here</a> </p>`,
                            attachments : [
                                {
                                    filename : 'invoice.pdf',
                                    content : hasilStream
                                }
                            ]
                        }
                        transporter.sendMail(optionNodemailer, (err,resultMail) => {
                            // if(err) throw err
                            res.send('Check your Email for Invoice')
                        })
                    })
                })
            })
    },
    AddToTransactionDetail : (req,res) => {
        var data = req.body
        var sql = `insert into transaksi_detail set ?`
            db.query(sql,data,(err, result) => {
                if(err) throw err
                res.send('Add to Detail Sukses')
            })
    }
}




     








