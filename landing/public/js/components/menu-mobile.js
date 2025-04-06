DOM_mobileMenu = {
    hamburgerMenuIcon: document.querySelector('.hamburger'),
    menuMobile: document.querySelector('.menu-mobile')
}

let openMenu = () => {
    DOM_mobileMenu.menuMobile.style.display = "block"
    DOM_mobileMenu.hamburgerMenuIcon.innerHTML = "<i class='fas fa-times'></i>"
}
let closeMenu = () => {
    DOM_mobileMenu.menuMobile.style.display = "none"
    DOM_mobileMenu.hamburgerMenuIcon.innerHTML = "<i class='fas fa-bars'></i>"
}
let isOpened = false
DOM_mobileMenu.hamburgerMenuIcon.addEventListener('click', () => {
    if (isOpened) {
        closeMenu()
        isOpened = false
    }
    else {
        openMenu()
        isOpened = true
    }
})