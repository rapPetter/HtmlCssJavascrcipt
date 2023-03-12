const tituloPrincipal = document.getElementById('titulo');
const labelTitulo =  document.getElementById('labelTitulo');
let validarTitulo = false;

const campoLinguagem = document.getElementById('linguagem');
const labelLinguagem =  document.getElementById('labelLinguagem');
let validarLinguagem = false;

const campoCategoria = document.getElementById('categoria');
const labelCategoria =  document.getElementById('labelCategoria');
let validarCategoria = false;

const campoDescricao = document.getElementById('descricao');
const labelDescricao =  document.getElementById('labelDescricao');
let validarDescricao = false;

const campoVideo = document.getElementById('linkVideo');
const labelVideo =  document.getElementById('labelVideo');
let validarVideo = true;

const btnSalvar = document.getElementById("btnSave");
const btnLimparFormulario = document.getElementById('btnLimpar');
const minhaLista = document.getElementById('cadastroInterno');
const form = document.getElementById('formulario-cadastro');

// validar os inputs do formulario
tituloPrincipal.addEventListener('keyup', () => {
  if(tituloPrincipal.value.length <=  7){
    labelTitulo.setAttribute('style', 'color: red')
    labelTitulo.innerHTML = 'Título *Insira no mínimo 8 caracteres'
    tituloPrincipal.setAttribute('style','border-color: red')
    validarTitulo = false
  }
  else{
    labelTitulo.setAttribute('style', 'color: green')
    labelTitulo.innerHTML = 'Título'
    tituloPrincipal.setAttribute('style','border-color: green')
    validarTitulo = true
  }
})
campoLinguagem.addEventListener('keyup', () => {
  if(campoLinguagem.value.length <=  3){
    labelLinguagem.setAttribute('style', 'color: red')
    labelLinguagem.innerHTML = 'Linguagem/Skill *Insira no mínimo 4 caracteres'
    campoLinguagem.setAttribute('style','border-color: red')
    validarLinguagem = false
  }
  else{
    labelLinguagem.setAttribute('style', 'color: green')
    labelLinguagem.innerHTML = 'Linguagem/Skill'
    campoLinguagem.setAttribute('style','border-color: green')
    validarLinguagem = true
  }
})
campoCategoria.addEventListener('click', () => {
  if(campoCategoria.value.length <= 0){
    labelCategoria.setAttribute('style', 'color: red')
    labelCategoria.innerHTML = 'Categoria *Insira uma das categorias abaixo'
    campoCategoria.setAttribute('style','border-color: red')
    validarCategoria = false
  }
  else{
    labelCategoria.setAttribute('style', 'color: green')
    labelCategoria.innerHTML = 'Categoria'
    campoCategoria.setAttribute('style','border-color: green')   
    validarCategoria = true
  }
})
campoDescricao.addEventListener('keyup', () => {
  if(campoDescricao.value.length <=  32){
    labelDescricao.setAttribute('style', 'color: red')
    labelDescricao.innerHTML = 'Descrição *Insira no mínimo 32 caracteres'
    campoDescricao.setAttribute('style','border-color: red')
    validarDescricao = false
  }
  else{
    labelDescricao.setAttribute('style', 'color: green')
    labelDescricao.innerHTML = 'Descrição'
    campoDescricao.setAttribute('style','border-color: green')
    validarDescricao = true
  }
})
campoVideo.addEventListener('keyup', () => {
  var v = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  if(campoVideo.value.match(v) || campoVideo.value === ''){
    labelVideo.setAttribute('style', 'color: green')
    labelVideo.innerHTML = 'Link do vídeo do YouTube'
    campoVideo.setAttribute('style','border-color: green')
    validarVideo = true
   } else{
    labelVideo.setAttribute('style', 'color: red')
    labelVideo.innerHTML = 'Link do vídeo* É valido somente link do YouTube!'
    campoVideo.setAttribute('style','border-color: red')
    validarVideo = false
   } 
})

