export default function(history){
    history=history.slice(1,history.length)
    var text=JSON.stringify(history)
    text=text.substring(1,text.length-1).trim()
    return text;
}