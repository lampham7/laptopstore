let httpGetAsync = function(url, method, data=null, resolve, reject, waiting=null){
    let http = new XMLHttpRequest();
    http.onreadystatechange=function(){
        if (http.readyState == 4 && http.status < 300) {
            resolve(http);
        }
        if (http.readyState == 2 || http.readyState == 3) {
            if (waiting !== null) {
                waiting();
            }
        }
        if (http.readyState == 4 && http.status > 400) {
            reject();
        }
        
    }
    http.withCredentials="true";
    http.open(method, url, true);
    http.send(data);
}
let numberWithComas = function(num){
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
let formatString = function(string){
    return string.trim()
}
export {httpGetAsync, numberWithComas, formatString}