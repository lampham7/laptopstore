export let $ = document.querySelector.bind(document);
export let $$ = document.querySelectorAll.bind(document);
export let numberWithComas = function(num){
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export let validateString = function(data){
    return data.trim();
}