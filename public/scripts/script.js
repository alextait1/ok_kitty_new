'use strict';

petApp = {};

//Key variable 
petApp.key = 'f63ee534a48d060fd81879dc507b655b';

// Secret variable
petApp.secret = 'aba221c15a6df60f348038b59514c230';

// cat info variable


petApp.currentCatIndex = {};

// First ajax call to get pet data object
petApp.getPets = function (userSelections) {

		console.log(userSelections);

		var config = {
				key: petApp.key,
				output: 'full',
				format: 'json',
				animal: 'cat'

				// Object.assign is a new feature of ES6 that combines objects (config = required userSelections=dynamically populated list)
		};Object.assign(config, userSelections);

		console.log(config);

		$.ajax({
				url: 'https://api.petfinder.com/pet.find',
				method: 'GET',
				dataType: 'jsonp',
				data: config
		}).then(function (res) {
				console.log('res', res);
				var petData = res.petfinder.pets.pet;
				console.log('pet Data', petData);

				petApp.currentCatIndex = Math.floor(Math.random(petData) * petData.length);
				console.log('current cat index', petApp.currentCatIndex);

				petApp.displayPet(petData[petApp.currentCatIndex]);
		});
};

petApp.displayPet = function (petData) {
		console.log(petData);
		if (petData.media.photos.photo) {

				var nameEl = $('<p>').addClass("petName");
				nameEl.text(petData.name['$t']);

				var ageEl = $('<p>').addClass("petAge");
				ageEl.text(petData.age['$t']);

				var animalId = $('<p>').addClass("petId");
				animalId.text(petData.id['$t']);

				var cityEl = $('<p>').addClass("petCity");
				cityEl.text(petData.contact.city['$t']);

				var stateEl = $('<p>').addClass("petState");
				stateEl.text(petData.contact.state['$t']);

				var phoneEl = $('<p>').addClass("petPhone");
				phoneEl.text(petData.contact.phone['$t']);

				var emailEl = $('<p>').addClass("petEmail");
				emailEl.text(petData.contact.email['$t']);

				var imageEl = $('<img>').addClass("petImage");
				imageEl.attr('src', petData.media.photos.photo[2]['$t']);

				var petsContainer = $('<div>').addClass('userPet').append(nameEl, ageEl, animalId, cityEl, stateEl, phoneEl, emailEl);

				var imageContainer = $('<div>').addClass('petImage').append(imageEl);

				var petGet = $('<div>').addClass('petGet').append(petsContainer, imageContainer);

				$('#petGet').append(petGet);
		}
};

petApp.init = function () {

		$('form').on('submit', function (event) {
				event.preventDefault();

				var breed = $('select[name=breed]').val();

				var gender = $('input[name=gender]:checked').val();

				var age = $('input[name=age]:checked').val();

				var location = $('input.location[type="text"]').val();

				petApp.getPets({
						breed: breed,
						sex: gender,
						age: age,
						location: location
				});

				$('.scroll').on('click', function () {
						$('html, body').animate({
								scrollTop: $($.attr(this, 'href')).offset().top }, 600);
						return false;
						console.log('yoooooo');
				});
		});
};

// Doc Ready
$(function () {
		petApp.init();
		$('a').smoothScroll({
				offset: -300
				// afterScroll: function() {
				//     $(this).find('input').submit();
				// },
		});

		//radio button enabled here
		$('input').iCheck({
				checkboxClass: 'icheckbox_square-orange',
				radioClass: 'iradio_square-orange',
				increaseArea: '20%' // optional
		});
});