const KEY_PEDIDO = "restaurante-do-china:pedido-list";
const KEY_TOTAL = "restaurante-do-china:total";
const KEY_LOAD_PEDIDO = "restaurante-do-china:loaded";

class Pedido {
    constructor() {
        this.listaProdutos = [];
        this.total = 0;
    }

    addProduto(item) {
        this.listaProdutos.push(item);
        this.total += item.price;

        this.load();
    }

    removeProduto(item) {
        let index = this.listaProdutos.indexOf(item);
        this.listaProdutos.splice(index,1);
        this.total -= item.price;

        this.load();
    }

    readFromStorage() {
        if(JSON.parse(localStorage.getItem(KEY_PEDIDO))) {
            this.listaProdutos = JSON.parse(localStorage.getItem(KEY_PEDIDO));
        } else {
            this.listaProdutos = [];
        }
        if(localStorage.getItem(KEY_TOTAL)) {
            this.total = parseFloat(localStorage.getItem(KEY_TOTAL));
        } else {
            this.total = 0;
        }
    }
    /*
     * Carrega o pedido no sessionStorage
     * @param {} pedido 
     */
    load() {
        localStorage.setItem(KEY_PEDIDO, JSON.stringify(this.listaProdutos));
        localStorage.setItem(KEY_TOTAL, this.total);
    }

    
}

export default Pedido;