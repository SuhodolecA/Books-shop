// variables
const wrapper = document.querySelector(".wrapper");
const fragment = document.createDocumentFragment();
let cartSumItem;
// let cartCounterItem;
let books = fetch("../../books.json")
  .then((response) => response.json())
  .then((response) => (books = response))
  .finally(() => {
    createHtmlStructure();
    cartSumItem = document.querySelector(".header-main__basket-cost__input");
  });
const purchases = [];
let cartSum = purchases.reduce((acc, item) => acc + item.price, 0) || 0;
const headerMenuLinks = ["Sign in", "My Account", "Order Status", "Help"];
const asideCategoriesList_3 = ["Science", "Sex", "Baby", "Sports", "Travel"];
const asideCategoriesList_1 = [
  "Science",
  "Fantasy",
  "Mystery",
  "Horror",
  "Romance",
  "Poetry",
  "Crime",
  "Children",
  "Literature",
];

const asideCategoriesList_2 = [
  "Cook",
  "Photography",
  "Comic",
  "Business",
  "Computer",
  "History",
  "Psychology",
  "Art",
  "Medical",
];

// === helper functions
function changeSubmitBtnState() {
  const deliveryItem = document.querySelectorAll(".delivery-item");
  const deliveryItemToArray = Array.from(deliveryItem);
  const submitFormBtn = document.querySelector(".delivery-submit");
  if (deliveryItemToArray.every((item) => item.classList.contains("valid"))) {
    submitFormBtn.disabled = false;
  } else {
    submitFormBtn.disabled = true;
  }
}


function createSumInfo(e) {
  e.preventDefault();
  const name = document.querySelector('.delivery-name__input').value;
  const surname = document.querySelector('.delivery-surname__input').value;
  const street = document.querySelector('.delivery-street__input').value;
  const house = document.querySelector('.delivery-house__input').value;
  const flat = document.querySelector('.delivery-flat__input').value;
  const delivery = document.querySelector('.delivery');
  delivery.innerText = `The order created. The delivery address is ${street} street house ${house} flat ${flat}. Customer ${name} ${surname}.`
}

function validDate(e) {
  const elem = e.target;
  if (!elem.value) {
    e.target.closest(".delivery-item").classList.remove("valid");
    e.target.closest(".delivery-item").classList.add("error");
  } else {
    e.target.closest(".delivery-item").classList.remove("error");
    e.target.closest(".delivery-item").classList.add("valid");
  }
  changeSubmitBtnState();
}
function nextDate() {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  tomorrow.toISOString().split("T")[0];
  return tomorrow.toISOString().split("T")[0];
}

function stringOnly(e) {
  if (!/[a-z]/i.test(e.key)) {
    e.preventDefault();
  }
}

function validCharAmount(e, num) {
  const length = e.target.value.length;
  const elem = e.target;
  if (length < num || elem === "") {
    e.target.closest(".delivery-item").classList.remove("valid");
    e.target.closest(".delivery-item").classList.add("error");
  } else {
    e.target.closest(".delivery-item").classList.remove("error");
    e.target.closest(".delivery-item").classList.add("valid");
  }
  changeSubmitBtnState();
}

function setDescriptionData(element, descr) {
  const id = element.dataset.bookId;
  const img = descr.querySelector(".book-description__cover");
  img.src = books.filter((book) => book.id == id)[0].imageLink;
  const title = descr.querySelector(".book-description__content-title");
  title.textContent = books.filter((book) => book.id == id)[0].title;
  const author = descr.querySelector(".book-description__content-author");
  author.textContent =
    "Author: " + books.filter((book) => book.id == id)[0].author;
  const text = descr.querySelector(".book-description__content-text");
  text.textContent = books.filter((book) => book.id == id)[0].description;
}

function updateCartSum() {
  const cartSumItem = document.querySelector(
    ".header-main__basket-cost__input"
  );
  cartSum = purchases.reduce((acc, item) => acc + item.price, 0);
  cartSumItem.textContent = cartSum;
}

