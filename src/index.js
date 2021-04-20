require('../index.html')
require('./sass/app.scss')
import _, { remove } from 'lodash';

showNote();

const addButton = document.getElementById('addButton');
const loader = document.getElementById('loader');
const search = document.getElementById('search');

const $removeButton = $('.removeNote');
const $colorButton = $('.colorNote');
const $closeColors = $('.closeColor');

setTimeout(function(){
    loader.remove();
}, 400);

addButton.addEventListener('click',function() {
	const insertNote = document.getElementById('insertNote');
	const noteData = sessionStorage.getItem('notes');

	let notesObj;
    let now = new Date();
    let dateTime = `${now.getDate()}-${now.getMonth()+1}-${now.getFullYear()} / ${now.getHours()}:${now.getMinutes()}`;

	if (noteData == null) {
		notesObj = [];
	}

	else {
		notesObj = JSON.parse(noteData);
	}
    
	if (insertNote.value !== '') {
		let tempObj = { text: insertNote.value, time: dateTime};
		notesObj.push(tempObj);
		sessionStorage.setItem('notes',JSON.stringify(notesObj));
		insertNote.value = '';
        location.reload();
	}
});

function removeNote() {
    let notesObj;
    let notesString = sessionStorage.getItem('notes');
    let index = this.id;
    
    if(notesString == null) {
      notesObj = [];
    }

    else {
      notesObj = JSON.parse(notesString);
    }
    
    notesObj.splice(index,1);
    sessionStorage.setItem('notes',JSON.stringify(notesObj));

    location.reload();
};

function showNote() {
	const noteData = sessionStorage.getItem('notes');
    const notes = document.getElementById('notes');

	let cardObj;
	let card = '';
	
	if (noteData == null) {
		cardObj = [];
	}

	else {
		cardObj = JSON.parse(noteData);
	}
	
	cardObj.forEach(function(element,index) {
		card += `<div class="card background--aqua" id="card-${index}">
					<div class="card-body" id='card-body'>
						<h6>${element.time}</h6>
						<p class="card-text">${element.text.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
						<div class="icon-container">
							<a id="${index}" class="removeNote card-icon"><i class="fa fa-trash" aria-hidden="true"></i>
							</a>
							<a id="editColor-${index}" class="colorNote card-icon"><i class="fas fa-palette"></i></a>
						</div>
						<div class="color-select-container">
							<div class="card--color">
								<input type="radio" id="colorSelect-aqua-${index}" class="radio radio--aqua" value="background--aqua" name="card-${index}" checked>
								<label for="colorSelect-aqua-${index}"></label>
								<input type="radio"  id="colorSelect-blue-${index}" class="radio radio--blue" value="background--blue" name="card-${index}">
								<label for="colorSelect-blue-${index}"></label>
								<input type="radio"  id="colorSelect-green-${index}" class="radio radio--green" value="background--green" name="card-${index}">
								<label for="colorSelect-green-${index}"></label>
								<input type="radio"  id="colorSelect-yellow-${index}" class="radio radio--yellow" value="background--yellow" name="card-${index}">
								<label for="colorSelect-yellow-${index}"></label>
								<input type="radio"  id="colorSelect-pink-${index}" class="radio radio--pink" value="background--pink" name="card-${index}">
								<label for="colorSelect-pink-${index}"></label>
								<input type="radio"  id="colorSelect-purple-${index}" class="radio radio--purple" value="background--purple" name="card-${index}">
								<label for="colorSelect-purple-${index}"></label>
								<input type="radio"  id="colorSelect-orange-${index}" class="radio radio--orange" value="background--orange" name="card-${index}">
								<label for="colorSelect-orange-${index}"></label>
								<input type="radio"  id="colorSelect-glacier-${index}" class="radio radio--glacier" value="background--glacier" name="card-${index}">
								<label for="colorSelect-glacier-${index}"></label>
								<input type="radio"  id="colorSelect-dark-${index}" class="radio radio--dark" value="background--dark" name="card-${index}">
								<label for="colorSelect-dark-${index}"></label>
								<i class="fa fa-times closeColor" aria-hidden="true"></i>
							</div>
						</div>
					</div>
				</div>`;

                $( function() {
                    $(`#card-${index}`).draggable();
                } );
	});
	
	if (cardObj.length != 0) {
		notes.innerHTML = card;
	}

	else {
		notes.innerHTML = '<h3>Write a Note!</h3>';
	}
}

search.addEventListener('input',function(e){
	let inputText = search.value;
	let cards = document.getElementsByClassName('card');
	let countNone = 0;
	
	if (inputText == '') {
		document.getElementById('noMatches').innerHTML = '';
	}
	
	Array.from(cards).forEach(function(ele) {
		let cardText = ele.getElementsByTagName('p')[0].innerText;
		if (cardText.includes(inputText)) {
			ele.style.display = 'block';
		}
		else {
			ele.style.display = 'none';
			
			countNone++;
			
			if (countNone === cards.length ){
				document.getElementById('noMatches').innerHTML = '<h3 style="text-align: center; color: grey;">No matches found</h3>';
			}

			else {
				document.getElementById('noMatches').innerHTML = '';
			}
		}
	});
	
	if (countNone === 0) {
		document.getElementById('noMatches').innerHTML = '';
	}
});

function deleteAllNotes() {
    sessionStorage.clear();
    location.reload();
}

function showColors() {
	let container = this.closest('div');
	let colors = $(this).closest('div').next().find('.color-select-container');

	colors.prevObject.show();
	container.style.display = 'none';
}

function hideColors() {
	let $colorContainer = $('.color-select-container');
	let $iconContainer = $('.icon-container');

	$iconContainer.show();
	$colorContainer.hide();
}

function initEventHandlers() {
    let $clearButton = $('.clearButton');

    $clearButton.on('click', deleteAllNotes);
	$removeButton.on('click', removeNote);
	$colorButton.on('click', showColors);
	$closeColors.on('click', hideColors);
	
	$('.radio').checkboxradio();

	$('.radio').click(function() {
		let card = this.name;
		let value = this.value;
		let $container = $(`#${card}`);

		$container.removeClass();
		$container.addClass('card');
		$container.addClass(value);
	});
}

$(function () {
    initEventHandlers();
});