// previne o evento padrao do formulario
form.addEventListener('submit', (event) =>{
  event.preventDefault();
})


const mostrarTotal = document.getElementById("demoTotal");
const clickTotal = document.getElementById("clickTotal");

const totalFront = document.getElementById("demoFront");
const clickFront = document.getElementById("clickFront");

const totalBack = document.getElementById("demoBack");
const clickBack = document.getElementById("clickBack");

const totalFull = document.getElementById("demoFull");
const clickFull = document.getElementById("clickFull");

const totalSoft = document.getElementById("demoSoft");
const clickSoft = document.getElementById("clickSoft");

const mostrarCategoria = document.getElementById("mostrarCategoira");



// aqui a pesquisa abaixao
const campoBusca = document.getElementById("Pesquisar");
const btnBuscar = document.getElementById("btnPesquisa");
const btnLimparBusca = document.getElementById("btnLimparCampos");


let listadecadastro= []

let editarPorId = false;

recuperarItens()

function cadastrar(){
  if(validarTitulo && validarLinguagem && validarCategoria && validarDescricao && validarVideo){
  if(editarPorId) {
    const item = listadecadastro.find((item) => item.id === editarPorId)
    item.nome= tituloPrincipal.value, 
    item.linguagem= campoLinguagem.value,
    item.categoria= campoCategoria.value,
    item.descricao= campoDescricao.value,
    item.video= campoVideo.value     
    editarPorId = null
    alert('Item alterado com sucesso!')
  } else{
    const novoCadastro = {
    id: Date.now(),
    nome: tituloPrincipal.value, 
    linguagem: campoLinguagem.value,
    categoria: campoCategoria.value,
    descricao: campoDescricao.value,
    video: campoVideo.value,   
    }
    listadecadastro.push(novoCadastro)
    alert('Item cadastrado com sucesso!')
  }
  atualizarLista(listadecadastro);
  salvarItens();
  form.reset()

  }else{
    // verefica cada um dos campos e da mensagem de erro em qual campo nao esta cadastrado certo
    if(validarVideo === false){
      alert(`Favor cadastrar o link de um video do youtube para salvar.
      Ou deixar sem nenhum link dentro do campo!`);
    }
    else if(validarTitulo === false){
    alert(`Favor cadastrar o campo "Título" corretamente para salvar.`);
    }
    else if(validarLinguagem === false){
    alert(`Favor cadastrar o campo "linguagem" corretamente para salvar.`);
    }
    else if(validarCategoria === false){
      alert(`Favor selecionar o campo "categoria" corretamente para salvar.`);
    }
    else if(validarDescricao === false){
      alert(`Favor cadastrar o campo "descrição" corretamente para salvar.`);
    }
  }   
    
}
function atualizarLista(banco) {
    // esse comando abaixo faz com que so seja gravado 1 li cada vez que o foreach for executado, para ele nao imprimir todos os itens do array ex:entrada= 1 restulado= 1
    // entrada 2 resultado =  1,2 entrada 3 resultado = 1,2,3
    minhaLista.innerHTML = ''

    banco.forEach((item) => {
        // aqui cria uma variaver para incrementar uma LI dentro da UL do html
        const li = document.createElement('li');
        const div = document.createElement('div');
        minhaLista.appendChild(li);
        
        const H2 = document.createElement('h2');
        H2.textContent = item.nome;
        li.appendChild(H2);

        const P1 = document.createElement('p');
        P1.innerHTML = `<strong>linguagem:</strong> ${item.linguagem}`;
        li.appendChild(P1);

        const P2 = document.createElement('p');
        P2.innerHTML = `<strong>Categoria:</strong> ${item.categoria}`;
        li.appendChild(P2);

        const P3 = document.createElement('p');
        P3.className='pDescrição';
        P3.innerHTML = `<strong>Descrição:</strong> <br>   ${item.descricao}`;
        li.appendChild(P3);

        li.appendChild(div);
        
        const imgVideo = document.createElement('img')
        imgVideo.src = "img/video.png"
        imgVideo.alt = "imagem do botão do video!"

        const video = document.createElement('a');

        if(item.video === ''){
          imgVideo.src = "img/semVideo.png"
          imgVideo.alt = "imagem do botão Sem o video!"
          video.appendChild(imgVideo)
          div.appendChild(video);  
        }

        else{
          imgVideo.className='imagemjs';
          video.textContent = ''
          video.href = item.video;
          video.target = "_blank"
          video.appendChild(imgVideo)
          div.appendChild(video); 
        }

        const imgDeletar = document.createElement('img')
        imgDeletar.className='imagemjs';
        imgDeletar.src = "img/deletar.png"
        imgDeletar.alt = "imagem do botão deletar!"
        imgDeletar.addEventListener("click", () => removeItem(item.id))
        div.appendChild(imgDeletar)

        const imgAlterar = document.createElement('img')
        imgAlterar.className='imagemjs';
        imgAlterar.src = "img/editar.png"
        imgAlterar.alt = "Imagem de editar o cadastro!"
        imgAlterar.addEventListener('click', () => editarItem(item))
        div.appendChild(imgAlterar)
    });  
  atualizarCategorias();
}

