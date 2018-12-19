function scroll() {
    let link = document.getElementsByTagName('li');

    for (let i = 0; i < link.length; i++) {

        link[i].addEventListener('click', function (event) {
            let target = event.target;

            if (target && target.matches('a[href*="#"]')) {
                event.preventDefault();

                let a = target.getAttribute('href');
                document.querySelector("" + a).scrollIntoView({
                    block: "start",
                    behavior: "smooth"
                });
            }

        });
    }
}

module.exports = scroll;