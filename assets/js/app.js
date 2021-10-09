//Variáveis responáveis pelos principais dados da aplicação.
let arrayCars = [];
let arrayWishes = [];

onload = () => {
  //Carrega dados do localStorage aramzenados em outros momentos de uso.
  const storageCars = JSON.parse(localStorage.getItem("arrayCars"));
  const storageWishes = JSON.parse(localStorage.getItem("arrayWishes"));

  //Se for encontrado alguma dado do localStorage, armazena ele em suas respctivas variáveis
  if (storageCars) {
    arrayCars = storageCars;
    loadLocalStorageFiles(arrayCars);
  }
  if (storageWishes) {
    arrayWishes = storageWishes;
    loadLocalStorageFiles(arrayWishes);
  }

  //Função: buscar as imagens armazenadas em dataUrl, de cada posição do array.
  //Parâmetro:
  //  array: variavel onde a imagem foi armazenada.
  function loadLocalStorageFiles(array) {
    //Para cada posição do array, chama a função de que retorna a imagem convertida para blob.
    array.forEach((arr) => {
      if (arr.image) {
        arr.image = dataURLtoBlob(arr.dataUrl);
      }
    });
  }

  //Função: converte as imagens armazenadas em dataUrl, para blob. Sendo assim, será possível mostrar essas imagens vindas do localStorage;
  //Parâmetro:
  //  dataurl: imagem a ser convertida de dataURL para blob.
  function dataURLtoBlob(dataurl) {
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  //Instancia vairáveis relacionadas aos campos dos formulários da aplicação.
  const formAddCar = document.querySelector("#formAddCar");
  const inputAddName = document.querySelector("#inputAddName");
  const inputAddYear = document.querySelector("#inputAddYear");
  const inputAddKm = document.querySelector("#inputAddKm");
  const inputAddMarch = document.querySelector("#inputAddMarch");
  const inputAddEngine = document.querySelector("#inputAddEngine");
  const inputAddFuel = document.querySelector("#inputAddFuel");
  const inputAddPower = document.querySelector("#inputAddPower");
  const inputAddTraction = document.querySelector("#inputAddTraction");
  const inputAddDescription = document.querySelector("#inputAddDescription");
  const inputAddImage = document.querySelector("#inputAddImage");
  const inputAddFilenameImage = document.querySelector(
    "#inputAddFilenameImage"
  );
  const inputAddFav = document.querySelector("#inputAddFav");

  const formEditCar = document.querySelector("#formEditCar");
  const inputEditName = document.querySelector("#inputEditName");
  const inputEditYear = document.querySelector("#inputEditYear");
  const inputEditKm = document.querySelector("#inputEditKm");
  const inputEditMarch = document.querySelector("#inputEditMarch");
  const inputEditEngine = document.querySelector("#inputEditEngine");
  const inputEditFuel = document.querySelector("#inputEditFuel");
  const inputEditPower = document.querySelector("#inputEditPower");
  const inputEditTraction = document.querySelector("#inputEditTraction");
  const inputEditDescription = document.querySelector("#inputEditDescription");
  const inputEditImage = document.querySelector("#inputEditImage");
  const inputEditFilenameImage = document.querySelector(
    "#inputEditFilenameImage"
  );

  const formAddWish = document.querySelector("#formAddWish");
  const inputAddWishName = document.querySelector("#inputAddWishName");
  const inputAddWishYear = document.querySelector("#inputAddWishYear");
  const inputAddWishPrice = document.querySelector("#inputAddWishPrice");
  const inputAddWishImage = document.querySelector("#inputAddWishImage");
  const inputAddWishFilenameImage = document.querySelector(
    "#inputAddWishFilenameImage"
  );

  const formEditWish = document.querySelector("#formEditWish");
  const inputEditWishName = document.querySelector("#inputEditWishName");
  const inputEditWishYear = document.querySelector("#inputEditWishYear");
  const inputEditWishPrice = document.querySelector("#inputEditWishPrice");
  const inputEditWishImage = document.querySelector("#inputEditWishImage");
  const inputEditWishFilenameImage = document.querySelector(
    "#inputEditWishFilenameImage"
  );

  //Mostra na tela o nome do arquvio da imagem que ele selecionou no campo de plano de fundo do formulári.
  inputAddImage.oninput = () =>
    showFileName(inputAddImage, inputAddFilenameImage);
  inputEditImage.oninput = () =>
    showFileName(inputEditImage, inputEditFilenameImage);
  inputAddWishImage.oninput = () =>
    showFileName(inputAddWishImage, inputAddWishFilenameImage);
  inputEditWishImage.oninput = () =>
    showFileName(inputEditWishImage, inputEditWishFilenameImage);

  let tabs = document.querySelectorAll(".navBar .icon");
  // Função: adcionar estilos no item clicado do menu.
  const mostra = (elem) => {
    if (elem) {
      for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove("active");
      }
      elem.classList.add("active");
    }

    //Esconde os demais componentes da aplicação e mostra o selecionado.
    for (let i = 0; i < tabs.length; i++) {
      let comp = tabs[i].getAttribute("for");
      if (tabs[i].classList.contains("active")) {
        goTo(comp);
      }
    }
  };

  // Função para mostrar componente ao clicar em um dos itens do menu.
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].onclick = (e) => {
      mostra(e.target);
    };
    mostra();
  }

  //Mostra listas de carros para o compenente principal da garagem;
  showCarsList();

  //Mostra listas de desejos para o compenente principal de desejos;
  showWishList();

  //Operações que serão realizadas no ícones do cabeçalho.
  document.querySelector(".iconBack").onclick = () => {
    goTo("garage");
    closeEditMode();
    showCarsList();
    saveCarList();
  };
  document.querySelector("#iconAdd").onclick = () => {
    goTo("includeCar");
    inputAddName.focus();
  };
  document.querySelector("#btnCloseIncludeCar").onclick = () => {
    formAddCar.reset();
    inputAddFilenameImage.innerHTML = "";
    goTo("garage");
  };

  //Operações que serão realizadas nos botões do componente de adcionar carro.
  document.querySelector("#btnIncludeCar").onclick = () => {
    formAddCar.onsubmit = (e) => e.preventDefault();
    addCar();
  };
  document.querySelector("#btnCancelIncludeCar").onclick = () => {
    formAddCar.reset();
    inputAddFilenameImage.innerHTML = "";
    goTo("garage");
  };

  //Operações que serão realizadas nos botões do componente de editar carro.
  document.querySelector("#btnEditCar").onclick = () => openEditMode();
  document.querySelector("#btnCancelEdit").onclick = () => {
    let idCar = inputEditName.getAttribute("data-id");
    let i = arrayCars.findIndex((c) => c.id == idCar);

    showDetailsCar(arrayCars[i]);
    closeEditMode();
  };
  document.querySelector("#btnDoneEdit").onclick = () => {
    formEditCar.onsubmit = (e) => e.preventDefault();
    editCar();
  };
  document.querySelector("#btnDoneEdit2").onclick = () => {
    formEditCar.onsubmit = (e) => e.preventDefault();
    editCar();
  };
  document.querySelector("#btnDeleteCar").onclick = () => {
    formEditCar.onsubmit = (e) => e.preventDefault();
    removeCar();
    goTo("garage");
    showCarsList();
  };

  //Operações que serão realizadas nos botões do componente de adcionar desejo.
  document.querySelector("#btnAddWish").onclick = () => {
    goTo("includeWish");
    inputAddWishName.focus();
  };
  document.querySelector("#btnIncludeWish").onclick = () => {
    formAddWish.onsubmit = (e) => e.preventDefault();
    addWish();
  };
  document.querySelector("#btnChangeWish").onclick = () => {
    formEditWish.onsubmit = (e) => e.preventDefault();
    editWish();
  };
  document.querySelector("#btnCloseIncludeWish").onclick = () => {
    formAddWish.reset();
    inputAddWishFilenameImage.innerHTML = "";
    goTo("wishlist");
  };
  document.querySelector("#btnCloseChangeWish").onclick = () => {
    formAddWish.reset();
    inputEditWishFilenameImage.innerHTML = "";
    goTo("wishlist");
  };
  document.querySelector("#btnCancelChangeWish").onclick = () => {
    formAddWish.reset();
    inputEditWishFilenameImage.innerHTML = "";
    goTo("wishlist");
  };
  document.querySelector("#btnDeleteWish").onclick = () => {
    formEditWish.onsubmit = (e) => e.preventDefault();
    removeWish();
    goTo("wishlist");
    showWishList();
  };

  //Esconde spinner loading ao finalizar o carregamento da página.
  document.querySelector(".spinner").classList.add("hidden");
};

