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



const applicationForm = () =>{
    const inputDefault = document.querySelector('.input__file'),
            submit = document.querySelector('.application__submit'),
            choiseFile = document.querySelector('.input__file-button'),
            form = document.querySelector('.application__form'),
            botCheck = document.querySelector('#check-bot-file');
    inputDefault.addEventListener('change', e => {
        let countFiles = '';
        let fileName = '';
        const taget = e.target;
        if ( taget.files[0] ) {
            fileName = taget.files[0].name;
        }
        if (taget.files && taget.files.length >= 1) {
            countFiles = taget.files.length;
        }

        if ( fileName.length == 0) {
            submit.style.display = 'none';
        }

        if ( countFiles ) {
            if (fileName.length > 15){
                choiseFile.querySelector('.input__file-button-text').innerText = 
                    fileName.substring(0, 10) + '... ' + fileName.substr( fileName.indexOf('.') );
            } else {
                choiseFile.querySelector('.input__file-button-text').innerText = taget.files[0].name;
            }
            submit.style.display  = 'block';
        } else {
            choiseFile.querySelector('.input__file-button-text').innerText = 'Загрузить анкету';
        }
        
    });
    form.addEventListener('submit', e => {
        e.preventDefault();
        if ( botCheck.value !== '') {
            console.log('Get out BOT');
            return;
        }
        let data = new FormData(form);
        data.append('theForm', 'applicationForm');
        fetch('http://worksea/mail.php', {
            method: 'POST',
            body: data
        })
        .then( response => {
            if ( !response.ok ) {
                statusPostForm( {title: "Ошибка!",  text: "Свяжитесь с администрацией"} );
                return;
            } else {
                percentPostForm({
                    submit: submit,
                    title: "Отправлено!",  
                    text: "<br>Ваша анкета у нас и после её рассмотрения вам перезвоним!",
                    isFormApl: true,
                });
            }
        })
        .catch( () =>  { statusPostForm( {title: "Ошибка!",  text: "Свяжитесь с администрацией"} ); });
    });
};
applicationForm();

const callBackForm = () => {
    const form = document.querySelector('.call-back__form'),
          botCheck = document.querySelector('#check-bot__call-back'),
          submit = document.querySelector('.call-back__submit'),
          firstName = document.querySelector('input[name="first-name"]');
    form.addEventListener('submit', e => {
        e.preventDefault();
        if ( botCheck.value !== '') {
            console.log('Get out BOT');
            return;
        }

        let data = new FormData(form);
        data.append('theForm', 'callBackForm');

        fetch('http://worksea/mail.php', {
            method: 'POST',
            body: data
        })
        .then( response => {
            if ( !response.ok ) {
                statusPostForm( {title: "Ошибка!",  text: "Свяжитесь с администрацией"} );
                return;
            } else {
                percentPostForm({
                    submit: submit,
                    title: "Отправлено!",  
                    text: "<br>Спасибо, что обратились к нам<br>Мы скоро вам перезвоним!",
                    isFormApl: false,
                    formReset: true,
                    identifier: form
                });
            }
        })
        .catch( () =>  { statusPostForm( {title: "Ошибка!",  text: "Свяжитесь с администрацией"} ); });
    });
};
callBackForm(); 


const questionForm = () => {
    const form = document.querySelector('.contact__question-form'),
          botCheck = document.querySelector('#check-bot__contact'),
          namePers = document.querySelector('input[name="mesName"]'),
          mailPers = document.querySelector('input[name="mesMail"]'),
          messagePers = document.querySelector('textarea[name="message"]'),
          submit = document.querySelector('.contact__submit');
        form.addEventListener('submit', e => {
            e.preventDefault();
            if ( botCheck.value !== '') {
                console.log('Get out BOT');
                return;
            } 
            if (namePers.value == '' || messagePers.value == '' || mailPers.value =='' ) {
                statusPostForm( {title: "Ошибка!",  text: "Свяжитесь с администрацией"} );
            } else {
                let data = new FormData(form);
                    data.append('theForm', 'questionForm');
                fetch('http://worksea/mail.php', {
                    method: 'POST',
                    body: data
                })
                .then( response => {
                    if ( !response.ok ) {
                        console.log(response);
                        statusPostForm( {title: "Ошибка!",  text: "Свяжитесь с администрацией"} );
                        return;
                    } else {
                        percentPostForm({
                            submit: submit,
                            title: "Отправлено!",  
                            text: "<br>Спасибо за ваш вопрос<br>Ответим на него в течении пару минут!",
                            isFormApl: false,
                            formReset: true,
                            identifier: form
                        });

                    }
                })
                .catch( () =>  { statusPostForm( {title: "Ошибка!",  text: "Свяжитесь с администрацией"} ); });
            }
            
        });
};
questionForm();


const percentPostForm = (form) => {
    let statusPerc = {
        charged: '0%',
    };
    anime({
        targets: statusPerc,
        charged: '100%',
        round: 1,
        easing: 'linear',
        update: function(e) {
            form.submit.innerText = statusPerc.charged;
            if ( statusPerc.charged == "100%" ) {
                form.submit.innerText = 'Отправлено!';
                statusPostForm( {
                        title: form.title,  
                        text: form.text,
                        isFormApl: form.isFormApl,
                        formReset: form.formReset,
                        identifier: form.identifier
                });
            }
        }
    });


};
const statusPostForm = ( form ) => {
    const modal = document.querySelector('.success-modal'),
            modalTitle = document.querySelector('.modal__title h3'),
            modalText = document.querySelector('.modal__text');

        modal.classList.toggle('success-modal--active');
        modalTitle.innerHTML = form.title;
        modalText.innerHTML = form.text;
        document.querySelector('body').style.overflow = 'hidden';

        modal.addEventListener('click', e=>{
            const target = e.target;
            if (target.classList.contains('success-modal')) {
                modal.classList.remove('success-modal--active');
                document.querySelector('body').style.overflow = 'auto';
            }
            if ( form.isFormApl === true) {
                document.querySelector('.input__file-button-text').innerText = 'Загрузить анкету';
                document.querySelector('.application__submit').style.display = 'none';
                document.querySelector('.application__submit').style.innerText = 'Отправить анкету';
                document.querySelector('.application__form').reset();
            }

            if ( form.formReset === true ) {
                form.identifier.reset();
            }
 


        });
};


let sq = [2,4,6].map(x => x * x);
[a,b] = sq;
console.log([a,b]);