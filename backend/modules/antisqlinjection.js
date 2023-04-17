function prevent(text){
    text = text.toString();
    text = text.replaceAll("'", "\\'");
    text = text.replaceAll('"', '\\"');
    text = text.replaceAll(';', '\\;');
    return text;
}
module.exports = prevent;