function updateCartCounter() {
  const cartCounterItem = document.querySelector(".header-main__basket-amount");
  cartCounterItem.textContent = purchases.length;
}
function addToCart(e) {
  const id = e.target.closest(".main-content__books-item").dataset.bookId;
  if (!purchases.includes(books.filter((book) => book.id == id)[0])) {
    purchases.push(books.filter((book) => book.id == id)[0]);
    updateCartCounter();
    updateCartSum();
  }
}

function createElement(name) {
  const element = document.createElement(name);
  return element;
}

function addClass(element, className) {
  element.classList.add(className);
}

function createOverlay() {
  const overlay = createElement("div");
  addClass(overlay, "overlay");

  return overlay;
}

function createMenu(itemsContent) {
  const ul = createElement("ul");
  for (let i = 0; i < itemsContent.length; i++) {
    const li = createElement("li");
    addClass(li, "menu-item");
    const a = createElement("a");
    addClass(a, "menu-item__link");
    a.setAttribute("href", `#${itemsContent[i]}`);
    a.textContent = itemsContent[i];
    li.append(a);
    ul.append(li);
  }

  return ul;
}

function showDescription(e) {
  const item = e.target.closest(".main-content__books-item");
  const overlay = document.querySelector(".overlay");
  const description = document.querySelector(".book-description");
  setDescriptionData(item, description);
  overlay.classList.add("show");
  description.classList.add("show");
}

function showForm() {
  if (purchases.length != 0) {
    const form = document.querySelector(".delivery");
    const overlay = document.querySelector(".overlay");
    overlay.classList.add("show");
    form.classList.add("show");
  }
}

function createCardItem(
  classNameImg,
  classNameLi,
  classNameBtn,
  src,
  alt,
  h4_class,
  h4_text,
  authorClass,
  authorText,
  price,
  classNameP,
  btnText,
  btnContainerClass,
  btnShowClass,
  btnShowText,
  id
) {
  const li = createElement("li");
  addClass(li, classNameLi);
  li.dataset.bookId = id;
  const img = createElement("img");
  addClass(img, classNameImg);
  img.setAttribute("src", src);
  img.setAttribute("alt", alt);

  const btnContainer = createElement("div");
  addClass(btnContainer, btnContainerClass);

  const buttonAdd = createElement("button");
  addClass(buttonAdd, classNameBtn);
  buttonAdd.addEventListener("click", addToCart);
  buttonAdd.textContent = btnText;
  const buttonShow = createElement("button");
  addClass(buttonShow, btnShowClass);
  buttonShow.addEventListener("click", showDescription);
  buttonShow.textContent = btnShowText;

  const h4 = createElement("h4");
  addClass(h4, h4_class);
  const author = createElement("p");
  addClass(author, authorClass);
  author.textContent = `Author: ${authorText}`;

  const a = createElement("a");
  addClass(a, `${h4_class}-link`);
  a.setAttribute("href", "#");
  a.textContent = h4_text;

  h4.append(a);

  const p = createElement("p");
  addClass(p, classNameP);
  p.textContent = `price: ${price}$`;

  btnContainer.append(buttonShow);
  btnContainer.append(buttonAdd);

  li.append(img);
  li.append(h4);
  li.append(author);
  li.append(p);
  li.append(btnContainer);

  return li;
}

function createCartHeader() {
  const header = createElement("header");
  addClass(header, "cart-header");
  const container = createElement("div");
  addClass(container, "container");
  const menu = createMenu(headerMenuLinks);
  addClass(menu, "cart-menu");
  const nav = createElement("nav");
  addClass(nav, "cart-nav");

  const headerMainLogo = createElement("a");
  addClass(headerMainLogo, "header-main__logo");
  headerMainLogo.setAttribute("href", "#");
  headerMainLogo.addEventListener("click", createHtmlStructure);

  const headerLogoImg = createElement("img");
  addClass(headerLogoImg, "header-main__logo-img");
  headerLogoImg.setAttribute("src", "../../assets/images/logo.png");
  headerLogoImg.setAttribute("alt", "logo");

  headerMainLogo.append(headerLogoImg);

  container.append(headerMainLogo);
  container.append(menu);
  nav.append(container);

  header.append(nav);

  return header;
}

