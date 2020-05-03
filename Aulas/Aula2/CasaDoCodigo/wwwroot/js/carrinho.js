
class Carrinho {
    clickIncremento(btn) {
        let data = this.getData(btn);
        data.Quantidade++;
        this.postQtde(data);
    }

    clickDecremento(btn) {
        let data = this.getData(btn);
        data.Quantidade--;
        this.postQtde(data);
    }

    updateQtde(input) {
        let data = this.getData(input);
        this.postQtde(data);
    }

    getData(elemento) {
        var linhaItem = $(elemento).parents('[item-id]')
        var itemId = $(linhaItem).attr('item-id');
        var novaQtde = $(linhaItem).find('input').val();

        return {
            Id: itemId,
            Quantidade: novaQtde
        };
    }

    postQtde(data) {
        $.ajax({
            url: '/pedido/updateqtde',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data)
        });
    }
}

var carrinho = new Carrinho()