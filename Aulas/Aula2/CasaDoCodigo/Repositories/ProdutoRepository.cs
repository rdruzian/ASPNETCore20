using CasaDoCodigo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CasaDoCodigo.Repositories
{
    public class ProdutoRepository : IProdutoRepository
    {
        private readonly ApplicationContext context;

        public ProdutoRepository(ApplicationContext context)
        {
            this.context = context;
        }

        public void SaveProdutos(List<Livro> livros)
        {
            //adiciona todos os itens de livros no banco
            foreach (var livro in livros)
            {
                context.Set<Produto>().Add(new Produto(livro.Codigo, livro.Nome, livro.Preco));
            }
            //salva todas as alterações feitas no banco
            context.SaveChanges();
        }
    }

    public class Livro
    {
        public string Codigo { get; set; }
        public string Nome { get; set; }
        public decimal Preco { get; set; }
    }
}
