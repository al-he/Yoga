function modal() {
    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        descriptionBtn = document.querySelectorAll('.description-btn'),
        tabDescriptin = document.querySelectorAll('.description');

    more.addEventListener('click', function () {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', () => {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';         
    });

    for (let i = 0; i < tabDescriptin.length; i++) {
        tabDescriptin[i].addEventListener('click', (event) => {
            if (event.target && event.target.matches('.description-btn')) {
                overlay.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    }
}

module.exports = modal;