function createFooter() {
  const footer = createElement("footer");
  addClass(footer, "footer");

  const container = createElement("div");
  addClass(container, "container");

  const text_1 = createElement("span");
  addClass(text_1, "footer-text");
  text_1.textContent = "Challenge by";

  const a_1 = createElement("a");
  addClass(a_1, "footer-link");
  a_1.setAttribute(
    "href",
    `https://github.com/rolling-scopes-school/js-fe-course-en/blob/main/tasks/books-shop/books-shop.md`
  );
  a_1.setAttribute("target", `_blank`);

  const footerLogo = createElement("img");
  addClass(footerLogo, "footer-logo");
  footerLogo.setAttribute("src", "../../assets/images/footer-logo.png");
  footerLogo.setAttribute("alt", "logo");

  a_1.append(footerLogo);

  const text_2 = createElement("span");
  addClass(text_2, "footer-text");
  text_2.textContent = ".Coded by ";

  const a_2 = createElement("a");
  addClass(a_2, "footer-link");
  a_2.setAttribute("href", `https://github.com/SuhodolecA`);
  a_2.setAttribute("target", `_blank`);
  a_2.textContent = "Anton Sukhadolets";

  container.append(text_1);
  container.append(a_1);
  container.append(text_2);
  container.append(a_2);

  footer.append(container);

  return footer;
}

function createHeader() {
  const header = createElement("header");
  addClass(header, "header");
  const container = createElement("div");
  addClass(container, "container");
  const menu = createMenu(headerMenuLinks);
  addClass(menu, "menu");
  const nav = createElement("nav");
  addClass(nav, "nav");
  container.append(menu);
  nav.append(container);

  header.append(nav);
  header.append(createHeaderMain());

  return header;
}

function createHeaderMain() {
  const headerMain = createElement("div");
  addClass(headerMain, "header-main");

  const container = createElement("div");
  addClass(container, "container");

  // header logo
  const headerMainLogo = createElement("a");
  addClass(headerMainLogo, "header-main__logo");
  headerMainLogo.setAttribute("href", "main.html");

  const headerLogoImg = createElement("img");
  addClass(headerLogoImg, "header-main__logo-img");
  headerLogoImg.setAttribute("src", "../../assets/images/logo.png");
  headerLogoImg.setAttribute("alt", "logo");

  headerMainLogo.append(headerLogoImg);

  // ===============================

  // search bar
  const searchBar = createElement("form");
  addClass(searchBar, "searchBar");
  searchBar.setAttribute("role", "search");

  const searchBarInput = createElement("input");
  addClass(searchBarInput, "searchBar-input");
  searchBarInput.setAttribute("type", "search");
  searchBarInput.setAttribute("name", "search");
  searchBarInput.setAttribute("placeholder", "Search...");
  searchBarInput.setAttribute("aria-label", "Search through site content");

  const searchBtn = createElement("button");
  addClass(searchBtn, "search-btn");
  searchBtn.setAttribute("type", "button");
  searchBtn.textContent = "Search";

  searchBar.append(searchBarInput);
  searchBar.append(searchBtn);

  // ================================

  // headerMainBasket
  const headerMainBasket = createElement("div");
  addClass(headerMainBasket, "header-main__basket");

  const headerMainBasketIcon = createElement("a");
  addClass(headerMainBasketIcon, "header-main__basket-icon");
  addClass(headerMainBasketIcon, "fas");
  addClass(headerMainBasketIcon, "fa-shopping-basket");
  headerMainBasketIcon.setAttribute("href", "#");
  headerMainBasketIcon.addEventListener("click", createHtmlCardStructure);

  const headerMainBasketAmount = createElement("div");
  addClass(headerMainBasketAmount, "header-main__basket-amount");
  headerMainBasketAmount.textContent = purchases.length;

  // headerMainBasketCost
  const headerMainBasketCost = createElement("div");
  addClass(headerMainBasketCost, "header-main__basket-cost");

  const headerMainBasketCostInput = createElement("div");
  addClass(headerMainBasketCostInput, "header-main__basket-cost__input");
  headerMainBasketCostInput.textContent = cartSum;

  const headerMainBasketCostInputCur = createElement("span");
  addClass(headerMainBasketCostInputCur, "header-main__basket-cost__currency");
  headerMainBasketCostInputCur.textContent = "$";

  headerMainBasketCost.append(headerMainBasketCostInputCur);
  headerMainBasketCost.append(headerMainBasketCostInput);
  // =============================================
  headerMainBasket.append(headerMainBasketIcon);
  headerMainBasket.append(headerMainBasketAmount);
  headerMainBasket.append(headerMainBasketCost);
  // ===========================

  // container
  container.append(headerMainLogo);
  container.append(searchBar);
  container.append(headerMainBasket);
  // ===========================

  headerMain.append(container);

  return headerMain;
}

