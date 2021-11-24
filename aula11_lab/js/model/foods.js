
/**
 * Scripts de Model abstraem o seu modelo de dados
 * definindo suas funções de manipulação
 */
const KEY_FOODS = "foods-app:foods";
const KEY_LOAD_FOODS = "foods-app:loaded";

function create(food) {
    //atribuir um id ao food
    food = {id:nextId(), ...food};
    //pegar a lista completa
    const foods = JSON.parse(localStorage.getItem(KEY_FOODS));
    //adicionar um novo elemento
    foods.push(food); //[...foods, food];
    
    //atualizar o storage
    load(foods);
    return read();
}

/**
 * 
 * @param {*} id 
 * @returns se id definido, retorne o alimento; caso contrário todos
 */
function read (id) {
    const foods = JSON.parse(localStorage.getItem(KEY_FOODS));
    if(id) {
        //retorne o alimento com o id passado
        const food = foods.find((food) => food.id === id);
        return food;
    }
    //se id não passado, retorna todos os alimentos
    return foods;
}


function update (id, food){
    const foods = read();
    //determinar o indice do array com o elemento que tenha o id
    const index = foods.findIndex((food) => food.id === id);
    //se encontrar, altere
    if (index >= 0) {
        //alterar qualquer campo, exceto o id
        foods[index] = {id, ...food};
    }
    //atualizar o storage
    load(foods);

    return food;
}

function destroy (id) {
    const foods = read();
    //determinar o indice do array com o elemento que tenha o id
    const index = foods.findIndex((food) => food.id === Number(id));
    //se encontrar, remova
    if (index >= 0) {
        foods.splice(index, 1);
    }
    //atualizar o storage
    load(foods);
}

/**
 * função utilitária que carrega a lista no storage
 * @param {*} newFoods - carrega na Storage os alimentos
 */
function load(newFoods) {
    //armazenar na key o JSON convertido em String
    localStorage.setItem(KEY_FOODS, JSON.stringify(newFoods));
}

function restart(dataset) {
    localStorage.setItem(KEY_LOAD_FOODS, "restart");
    return listFood(dataset);
}

/**
 * funcao utilitária de retorna o possível próximo id
 * a ser armazenado na lista
 */
function nextId(){
    //ler todos os items armazenados na storage
    const foods = read();
    //criar um array só com os ids
    const ids = foods.map((food) => food.id);
    //pegar o id de maior valor
    const maxId = Math.max(...ids);

    return maxId + 1;
}

/**
 * Função utilitária
 * @returns lista de Foods carregadas no Storage
 */
 function listFood(dataset) {
    //verifique se o app já foi carregado no storage
    if (localStorage.getItem(KEY_LOAD_FOODS) !== 'ok') {
        load(dataset);
        localStorage.setItem(KEY_LOAD_FOODS, 'ok');
    }
    return read();    
 }

export default { load, create, read, update, destroy, listFood, restart };