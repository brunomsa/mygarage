let arrayCars = [];
let arrayWishes = [];

onload = () => {
  const storageCars = JSON.parse(localStorage.getItem("arrayCars"));
  const storageWishes = JSON.parse(localStorage.getItem("arrayWishes"));

  if (storageCars) {
    arrayCars = storageCars;
    loadLocalStorageFiles(arrayCars);
  }
  if (storageWishes) {
    arrayWishes = storageWishes;
    loadLocalStorageFiles(arrayWishes);
  }

  function loadLocalStorageFiles(array) {
    array.forEach((arr) => {
      if (arr.image) {
        arr.image = dataURLtoBlob(arr.dataUrl);
      }
    });
  }

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

  inputAddImage.oninput = () =>
    showFileName(inputAddImage, inputAddFilenameImage);
  inputEditImage.oninput = () =>
    showFileName(inputEditImage, inputEditFilenameImage);
  inputAddWishImage.oninput = () =>
    showFileName(inputAddWishImage, inputAddWishFilenameImage);
  inputEditWishImage.oninput = () =>
    showFileName(inputEditWishImage, inputEditWishFilenameImage);

  let tabs = document.querySelectorAll(".navBar .icon");
  const mostra = (elem) => {
    if (elem) {
      for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove("active");
      }
      elem.classList.add("active");
    }

    for (let i = 0; i < tabs.length; i++) {
      let comp = tabs[i].getAttribute("for");
      if (tabs[i].classList.contains("active")) {
        goTo(comp);
      }
    }
  };

  for (let i = 0; i < tabs.length; i++) {
    tabs[i].onclick = (e) => {
      mostra(e.target);
    };
    mostra();
  }

  showCarsList();
  showWishList();

  document.querySelector(".btnBack").onclick = () => {
    goTo("garage");
    closeEditMode();
    showCarsList();
    saveCarList();
  };

  document.querySelector("#btnAdd").onclick = () => {
    goTo("includeCar");
    inputAddName.focus();
  };
  document.querySelector("#btnIncludeCar").onclick = () => {
    formAddCar.onsubmit = (e) => e.preventDefault();
    addCar();
  };
  document.querySelector("#btnCloseIncludeCar").onclick = () => {
    formAddCar.reset();
    inputAddFilenameImage.innerHTML = "";
    goTo("garage");
  };
  document.querySelector("#btnCancelIncludeCar").onclick = () => {
    formAddCar.reset();
    inputAddFilenameImage.innerHTML = "";
    goTo("garage");
  };

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

  document.querySelector(".spinner").classList.add('hidden');
};

const goTo = (comp) => {
  let screenList = document.querySelectorAll("main > .component");
  screenList.forEach((c) => c.classList.add("hidden"));
  document.querySelector("#" + comp).classList.remove("hidden");
};

const previewFile = (elem, obj, array, arrayName) => {
  if (obj.image) {
    let reader = new FileReader();

    reader.onloadend = () => {
      elem.style.backgroundImage = `
        linear-gradient(to bottom, rgba(0, 0, 0, .5), rgba(0, 0, 0, .8)), 
        url('${reader.result}')
      `;

      obj.dataUrl = reader.result;
      localStorage.setItem(`${arrayName}`, JSON.stringify(array));
    };

    reader.readAsDataURL(obj.image);
  } else {
    let random = Math.floor(Math.random() * 3) + 1;
    elem.style.backgroundImage = `
      linear-gradient(to bottom, rgba(0, 0, 0, .5), rgba(0, 0, 0, .8)), 
      url(/assets/img/placeholder_car${random}.png)
    `;
  }
};

const showFileName = (input, filename) =>
  (filename.innerHTML = input.files[0].name);

const addCar = () => {
  let obj = {};

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
  arrayCars.push(obj);

  inputAddFilenameImage.innerHTML = inputAddImage.files[0]
    ? inputAddImage.files[0].name
    : "";

  formAddCar.reset();
  inputAddFilenameImage.innerHTML = "";
  goTo("garage");
  showCarsList();
  saveCarList();
};

