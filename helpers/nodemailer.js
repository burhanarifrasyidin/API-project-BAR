const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'burhan.d3mits@gmail.com',
        pass: 'xtfdrabrjtlsoygf'
    },
    tls: {
        rejectUnauthorized: false
    }
})

module.exports = transporter