//Função: esconder todos os componente e mostra somente o componente selecionado.
//Parâmetro:
//   comp: componente a ser mostrado na tela.
const goTo = (comp) => {
  let screenList = document.querySelectorAll("main > .component");
  screenList.forEach((c) => c.classList.add("hidden"));
  document.querySelector("#" + comp).classList.remove("hidden");
};

//Função: mostrar na tela o plano de fundo do carro.
//Parâmetros:
//   elem: elemento HTML onde o plano de fundo sera inserido.
//   obj: objeto que pertence o plano de fundo.
//   array: variável onde o objeto informado está (arrayCars / arrayWishes).
//   arrayName: nome do array para ser armanezando corretamente no localStorage.
const previewFile = (elem, obj, array, arrayName) => {
  // Se o usuário estiver feito o upload de alguma imagem...
  if (obj.image) {
    let reader = new FileReader();

    reader.onloadend = () => {
      //Ao terminar leitura, adciona o dataUrl no backgroud do elemento informado.
      elem.style.backgroundImage = `
        linear-gradient(to bottom, rgba(0, 0, 0, .5), rgba(0, 0, 0, .8)), 
        url('${reader.result}')
      `;

      //Salva a dataUrl no objeto, para conseguir salvar a imagem no localStorage.
      obj.dataUrl = reader.result;

      //Grava array no localStorage com a dataUrl da imagem salva no objeto.
      localStorage.setItem(`${arrayName}`, JSON.stringify(array));
    };

    //Leitor de arquivos para dataUrl.
    reader.readAsDataURL(obj.image);
  }
  //Se não for informado nenhuma imagem pelo usuário...
  else {
    let random = Math.floor(Math.random() * 3) + 1;

    //Salva imagem default aleatória no backgroud do elemento informado.
    elem.style.backgroundImage = `
      linear-gradient(to bottom, rgba(0, 0, 0, .5), rgba(0, 0, 0, .8)), 
      url(/assets/img/placeholder_car${random}.png)
    `;
  }
};

