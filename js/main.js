// Создаем самовызывающуюся функцию для изменения header при скролле, путем добавления к нему стилей
(function(){
    const header=document.querySelector('.header');
    window.onscroll=()=>{
        if(window.pageYOffset>50){
            header.classList.add('header_active');
        } else{
            header.classList.remove('header_active');
        }
    }
}());
// Burger handler
(function(){
    const burger=document.querySelector('.burger'),
          close=document.querySelector('.header__nav-close'),
          nav = document.querySelector('.header__nav');
        burger.addEventListener('click',()=>{
                nav.classList.add('header__nav-active');
        });
        close.addEventListener('click',()=>{
                nav.classList.remove('header__nav-active');
        });
}());
// Scroll to anchors

(function(){
    // Получаем высоту хэдера, элемент, на который нужно и тд. 
    const smoothScroll=function(targetEl, duration){
        const headerElHeight=document.querySelector('.header').clientHeight;
        let target=document.querySelector(targetEl);
        let targetPosition=target.getBoundingClientRect().top - headerElHeight;
        let startPosition=window.pageYOffset;
        let startTime = null;
        //  Функция обработчик скролла
    const ease = function(t, b, c, d){
            t/=d/2;
            if(t<1) return c/2*t*t+b;
            t--;
            return -c/2*(t*(t-2)-1)+b;
        };
       // Анимация скролла 
    const animation = function(currentTime){
            if(startTime === null) startTime=currentTime;
            const timeElapsed = currentTime-startTime;
            const run = ease(timeElapsed, startPosition, targetPosition, duration);
            window.scrollTo(0,run);
            if(timeElapsed<duration) requestAnimationFrame(animation);

        };
    requestAnimationFrame(animation);
    };
    // Находим элемент, к которому нужно проскроллить и вызываем smoothScroll
        const scrollTo=function(){
            const links = document.querySelectorAll('.js-scroll');
            links.forEach(each =>{
                each.addEventListener('click', function(){
                    const currentTarget=this.getAttribute('href');
                    smoothScroll(currentTarget, 1000);
                });
            });
        };

    scrollTo();
}());