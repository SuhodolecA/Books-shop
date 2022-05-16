// common variables
const wrapper = document.querySelector('.wrapper');
const headerMenuLinks = ['Sign in', 'My Account', 'Order Status', 'Help'];
const fragment = document.createDocumentFragment();
const asideCategoriesList_1 = ['Science', 'Fantasy', 'Mystery', 'Horror', 'Romance', 'Poetry', 'Crime', 'Children', 'Literature'];
const asideCategoriesList_2 = ['Cook', 'Photography', 'Comic', 'Business', 'Computer', 'History', 'Psychology', 'Art', 'Medical'];
const asideCategoriesList_3 = ['Science', 'Sex', 'Baby', 'Sports', 'Travel'];

// helper functions 
function createElement(name) {
    const element = document.createElement(name);
    return element;
}

function addClass(element, className) {
    element.classList.add(className)
}

function createMenu(itemsContent) {
    const ul = createElement('ul');
    for(let i = 0; i < itemsContent.length; i++){
        const li = createElement('li');
        addClass(li, 'menu-item');
        const a = createElement('a');
        addClass(a, 'menu-item__link');
        a.setAttribute('href', `#${itemsContent[i]}`)
        a.textContent = itemsContent[i];
        li.append(a);
        ul.append(li);
    }

    return ul;
}


function createCardItem(classNameImg, classNameLi, classNameBtn, src, alt, h4_class, h4_text, price, classNameP) {
    const li = createElement('li');
    addClass(li, classNameLi);
    const img = createElement('img');
    addClass(img, classNameImg);
    img.setAttribute('src', src);
    img.setAttribute('alt', alt);

    const button = createElement('button');
    addClass(button, classNameBtn);
    button.textContent = 'Add to cart';

    const h4 = createElement('h4');
    addClass(h4, h4_class);
   

    const a = createElement('a');
    addClass(a, `${h4_class}-link`);
    a.setAttribute('href', '#');
    a.textContent = h4_text;

    h4.append(a);

    const p = createElement('p');
    addClass(p, classNameP);
    p.textContent = `price: ${price}$`

    li.append(img);
    li.append(h4);
    li.append(p);
    li.append(button);

    return li;
}

// ===================================


// create header top function
function createHeader() {
    const header = createElement('header');
    addClass(header, 'header');
    const container = createElement('div');
    addClass(container, 'container');
    const menu =  createMenu(headerMenuLinks);
    addClass(menu, 'menu');
    const nav = createElement('nav');
    addClass(nav, 'nav');
    container.append(menu)
    nav.append(container)
   
    header.append(nav)

    fragment.appendChild(createHeaderMain());
    header.append(fragment)

    return header;
}

// create header main
function createHeaderMain() {
    const headerMain = createElement('div');
    addClass(headerMain, 'header-main');
    
    const container = createElement('div');
    addClass(container, 'container');

    // header logo
    const headerMainLogo = createElement('a');
    addClass(headerMainLogo, 'header-main__logo');
    headerMainLogo.setAttribute('href', 'main.html')

    const headerLogoImg = createElement('img');
    addClass(headerLogoImg, 'header-main__logo-img');
    headerLogoImg.setAttribute('src', '../../assets/images/logo.png');
    headerLogoImg.setAttribute('alt', 'logo');

    headerMainLogo.append(headerLogoImg);

    // ===============================

    // search bar
    const searchBar = createElement('form');
    addClass(searchBar, 'searchBar');
    searchBar.setAttribute('role', 'search');

    const searchBarInput = createElement('input');
    addClass(searchBarInput, 'searchBar-input');
    searchBarInput.setAttribute('type', 'search');
    searchBarInput.setAttribute('name', 'search');
    searchBarInput.setAttribute('placeholder', 'Search...');
    searchBarInput.setAttribute('aria-label', 'Search through site content');

    const searchBtn = createElement('button');
    addClass(searchBtn, 'search-btn');
    searchBtn.setAttribute('type', 'button');
    searchBtn.textContent ='Search';

    searchBar.append(searchBarInput);
    searchBar.append(searchBtn);

    // ================================

    // headerMainBasket
    const headerMainBasket = createElement('div');
    addClass(headerMainBasket, 'header-main__basket');


    const headerMainBasketIcon = createElement('a');
    addClass(headerMainBasketIcon, 'header-main__basket-icon');
    addClass(headerMainBasketIcon, 'fas');
    addClass(headerMainBasketIcon, 'fa-shopping-basket');
    headerMainBasketIcon.setAttribute('href', '#');

    const headerMainBasketAmount = createElement('div');
    addClass(headerMainBasketAmount, 'header-main__basket-amount');
    headerMainBasketAmount.textContent = 99;

    // headerMainBasketCost
    const headerMainBasketCost = createElement('div');
    addClass(headerMainBasketCost, 'header-main__basket-cost');


    const headerMainBasketCostInput = createElement('div');
    addClass(headerMainBasketCostInput, 'header-main__basket-cost__input');
    headerMainBasketCostInput.textContent = 152;

    const headerMainBasketCostInputCur = createElement('span');
    addClass(headerMainBasketCostInputCur, 'header-main__basket-cost__currency');
    headerMainBasketCostInputCur.textContent = '$';

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
    const arr = await fetch('../../books.json').then(response => response.json()).then(response => response);
    const main = createElement('main');
    addClass(main, 'main');

    const container = createElement('div');
    addClass(container, 'container');

    // create main-aside section
    const mainAside = createElement('aside');
    addClass(mainAside, 'main-aside');

    const h2_1 = createElement('h2');
    addClass(h2_1, 'main-aside__title');
    h2_1.textContent = 'Categories';

    const h3_1 = createElement('h3');
    addClass(h3_1, 'main-aside__category');
    h3_1.textContent = 'Fiction & Literature';

    const h3_2 = createElement('h3');
    addClass(h3_2, 'main-aside__category');
    h3_2.textContent = 'Non - Fiction';

    const h3_3 = createElement('h3');
    addClass(h3_3, 'main-aside__category');
    h3_3.textContent = 'Other';

    const ulFL = createMenu(asideCategoriesList_1);
    addClass(ulFL, 'menu');

    const ulNF = createMenu(asideCategoriesList_2);
    addClass(ulNF, 'menu');

    const ulO = createMenu(asideCategoriesList_3);
    addClass(ulO, 'menu');
    // ============================

    // create main-content section
    const mainContent = createElement('section');
    addClass(mainContent, 'main-content');

    const h2_2 = createElement('h2');
    addClass(h2_2, 'main-content__title');
    h2_2.textContent = 'Science Fiction';

    const ul = createElement('ul');
    addClass(ul, 'main-content__books');
    // ============================
    for(let i = 0; i < arr.length; i++) {
        ul.append(createCardItem(
            'main-content__books-item__img', 
            'main-content__books-item', 
            'main-content__books-item__btn', 
            arr[i].imageLink, 
            'book poster', 
            'main-content__books-item__title', 
            arr[i].title, 
            arr[i].price, 
            'main-content__books-item__price'
            ))
           
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




async function createHtmlStructure() {
    fragment.appendChild(await createHeader());
    wrapper.append(fragment)
    fragment.appendChild(await createMain());
    wrapper.append(fragment)
}


createHtmlStructure()