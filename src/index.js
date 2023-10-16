import 'normalize.css'
import './styles/main.scss';


window.onload=function(){

    let button__more = document.getElementsByClassName('textblock__buttons__more')
    let button__signup = document.getElementsByClassName('textblock__buttons__sign-up')
    let menu__container__item = document.getElementsByClassName('menu__container__item')
    let up__block__button = document.getElementById('up__block__button')
    let arrow_left = document.getElementById('arrow_left')
    let arrow_right = document.getElementById('arrow_right')
    let form = document.getElementById('myForm')
    let close = document.getElementById('close')
    let numberSlide = document.getElementById('slides__current-slide')
    let menu__container__button = document.getElementById('menu__container__button')
    let elem = document.getElementById('form');
    form.onsubmit = submitted.bind(elem);

    function submitted(event) {
      submitForm(event)
      // event.preventDefault();
    }

    // *****************************************SLIDER-LOGIC*****************************************

    let slideIndex = 1;
    showSlide(slideIndex);

    function plusSlides(n) {
        showSlide(slideIndex += n);
    }

    function showSlide(n) {

        let slides = document.getElementsByClassName("banner-container__fade");
        if(n > slides.length) {
            slideIndex = 1;
        }
        if(n < 1) {
            slideIndex = slides.length;
        }

        for(let i = 0; i<slides.length; i++){
            slides[i].style.display = "none"
        }

        slides[slideIndex - 1].style.display = "block";
        numberSlide.innerHTML = slideIndex;
    }

    arrow_left.addEventListener('click', function() {
        plusSlides(-1);
    })

    arrow_right.addEventListener('click', function() {
        plusSlides(1);
    })

    // *****************************************SLIDER-LOGIC*****************************************

    // ******************************************FORM-LOGIC******************************************
    
    for(let i = 0; i < button__signup.length; i++){
      button__signup[i].addEventListener("click", e => {
        form.style.display = "block";
        document.body.style.overflow = "hidden";
      });
    }

    for(let i = 0; i < button__more.length; i++){
      button__more[i].addEventListener("click", e => {
        alert('Нет наполнения для логики кнопки')
      });
    }
    
    up__block__button.addEventListener("click", e => {
        form.style.display = "block";
        document.body.style.overflow = "hidden";
    });
    
    close.addEventListener("click", e => {
        form.style.display = "none";
        document.body.style.overflow = "auto";
    });

    async function submitForm(event) {
        event.preventDefault(); // отключаем перезагрузку/перенаправление страницы
        try {
          // Формируем запрос
          const response = await fetch(event.target.action, {
            method: 'POST',
            body: new FormData(event.target)
          });
          // проверяем, что ответ есть
          if (!response.ok) throw (`Ошибка при обращении к серверу: ${response.status}`);
          form.style.display = "none";
          document.body.style.overflow = "auto";
          alert("Сообщение успешно отправлено!");
          // const contentType = response.headers.get('content-type');
          // if (!contentType || !contentType.includes('application/json')) {
          //   throw ('Ошибка обработки. Ответ не JSON');
          // }
          // обрабатываем запрос
          // const json = await response.json();
          // if (json.result === "success") {
          //   // в случае успеха
          //   alert(json.info);
          // } else { 
          //   // в случае ошибки
          //   console.log(json);
          //   throw (json.info);
          // }
        } catch (error) { // обработка ошибки
          alert(error);
        }
    }

    // ******************************************FORM-LOGIC******************************************

    // *****************************************BURGER-LOGIC*****************************************

    const burgerButton = document.getElementById('up__burger');
    const menu = document.querySelector('.menu');
    let burgerOpen = false;

    menu__container__button.addEventListener('click', function() {
      menu.classList.remove("show")
      document.body.style.overflow = '';
      burgerOpen = false;
      form.style.display = "block";
      document.body.style.overflow = "hidden";
    });

    burgerButton.addEventListener('click', function() {
        if(burgerOpen == false) {
          menu.classList.add("show")
          document.body.style.overflow = 'hidden';
          burgerOpen = !burgerOpen;
          burgerButton.style.background = "url(burger-close.png)"
          burgerButton.style.width = '29px'
          burgerButton.style.height = '29px'
        }
        else {
          menu.classList.remove("show")
          document.body.style.overflow = '';
          burgerOpen = !burgerOpen;
          burgerButton.style.background = "url(./burger-open.png)"
          burgerButton.style.width = '37px'
          burgerButton.style.height = '26px'
        }
    });

    for(let i = 0; i < menu__container__item.length; i++){
      menu__container__item[i].addEventListener('click', function() {
        menu.classList.remove("show")
        document.body.style.overflow = '';
        burgerOpen = false;
      });
    }

    // ******************************************BURGER-LOGIC******************************************
}