const showCarsList = () => {
  let allCarsList = document.querySelector("#allCars");
  let favCarsList = document.querySelector("#favCars");
  let blank = document.querySelector("#blank");
  let arrayFavCars = arrayCars.filter((c) => c.favorite == true);

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
      previewFile(car, c, arrayCars, "arrayCars");
      car.setAttribute("data-id", c.id);

      if (c.favorite == true) {
        favCarsList.classList.remove("hidden");
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
        favCarsList.appendChild(car);
      } else {
        allCarsList.classList.remove("hidden");
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
          <i class="carIconFav material-icons hidden">stars</i>
        </div>
      `;
        allCarsList.appendChild(car);
      }

      car.onclick = () => showDetailsCar(c);
    });
  } else {
    allCarsList.classList.add("hidden");
    blank.classList.remove("hidden");
  }
};

const showDetailsCar = (c) => {
  goTo("detailsCar");

  let btnFav = document.querySelector("#btnAddFavorite");
  let detailsCarHeader = document.querySelector(".detailsCarHeader");

  inputEditName.value = c.name;
  inputEditYear.value = c.year;
  inputEditKm.value = c.km;
  inputEditMarch.value = c.march;
  inputEditEngine.value = c.engine;
  inputEditFuel.value = c.fuel;
  inputEditPower.value = c.power;
  inputEditTraction.value = c.traction;
  inputEditDescription.value = c.description;
  previewFile(detailsCarHeader, c, arrayCars, "arrayCars");
  inputEditFilenameImage.innerHTML = c.filename;
  if (c.favorite == true) {
    btnFav.classList.add("favorite");
    btnFav.innerHTML = "star";
  } else {
    btnFav.classList.remove("favorite");
    btnFav.innerHTML = "star_border";
  }

  inputEditName.setAttribute("data-id", c.id);

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

const openEditMode = () => {
  document.querySelector("#detailsCar").classList.add("editMode");
  document.querySelector("#btnEditCar").classList.add("hidden");
  document.querySelector("#btnCancelEdit").classList.remove("hidden");
  document.querySelector("#btnDoneEdit").classList.remove("hidden");
  document.querySelector(".detailsCarImage").classList.remove("hidden");
  document.querySelector("#btnDoneEdit2").classList.remove("hidden");

  let inputs = document.querySelectorAll("#detailsCar input");
  inputs.forEach((i) => (i.readOnly = false));
  document.querySelector("#inputEditDescription").readOnly = false;
};

const closeEditMode = () => {
  document.querySelector("#detailsCar").classList.remove("editMode");
  document.querySelector("#btnEditCar").classList.remove("hidden");
  document.querySelector("#btnCancelEdit").classList.add("hidden");
  document.querySelector("#btnDoneEdit").classList.add("hidden");
  document.querySelector(".detailsCarImage").classList.add("hidden");
  document.querySelector("#btnDoneEdit2").classList.add("hidden");

  let inputs = document.querySelectorAll("#detailsCar input");
  inputs.forEach((i) => (i.readOnly = true));
  document.querySelector("#inputEditDescription").readOnly = true;
};

const editCar = () => {
  let idCar = inputEditName.getAttribute("data-id");

  let i = arrayCars.findIndex((c) => c.id == idCar);
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

  formEditCar.reset();
  inputEditName.removeAttribute("data-id");

  closeEditMode();
  showDetailsCar(arrayCars[i]);
  saveCarList();
};

const removeCar = () => {
  let idCar = inputEditName.getAttribute("data-id");

  arrayCars = arrayCars.filter((c) => c.id != idCar);
  formEditCar.reset();
  inputEditName.removeAttribute("data-id");

  goTo("garage");
  showCarsList();
  saveCarList();
};

const addWish = () => {
  let obj = {};
  obj = {
    id: Math.random().toString().replace("0.", ""),
    name: inputAddWishName.value != "" ? inputAddWishName.value : "N/A",
    year: inputAddWishYear.value != "" ? inputAddWishYear.value : "N/A",
    price: inputAddWishPrice.value != "" ? inputAddWishPrice.value : "N/A",
    lastUpdate: "Hoje",
    image: inputAddWishImage.files[0],
    filename: inputAddWishImage.files[0] ? inputAddWishImage.files[0].name : "",
  };
  arrayWishes.push(obj);

  inputAddWishFilenameImage.innerHTML = inputAddWishImage.files[0]
    ? inputAddWishImage.files[0].name
    : "";

  formAddWish.reset();
  inputAddWishFilenameImage.innerHTML = "";

  saveWishList();
  goTo("wishlist");
  showWishList();
};

const showWishList = () => {
  let wishCarsList = document.querySelector("#wishlist ul");
  let blank = document.querySelector("#blankWish");

  wishCarsList.innerHTML = "";

  if (arrayWishes.length > 0) {
    blank.classList.add("hidden");
    wishCarsList.classList.remove("hidden");

    arrayWishes.forEach((w) => {
      let wish = document.createElement("li");
      let img = document.createElement("div");

      let now = new Date();
      let lastUpdate = new Date(w.lastUpdate);
      let diff = Math.abs(now.getTime() - lastUpdate.getTime());
      let days = Math.ceil(diff / (1000 * 60 * 60 * 24));

      days = days > 1 ? days + " dias atrás" : "Hoje";

      wish.classList.add("wishCars");
      img.classList.add("wishCarsImg");

      previewFile(img, w, arrayWishes, "arrayWishes");

      wish.setAttribute("data-id", w.id);

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

      wish.appendChild(img);
      wish.insertAdjacentHTML("beforeend", content);

      wishCarsList.appendChild(wish);

      wish.onclick = () => {
        inputEditWishName.value = w.name;
        inputEditWishYear.value = w.year;
        inputEditWishPrice.value = w.price;
        inputEditWishFilenameImage.innerHTML = w.filename;

        inputEditWishName.setAttribute("data-id", w.id);

        goTo("editWish");
      };
    });
  } else {
    wishCarsList.classList.add("hidden");
    blank.classList.remove("hidden");
  }
};

const editWish = () => {
  let idWish = inputEditWishName.getAttribute("data-id");

  let i = arrayWishes.findIndex((w) => w.id == idWish);
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

  formEditWish.reset();
  inputEditWishName.removeAttribute("data-id");

  goTo("wishlist");
  showWishList();
  saveWishList();
};

const removeWish = () => {
  let idWish = inputEditWishName.getAttribute("data-id");

  arrayWishes = arrayWishes.filter((w) => w.id != idWish);
  formEditWish.reset();
  inputEditWishName.removeAttribute("data-id");

  goTo("wishlist");
  showWishList();
  saveWishList();
};

const saveCarList = () => {
  localStorage.setItem("arrayCars", JSON.stringify(arrayCars));
};

const saveWishList = () => {
  localStorage.setItem("arrayWishes", JSON.stringify(arrayWishes));
};
