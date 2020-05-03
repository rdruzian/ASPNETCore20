
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
        }).done(function (response) {
            let itemPedido = response.itemPedido;
            let linhaItem = $('[item-id=' + itemPedido.id + ']');

            linhaItem.find('input').val(itemPedido.Quantidade);

            linhaItem.find('[subtotal]').html((itemPedido.Subtotal).duasCasas());

            let carrinhoVM = response.carrinhoViewModel;
            $('[numero-itens]').html('Total:' + carrinhoVM.itens.length + 'itens');
            $('[total]').html((carrinhoVM.total).duasCasas());

            if (itemPedido.Quantidade == 0) {
                linhaItem.remove();
            }
        });
    }
}

var carrinho = new Carrinho()

Number.prototype.duasCasas = function () {
    return this.toFixed(2).replace('.', ',');
}