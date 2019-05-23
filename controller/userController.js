var db = require('./../database')
const transporter = require('./../helpers/nodemailer')
const crypto = require('crypto')

module.exports = {

    // =============== Get data User =============== 

    getAllUser: (req, res) => {
        var sql = 'select * from user;'
        db.query(sql, (err, hasil) => {
            res.send(hasil)
        })
    },
    getUserByUsername: (req, res) => {
        var username = req.query.username
        var sql = 'select * from user where username = ?'
        db.query(sql, username, (err, hasil) => {
            res.send(hasil)
        })
    },
    getUserById: (req, res) => {
        var id = req.params.id
        var sql = `select * from user where id = ${id};`
        db.query(sql, (err, hasil) => {
            res.send(hasil)
        })
    },

    // =============== Add data User / Verifikasi =============== 

    addUser: (req, res) => {
        var nama = req.body.username
        var email = req.body.email
        var sql = `select * from user where username = '${nama}';`
        db.query(sql, (err, hasil) => {
            try {
                if (err) throw err
                if (hasil.length > 0) throw {error : true, msg : 'Username sudah ada'}
                    var data = req.body
                    var hashPassword = crypto.createHmac('sha256','secretabc').update(data.password).digest('hex')
                    data ={...data,password:hashPassword}
                    var mailOptions = {
                        from : 'OnOSepeda.com',
                        to : email ,
                        subject : 'Verifikasi Akun OnOSepeda.com',
                        html : `<h2>Klik <a href="http://localhost:3000/verify?username=${nama}&password=${hashPassword}">Link</a> ini untuk mengaktifkan akun Anda</h2>`
                    }
                    transporter.sendMail(mailOptions, (err,hasil2) => {
                        res.send('Email Has Been Send')
                    })
                    var sql2 = `insert into user set ?`
                    db.query(sql2, data, (err,hasil3) => {
                        if (err) throw err
                        res.send('Add User Sukses')
                    })
                
            } catch (err) {
                res.send(err)
            }
        })
    },
        
    // =============== Edit data User  =============== 

    editUser : (req,res) => {
        var id = req.params.id
        var data = req.body
        var sql = `update user set ? where id=${id}`
        db.query(sql,data, (err,hasil) =>{
            res.send('Edit Sukses')
        })
    },

    // =============== Delete data User =============== 

    deleteUser :  (req,res) => {
        var id = req.params.id
        var sql = `delete from user where id =${id};`
        db.query(sql, (err,hasil) =>{
            if(err) throw err
            res.send('Delete Sukses')
        })
    },

    // =============== Add Hash User =============== 

    userLogin : (req,res) => {
        var username = req.query.username
        var password = req.query.password
        var hashPassword = crypto.createHmac('sha256','secretabc').update(password).digest('hex')
        var sql = `select * from user where username = "${username}" and password = "${hashPassword}";`
        db.query(sql, (err,hasil) => {
                if(err) throw err
                res.send(hasil)
        })
    },

    // =============== Get data User Login  =============== 

    keepLogin : (req,res) => {
        var username = req.query.username
        var sql = `select * from user where username = '${username}';`
        db.query(sql, (err,hasil) => {
            try{
                if(err) throw err
                res.send(hasil)
            }
            catch(err) {
                res.send(err)
            }
           
        })
    },

    // =============== Data User / Verifikasi =============== 

    verifyUser : (req,res) => {
        username = req.body.username
        password = req.body.password
        var sql = `update user set verified = 1 where username = '${username}'  and password = '${password}'`
        db.query(sql, (err,hasil) => {
            if(err) throw err
            res.send('Email Anda Sudah terverifikasi')
            console.log(hasil);
            
        })
    }

}


