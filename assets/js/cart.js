const cartWrapper = document.querySelector(".cart-wrapper");
const fragment = document.createDocumentFragment();
const headerMenuLinks = ["Sign in", "My Account", "Order Status", "Help"];
const bookList = [
  {
    author: "Douglas Crockford",
    imageLink: "/assets/images/1.jpeg",
    title: "JavaScript: The Good Parts: The Good Parts",
    price: 30,
    description:
      "With JavaScript: The Good Parts, you'll discover a beautiful, elegant, lightweight and highly expressive language that lets you create effective code, whether you're managing object libraries or just trying to get Ajax to run fast. If you develop sites or applications for the Web, this book is an absolute must",
  },
  {
    "author": "David Herman",
    "imageLink": "/assets/images/2.jpeg",
    "title": "Effective JavaScript: 68 Specific Ways to Harness the Power of JavaScript",
    "price": 22,
    "description": "Effective JavaScript is organized around 68 proven approaches for writing better JavaScript, backed by concrete examples. You’ll learn how to choose the right programming style for each project, manage unanticipated problems, and work more successfully with every facet of JavaScript programming from data structures to concurrency"
  },
  {
    "author": " Eric Elliott",
    "imageLink": "/assets/images/4.jpeg",
    "title": "Programming JavaScript Applications",
    "price": 19,
    "description": "Take advantage of JavaScript’s power to build robust web-scale or enterprise applications that are easy to extend and maintain. By applying the design patterns outlined in this practical book, experienced JavaScript developers will learn how to write flexible and resilient code that’s easier—yes, easier—to work with as your code base grows."
  }
];

// helper functions
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

// =================================================
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
  headerMainLogo.setAttribute("href", "../main/main.html");

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
  for (let i = 0; i < arr.length; i++) {
    ul.append(
      createCardItem(
        "cart-main__list__item-img",
        "cart-main__list__item",
        "cart-main__list__item-btn",
        arr[i].imageLink,
        "book poster",
        "cart-main__list__item-title",
        arr[i].title,
        arr[i].price,
        "cart-main__list__item-price",
        'Remove'
      )
    );
  }

  container.append(h2);
  container.append(ul);
  main.append(container);

  return main;
}


function createFooter() {
    const footer = createElement('footer');
    addClass(footer, 'footer');

    const container = createElement('div');
    addClass(container, 'container');

    const text_1 = createElement('span');
    addClass(text_1, 'footer-text');
    text_1.textContent = 'Challenge by';

    const a_1 = createElement('a');
    addClass(a_1, 'footer-link');
    a_1.setAttribute(
        'href', 
        `https://github.com/rolling-scopes-school/js-fe-course-en/blob/main/tasks/books-shop/books-shop.md`
    );
    a_1.setAttribute(
        'target', 
        `_blank`
    );

    const footerLogo = createElement('img');
    addClass(footerLogo, 'footer-logo');
    footerLogo.setAttribute('src', '/assets/images/footer-logo.png');
    footerLogo.setAttribute('alt', 'logo');

    a_1.append(footerLogo);

    const text_2 = createElement('span');
    addClass(text_2, 'footer-text');
    text_2.textContent = '.Coded by ';

    const a_2 = createElement('a');
    addClass(a_2, 'footer-link');
    a_2.setAttribute(
        'href', 
        `https://github.com/SuhodolecA`
    );
    a_2.setAttribute(
        'target', 
        `_blank`
    );
    a_2.textContent = "Anton Sukhadolets";

        
    container.append(text_1);
    container.append(a_1);
    container.append(text_2);
    container.append(a_2);

    footer.append(container);

    return footer;
}

async function createHtmlStructure() {
  fragment.appendChild(await createCartHeader());
  cartWrapper.append(fragment);
  fragment.appendChild(await createCartMain(bookList));
  cartWrapper.append(fragment);
  fragment.appendChild(await createFooter());
  cartWrapper.append(fragment);
}

createHtmlStructure();
