'use strict';

const mainBtn = document.querySelector('#main-action-button'),
    products = document.querySelector('#products'),
    links = document.querySelectorAll('.menu-list-item > a'),
    buttons = document.querySelectorAll('.products-item .btn'),
    changeCurrencyBtn = document.querySelector('#change-currency'),
    prices = document.querySelectorAll('.products-item-price'),
    product = document.querySelector('#product'),
    name = document.querySelector('#name'),
    phone = document.querySelector('#phone'),
    orderBtn = document.querySelector('#order-action');

function scrollToElement(elementId) {
    document.getElementById(elementId).scrollIntoView({ behavior: 'smooth' });
}

mainBtn.addEventListener('click', () => {
    scrollToElement(products.id);
});

links.forEach(link => {
    link.addEventListener('click', () => {
        scrollToElement(link.getAttribute("data-link"));
    });
});

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        scrollToElement('order');
    });
});

changeCurrencyBtn.addEventListener('click', (e) => {
    const currentCurrency = e.target.innerText;

    let newCurrency = '$',
        coefficient = 1;

    if (currentCurrency === '$') {
        newCurrency = '₽';
        coefficient = 90;
    } else if (currentCurrency === '₽') {
        newCurrency = 'BYN';
        coefficient = 3;
    } else if (currentCurrency === 'BYN') {
        newCurrency = '€';
        coefficient = 0.9;
    } else if (currentCurrency === '€') {
        newCurrency = '¥';
        coefficient = 6.9;
    }

    e.target.innerText = newCurrency;

    prices.forEach(price => {
        price.innerText = `${+(price.getAttribute('data-base-price') * coefficient).toFixed(1)} ${newCurrency}`;
    })

});

orderBtn.addEventListener('click', () => {
    let hasError = false;

    [product, name, phone].forEach(item => {
        if (!item.value) {
            item.style.borderColor = 'red';
            hasError = true;
        } else {
            item.style.borderColor = '';
        }
    });

    if (!hasError) {
        [product, name, phone].forEach(item => {
            item.value = '';
        });
        alert('Спасибо за заказ! Мы скоро свяжемся с Вами!');
    }
});