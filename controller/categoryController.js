var db = require('./../database')

module.exports = {
    getCategory : (req,res) => {
        var sql = `select * from category`
        db.query(sql, (err,hasil) => {
            if(err) throw err
            res.send(hasil)
        })
    },
    addCategory : (req,res) => {
        var sql = `insert into category set ?`
        db.query(sql, req.body, (err,hasil) => {
            if(err) throw err
            res.send("Add Category Sukses")
        })
    },
    editCategory : (req,res) => {
        id = req.params.id
        var sql = `update category set ? where id = ${id}`
            db.query(sql, req.body, (err,hasil) =>{
                if(err) throw err
                res.send('Edit Category Sukses')
            })
    },
    deleteCategory : (req,res) => {
        id = req.params.id
        var sql = `delete from category where id = ${id}`
            db.query(sql, (err,hasil) =>{
                if(err) throw err
                res.send('Delete Category Sukses')
            })
    },
}