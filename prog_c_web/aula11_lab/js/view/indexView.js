/**
 * Scripts de view determinam como será apresentado
 * o seu modelo de dados na tela
 * 
 */

/**
 * Define como os itens serão carregados na tela
 * @param {lista de itens} foods 
 */
function createItems(foods) {
    //recupera o container dos itens
    let menu = document.querySelector("#menu");
    //apagando os itens atuais do DOM
    menu.innerHTML = "";
    foods.forEach(food => {
        let figFood = document.createElement("figure");
        figFood.id = `food-${food.id}`;
        figFood.innerHTML =`<div id="editar"><button type="button" id=${food.id} class="editar">Editar</button></div> <img src=${food.image} alt=${food.name}> <figcaption>${food.name}</figcaption>`;
        menu.appendChild(figFood);
    });
}

function save() {
    document.querySelector('#save-food').blur();
    return Object.fromEntries(new FormData(formFood));
}

export default { createItems, save };