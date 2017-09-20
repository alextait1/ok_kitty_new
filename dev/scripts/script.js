
petApp = {};

//Key variable 
petApp.key = 'f63ee534a48d060fd81879dc507b655b'

// Secret variable
petApp.secret = 'aba221c15a6df60f348038b59514c230'

// cat info variable

petApp.currentCatIndex = {};

// First ajax call to get pet data object
petApp.getPets = function(userSelections){
	// user selections dynamic from inputs
	console.log(userSelections);
	// 
	// let location = $('input.location[type="text"]').val();
	// 		console.log(location);

	// variable with required parameters
	let config = {
			key: petApp.key,
			output: 'full',
			format:'json',
			animal: 'cat'
	}

	// Object.assign is a new feature of ES6 that combines objects (config = required userSelections=dynamically populated list)
	Object.assign(config,userSelections)

	console.log(config);

	$.ajax({
		url: 'https://api.petfinder.com/pet.find',
		method:'GET',
		dataType:'jsonp',
		data: config
	// build a .then method to do something with the data	
	}).then(function(res){
		console.log('res', res);
		// access the object for a pet
		let petData = res.petfinder.pets.pet;
		console.log('pet Data', petData);

		petApp.currentCatIndex = Math.floor(Math.random(petData) * petData.length);
		console.log('current cat index', petApp.currentCatIndex);

		// calling the display function declared below
		petApp.displayPet(petData[petApp.currentCatIndex]);

	})
}


petApp.displayPet = function (petData){
	console.log(petData);
	if (petData.media.photos.photo){
		
		let nameEl= $('<p>').addClass("petName");
				nameEl.text(petData.name['$t']);
		
		let ageEl = $('<p>').addClass("petAge");
				ageEl.text(petData.age['$t']);

		let animalId = $('<p>').addClass("petId");
				animalId.text(petData.id['$t']);

		let cityEl = $('<p>').addClass("petCity");
				cityEl.text(petData.contact.city['$t']);

		let stateEl = $('<p>').addClass("petState");
				stateEl.text(petData.contact.state['$t']);

		let phoneEl =$('<p>').addClass("petPhone");
				phoneEl.text(petData.contact.phone['$t']);

		let emailEl =$('<p>').addClass("petEmail");
				emailEl.text(petData.contact.email['$t']);

		let imageEl = $('<img>').addClass("petImage");
				imageEl.attr('src', petData.media.photos.photo[2]['$t']);

		let petsContainer = $('<div>').addClass('userPet').append(nameEl, ageEl, animalId, cityEl, stateEl, phoneEl, emailEl);

		let imageContainer = $('<div>').addClass('petImage').append(imageEl);

		let petGet =$('<div>').addClass('petGet').append(petsContainer, imageContainer);

		$('#petGet').append(petGet);

	}
}

// Init
petApp.init = function (){
    // kick off content goes here
 
    $('form').on('submit', function(event){
       event.preventDefault();
       
       // make 3 variables to select values using .val() method

      let breed = $('select[name=breed]').val();
     
			let gender = $('input[name=gender]:checked').val();
	
			let age = $('input[name=age]:checked').val();

			let location = $('input.location[type="text"]').val();
			// console.log(location);

		
			
			//call the petApp.getPets function to pass this object in as an argument (fills in parameter of userSelections in ajax request) 
    	petApp.getPets({
    		breed: breed,
    		sex: gender,
    		age: age,
    		location: location
    	});

    	// petApp.getShelter({

    	// })
    });
};


// Doc Ready
$(function (){
    petApp.init();
       $('a').smoothScroll({
         offset: -300,
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






