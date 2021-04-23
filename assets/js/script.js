"use strict";

const servicesTab = () => {
    const tabGroup = document.querySelector( '.services__tab-group' ),
             tabs = document.querySelectorAll('.services__tab'),
             contents = document.querySelectorAll('.services__content');

    const showContent = ( num ) => {
        tabs[num].classList.add('services__tab--active');
        contents[num].classList.add('services__content--active');
    };

    showContent(0);
    const hideContent = () => {
        tabs.forEach( el => {
            el.classList.remove('services__tab--active');
        });
        contents.forEach( el => {
            el.classList.remove('services__content--active');
        });
    };
    tabGroup.addEventListener('click', e => {
        let target = e.target;
        if ( target && target.classList.contains('services__tab') ) {
            tabs.forEach( (item, key) => {
                if ( target == item) {
                    hideContent();
                    showContent(key);
                }
            });
        }
    });
};
servicesTab();