function closeDescription(e) {
  const overlay = document.querySelector(".overlay");
  const description = document.querySelector(".book-description");
  overlay.classList.remove("show");
  description.classList.remove("show");
}

function closeForm(e) {
  const overlay = document.querySelector(".overlay");
  const delivery = document.querySelector(".delivery");
  overlay.classList.remove("show");
  delivery.classList.remove("show");
}

function createBookDesc() {
  const container = createElement("div");
  addClass(container, "book-description");

  const closeBtn = createElement("button");
  addClass(closeBtn, "book-description__close");
  closeBtn.setAttribute("type", "button");
  closeBtn.textContent = "Close";
  closeBtn.addEventListener("click", closeDescription);

  const bookCover = createElement("img");
  addClass(bookCover, "book-description__cover");
  bookCover.setAttribute("src", "/assets/images/2.jpeg");
  bookCover.setAttribute("alt", "book cover");

  const contentSection = createElement("section");
  addClass(contentSection, "book-description__content");
  const contentSectionTitle = createElement("h3");
  addClass(contentSectionTitle, "book-description__content-title");
  contentSectionTitle.textContent = "Star Wars Episode I";
  const contentSectionAuthor = createElement("p");
  addClass(contentSectionAuthor, "book-description__content-author");
  contentSectionAuthor.textContent = "Author: David Herman";

  const contentSectionText = createElement("p");
  addClass(contentSectionText, "book-description__content-text");
  contentSectionText.textContent =
    "The Star Wars Episode I: The Phantom Menace novelization was written by Terry Brooks and published on April 21, 1999 by Del Rey. It is based on the script of the movie of the same name. Narration for the abridged audio version was performed by Michael Cumpsty. The unabridged version was performed by Alexander Adams. On January 31, 2012, a new paperback edition.";
  contentSection.append(contentSectionTitle);
  contentSection.append(contentSectionAuthor);
  contentSection.append(contentSectionText);

  container.append(closeBtn);
  container.append(bookCover);
  container.append(contentSection);

  return container;
}

function createMain() {
  const main = createElement("main");
  addClass(main, "main");

  const container = createElement("div");
  addClass(container, "container");

  // create main-aside section
  const mainAside = createElement("aside");
  addClass(mainAside, "main-aside");

  const h2_1 = createElement("h2");
  addClass(h2_1, "main-aside__title");
  h2_1.textContent = "Categories";

  const h3_1 = createElement("h3");
  addClass(h3_1, "main-aside__category");
  h3_1.textContent = "Fiction & Literature";

  const h3_2 = createElement("h3");
  addClass(h3_2, "main-aside__category");
  h3_2.textContent = "Non - Fiction";

  const h3_3 = createElement("h3");
  addClass(h3_3, "main-aside__category");
  h3_3.textContent = "Other";

  const ulFL = createMenu(asideCategoriesList_1);
  addClass(ulFL, "menu");

  const ulNF = createMenu(asideCategoriesList_2);
  addClass(ulNF, "menu");

  const ulO = createMenu(asideCategoriesList_3);
  addClass(ulO, "menu");
  // ============================

  // create main-content section
  const mainContent = createElement("section");
  addClass(mainContent, "main-content");

  const h2_2 = createElement("h2");
  addClass(h2_2, "main-content__title");
  h2_2.textContent = "Science Fiction";

  const ul = createElement("ul");
  addClass(ul, "main-content__books");
  // ============================
  for (let i = 0; i < books.length; i++) {
    ul.append(
      createCardItem(
        "main-content__books-item__img",
        "main-content__books-item",
        "main-content__books-item__btn-add",
        books[i].imageLink,
        "book poster",
        "main-content__books-item__title",
        books[i].title,
        "main-content__books-item__author",
        books[i].author,
        books[i].price,
        "main-content__books-item__price",
        "Add to cart",
        "main-content__books-item__btn",
        "main-content__books-item__btn-show",
        "Show more",
        books[i].id
      )
    );
  }

  main.append(container);
  mainAside.append(h2_1);
  mainAside.append(h3_1);
  mainAside.append(ulFL);
  mainAside.append(h3_2);
  mainAside.append(ulNF);
  mainAside.append(h3_3);
  mainAside.append(ulO);

  mainContent.append(h2_2);
  mainContent.append(ul);
  container.append(mainAside);
  container.append(mainContent);
  return main;
}

