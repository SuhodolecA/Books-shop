// common variables
const wrapper = document.querySelector(".wrapper");
const headerMenuLinks = ["Sign in", "My Account", "Order Status", "Help"];
const fragment = document.createDocumentFragment();
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

const asideCategoriesList_3 = ["Science", "Sex", "Baby", "Sports", "Travel"];
let books;





// helper functions
function showDescription(e) {
    // console.log(e.target.closest('.main-content__books-item'));
    const item = e.target.closest('.main-content__books-item');
    const overlay = document.querySelector('.overlay');
    const description = document.querySelector('.book-description');
    setDescriptionData(item, description);
    overlay.classList.add('show');
    description.classList.add('show');
}

function setDescriptionData(element, descr) {
    const id = element.dataset.bookId;
    const img = descr.querySelector('.book-description__cover');
    img.src = books.filter(book => book.id == id)[0].imageLink;
    const title = descr.querySelector('.book-description__content-title');
    title.textContent = books.filter(book => book.id == id)[0].title;
    const author = descr.querySelector('.book-description__content-author');
    author.textContent = 'Author: ' + books.filter(book => book.id == id)[0].author;
    const text = descr.querySelector('.book-description__content-text');
    text.textContent = books.filter(book => book.id == id)[0].description;
    
    // console.log('id', id)
    // console.log('element', element)
    // const img = element.querySelector('.main-content__books-item__img')
    // img.src = books.imageLink;
    // console.log('img', img)

}

function closeDescription(e) {
    const overlay = document.querySelector('.overlay');
    const description = document.querySelector('.book-description');
    overlay.classList.remove('show');
    description.classList.remove('show');
}
function createElement(name) {
  const element = document.createElement(name);
  return element;
}

function addClass(element, className) {
  element.classList.add(className);
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
//   buttonAdd.dataset.bookId = id;
  buttonAdd.textContent = btnText;
  const buttonShow = createElement("button");
  addClass(buttonShow, btnShowClass);
  buttonShow.addEventListener('click', showDescription);
//   buttonShow.dataset.bookId = id;
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

// ===================================
function createOverlay() {
  const overlay = createElement("div");
  addClass(overlay, "overlay");

  return overlay;
}
// create overlay section

// ==================
// create book description section
function createBookDesc() {
  const container = createElement("div");
  addClass(container, "book-description");

  const closeBtn = createElement("button");
  addClass(closeBtn, "book-description__close");
  closeBtn.setAttribute("type", "button");
  closeBtn.textContent = "Close";
  closeBtn.addEventListener('click', closeDescription);

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

// =============================
// create header top function
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

  fragment.appendChild(createHeaderMain());
  header.append(fragment);

  return header;
}

// create header main
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
  headerMainBasketIcon.setAttribute("href", "../cart/cart.html");

  const headerMainBasketAmount = createElement("div");
  addClass(headerMainBasketAmount, "header-main__basket-amount");
  headerMainBasketAmount.textContent = 0;

  // headerMainBasketCost
  const headerMainBasketCost = createElement("div");
  addClass(headerMainBasketCost, "header-main__basket-cost");

  const headerMainBasketCostInput = createElement("div");
  addClass(headerMainBasketCostInput, "header-main__basket-cost__input");
  headerMainBasketCostInput.textContent = 0;

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

// create main section
async function createMain() {
//   const arr = await fetch("../../books.json")
//     .then((response) => response.json())
//     .then((response) => response);
  books = await fetch("../../books.json")
      .then((response) => response.json())
      .then((response) => response);
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

// create footer
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
  footerLogo.setAttribute("src", "/assets/images/footer-logo.png");
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

async function createHtmlStructure() {
  fragment.appendChild(await  createOverlay());
//   wrapper.append(fragment);
  fragment.appendChild(await createBookDesc());
//   wrapper.append(fragment);
  fragment.appendChild(await createHeader());
//   wrapper.append(fragment);
  fragment.appendChild(await createMain());
//   wrapper.append(fragment);
  fragment.appendChild(await createFooter());
  wrapper.append(fragment);
}

createHtmlStructure();