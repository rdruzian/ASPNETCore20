using CasaDoCodigo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CasaDoCodigo.Repositories
{
    public interface IItemPedidoRepository
    {
        void UpdateQtde(ItemPedido itemPedido);
    }
    public class ItemPedidoRepository : BaseRepository<ItemPedido>, IItemPedidoRepository
    {
        public ItemPedidoRepository(ApplicationContext context) : base(context)
        {

        }

        public void UpdateQtde(ItemPedido itemPedido)
        {
            var itemDB = dbSet.Where(ip => ip.Id == itemPedido.Id).SingleOrDefault();
            if(itemDB != null)
            {
                itemDB.AtualizaQtde(itemPedido.Quantidade);
                context.SaveChanges();
            }
        }
    }
}