//Função: mostra nome do arquivo da imagem informada pelo usuário.
//Parâmetros:
//   input: input referente a imagem informada.
//   filename: elemento na tela para mostrar o nome do arquivo.
const showFileName = (input, filename) =>
  (filename.innerHTML = input.files[0].name);

//Função: adcionar carro.
const addCar = () => {
  let obj = {};

  //Cria objeto com os valores dos inputs, e se não for informado nada, salva "N/A".
  obj = {
    id: Math.random().toString().replace("0.", ""),
    name: inputAddName.value != "" ? inputAddName.value : "N/A",
    year: inputAddYear.value != "" ? inputAddYear.value : "N/A",
    km: inputAddKm.value != "" ? inputAddKm.value : "N/A",
    march: inputAddMarch.value != "" ? inputAddMarch.value : "N/A",
    engine: inputAddEngine.value != "" ? inputAddEngine.value : "N/A",
    fuel: inputAddFuel.value != "" ? inputAddFuel.value : "N/A",
    power: inputAddPower.value != "" ? inputAddPower.value : "N/A",
    traction: inputAddTraction.value != "" ? inputAddTraction.value : "N/A",
    description:
      inputAddDescription.value != "" ? inputAddDescription.value : "N/A",
    image: inputAddImage.files[0],
    filename: inputAddImage.files[0] ? inputAddImage.files[0].name : "",
    favorite: inputAddFav.checked,
  };

  //Insere objeto no array de carros.
  arrayCars.push(obj);

  //Caso exista, mostra na tela o nome do arquivo da imagem.
  inputAddFilenameImage.innerHTML = inputAddImage.files[0]
    ? inputAddImage.files[0].name
    : "";

  //Apaga valores dos inputs para não aparecer na próxima vez que entrar no componente de adicionar carro.
  formAddCar.reset();
  inputAddFilenameImage.innerHTML = "";

  //Volta para componente principal e mostra lista de carros atualizada.
  goTo("garage");
  showCarsList();

  //Salva array de carros no localStorage.
  saveCarList();
};