createMain(books);

// create order form
function createForm() {
  const form = createElement("form");
  addClass(form, "delivery");
  form.setAttribute("action", "#");

  const closeBtn = createElement("button");
  addClass(closeBtn, "delivery-close");
  closeBtn.setAttribute("type", "button");
  closeBtn.textContent = "Close";
  closeBtn.addEventListener("click", closeForm);

  const formNameContainer = createElement("div");
  addClass(formNameContainer, "delivery-name");
  addClass(formNameContainer, "delivery-item");

  const formName = createElement("input");
  addClass(formName, "delivery-name__input");
  formName.setAttribute("type", "text");
  formName.setAttribute("id", "name");
  formName.setAttribute("name", "name");
  formName.setAttribute("placeholder", "Enter your name");
  formName.setAttribute("required", "true");
  formName.addEventListener("keydown", stringOnly);
  formName.addEventListener("keyup", (e) => {
    validCharAmount(e, 4);
  });
  formName.addEventListener("focusout", (e) => {
    validCharAmount(e, 4);
  });
  formNameContainer.append(formName);

  const formSurnameContainer = createElement("div");
  addClass(formSurnameContainer, "delivery-surname");
  addClass(formSurnameContainer, "delivery-item");

  const formSurname = createElement("input");
  addClass(formSurname, "delivery-surname__input");
  formSurname.setAttribute("type", "text");
  formSurname.setAttribute("id", "surname");
  formSurname.setAttribute("name", "surname");
  formSurname.setAttribute("placeholder", "Enter your surname");
  formSurname.setAttribute("required", "true");
  formSurname.addEventListener("keydown", stringOnly);
  formSurname.addEventListener("keyup", (e) => {
    validCharAmount(e, 5);
  });
  formSurname.addEventListener("focusout", (e) => {
    validCharAmount(e, 5);
  });

  formSurnameContainer.append(formSurname);

  const formDateContainer = createElement("div");
  addClass(formDateContainer, "delivery-date");
  addClass(formDateContainer, "delivery-item");

  const formDateLabel = createElement("label");
  addClass(formDateLabel, "delivery-date__label");
  formDateLabel.setAttribute("for", "date");
  formDateLabel.textContent = "Delivery date";

  const formDate = createElement("input");
  addClass(formDate, "delivery-date__input");
  formDate.setAttribute("type", "date");
  formDate.setAttribute("id", "date");
  formDate.setAttribute("name", "date");
  formDate.setAttribute("required", "true");
  formDate.setAttribute("min", nextDate());
  formDate.addEventListener("focusout", validDate);
  formDate.addEventListener("change", validDate);
  formDateContainer.append(formDateLabel);
  formDateContainer.append(formDate);

  const formStreetContainer = createElement("div");
  addClass(formStreetContainer, "delivery-street");
  addClass(formStreetContainer, "delivery-item");

  const formStreet = createElement("input");
  addClass(formStreet, "delivery-street__input");
  formStreet.setAttribute("type", "text");
  formStreet.setAttribute("id", "street");
  formStreet.setAttribute("name", "street");
  formStreet.setAttribute("placeholder", "Enter your street");
  formStreet.setAttribute("required", "true");
  formStreet.addEventListener("keyup", (e) => {
    validCharAmount(e, 5);
  });
  formStreet.addEventListener("focusout", (e) => {
    validCharAmount(e, 5);
  });

  formStreetContainer.append(formStreet);

  const formHouseContainer = createElement("div");
  addClass(formHouseContainer, "delivery-house");
  addClass(formHouseContainer, "delivery-item");

  const formHouse = createElement("input");
  addClass(formHouse, "delivery-house__input");
  formHouse.setAttribute("type", "number");
  formHouse.setAttribute("id", "house");
  formHouse.setAttribute("name", "house");
  formHouse.setAttribute("placeholder", "Enter your house number");
  formHouse.setAttribute("required", "true");
  formHouse.setAttribute("min", 0);
  formHouse.addEventListener("keydown", (e) => {
    if (
      !(
        (e.keyCode >= 48 && e.keyCode <= 57) ||
        e.keyCode == 8 ||
        e.keyCode == 46
      )
    ) {
      e.preventDefault();
    } else if (e.target.value === "") {
      e.target.closest(".delivery-item").classList.remove("valid");
      e.target.closest(".delivery-item").classList.add("error");
    } else {
      e.target.closest(".delivery-item").classList.add("valid");
      e.target.closest(".delivery-item").classList.remove("error");
    }
    changeSubmitBtnState();
  });
  formHouse.addEventListener("focusout", (e) => {
    if (e.target.value === "") {
      e.target.closest(".delivery-item").classList.remove("valid");
      e.target.closest(".delivery-item").classList.add("error");
    } else {
      e.target.closest(".delivery-item").classList.add("valid");
      e.target.closest(".delivery-item").classList.remove("error");
    }
    changeSubmitBtnState();
  });
  formHouseContainer.append(formHouse);

  const formFlatContainer = createElement("div");
  addClass(formFlatContainer, "delivery-flat");
  addClass(formFlatContainer, "delivery-item");

  const formFlat = createElement("input");
  addClass(formFlat, "delivery-flat__input");
  formFlat.setAttribute("type", "tel");
  formFlat.setAttribute("id", "flat");
  formFlat.setAttribute("name", "flat");
  formFlat.setAttribute("placeholder", "Enter your flat number");
  formFlat.setAttribute("required", "true");
  formFlat.setAttribute("min", 1);
  formFlat.addEventListener("focusout", (e) => {
    if (e.target.value[0] == '-' || e.target.value == '') {
      e.target.closest(".delivery-item").classList.remove("valid");
      e.target.closest(".delivery-item").classList.add("error");
    } else {
      e.target.closest(".delivery-item").classList.add("valid");
      e.target.closest(".delivery-item").classList.remove("error");
    }
    changeSubmitBtnState();
  });
  formFlatContainer.append(formFlat);

  const formPaymentContainer = createElement("div");
  addClass(formPaymentContainer, "delivery-payment");
  addClass(formPaymentContainer, "delivery-item");
  addClass(formPaymentContainer, "valid");

  const formPaymentCardLabel = createElement("label");
  addClass(formPaymentCardLabel, "delivery-payment__label");
  formPaymentCardLabel.setAttribute("for", "card");
  formPaymentCardLabel.textContent = "Card:";

  const formPaymentCard = createElement("input");
  addClass(formPaymentCard, "delivery-payment__input");
  formPaymentCard.setAttribute("type", "radio");
  formPaymentCard.setAttribute("id", "card");
  formPaymentCard.setAttribute("name", "payment");
  formPaymentCard.setAttribute("required", "true");
  formPaymentCard.setAttribute("checked", "true");
  formPaymentCard.setAttribute("value", "card");

  const formPaymentCashLabel = createElement("label");
  addClass(formPaymentCashLabel, "delivery-payment__label");
  formPaymentCashLabel.setAttribute("for", "cash");
  formPaymentCashLabel.setAttribute("value", "cash");
  formPaymentCashLabel.textContent = "Cash:";

  const formPaymentCash = createElement("input");
  addClass(formPaymentCash, "delivery-payment__input");
  formPaymentCash.setAttribute("type", "radio");
  formPaymentCash.setAttribute("id", "cash");
  formPaymentCash.setAttribute("name", "payment");
  formPaymentCash.setAttribute("required", "true");
  formPaymentCash.setAttribute("value", "cash");
  formPaymentContainer.append(formPaymentCardLabel);
  formPaymentContainer.append(formPaymentCard);
  formPaymentContainer.append(formPaymentCashLabel);
  formPaymentContainer.append(formPaymentCash);

  const submitBtn = createElement("button");
  addClass(submitBtn, "delivery-submit");
  submitBtn.setAttribute("type", "submit");
  submitBtn.setAttribute("disabled", "true");
  submitBtn.textContent = "Submit"; 
  submitBtn.addEventListener('click', createSumInfo)

  form.append(closeBtn);
  form.append(formNameContainer);
  form.append(formSurnameContainer);
  form.append(formDateContainer);
  form.append(formStreetContainer);
  form.append(formHouseContainer);
  form.append(formFlatContainer);
  form.append(formPaymentContainer);
  form.append(submitBtn);

  return form;
}

