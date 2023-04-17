let jwt = require('jsonwebtoken');
let fs = require('fs');
let path = require('path');

function IsWhiteListedTable(table){
    switch (table){
        case "auctions":
        case "coins":
        case "tags":
        case "tagcategories":
        case "cointags":
        case "bidders":
        case "users":
        case "moderations":
        case "auctionbidders":
        case "bidders":
            return true;
        default: return false;
    }
}

module.exports = {
    tokenCheck: () => (req, res, next) => {
        if (req.params.table){
            if (IsWhiteListedTable(req.params.table) && req.method=="GET"){
                next();
            }
            else {
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
                else res.status(401).json({
                    name:'JsonWebTokenError',
                    message: 'You need a token for this!'
                })
            }
        }
        else next();
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