let Router = require('express').Router();
const { default: axios } = require('axios');
let nodemailer = require('nodemailer');
let tokencheck = require('../modules/tokenCheck').tokenCheck;
let path = require('path');
let log = require('../logging').log;
let ejs = require('ejs');
Router.post("/to/:id", (req,res)=>{
    axios.get('http://localhost:8080/api/users/ID/'+req.params.id, {headers:{'Authorization':req.headers.authorization}}).then(response=>{
        if (response.data.length>0){
            let targetEmail = response.data[0].email;
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
                ejs.renderFile(path.join(__dirname, '../mailv2.ejs'), {
                    emailData:{
                        auctionID: req.body.auctionID,
                        auctionTitle: req.body.auctionTitle,
                        auctionPoster: {
                            email:req.body.auctionPosterEmail,
                            phone:req.body.auctionPosterPhone,
                            fullname:req.body.auctionPosterFullName
                        }
                    }
                }, (err, data)=>{
                    if (err) res.status(500).send(err);
                    else {
                        transporter.sendMail({
                            from:"noreply@petak.hu",
                            to:targetEmail,
                            subject:"Aukció #"+req.body.auctionID,
                            html: data
                            }, (err, info)=>{
                                if (err) res.status(500).send(err);
                                else{
                                    log(req.socket.remoteAddress, "Sent an email to UID:"+req.params.id+'\n'+nodemailer.getTestMessageUrl(info))
                                    res.status(200).send({
                                        message:"Sikeres levélküldés!",
                                        url: nodemailer.getTestMessageUrl(info)
                                    });
                                } 
                        })
                    }
                }) 
            })
        }
    }).catch(err=>{
        res.status(500).send(err);
    })
})
module.exports = Router;