//Função: mostrar lista de carros na tela.
const showCarsList = () => {
  let blank = document.querySelector("#blank");

  //Seleciona ul dos carros.
  let allCarsList = document.querySelector("#allCars");
  let favCarsList = document.querySelector("#favCars");

  //Filtra dentro do array de carros, aqqueles marcados como favoritos.
  let arrayFavCars = arrayCars.filter((c) => c.favorite == true);

  //Limpa ul dos carros.
  allCarsList.innerHTML = "";
  favCarsList.innerHTML = "";

  if (arrayCars.length > 0) {
    blank.classList.add("hidden");

    if (arrayFavCars.length > 0) {
      favCarsList.innerHTML = "<h2>Favoritos</h2>";
      allCarsList.innerHTML = "<h2>Outros</h2>";
    }
    if (arrayCars.length == arrayFavCars.length) {
      favCarsList.innerHTML = "<h2>Todos</h2>";
      allCarsList.innerHTML = "";
    } else if (arrayFavCars.length == 0) {
      favCarsList.innerHTML = "";
      allCarsList.innerHTML = "<h2>Todos</h2>";
    }

    arrayCars.forEach((c) => {
      let car = document.createElement("li");
      car.classList.add("car");

      //Mostra imagem do carro na tela.
      previewFile(car, c, arrayCars, "arrayCars");

      //Cria atributo data-id com o id do carro, para usar na edição do carro ao clicar.
      car.setAttribute("data-id", c.id);

      if (c.favorite == true) {
        //Mosta lista com os carros favoritos.
        favCarsList.classList.remove("hidden");

        //Cria elemento HTML com o carro.
        car.innerHTML = `
        <div class="carYear">${c.year}</div>
        <h3 class="carName">${c.name}</h3>
        <div class="carAttributes">
          <div class="carAttachmets">
            <div>
              <div class="attachmentName">
                <i class="material-icons">speed</i>
                <div>Km</div>
              </div>
              <div class="attachmentValue">${c.km}</div>
            </div>
            <div>
              <div class="attachmentName">
                <i class="material-icons">settings_input_component</i>
                <div>Câmbio</div>
              </div>
              <div class="attachmentValue">${c.march}</div>
            </div>
            <div>
              <div class="attachmentName">
                <i class="material-icons">settings</i>
                <div>Motor</div>
              </div>
              <div class="attachmentValue">${c.engine}</div>
            </div>
          </div>
          <i class="carIconFav material-icons">stars</i>
        </div>
      `;
        //Insere carro na lista de carros favoritos.
        favCarsList.appendChild(car);
      } else {
        //Mosta lista com todos os carros.
        allCarsList.classList.remove("hidden");

        //Cria elemento HTML com o carro.
        car.innerHTML = `
        <div class="carYear">${c.year}</div>
        <h3 class="carName">${c.name}</h3>
        <div class="carAttributes">
          <div class="carAttachmets">
            <div>
              <div class="attachmentName">
                <i class="material-icons">speed</i>
                <div>Km</div>
              </div>
              <div class="attachmentValue">${c.km}</div>
            </div>
            <div>
              <div class="attachmentName">
                <i class="material-icons">settings_input_component</i>
                <div>Câmbio</div>
              </div>
              <div class="attachmentValue">${c.march}</div>
            </div>
            <div>
              <div class="attachmentName">
                <i class="material-icons">settings</i>
                <div>Motor</div>
              </div>
              <div class="attachmentValue">${c.engine}</div>
            </div>
          </div>
        </div>
      `;

        //Insere carro na lista de todos os carros.
        allCarsList.appendChild(car);
      }

      //Ao clicar no carro, mostra a tela com mais detalhes do carro.
      car.onclick = () => showDetailsCar(c);
    });
  } else {
    //Esconde as listas e mostra imagem padrão para lista vazia.
    allCarsList.classList.add("hidden");
    blank.classList.remove("hidden");
  }
};

