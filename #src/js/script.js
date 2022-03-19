
@@include('swiper-bundle.min.js');
@@include('burger.js');
@@include('dynamicAdapt.js');


//Инициализируем Swiper
//класс swiper-container
new Swiper(".section-slides", {
	pagination: {
	  el: ".swiper-pagination",
	  // Буллеты
	  clickable: true,
	},
	//   Включение/Отключение swipe on pc true/false
	simulateTouch: true,
	//   Чувствительность свайпа 0 отключает свайп
	touchRatio: 2,
	//   Угол срабатывания свайпа
	// touchAngle: 45,
	//   Курсор перетаскивания как cursor: pointer;
	grabCursor: true,
	//   Переключение на слайд при клике на него
	slideToClikedSlide: true,
  
	//   Управление с помощью клавиатуры
	keyboard: {
	  // вкл/выкл
	  enabled: true,
	  // вкл/выкл управление клавишами pageUp,pageDown
	  pageUpDown: true,
	},
	// Управление колесом мыши
	mousewheel: {
	  // чувствительность колеса мыши
	  sensitivity: 1,
	  
	},

    slidesPerView: 1.5,
	  spaceBetween: 30,

	freeMode: true,

	breakpoints: {
	  320: {
		slidesPerView: 1.5,
	  },
	  480: {
		slidesPerView: 1.5,
	  },
	  992: {
		slidesPerView: 1,
	  },
	},
  });
  




