// (matches with sailors id)
const link1 = document.getElementById('1');
const link2 = document.getElementById('2');
const link3 = document.getElementById('3');
const link4 = document.getElementById('4');
const link5 = document.getElementById('5');
const link6 = document.getElementById('6');
const link7 = document.getElementById('7');
const link8 = document.getElementById('8');
const link9 = document.getElementById('9');
const link10 = document.getElementById('10');
const test = document.querySelector(".sailorlink")
const cont = document.querySelector('.container')
let xhr = new XMLHttpRequest();

req(1);

link1.addEventListener('click',function(){
    req(this.id);
});
link2.addEventListener('click',function(){
    req(this.id);
});
link3.addEventListener('click',function(){
    req(this.id);
});
link4.addEventListener('click',function(){
    req(this.id);
});
link5.addEventListener('click',function(){
    req(this.id);
});
link6.addEventListener('click',function(){
    req(this.id);
});
link7.addEventListener('click',function(){
    req(this.id);
});
link8.addEventListener('click',function(){
    req(this.id);
});
link9.addEventListener('click',function(){
    req(this.id);
});
link10.addEventListener('click',function(){
    req(this.id);
});


function req(id){
    cont.innerHTML="";
    xhr.open('GET', 'https://analuisaferro.github.io/sailor-moon-json/sailor-guardians-json.json');
    xhr.onreadystatechange = function(){
        if (xhr.readyState==4 && xhr.status==200){
            let objJSON = JSON.parse(xhr.responseText);
            let guardian = objJSON.guardians[id-1]; //array index starts at 0, but sailor id starts at 1
            infoconstructor(guardian);
        }
    };
    xhr.send();
}
function infoconstructor(guardian){
    let leftDiv = document.createElement('div');
    leftDiv.setAttribute("id", "leftDiv");
    let rightDiv = document.createElement('div');
    rightDiv.setAttribute("id", "rightDiv");

    //working on leftDiv of '.container'
    console.log(guardian);
    leftDiv.innerHTML = `<p class="title">${guardian.guardianidentity}</p>
    <p class="desc">${guardian.info}</p>
    <img src="${guardian.img}" alt="${guardian.name} bust">
    <p class="intro">"${guardian.introduction}"</p>`;

    cont.appendChild(leftDiv);

    //working on rightDiv of '.container'
    rightDiv.innerHTML = `<p class="block">${guardian.bio}</p>
    <p>Birthday: ${guardian.birthday} (${guardian.zodiacsign})</p>
    <p>First Appearance: ${guardian.firstappearance}</p>
    <p>Aliases:</p>`;
    const aliasesUl = document.createElement('ul');
    for(alias of guardian.aliases){
        let aliasesLi = document.createElement('li');
        aliasesLi.innerHTML = alias;
        aliasesUl.appendChild(aliasesLi);
    }
    rightDiv.appendChild(aliasesUl);

    cont.appendChild(rightDiv);
}