//Função: mostrar detalhes do carro selecionado.
//Parâmetros:
//   c: objeto carro selecionado.
const showDetailsCar = (c) => {
  //Vai para o componente de detalhes do carro informado.
  goTo("detailsCar");

  let btnFav = document.querySelector("#btnAddFavorite");
  let detailsCarHeader = document.querySelector(".detailsCarHeader");

  //Adciona ao inputs os valores existentes no objeto, para mostrar na tela de detalhes e de edição do carro.
  inputEditName.value = c.name;
  inputEditYear.value = c.year;
  inputEditKm.value = c.km;
  inputEditMarch.value = c.march;
  inputEditEngine.value = c.engine;
  inputEditFuel.value = c.fuel;
  inputEditPower.value = c.power;
  inputEditTraction.value = c.traction;
  inputEditDescription.value = c.description;
  inputEditFilenameImage.innerHTML = c.filename;

  //Mostra imagem na tela
  previewFile(detailsCarHeader, c, arrayCars, "arrayCars");

  //Marca ou desmarca estrela de favorito de acordo com o valor atribuido ao objeto.
  if (c.favorite == true) {
    btnFav.classList.add("favorite");
    btnFav.innerHTML = "star";
  } else {
    btnFav.classList.remove("favorite");
    btnFav.innerHTML = "star_border";
  }

  //Cria atributo data-id ao input para realizar as edições somente no carro que tem esse mesmo data-id.
  inputEditName.setAttribute("data-id", c.id);

  //Adiciona carro como favorito se está desmarcado, ou remove favorito caso esteja marcado.
  btnFav.onclick = () => {
    btnFav.classList.toggle("favorite");
    if (btnFav.classList.contains("favorite")) {
      btnFav.innerHTML = "star";
      c.favorite = true;
    } else {
      btnFav.innerHTML = "star_border";
      c.favorite = false;
    }
  };
};

//Função: abrir modo de edição.
const openEditMode = () => {
  //Mostra ou esconde botões e funcionalidades referentes ao modo de edição.
  document.querySelector("#detailsCar").classList.add("editMode");
  document.querySelector("#btnEditCar").classList.add("hidden");
  document.querySelector("#btnCancelEdit").classList.remove("hidden");
  document.querySelector("#btnDoneEdit").classList.remove("hidden");
  document.querySelector(".detailsCarImage").classList.remove("hidden");
  document.querySelector("#btnDoneEdit2").classList.remove("hidden");

  let inputs = document.querySelectorAll("#detailsCar input");

  //Habilita modo de edição ao inputs.
  inputs.forEach((i) => (i.readOnly = false));
  document.querySelector("#inputEditDescription").readOnly = false;
};

//Função: fechar modo de edição.
const closeEditMode = () => {
  //Mostra ou esconde botões e funcionalidades referentes ao modo de visualização.
  document.querySelector("#detailsCar").classList.remove("editMode");
  document.querySelector("#btnEditCar").classList.remove("hidden");
  document.querySelector("#btnCancelEdit").classList.add("hidden");
  document.querySelector("#btnDoneEdit").classList.add("hidden");
  document.querySelector(".detailsCarImage").classList.add("hidden");
  document.querySelector("#btnDoneEdit2").classList.add("hidden");

  let inputs = document.querySelectorAll("#detailsCar input");

  //Desabilita modo de edição ao inputs.
  inputs.forEach((i) => (i.readOnly = true));
  document.querySelector("#inputEditDescription").readOnly = true;
};

