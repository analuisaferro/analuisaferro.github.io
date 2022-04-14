
const btn = document.querySelector("#valida")
$(function(){
    $("#valida").click(function(){
        let search = textcep.value;
        console.log(search);
        url = `https://viacep.com.br/ws/${search}/json/`;
        $.get(url, function(data, status){
            //programa para carregar o endereço na página;
            $("#adress").append("<li>"+ data.logradouro + "</li>")
            $("#adress").append("<li>"+ data.bairro + "</li>")
            $("#adress").append("<li>"+ data.localidade + "</li>")
            $("#adress").append("<li>"+ data.uf + "</li>")
        })
    })
});