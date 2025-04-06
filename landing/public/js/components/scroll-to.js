DOM_scrooTo = {
    faqItem: document.querySelectorAll('.faq-items-container'),
    menuMobile: document.querySelector('.menu-mobile'),
    menuItems: document.querySelectorAll('.topbar-right li a'),
    menuCereOfertaButton: document.querySelectorAll('.topbar-right .topbar-cere-oferta-button'),
    menuMobileItems: document.querySelectorAll('.topbar-right-mobile li'),
    cereOfertaButton: document.querySelectorAll('.buton_cere_oferta'),
    contactButton: document.querySelectorAll('.buton_contact'),
    cereOfertaLinks: document.querySelectorAll('.card-text a'),
    contactSelectInput: document.querySelectorAll('.subject option')
}

let scrollToListener = (element) => {
    for (let i = 0; i < element.length; i++) {
        element[i].addEventListener('click', () => {
            document.querySelector('.' + element[i].dataset.scrollto).scrollIntoView()
        })
    }
}
let scrollToFormListener = (element) => {
    for (let i = 0; i < element.length; i++) {
        element[i].addEventListener('click', () => {
            document.querySelector('.' + element[i].dataset.scrollto).scrollIntoView()
            DOM_scrooTo.contactSelectInput[i + 1].selected = true
        })
    }
}
let setScrollToActions = () => {
    scrollToListener(DOM_scrooTo.menuItems)
    scrollToListener(DOM_scrooTo.menuCereOfertaButton)
    scrollToListener(DOM_scrooTo.menuMobileItems)
    scrollToListener(DOM_scrooTo.contactButton)
    scrollToListener(DOM_scrooTo.cereOfertaButton)
    scrollToFormListener(DOM_scrooTo.cereOfertaLinks)
}

// Init
setScrollToActions()