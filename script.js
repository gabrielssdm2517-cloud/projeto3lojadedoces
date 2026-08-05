const trufas = [
  { id: 1, nome: "Trufa de Prestígio", preco: "R$ 5,00", img: "imagem/prestigio.jpg" },
  { id: 2, nome: "Trufa de Brigadeiro", preco: "R$ 5,00", img: "imagem/brigadeiro.jpg" },
  { id: 3, nome: "Trufa de Maracujá", preco: "R$ 5,00", img: "imagem/maracuja.jpg" },
  { id: 4, nome: "Trufa de Morango", preco: "R$ 5,00", img: "imagem/morango.jpg" },
  { id: 5, nome: "Trufa de Limão", preco: "R$ 5,00", img: "imagem/limao.jpg" },
  { id: 6, nome: "Trufa de Abacaxi", preco: "R$ 5,00", img: "imagem/abacaxi.jpg" },
  { id: 7, nome: "Trufa de Ninho", preco: "R$ 5,00", img: "imagem/ninho.jpg" },
  { id: 8, nome: "Trufa de Ninho com Nutella", preco: "R$ 5,00", img: "imagem/ninhonutella.jpg" },
  { id: 9, nome: "Trufa de Laranja", preco: "R$ 5,00", img: "imagem/laranja.jpg" },
  { id: 10, nome: "Trufa de Chocolate Branco", preco: "R$ 5,00", img: "imagem/chocolatebranco.jpg" },
  { id: 11, nome: "Trufa de Paçoca", preco: "R$ 5,00", img: "imagem/paçoca.jpg" },
  { id: 12, nome: "Trufa de Goiaba", preco: "R$ 5,00", img: "imagem/goiaba.jpg" },
  { id: 13, nome: "Trufa de Ninho com Morango", preco: "R$ 5,00", img: "imagem/ninhomorango.jpg" },
  { id: 14, nome: "Trufa de Oreo", preco: "R$ 5,00", img: "imagem/oreo.jpg" },
  { id: 15, nome: "Trufa de Doce de Leite", preco: "R$ 5,00", img: "imagem/docedeleite.jpg" },
  { id: 16, nome: "Trufa de Ferrero Rocher", preco: "R$ 5,00", img: "imagem/abacaxi.jpg" }
];

function renderProducts() {
  const container = document.getElementById('products-grid');
  if (!container) return;
  
  container.innerHTML = trufas.map(trufa => `
    <div class="card">
      <img src="${trufa.img}" alt="${trufa.nome}">
      <div class="card-content">
        <h2 class="card-title">${trufa.nome}</h2>
        <div class="card-price">${trufa.preco}</div>
        <button class="buy-btn" onclick="adicionarAoCarrinho('${trufa.nome}')">Comprar</button>
      </div>
    </div>
  `).join('');
}

function adicionarAoCarrinho(nome) {
  alert(`Você adicionou "${nome}" ao carrinho!`);
}

// LÓGICA PARA ALTERNAR TEMA (CLAREAR / ESCURECER)
function mudarTema(tipo) {
  if (tipo === 'dark') {
    document.body.classList.add('dark-theme');
    localStorage.setItem('tema', 'dark');
  } else {
    document.body.classList.remove('dark-theme');
    localStorage.setItem('tema', 'light');
  }
}

// Carrega as configurações ao abrir a página
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  
  // Verifica se havia um tema salvo anteriormente
  const temaSalvo = localStorage.getItem('tema');
  if (temaSalvo === 'dark') {
    document.body.classList.add('dark-theme');
  }
});