(function() {
  'use strict';

  const amigos = [];
  const campoNome = document.getElementById('nome-amigo');
  const listaAmigos = document.getElementById('lista-amigos');
  const resultadoSorteio = document.getElementById('resultado');
  const botaoAdd = document.getElementById('botao-add');
  const botaoSortear = document.getElementById('botao-sortear');
  const botaoReiniciar = document.getElementById('botao-reiniciar');
  const mensagemErro = document.getElementById('mensagem-erro');

  function atualizarInterface() {
    listaAmigos.innerHTML = '';
    amigos.forEach(nome => {
      const li = document.createElement('li');
      li.textContent = nome;
      listaAmigos.appendChild(li);
    });
    botaoSortear.disabled = amigos.length < 2;
  }

  function mostrarErro(msg) {
    mensagemErro.textContent = msg;
    mensagemErro.hidden = false;
  }

  function limparErro() {
    mensagemErro.textContent = '';
    mensagemErro.hidden = true;
  }

  function adicionarAmigo() {
    const nome = campoNome.value.trim();
    if (!nome) {
      mostrarErro('Por favor, digite um nome válido.');
      return;
    }
    if (amigos.includes(nome)) {
      mostrarErro('Esse nome já foi adicionado.');
      return;
    }
    amigos.push(nome);
    campoNome.value = '';
    campoNome.focus();
    limparErro();
    atualizarInterface();
  }

function sortearAmigo() {
    if (amigos.length < 3) {
        mostrarErro('Para sortear, adicione 3 ou mais amigos.');
        return;
    }

    const amigosSorteaveis = [...amigos];

    for (let i = amigosSorteaveis.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [amigosSorteaveis[i], amigosSorteaveis[j]] = [amigosSorteaveis[j], amigosSorteaveis[i]];
    }

    const paresSorteados = amigos.map((dono, index) => {
        let amigoSecreto = amigosSorteaveis[index];
        
        if (dono === amigoSecreto) {
            const proximoIndex = (index + 1) % amigosSorteaveis.length;
            amigoSecreto = amigosSorteaveis[proximoIndex];
            amigosSorteaveis[proximoIndex] = dono;
        }
        return `${dono} -> ${amigoSecreto}`;
    });

    
    resultadoSorteio.innerHTML = '';
    paresSorteados.forEach(par => {
        const li = document.createElement('li');
        li.textContent = par;
        resultadoSorteio.appendChild(li);
    });

    
    limparErro();
}
  function reiniciarJogo() {
    amigos.length = 0;
    campoNome.value = '';
    resultadoSorteio.textContent = '';
    limparErro();
    atualizarInterface();
    campoNome.focus();
  }

  
  botaoAdd.addEventListener('click', adicionarAmigo);
  campoNome.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      adicionarAmigo();
    }
  });
  botaoSortear.addEventListener('click', sortearAmigo);
  botaoReiniciar.addEventListener('click', reiniciarJogo);

  campoNome.focus();
})();
