const URL =
  "https://assets.fc-dev.instore.oakley.com/assets/products/product.json";

const getData = async () => {
  const response = await fetch(URL);
  if (response.ok) {
    return await response.json();
  }
  return response.status;
};

getData().then((result) => {
  createItem(result);
  createAvailableElements(result);
});

const createItem = (data) => {
  let content = document.querySelector(".content");

  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }

  let block = document.createElement("div");
  block.classList.add("block");

  let productItemInfo = document.createElement("div");
  productItemInfo.classList.add("product_item_info");

  let description = document.createElement("div");
  description.classList.add("description");

  let model = document.createElement("h1");
  model.classList.add("model");
  model.textContent = data.model;

  let img = document.createElement("img");
  img.classList.add("image");
  img.src = data.img;

  let brand = document.createElement("h3");
  brand.classList.add("brand");
  brand.textContent = data.brand;

  let price = document.createElement("p");
  price.classList.add("price");
  price.textContent = `${data.price.current.value} ${data.price.currency}`;

  let name = document.createElement("p");
  name.classList.add("name", "features");
  name.innerHTML = `Name: <span>${data.name}</span>`;

  let lensColor = document.createElement("p");
  lensColor.classList.add("lens_color", "features");
  lensColor.innerHTML = `Lens color: <span>${data["lens-color"]}</span>`;

  let size = document.createElement("p");
  size.classList.add("size", "features");
  size.innerHTML = `Size: <span>${data.size}</span>`;

  let universalCode = document.createElement("p");
  universalCode.classList.add("universal_code", "features");
  universalCode.innerHTML = `UPC: <span>${data.UPC}</span>`;

  let btnAddToCart = document.createElement("button");
  btnAddToCart.innerText = "Add to cart";
  btnAddToCart.classList.add("button_add", "btn");

  description.append(brand, price, name, lensColor, size, universalCode);
  productItemInfo.append(description, btnAddToCart);
  block.prepend(img, productItemInfo);
  document.querySelector(".content").prepend(model, block);
};

const createAvailableElements = (data) => {
  let titleAvailableBlock = document.createElement("h3");
  titleAvailableBlock.classList.add("title_available");
  titleAvailableBlock.textContent = "Available color";

  let availableElements = document.createElement("div");

  data["color-variants"].forEach((elem) => {
    let img = document.createElement("img");
    img.classList.add("available_element");
    img.src = elem.img;
    availableElements.append(img);
  });
  document
    .querySelector(".block")
    .after(titleAvailableBlock, availableElements);
};

document.onclick = function (event) {
  let availableElement = event.target.closest(".available_element");

  if (!availableElement) return;

  if (!document.contains(availableElement)) return;

  getData().then((result) => {
    let item = result["color-variants"].find((el) => {
      return el.img === availableElement.src;
    });

    createItem(item);
    createAvailableElements(result);
  });
};
