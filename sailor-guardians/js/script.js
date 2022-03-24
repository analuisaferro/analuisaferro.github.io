const link1 = document.querySelector('#a-1');
const link2 = document.querySelector('#a-2');
const link3 = document.querySelector('#a-3');
const link4 = document.querySelector('#a-4');
const link5 = document.querySelector('#a-5');
const link6 = document.querySelector('#a-6');
const link7 = document.querySelector('#a-7');
const link8 = document.querySelector('#a-8');
const link9 = document.querySelector('#a-9');
const link10 = document.querySelector('#a-10');
const cont = document.querySelector('.container')
let xhr = new XMLHttpRequest();

link1.addEventListener('click',function(){
    xhr.open('GET', 'https://analuisaferro.github.io/sailor-moon-json/sailor-guardians-json.json');

    xhr.onreadystatechange = function(){
        if (xhr.readyState==4 && xhr.status==200){
            let objJSON = JSON.parse(xhr.responseText);
            let guardians = objJSON.Guardians[0];
            console.log(guardians.Info);
        }
    };
    xhr.send();
});

function constructor(guardian){
    console.log(guardian.Name)
}