//Função: editar carro.
const editCar = () => {
  //Salva data-id do input para realizar a busca no array e encontrar o carro com esse id.
  let idCar = inputEditName.getAttribute("data-id");
  let i = arrayCars.findIndex((c) => c.id == idCar);

  //Grava novas alterações no objeto dentro do array de carros.
  arrayCars[i].name = inputEditName.value != "" ? inputEditName.value : "N/A";
  arrayCars[i].year = inputEditYear.value != "" ? inputEditYear.value : "N/A";
  arrayCars[i].km = inputEditKm.value != "" ? inputEditKm.value : "N/A";
  arrayCars[i].march =
    inputEditMarch.value != "" ? inputEditMarch.value : "N/A";
  arrayCars[i].engine =
    inputEditEngine.value != "" ? inputEditEngine.value : "N/A";
  arrayCars[i].fuel = inputEditFuel.value != "" ? inputEditFuel.value : "N/A";
  arrayCars[i].power =
    inputEditPower.value != "" ? inputEditPower.value : "N/A";
  arrayCars[i].traction =
    inputEditTraction.value != "" ? inputEditTraction.value : "N/A";
  arrayCars[i].description =
    inputEditDescription.value != "" ? inputEditDescription.value : "N/A";
  arrayCars[i].image = inputEditImage.files[0]
    ? inputEditImage.files[0]
    : arrayCars[i].image;
  arrayCars[i].filename = inputEditImage.files[0]
    ? inputEditImage.files[0].name
    : "";

  //Apaga valores dos inputs para não aparecer na próxima vez que entrar no componente de adicionar carro.
  formEditCar.reset();

  //Remove atributo data-id para não influenciar em edições de outros carros.
  inputEditName.removeAttribute("data-id");

  //Volta para o modo de visualização de detalhes do carro.
  closeEditMode();
  showDetailsCar(arrayCars[i]);

  //Salva array de carros com novas edições no localStorage.
  saveCarList();
};

//Função: remover carro.
const removeCar = () => {
  //Salva data-id do input para realizar a busca no array e encontrar o carro com esse id.
  let idCar = inputEditName.getAttribute("data-id");

  //Filtra o array com todos os carro, menos o que tem o id selecionado.
  arrayCars = arrayCars.filter((c) => c.id != idCar);

  //Reseta valores para não atrapalhar novas exlusões.
  formEditCar.reset();
  inputEditName.removeAttribute("data-id");

  //Volta para componente principal e mostra lista de carros atualizada.
  goTo("garage");
  showCarsList();

  //Salva array de carros no localStorage.
  saveCarList();
};

//Função: adicionar desejo.
const addWish = () => {
  let obj = {};

  //Cria objeto com os valores dos inputs, e se não for informado nada, salva "N/A".
  obj = {
    id: Math.random().toString().replace("0.", ""),
    name: inputAddWishName.value != "" ? inputAddWishName.value : "N/A",
    year: inputAddWishYear.value != "" ? inputAddWishYear.value : "N/A",
    price: inputAddWishPrice.value != "" ? inputAddWishPrice.value : "N/A",
    lastUpdate: new Date(),
    image: inputAddWishImage.files[0],
    filename: inputAddWishImage.files[0] ? inputAddWishImage.files[0].name : "",
  };

  //Insere objeto no array de desejos.
  arrayWishes.push(obj);

  //caso exista, mostra na tela o nome do arquivo da imagem.
  inputAddWishFilenameImage.innerHTML = inputAddWishImage.files[0]
    ? inputAddWishImage.files[0].name
    : "";

  //Apaga valores dos inputs para não aparecer na próxima vez que entrar no componente de adicionar desejo.
  formAddWish.reset();
  inputAddWishFilenameImage.innerHTML = "";

  //Volta para componente desejos e mostra lista de desejos atualizada.
  goTo("wishlist");
  showWishList();

  //Salva array de desejos no localStorage.
  saveWishList();
};

