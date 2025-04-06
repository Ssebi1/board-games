DOM_faq = {
    faqItem: document.querySelectorAll('.faq-items-container'),
    faqItemsArrows: document.querySelectorAll('.faq-items-container .faq-item .arrow'),
    faqItemsAnswers: document.querySelectorAll('.faq-items-container .faq-item .answer'),
    faqItemsAnswersText: document.querySelectorAll('.faq-items-container .faq-item .answer .answer-text')
}

let faqClickFuntionality = () => {
    for (let i = 0; i < DOM_faq.faqItem.length; i++) {
        DOM_faq.faqItem[i].addEventListener('click', () => {
            if (DOM_faq.faqItemsAnswers[i].style.height == '0px') {
                closeAllFaq()
                let height = window.getComputedStyle(DOM_faq.faqItemsAnswersText[i]).getPropertyValue('height')
                height = parseInt(height.substring(0, height.length - 2), 10)
                DOM_faq.faqItemsAnswers[i].style.height = height + 15 + 'px'
                DOM_faq.faqItemsArrows[i].style.transform = "rotate(-180deg)"
            }
            else {
                DOM_faq.faqItemsAnswers[i].style.height = '0px';
                DOM_faq.faqItemsArrows[i].style.transform = "rotate(0)"
            }

        })
    }
}

let closeAllFaq = () => {
    for (let i = 0; i < DOM_faq.faqItemsArrows.length; i++) {
        DOM_faq.faqItemsAnswers[i].style.height = '0px';
        DOM_faq.faqItemsArrows[i].style.transform = "rotate(0)"
    }
}

// Init
closeAllFaq()
faqClickFuntionality()