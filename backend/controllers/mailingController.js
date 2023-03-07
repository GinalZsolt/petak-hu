let Router = require('express').Router();
let nodemailer = require('nodemailer');
let tokencheck = require('../modules/tokenCheck').tokenCheck;
import axios from 'axios';
Router.post("/to/:id", tokencheck(), (req,res)=>{
    axios.get('http://localhost:8080/api/users/ID/'+req.params.id).then(res=>{
        if (res.data.length>0){
            let targetEmail = res.data[0].email;
            console.log(targetEmail);
            nodemailer.createTestAccount((err, account)=>{
                let transporter = nodemailer.createTransport({
                    host:'smtp.ethereal.email',
                    port: 587,
                    secure: false,
                    auth: {
                        user:account.user,
                        pass:account.pass
                    }
                })
                transporter.sendMail({
                    from:"noreply@petak.hu",
                    to:targetEmail
                    }, (err, info)=>{
                        if (err) res.status(500).send(err);
                        else{
                            console.log(info);
                            res.status(200).send(info);
                        } 
                })
            })
        }        
    })
})


module.exports = Router;