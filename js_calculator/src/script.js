function display(n){
    let number =  document.querySelector(".display").innerHTML
    if(number.length >= 16)
    window.alert("Número de caracteres máximo atingido");
    else
    document.querySelector(".display").innerHTML = document.querySelector(".display").innerHTML + n;
}
function clean(){
    document.querySelector(".display").innerHTML = "";
}
function result(){
    let dp = document.querySelector(".display").innerHTML;
    if(dp){
        try{
            if(!eval(dp))
                window.alert("Operação inválida")
            else{
                if(eval(dp).toString().length >= 16){
                    document.querySelector(".display").innerHTML = eval(dp).toFixed(8);
                }
                else
                document.querySelector(".display").innerHTML = eval(dp);
            }
        }catch (e){
            if (e instanceof SyntaxError) {
                window.alert("Operação Inválida");
            }else{
                throw e;
            }
        }
    }
}
function erase(){
    let dp = document.querySelector(".display").innerHTML
    document.querySelector(".display").innerHTML = dp.substring(0, dp.length -1)
}