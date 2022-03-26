const link1 = document.getElementById('1')
const link2 = document.getElementById('2');
const link3 = document.getElementById('3');
const link4 = document.getElementById('4');
const link5 = document.getElementById('5');
const link6 = document.getElementById('6');
const link7 = document.getElementById('7');
const link8 = document.getElementById('8');
const link9 = document.getElementById('9');
const link10 = document.getElementById('10');
const cont = document.querySelector('.container')
let xhr = new XMLHttpRequest();

link1.addEventListener('click',function(){
    cont.innerHTML=" ";
    xhr.open('GET', 'https://analuisaferro.github.io/sailor-moon-json/sailor-guardians-json.json');

    xhr.onreadystatechange = function(){
        if (xhr.readyState==4 && xhr.status==200){
            let objJSON = JSON.parse(xhr.responseText);
            console.log(objJSON);
            let guardian = objJSON.guardians[0];
            console.log(guardian)
            infoconstructor(guardian);
            
        }
    };
    xhr.send();
});
link2.addEventListener('click',function(){
    req(this.id);
});
    
function req(id){
    console.log(id);
    cont.innerHTML="";
    xhr.open('GET', 'https://analuisaferro.github.io/sailor-moon-json/sailor-guardians-json.json');
    xhr.onreadystatechange = function(){
        if (xhr.readyState==4 && xhr.status==200){
            let objJSON = JSON.parse(xhr.responseText);
            console.log(objJSON.ID);
            const sailorId = objJSON.find(id => objJSON.ID == id)
            
            let guardian = objJSON.guardians[sailorId];
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
    leftDiv.innerHTML = `<h2>${guardian.guardianidentity}</h2>
    <p class="tiny">${guardian.info}</p>
    <img src="${guardian.img}" alt="${guardian.name} bust">
    <p>${guardian.introduction}</p>`;

    cont.appendChild(leftDiv);

    //working on rightDiv of '.container'
    rightDiv.innerHTML = `<p>Name: ${guardian.name}</p>
    <p>Birthday: ${guardian.birthday} (${guardian.zodiacsign})</p>
    <p>First Appearance: ${guardian.firstappearance}</p>
    <p>Aliases:</p>`;
    const aliasesUl = document.createElement('ul');
    console.log(guardian.aliases);
    for(alias of guardian.aliases){
        let aliasesLi = document.createElement('li');
        aliasesLi.innerHTML = alias;
        aliasesUl.appendChild(aliasesLi);
    }

    rightDiv.appendChild(aliasesUl);


    cont.appendChild(rightDiv);

}