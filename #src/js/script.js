
@@include('bootstrap.bundle.min.js');

//FILTER
//Filter -- вставляет выбранное значение action в кнопу фильтрации
const filterBtn = document.querySelectorAll('.btn');
const filterValue = document.querySelectorAll('.dropdown-item');
for(let i = 0; i < filterValue.length; i++) {
	filterValue[i].addEventListener('click', function(event) {
		event.preventDefault()
		for(let j = 0; j < filterBtn.length; j++) {
			let text = filterValue[i].textContent
			if(filterValue[i] === filterValue[0] || filterValue[i] === filterValue[1] || filterValue[i] === filterValue[2] || filterValue[i] === filterValue[3]){
				filterBtn[0].textContent = text
			}
			if(filterValue[i] === filterValue[4] || filterValue[i] === filterValue[5] || filterValue[i] === filterValue[6] || filterValue[i] === filterValue[7]){
				filterBtn[1].textContent = text
			}
			if(filterValue[i] === filterValue[8] || filterValue[i] === filterValue[9] || filterValue[i] === filterValue[10] || filterValue[i] === filterValue[11]){
				filterBtn[2].textContent = text
			}
			if(filterValue[i] === filterValue[12] || filterValue[i] === filterValue[13] || filterValue[i] === filterValue[14] || filterValue[i] === filterValue[15]){
				filterBtn[3].textContent = text
			}
		}
	})
}



//PAGINATION -- присвоение класса active

let page = document.querySelectorAll('.page-item');
let lastPage = document.querySelector('.page-item.active')

for( let i = 0; i < page.length; i++ ){
  page[i].addEventListener('click', function(){
    lastPage.classList.remove('active');
    this.classList.add('active');
    lastPage = this; 
  });
}


//NAVIGATION -- присвоение класса active

let link = document.querySelectorAll('.section-side__item');
let lastLink = document.querySelector('.section-side__item.active')

for( let i = 0; i < link.length; i++ ){
	link[i].addEventListener('click', function(){
		lastLink.classList.remove('active');
		this.classList.add('active');
		lastLink = this; 
	  });
	
  
}

//NAV присвоение класса active
let item = document.querySelectorAll('.nav__item');
let lastButton = document.querySelector('.nav__item.active')

for( let i = 0; i < item.length; i++ ){
	item[i].addEventListener('click', function(){
		lastButton.classList.remove('active');
		this.classList.add('active');
		lastButton = this; 
	  });
}




// добавить значок избранный в анкету .card-section
// let cards = document.querySelectorAll('.section-card')

// for(let i = 0; i < cards.length; i++) {
// 	cards[i].addEventListener('click', function() {
// 		this.classList.toggle('card-section');
// 	})
// }



//INPUT
let inputSearch = document.querySelector('.section-content__input');
let inputLog = document.querySelector('.input-login');
let inputPass = document.querySelector('.input-password');

function clearValue(elem) {
	elem.addEventListener('click', function() {
		elem.value = ''
	})
}

clearValue(inputSearch)
clearValue(inputLog)
clearValue(inputPass)



//registration

// let form  = document.querySelector('.reg-section__form');
// let inputBtn = document.querySelector(".reg-section__btn");



//Валидация input
// let elem = document.createElement('div');
//     elem.id = 'allarm';
//     elem.style.display = 'none';
//     form.appendChild(elem);

// 	inputLog.addEventListener('invalid', function(event){
// 		event.preventDefault();
// 		if ( ! event.target.validity.valid ) {
// 			elem.textContent   = 'Looks like these are not your correct details. Please try again.';
// 			elem.style.display = 'block';
//             form.append(inputBtn);
// 			inputLog.value = 'Input Error :('
// 			inputPass.value = 'Input Error :('
// 			inputLog.style.cssText = `
//             font-family: 'Inter-r';
//             font-size: 16px;
//             line-height: 21px;
//             color: #DC3545;
// 			border: 1px solid red;
//             `;
// 			inputPass.style.cssText = `
//             font-family: 'Inter-r';
//             font-size: 16px;
//             line-height: 21px;
//             color: #DC3545;
// 			border: 1px solid red;
//             `;
// 			inputLog.className    = 'invalid animated shake';
// 		}
// 	});

// 	inputLog.addEventListener('input', function(event){
// 		if ( 'block' === elem.style.display ) {
// 			elem.style.display = 'none';
// 			inputLog.style.cssText = '';
// 			inputPass.style.cssText = '';
// 		}
// 	});
