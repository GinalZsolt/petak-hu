function log(ip, message){
    console.log(`[${new Date().toISOString()}]: ${ip} -> ${message}`);
}
module.exports= {log};