// ======== Basket ======
function createCardItemBasket(
  classNameImg,
  classNameLi,
  classNameBtn,
  src,
  alt,
  h4_class,
  h4_text,
  price,
  classNameP,
  btnText
) {
  const li = createElement("li");
  addClass(li, classNameLi);
  const img = createElement("img");
  addClass(img, classNameImg);
  img.setAttribute("src", src);
  img.setAttribute("alt", alt);

  const button = createElement("button");
  addClass(button, classNameBtn);
  button.textContent = btnText;

  const h4 = createElement("h4");
  addClass(h4, h4_class);

  const a = createElement("a");
  addClass(a, `${h4_class}-link`);
  a.setAttribute("href", "#");
  a.textContent = h4_text;

  h4.append(a);

  const p = createElement("p");
  addClass(p, classNameP);
  p.textContent = `price: ${price}$`;

  li.append(img);
  li.append(h4);
  li.append(p);
  li.append(button);

  return li;
}

function createCartMain(arr) {
  const main = createElement("main");
  addClass(main, "cart-main");

  const container = createElement("div");
  addClass(container, "container");

  const h2 = createElement("h2");
  addClass(h2, "cart-main__title");
  h2.textContent = "Shopping Cart";

  const ul = createElement("ul");
  addClass(ul, "cart-main__list");
  // ============================
  if (arr) {
    for (let i = 0; i < arr.length; i++) {
      ul.append(
        createCardItemBasket(
          "cart-main__list__item-img",
          "cart-main__list__item",
          "cart-main__list__item-btn",
          arr[i].imageLink,
          "book poster",
          "cart-main__list__item-title",
          arr[i].title,
          arr[i].price,
          "cart-main__list__item-price",
          "Remove"
        )
      );
    }
  }

  const totalSumContainer = createElement("div");
  addClass(totalSumContainer, "cart-main__sum");
  const totalSumContainerCur = createElement("span");
  addClass(totalSumContainerCur, "cart-main__sum-cur");
  totalSumContainerCur.textContent = "Total sum: $";
  const totalSumContainerAmount = createElement("span");
  addClass(totalSumContainerAmount, "cart-main__sum-amount");
  totalSumContainerAmount.textContent = cartSum;
  totalSumContainer.append(totalSumContainerCur);
  totalSumContainer.append(totalSumContainerAmount);

  const confirmBtn = createElement("button");
  addClass(confirmBtn, "cart-main__confirm");
  confirmBtn.addEventListener("click", showForm);
  confirmBtn.textContent = "Confirm";

  container.append(h2);
  container.append(ul);
  container.append(totalSumContainer);
  container.append(confirmBtn);
  main.append(container);

  return main;
}

function createHtmlCardStructure() {
  const fragment = document.createDocumentFragment();
  fragment.appendChild(createOverlay());
  fragment.appendChild(createForm());
  fragment.appendChild(createCartHeader());
  fragment.appendChild(createCartMain(purchases));
  fragment.appendChild(createFooter());
  wrapper.innerHTML = "";
  wrapper.append(fragment);
}

// ======== /Basket ======

// === / helper functions
function createHtmlStructure() {
  fragment.appendChild(createHeader());
  fragment.appendChild(createOverlay());
  fragment.appendChild(createBookDesc());
  fragment.appendChild(createMain(books));
  fragment.appendChild(createFooter());
  wrapper.innerHTML = "";
  wrapper.append(fragment);
}

