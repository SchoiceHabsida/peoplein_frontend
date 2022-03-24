
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

//INPUT
//Input-search -- Очистка input при фокусе
const inputSearch = document.querySelector('.section-content__input');
inputSearch.addEventListener('click', function() {
	console.log(inputSearch.value);
	inputSearch.value = ''
})



//PAGINATION -- присвоение класса active

let test = document.querySelectorAll('.page-item');
let lastClicked = test[0]; 

for( let i = 0; i < test.length; i++ ){
  test[i].addEventListener('click', function(){
    lastClicked.classList.remove('active');
    this.classList.add('active');
    lastClicked = this; 
  });
}
