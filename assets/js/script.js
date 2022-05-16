// common variables
const wrapper = document.querySelector('.wrapper');
const headerMenuLinks = ['Sign in', 'My Account', 'Order Status', 'Help'];
const fragment = document.createDocumentFragment();

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

async function createHtmlStructure() {
    fragment.appendChild(await createHeader());
    wrapper.append(fragment)
}


createHtmlStructure()