//Função: mostrar lista de desejos na tela.
const showWishList = () => {
  let blank = document.querySelector("#blankWish");

  //Seleciona ul dos carros.
  let wishCarsList = document.querySelector("#wishlist ul");

  //Limpa ul dos carros.
  wishCarsList.innerHTML = "";

  if (arrayWishes.length > 0) {
    blank.classList.add("hidden");
    wishCarsList.classList.remove("hidden");

    arrayWishes.forEach((w) => {
      let wish = document.createElement("li");
      wish.classList.add("wishCars");

      let img = document.createElement("div");
      img.classList.add("wishCarsImg");

      let now = new Date();
      let lastUpdate = new Date(w.lastUpdate);
      let diff = Math.abs(now.getTime() - lastUpdate.getTime());

      //Faz calculo de dias para mostrar na tela a quantos dias foi feita a última atualização
      let days = Math.ceil(diff / (1000 * 60 * 60 * 24));

      if (days == 1) {
        days = "1 dia atrás";
      } else if (days > 1) {
        days = days + " dias atrás";
      } else {
        days = "Hoje";
      }

      //Mostra imagem do carro na tela.
      previewFile(img, w, arrayWishes, "arrayWishes");

      //Cria atributo data-id com o id do carro, para usar na edição do carro ao clicar.
      wish.setAttribute("data-id", w.id);

      //Cria elemento HTML com o conteuto do desejo.
      let content = `
        <div class="wishCarsAbout">
          <div class="wishCarsYear">${w.year}</div>
          <h3 class="wishCarsName">${w.name}</h3>
          <div class="lastUpdate">Última atualização: <br/>
            ${days}
          </div>
        </div>
        <div class="wishCarsPrice">
          <div class="">${w.price}</div>
          <i class="iconPriceUp material-icons">arrow_upward</i>
          <i class="iconPriceDown material-icons">arrow_downward</i>
        </div>
      `;

      //Insere imagem na box.
      wish.appendChild(img);

      //Insere conteudo na box junto com a imagem.
      wish.insertAdjacentHTML("beforeend", content);

      //Insere desejo na lista de todos os desejos.
      wishCarsList.appendChild(wish);

      //Ao clicar no desejo, mostra a tela de edição do desejo.
      wish.onclick = () => {
        //Adciona ao inputs os valores existentes no objeto, para mostrar na tela de edição do desejo.
        inputEditWishName.value = w.name;
        inputEditWishYear.value = w.year;
        inputEditWishPrice.value = w.price;
        inputEditWishFilenameImage.innerHTML = w.filename;

        //Cria atributo data-id ao input para realizar as edições somente no desejo que tem esse mesmo data-id.
        inputEditWishName.setAttribute("data-id", w.id);

        goTo("editWish");
      };
    });
  } else {
    //Esconde as listas e mostra imagem padrão para lista vazia.
    wishCarsList.classList.add("hidden");
    blank.classList.remove("hidden");
  }
};

const editWish = () => {
  //Salva data-id do input para realizar a busca no array e encontrar o desejo com esse id.
  let idWish = inputEditWishName.getAttribute("data-id");
  let i = arrayWishes.findIndex((w) => w.id == idWish);

  //Grava novas alterações no objeto dentro do array de desejos.
  arrayWishes[i].name =
    inputEditWishName.value != "" ? inputEditWishName.value : "N/A";
  arrayWishes[i].year =
    inputEditWishYear.value != "" ? inputEditWishYear.value : "N/A";
  arrayWishes[i].price =
    inputEditWishPrice.value != "" ? inputEditWishPrice.value : "N/A";
  arrayWishes[i].lastUpdate = new Date();
  arrayWishes[i].image = inputEditWishImage.files[0]
    ? inputEditWishImage.files[0]
    : arrayWishes[i].image;
  arrayWishes[i].filename = inputEditWishImage.files[0]
    ? inputEditWishImage.files[0].name
    : "";

  //Apaga valores dos inputs para não aparecer na próxima vez que entrar no componente de adicionar desejo.
  formEditWish.reset();

  //Remove atributo data-id para não influenciar em edições de outros desejos.
  inputEditWishName.removeAttribute("data-id");

  //Volta para componente de desejos e mostra lista de desejos atualizada.
  goTo("wishlist");
  showWishList();

  //Salva array de desejos no localStorage.
  saveWishList();
};

const removeWish = () => {
  //Salva data-id do input para realizar a busca no array e encontrar o desejo com esse id.
  let idWish = inputEditWishName.getAttribute("data-id");

  //Filtra o array com todos os carro, menos o que tem o id selecionado.
  arrayWishes = arrayWishes.filter((w) => w.id != idWish);

  //Reseta valores para não atrapalhar novas exlusões.
  formEditWish.reset();
  inputEditWishName.removeAttribute("data-id");

  //Volta para componente de desejos e mostra lista de desejos atualizada.
  goTo("wishlist");
  showWishList();

  //Salva array de desejos no localStorage.
  saveWishList();
};

//Função: savar array de carros no localStorage
const saveCarList = () =>
  localStorage.setItem("arrayCars", JSON.stringify(arrayCars));

//Função: savar array de desejos no localStorage
const saveWishList = () =>
  localStorage.setItem("arrayWishes", JSON.stringify(arrayWishes));

//Registrar o service worker na aplicação
navigator.serviceWorker.register("./app-sw.js");