function removeItem(itemId) {
    const pergunta = confirm('Você tem certeza de que deseja deletar este item?')
    if(pergunta){
      listadecadastro = listadecadastro.filter((item) => item.id !== itemId)
      atualizarLista(listadecadastro)
      salvarItens()
    }
}

function salvarItens() {
  const itensJSON = JSON.stringify(listadecadastro)
  localStorage.setItem('listadecadastro', itensJSON)

}

function recuperarItens() {
  const itensJSON = localStorage.getItem('listadecadastro')

  if (itensJSON !== null) {
    listadecadastro = JSON.parse(itensJSON)
    atualizarLista(listadecadastro)
  }
}

function atualizarCategorias() {

  const total = listadecadastro.reduce((acumulador, item) => {
    return acumulador + 1
  },0)

  mostrarTotal.innerText = total;
  
  const totalFrontEnd = listadecadastro.reduce((acc, item) => {
    if(item.categoria === 'FrontEnd'){
      return acc + 1
    }else{
      return acc
    }  
  },0)

  totalFront.innerText = totalFrontEnd;

  const totalFullStack = listadecadastro.reduce((acc, item) => {
    if(item.categoria === 'FullStack'){
      return acc + 1
    }else{
      return acc
    }  
  },0)
  
  totalFull.innerText = totalFullStack;

  const totalBackEnd = listadecadastro.reduce((acc, item) => {
    if(item.categoria === 'BackEnd'){
      return acc + 1
    }else{
      return acc
    }  
  },0)  
  totalBack.innerText = totalBackEnd;

  const totalSoftSkill = listadecadastro.reduce((acc, item) => {
    if(item.categoria === 'Comportamental/Soft'){
      return acc + 1
    }else{
      return acc
    }  
  },0) 
  totalSoft.innerText = totalSoftSkill;

}

function editarItem(ItemParaEditar){
  const pergunta = confirm('Deseja realmente alterar este item?')
  if(pergunta){
  const {nome,linguagem, categoria, descricao,video} = ItemParaEditar
  tituloPrincipal.value = nome
  campoLinguagem.value = linguagem
  campoCategoria.value= categoria
  campoDescricao.value = descricao
  campoVideo.value =   video

  editarPorId = ItemParaEditar.id

  validarTitulo =true
  validarLinguagem =true
  validarCategoria = true 
  validarDescricao = true
  
  alert(`As informações do item selecionado para edição foram enviadas para a barra lateral.
  Realize as devidas edições e clique em Salvar para finalizar.`)
  }
}

btnSalvar.addEventListener("click",() =>{
  cadastrar()
});


