DOM_review = {
    reviewButton: document.querySelector('.slider-form button'),
    oferaRatingForm: document.querySelector('.slider-form'),
    reviewRecaptcha: document.querySelector('.recaptcha-review')
}

let reviewFormFunctionality = () => {
    DOM_review.reviewButton.addEventListener('click', e => {
        e.preventDefault()
        const rating = document.querySelector('input[name="rating-amount"]:checked').value
        document.querySelector('.slider-form .rating-value').value = rating
        DOM_review.oferaRatingForm.submit()
    })
}

// Init
reviewFormFunctionality()

