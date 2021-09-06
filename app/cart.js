import emitter from 'tiny-emitter/instance';
import _ from 'lodash'

var cart = {}


cart.data = {
    items: [],
    total: 0,
    totalProduse: 0,
}

cart.refresh=()=>{
    cart.data.total=0;
    cart.data.totalProduse=0;
    cart.data.items.map((item)=>{
        cart.data.total+=item.price*item.quantity
        cart.data.totalProduse+=item.quantity
    })
    cart.data.total = parseFloat(cart.data.total.toFixed(2));
    emitter.emit("cart-update")
}

cart.add=(item)=>{
    var index = _.findIndex(cart.data.items, {'id':item.id});

    var item_founded = null;

    if(index !== -1){

        item_founded = cart.data.items[index];

        var current_qty = item.quantity;

        var founded_qty = item_founded.quantity;

        var new_qty = current_qty + founded_qty;

        cart.updateCantitate(index, new_qty);

    } else{

        let itemCloned = _.cloneDeep(item);

        itemCloned.price = parseFloat(itemCloned.price);

        cart.data.items.push(itemCloned);

    }

    cart.refresh()
}

cart.updateCantitate=(index, cantitate)=>{
    
    if(cantitate <= 0){
        cart.data.items.splice(index, 1)
    }
    if(cantitate > 0){
        cart.data.items[index].quantity = cantitate
    }
    cart.refresh()
}

cart.empty=()=>{
    cart.data = {
        items: [],
        total: 0,
    }
    cart.refresh();
}

export default cart;
