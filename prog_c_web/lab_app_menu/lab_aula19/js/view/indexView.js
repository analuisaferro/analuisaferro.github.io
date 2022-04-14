//import data from './model/categories.json';

class IndexView {
    constructor(objectSelector) {
        this.domObj = document.querySelector(objectSelector); 
    }

    //Cria a página principal
    loadMain() {
        //cria o banner
        this.domObj.innerHTML = `<div class="jumbotron">
            <img src="images/jumbotron_768.jpg" alt="Picture of restaurant" class="img-responsive visible-xs">
        </div>`;
        //cria as três opções - Menu, Especiais e Mapa
        this.domObj.innerHTML  += `<div id="home-tiles" class="row">
            <div class="col-md-4 col-sm-6 col-xs-12">
                <a href="#"><div id="menu-tile"><span>menu</span></div></a>
            </div>
            <div class="col-md-4 col-sm-6 col-xs-12">
            <a href="#"><div id="specials-tile"><span>especiais</span></div></a>
            </div>
            <div class="col-md-4 col-sm-12 col-xs-12">
            <a href="https://www.google.com/maps/place/David+Chu's+China+Bistro/@39.3635874,-76.7138622,17z/data=!4m6!1m3!3m2!1s0x89c81a14e7817803:0xab20a0e99daa17ea!2sDavid+Chu's+China+Bistro!3m1!1s0x89c81a14e7817803:0xab20a0e99daa17ea" target="_blank"><div id="map-tile"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3084.675372390488!2d-76.71386218529199!3d39.3635874269356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c81a14e7817803%3A0xab20a0e99daa17ea!2sDavid+Chu's+China+Bistro!5e0!3m2!1sen!2sus!4v1452824864156" style="border:0" allowfullscreen="" width="100%" height="250" frameborder="0"></iframe><span>mapa</span></div></a></div>
        </div>`;
    }

    /*
        Tela de exibição das categorias de pratos
    */
    createCategories(catList){
        
        let h2MenuCategories = document.createElement("h2");
        h2MenuCategories.classList.add("text-center");
        h2MenuCategories.id = "menu-categories-title";
        h2MenuCategories.innerHTML = "Categorias";
        let divInstructions = document.createElement("div");
        divInstructions.classList.add("text-center");
        divInstructions.innerHTML = "Substituimos arroz branco por arroz integral ou frito depois de 15:00 por um adicional de $1.5 por porção.";
        let sectionCat = document.createElement("section");
        sectionCat.classList.add("row");
        //carregando na página
        this.domObj.innerHTML = "";
        
        this.domObj.appendChild(h2MenuCategories);
        this.domObj.appendChild(divInstructions);
        this.domObj.appendChild(sectionCat);
        
        catList.forEach((item) =>{
            this.createCat(item);
        })

    }

    /**
     * função que gera cada uma das categorias na tela
     * @param {objeto categoria} cat 
     */
    /* exemplo
    <div class="col-md-3 col-sm-4 col-xs-6 col-xxs-12">
    <a href="#" onclick="loadMenuItems('A');">
        <div class="category-tile">
        <img src="images/menu/A/A.jpg" alt="Soup" width="200" height="200">
        <span>Soup</span>
        </div>
    </a>
    */
    createCat(cat){ 
        //recupera o #main-content e coloca as categorias
        let sectionMenu = document.querySelector("#main-content section");
        let boxCat = 
            `<div class="col-md-3 col-sm-4 col-xs-6 col-xxs-12">
                <a href="#" class="cat-item"> 
                    <div class="category-tile">
                        <img src="images/menu/${cat.short_name}/${cat.short_name}.jpg"
                            alt="${cat.name}" width="200" height="200"
                            class="${cat.short_name} categoria">
                        <span class="${cat.short_name} categoria">${cat.name}</span>
                    </div>
                </a>
            </div>`;
        
        sectionMenu.innerHTML += boxCat;
    }

    /**
     * Tela de exibição dos pratos
     * @param {objeto categoria de pratos} category 
     * @param {lista de pratos associados à categoria} dishList 
     */
    createDishes(category, dishList, pedido) {
        //Nova div para o pedido
        let divPedido = `<h3 id="meupedidoh3">Meu pedido</h3> <h4 id='totalPedido'>0</h4><ul id='pedidoList'></ul>
                        <hr>`;
        let h2MenuCategories = `
        <h2 class="text-center" id="menu-categories-title">Menu ${category.name}</h2>`;
        let divInstructions = `<div class="text-center">${category.special_instructions}</div>`;
        let sectionCat = `<section class="row"></section>`;
        console.log(divInstructions);
        //carregando na página
        this.domObj.innerHTML = "";
        this.domObj.innerHTML += divPedido; //appendChild(divPedido);
        this.domObj.innerHTML += h2MenuCategories;
        this.domObj.innerHTML += divInstructions;
        this.domObj.innerHTML += sectionCat;
        
        
        dishList.forEach((item) =>{
            this.createDish(item);
        });

        this.listPedido(pedido); 
    }

    createDish(dish) {
        let card = `<div class="menu-item-tile col-md-6">
                        <div class="row">
                            <div class="col-sm-5">
                                <div class="menu-item-photo">
                                    <div class="menu-item">${dish.code}</div>
                                    <img class="img-responsive" 
                                    src="${dish.photo}" alt="Item" 
                                    width="250" height="150">
                                </div>
                                <div>
                                    <span> </span> ${dish.price} 
                                    <span></span>
                                </div>
                            </div>
                            <div class="menu-item-description col-sm-7">
                                <h3 class="menu-item-title">${dish.name}</h3>
                                <p class="menu-item-details">${dish.details}</p>
                            </div>
                            <button id="${dish.code}" class="btn btn-primary pedir">Pedir</button>
                        </div>
                        <hr class="visible-xs">
                    </div>`;
        this.domObj.innerHTML += card;
    }

    /**
     * Pega a relação de pratos pedidos e exibe na tela
     * @param {} pedido 
     */
    listPedido(pedido) {
        let totalObj = document.getElementById("totalPedido");
        totalObj.innerHTML = "0";
        if(pedido.total) {
            totalObj.innerHTML = pedido.total;
        }

        let listaPedido = pedido.listaProdutos;
        let itemsObj = document.getElementById("pedidoList");
        itemsObj.innerHTML = "";
        listaPedido.forEach((item) => {
            itemsObj.innerHTML = itemsObj.innerHTML + `<li>${item.name} ` + ` <a id="${item.code}" class="listout">Remover</a> </li>`;
        })

    }
}
export default IndexView;