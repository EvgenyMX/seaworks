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


window.onscroll = function() { fixedHeader(); };

function fixedHeader() {
    var header = document.querySelector(".header");
    if (window.pageYOffset > 100) {
        header.style.cssText = "position: fixed; animation: anim 1s forwards;";
    } else {
        header.style.cssText = "position: absolute;";
    }
}


let inputs = document.querySelectorAll('.input__file');
Array.prototype.forEach.call(inputs, function (input) {


    let submit = document.querySelector('.application__submit');
    let label = input.nextElementSibling,
    labelVal = label.querySelector('.input__file-button-text').innerText;

    input.addEventListener('change', function() {
        let countFiles = '';
        let fileName = '';
        

        if ( this.files[0] ) {
            fileName = this.files[0].name;
        }
        if (this.files && this.files.length >= 1) {
            countFiles = this.files.length;
        }

        if ( fileName.length == 0) {
            submit.style.display = 'none';
        }

        if ( countFiles ) {
            if (fileName.length > 15){
                label.querySelector('.input__file-button-text').innerText = 
                    fileName.substring(0, 10) + '... ' + fileName.substr( fileName.indexOf('.') );
            } else {
                label.querySelector('.input__file-button-text').innerText = this.files[0].name;
            }
            submit.style.display = 'block';

        } else {
            label.querySelector('.input__file-button-text').innerText = labelVal;
        }
        
    });
});


function application() {
    const file = document.querySelector('#input__file'),
           
            form = document.querySelector('.application__form');

            form.addEventListener('submit', e => {
                e.preventDefault();

                if ( file.files.length == 0 ) {
                    document.querySelector('.input__file-button').style.cssText = `border: 1px solid red; `;
                } else {
                    
                }

            });
}
application();




function mobileBar() {

    const buttonBurger = document.querySelector('.mobile-burger');
    const mobileNav = document.querySelector('.mobile__nav');

    const menu = document.querySelector('.mobile__nav-list');

    buttonBurger.addEventListener('click', e => {
        if ( mobileNav.style.bottom == '-500%' ) {
            mobileNav.style.cssText = 'bottom: 50px';
        } else {
            mobileNav.style.cssText = 'bottom: -500%';
        }
    });

    menu.addEventListener('click', e => {
        const target = e.target;

        if ( target.classList.contains('mobile__nav-link')  ) {
            mobileNav.style.cssText = 'bottom: -500%';
        }
    });


}
mobileBar();