form.addEventListener('reset', (event) =>{
  editarPorId = null
      // arrumar css e deixar os campos falsos novamente!
    labelTitulo.setAttribute('style', 'color: ')
    tituloPrincipal.setAttribute('style','border-color:')
    validarTitulo = false
  
    labelLinguagem.setAttribute('style', 'color:')
    campoLinguagem.setAttribute('style','border-color:')
    validarLinguagem =false
  
    labelCategoria.setAttribute('style', 'color: ')
    campoCategoria.setAttribute('style','border-color:')
    validarCategoria = false 
  
    labelDescricao.setAttribute('style', 'color: ')
    campoDescricao.setAttribute('style','border-color:')
    validarDescricao = false 

    labelVideo.setAttribute('style', 'color: ')
    campoVideo.setAttribute('style','border-color:')
    validarVideo = true

    mostrarCategoria.setAttribute('style', 'color: black')
    mostrarCategoria.innerHTML = ``;
    // arrumar css
})


// AQUI FAZ UMA BUSCA SOMENTE NA CATEGORIA QUE A PESSOA CLICA NA PAGINA
clickTotal.addEventListener('click', () => {
  mostrarCategoria.innerHTML = ` `;
  atualizarLista(listadecadastro)
})

clickFront.addEventListener('click', () => {
  const filteredList = listadecadastro.filter((item) =>
  item.categoria.includes('FrontEnd')
  )
  mostrarCategoria.innerHTML = `Abaixo está sendo exibido somente os cards de
  <strong>Categoria: FrontEnd </strong>`;
  mostrarCategoria.setAttribute('style', 'color: black');
  atualizarLista(filteredList);
})

clickBack.addEventListener('click', () => {
  const filteredList = listadecadastro.filter((item) =>
  item.categoria.includes('BackEnd')
  )
  mostrarCategoria.innerHTML = `Abaixo está sendo exibido somente os cards de
  <strong>Categoria: BackEnd </strong>`;
  mostrarCategoria.setAttribute('style', 'color: black');
  atualizarLista(filteredList);
})

clickFull.addEventListener('click', () => {
  const filteredList = listadecadastro.filter((item) =>
  item.categoria.includes('FullStack')
  )
  mostrarCategoria.innerHTML = `Abaixo está sendo exibido somente os cards de
  <strong>Categoria: FullStack </strong>`;
  mostrarCategoria.setAttribute('style', 'color: black');
  atualizarLista(filteredList);
})

clickSoft.addEventListener('click', () => {
  const filteredList = listadecadastro.filter((item) =>
  item.categoria.includes('Comportamental/Soft')
  )
  mostrarCategoria.innerHTML = `Abaixo está sendo exibido somente os cards de
  <strong>Categoria: Comportamental/Soft </strong>`;
  mostrarCategoria.setAttribute('style', 'color: black');
  atualizarLista(filteredList);
})
// ACIMA FAZ UMA BUSCA SOMENTE NA CATEGORIA QUE A PESSOA CLICA NA PAGINA!!!!



btnBuscar.addEventListener('click', () => {
  const filteredList = listadecadastro.filter((item) =>
    item.nome.toLocaleLowerCase().includes(campoBusca.value.toLocaleLowerCase())
  )
  if(filteredList.length === 0){
    mostrarCategoria.setAttribute('style', 'color: red')
    mostrarCategoria.innerHTML = ` Nenhum card registrado foi encontrado com esse título: <strong><h4>" ${campoBusca.value} "</h4></strong>  <br>
    Clique no botão limpar ou digite outro título`;
  }else{
    mostrarCategoria.innerHTML = `Abaixo está sendo exibido somente os cards da busca do título
    <strong>${campoBusca.value}</strong>`;
  }
  
  atualizarLista(filteredList);
})

btnLimparBusca.addEventListener('click', () => {
  campoBusca.value = ''
  mostrarCategoria.innerHTML = ` `;
  atualizarLista(listadecadastro)
})

btnLimparFormulario.addEventListener('click',() =>{
  form.reset()

})