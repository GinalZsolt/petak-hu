
let nodemailer = require('nodemailer');
let router = require('express').Router();

router.post('/hello', async (req, res) => {
    let account = await nodemailer.createTestAccount();
    let jasonStatham = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: account.user,
            pass: account.pass
        }
    })
    let info = await jasonStatham.sendMail({
        from: '"Peták.hu" <noreply@petak.hu>', // sender address
        to: "balazs.zick2@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });
    console.log(info.messageId);
    console.log(nodemailer.getTestMessageUrl(info));
    res.status(200).send('bruh');
})


module.exports = router;