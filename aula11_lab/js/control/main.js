import dataset from '../model/dataset.js';
import foods from '../model/foods.js';
import view from '../view/indexView.js';

/**
 * Script de controle lida com os eventos da página
 */

window.onload = () => {
    const foodList = foods.listFood(dataset);
    const formFood = document.getElementById("formFood");
    formFood.addEventListener("submit", saveFood);
    const btRecarregar = document.getElementById("recarregar");
    btRecarregar.onclick = reload;
    view.createItems(foodList);
}

// permite reiniciar o app com os 4 elementos do exemplo
function reload() {
    const foodList = foods.restart(dataset);
    view.createItems(foodList);
}

function saveFood(event) {
    //evitando a submissão do formulário
    event.preventDefault();
    // formatando os dados do form
    const newFood = view.updaate(); // {name: "???", image: "?url??"}
    // salvando na storage
    const foodList = foods.create(newFood);
    // exibindo os novos itens da storage
    view.createItems(foodList);

}

/** 
 * exemplo de evento para exclusão
 * utiliza delegação de eventos
 */
 document.addEventListener("click", (event) =>{
    //se o elemento criado dinamicamente que foi clicado for um figure

    if(event.target && 
        (event.target.matches("#menu img")
            || event.target.matches("#menu figcaption")
        )
    ) {
        let childFood = event.target;
        let figureFood = childFood.parentNode;
        let foodId = figureFood.id.substr(5); //id="food-#"
        foods.destroy(foodId);

        view.createItems(foods.listFood(dataset));
    }
    else if(event.target.matches(".editar")){
        const newFood = view.save();
        foods.update(parseInt(event.target.id), newFood)
        view.createItems(foods.listFood(dataset));

    }
})

