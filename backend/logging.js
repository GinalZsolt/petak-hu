function log(ip, message){
    console.log(`[${new Date()}]: ${ip} -> ${message}`);
}
module.exports= {log};