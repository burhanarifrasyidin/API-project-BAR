var db = require('./../database')

module.exports = {
    // =============== Get Data Category =============== 

    getCategory : (req,res) => {
        var sql = `select * from category`
        db.query(sql, (err,hasil) => {
            if(err) throw err
            res.send(hasil)
        })
    },

    // =============== Add Data Category =============== 

    addCategory : (req,res) => {
        var sql = `insert into category set ?`
        db.query(sql, req.body, (err,hasil) => {
            if(err) throw err
            res.send("Add Category Sukses")
        })
    },

    // =============== Edit Data Category =============== 

    editCategory : (req,res) => {
        id = req.params.id
        var sql = `update category set ? where id = ${id}`
            db.query(sql, req.body, (err,hasil) =>{
                if(err) throw err
                res.send('Edit Category Sukses')
            })
    },

    // =============== Del Data Category =============== 

    deleteCategory : (req,res) => {
        id = req.params.id
        var sql = `delete from category where id = ${id}`
            db.query(sql, (err,hasil) =>{
                if(err) throw err
                res.send('Delete Category Sukses')
            })
    },

    // =============== Get Filter Data Category =============== 

    filterCat : (req,res) => {
        var category = req.query.category
        var sql = ''
        if (category) {
            sql = `select * from category where category like '${category}%'`
        }
        db.query(sql, (err, hasil) => {
            if (err) throw err
            res.send(hasil)
        })
    },
    filterCatProd : (req,res) => {
        var category = req.query.category
        var sql = ''
        if (category) {
            sql = `select * from category where category like '${category}%'`
        }
        db.query(sql, (err, hasil) => {
            if (err) throw err
            res.send(hasil)
        })
    }
}