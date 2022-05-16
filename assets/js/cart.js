const cartWrapper = document.querySelector('.cart-wrapper');
const fragment = document.createDocumentFragment();
const headerMenuLinks = ['Sign in', 'My Account', 'Order Status', 'Help'];

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



// ================= cart page =========================
function createCartHeader() {
    const header = createElement('header');
    addClass(header, 'cart-header');
    const container = createElement('div');
    addClass(container, 'container');
    const menu =  createMenu(headerMenuLinks);
    addClass(menu, 'cart-menu');
    const nav = createElement('nav');
    addClass(nav, 'cart-nav');

    const headerMainLogo = createElement('a');
    addClass(headerMainLogo, 'header-main__logo');
    headerMainLogo.setAttribute('href', '../main/main.html')

    const headerLogoImg = createElement('img');
    addClass(headerLogoImg, 'header-main__logo-img');
    headerLogoImg.setAttribute('src', '../../assets/images/logo.png');
    headerLogoImg.setAttribute('alt', 'logo');

    headerMainLogo.append(headerLogoImg);


    container.append(headerMainLogo)
    container.append(menu)
    nav.append(container)
   
    header.append(nav)

    return header;
}
// ================= / cart page =========================

async function createHtmlStructure() {
    fragment.appendChild(await createCartHeader());
    cartWrapper.append(fragment)
}


createHtmlStructure()