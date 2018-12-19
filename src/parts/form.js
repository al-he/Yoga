function form() {
    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с Вами свяжемся',
        failure: 'Что-то пошло не так.....('
    };

    let form = document.querySelector('.main-form'),
        input = document.getElementsByTagName('input'),
        statusMessage = document.createElement('div'),
        close = document.querySelector('.popup-close'),
        contactForm = document.getElementById('form');
    statusMessage.classList.add('status');

    function sendForm(elem) {
        elem.addEventListener('submit', function (event) {
            event.preventDefault();
            elem.appendChild(statusMessage);
            let formData = new FormData(elem);

            function posData(data) {
                return new Promise(function (resolve, reject) {
                    let request = new XMLHttpRequest();
                    request.open('POST', 'server.php');
                    request.setRequestHeader('Content-Type',
                        'application/json; charset=utf-8');

                    request.onreadystatechange = function () {
                        if (request.readyState < 4) {
                            resolve();
                        } else if (request.readyState === 4) {
                            if (request.status === 200 && request.status < 3) {
                                resolve();
                            } else {
                                reject();
                            }
                        }
                    };
                    let obj = {};
                    formData.forEach(function (value, key) {
                        obj[key] = value;
                    });
                    let json = JSON.stringify(obj);
                    request.send(json);
                });
            }

            function clearImput() {
                for (let i = 0; i < input.length; i++) {
                    input[i].value = '';
                }
            }

            posData(formData)
                .then(() => statusMessage.innerHTML = message.loading)
                .then(() => statusMessage.innerHTML = message.success)
                .catch(() => statusMessage.innerHTML = message.failure)
                .then(clearImput);
        });
    }

    sendForm(form);
    sendForm(contactForm);

    function maskedInput() {
        let popupFormInput = document.getElementsByClassName('popup-form__input');
        popupFormInput[0].addEventListener('keypress', (e) => {
            if (!/\d/.test(e.key) && !/\+/.test(e.key)) {
                e.preventDefault();
            }
        });

        contactForm.addEventListener('click', (e) => {
            if (e.target && e.target.matches('[name*="ph"]')) {
                e.target.addEventListener('keypress', (e) => {
                    if (!/\d/.test(e.key) && !/\+/.test(e.key)) {
                        e.preventDefault();
                    }
                });
            }
        });
    }
    maskedInput();
    close.addEventListener('click', () => {
        statusMessage.innerHTML = '';        
    });
}
module.exports = form;