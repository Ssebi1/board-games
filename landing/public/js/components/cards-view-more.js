DOM_cardsViewMore = {
    cards: document.querySelectorAll('.cards-grid .card'),
    cardsViewMore: document.querySelector('.viewMore')
}

var viewAll = false
for(var i=DOM_cardsViewMore.cards.length/2;i<DOM_cardsViewMore.cards.length;i++){
    DOM_cardsViewMore.cards[i].style.display="none";
}

DOM_cardsViewMore.cardsViewMore.addEventListener('click',() => {
    if(viewAll) {
        for(var i=DOM_cardsViewMore.cards.length/2;i<DOM_cardsViewMore.cards.length;i++){
            DOM_cardsViewMore.cards[i].style.display="none";
        }
        DOM_cardsViewMore.cardsViewMore.innerHTML="Vezi mai mult<br><i class='fas fa-chevron-down'></i>"
    } else {
        for(var i=DOM_cardsViewMore.cards.length/2;i<DOM_cardsViewMore.cards.length;i++){
            DOM_cardsViewMore.cards[i].style.display="flex";
        }
        DOM_cardsViewMore.cardsViewMore.innerHTML="<i class='fas fa-chevron-up'></i><br>Vezi mai puțin"
    }
    viewAll = !viewAll
})