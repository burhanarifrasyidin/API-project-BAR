var db = require('./../database')
var fs = require('fs')

module.exports = {
    getProfile: (req, res) => {
        var sql = `select e.id,u.id as idUser,e.nama,u.username,u.password,u.email,u.phone,e.tanggal_lahir,e.alamat,e.jenis_kelamin,image from edit_profile as e
        join user as u on e.id_user = u.id
        where e.id_user = ${req.params.id};`
        db.query(sql, (err, hasil) => {
            res.send(hasil)
        })
    },
    addProfile: (req, res) => {
        try {
            var newData = JSON.parse(req.body.data)
            newData.image = req.file.path
            var sql = `insert into edit_profile set ?`
            db.query(sql, newData, (err, hasil) => {
                if (err) throw err
                res.send('Add Sukses')
            })
        } catch (err) {
            res.send(err)
        }
    },
    editProfile : (req,res) => {
        var id = req.params.id
        if (req.file) {
            console.log(req.file)
            var data = JSON.parse(req.body.data)
            data.image = req.file.path
            var sql1 = `update edit_profile set ? where id = ${id}`
            db.query(sql1, data, (err, hasil) => {
                if (err) throw err
                res.send('Update Data Sukses')
                fs.unlinkSync(req.body.imageBefore)
            })
        } else {
            var data = req.body
            var sql = `update edit_profile set ? where id = ${id}`
            db.query(sql, data, (err, hasil) => {
                if (err) throw err
                res.send('Edit Data Sukses')
            })
        }
    },
    deleteProfile: (req,res) => {
        id = req.params.id
        var sql = `delete from edit_profile where id = ${id}`
            db.query(sql, (err,hasil) =>{
                if(err) throw err
                res.send('Delete Sukses')
            })
    },
}
