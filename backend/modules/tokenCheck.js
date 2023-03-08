let jwt = require('jsonwebtoken');
let fs = require('fs');
let path = require('path');
module.exports = {
    tokenCheck: () => (req, res, next) => {
        if (req.params.table){
            if ((req.params.table=="auctions" || req.params.table=="bidders" ||
                req.params.table=="coins" || req.params.table=="cointags" ||
                req.params.table=="tags" || req.params.table == "users" || 
                req.params.table=="auctionbidders") && req.method=="GET"){
                    next();
            }
            else res.status(401).json({name: 'JsonWebTokenError',message: "No token given!"});
        }
        else{
            if (req.headers.authorization) {
                try {
                    jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWTTOKEN);
                    fs.readFile(path.join(__dirname, '../blacklist.json'), (err, data) => {
                        if (JSON.parse(data).includes(req.headers.authorization.split(' ')[1])) res.status(401).send({
                            name: 'JsonWebTokenError',
                            message: 'Your token is on the blacklist!'
                        })
                        else next();
                    })
                }
                catch (err) {
                    res.status(401).send(err);
                }
            }
            else {
                switch (req.params.table) {
                    default: res.status(401).json({name: 'JsonWebTokenError',message: "No token given!"});
                        break;
                    
                }
    
            }
        }
    },
    getUser: (req, res) => {
        try {
            res.status(200).json(jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWTTOKEN));
        }
        catch {
            res.status(200).json({
                permission: 0
            })
        }
    }
}