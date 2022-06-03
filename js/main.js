function pagescroll(element){
	document.querySelector(element).scrollIntoView({
		behavior: "smooth"
	})
};

function toTop(){
	// e.preventDefault()
	pagescroll("#home");
}

function close(){
	window.location.reload()
}
// checkId()
 
$(document).ready(function($) {

	"use strict";

	$(window).stellar({
    responsive: false,
    parallaxBackgrounds: true,
    parallaxElements: true,
    horizontalScrolling: false,
    hideDistantElements: false,
    scrollProperty: 'scroll'
  });




	var carousel = function() {
		$('.carousel').owlCarousel({
			loop: true,
			margin: 10,
			nav: true,
			stagePadding: 5,
			nav: false,
			navText: ['<span class="icon-chevron-left">', '<span class="icon-chevron-right">'],
			responsive:{
				0:{
					items: 1
				},
				600:{
					items: 2
				},
				1000:{
					items: 3
				}
			}
		});

		$('.nonloop-block-13').owlCarousel({
	    center: false,
	    items: 1,
	    loop: false,
			stagePadding: 0,
	    margin: 20,
	    nav: true,
			navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">'],
	    responsive:{
        600:{
        	margin: 20,
          items: 2
        },
        1000:{
        	margin: 20,
          items: 2
        },
        1200:{
        	margin: 20,
          items: 3
        }
	    }
		});

		$('.loop-block-31').owlCarousel({
			loop: true,
			margin: 0,
			nav: true,
			items: 1,
			autoplay: true,
			stagePadding: 0,
			nav: true,
			navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">'],
			animateOut: 'fadeOut',
    	animateIn: 'fadeIn',
		});

		$('.nonloop').owlCarousel({
	    center: true,
	    items:2,
	    loop:false,
	    margin:10,
	    nav: true,
			navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">'],
	    responsive:{
        600:{
          items:2
        }
	    }
		});
	};
	carousel();

	// scroll
	var scrollWindow = function() {
		$(window).scroll(function(){
			var $w = $(this),
					st = $w.scrollTop(),
					navbar = $('.ftco_navbar'),
					sd = $('.js-scroll-wrap');

			if (st > 150) {
				if ( !navbar.hasClass('scrolled') ) {
					navbar.addClass('scrolled');	
				}
			} 
			if (st < 150) {
				if ( navbar.hasClass('scrolled') ) {
					navbar.removeClass('scrolled sleep');
				}
			} 
			if ( st > 350 ) {
				if ( !navbar.hasClass('awake') ) {
					navbar.addClass('awake');	
				}
				
				if(sd.length > 0) {
					sd.addClass('sleep');
				}
			}
			if ( st < 350 ) {
				if ( navbar.hasClass('awake') ) {
					navbar.removeClass('awake');
					navbar.addClass('sleep');
				}
				if(sd.length > 0) {
					sd.removeClass('sleep');
				}
			}
		});
	};
	scrollWindow();

	var counter = function() {
		
		$('#section-counter').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

				var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
				$('.ftco-number').each(function(){
					var $this = $(this),
						num = $this.data('number');
						console.log(num);
					$this.animateNumber(
					  {
					    number: num,
					    numberStep: comma_separator_number_step
					  }, 7000
					);
				});
				
			}

		} , { offset: '95%' } );

	}
	counter();
	
	

	var contentWayPoint = function() {
		var i = 0;
		$('.ftco-animate').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .ftco-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn ftco-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ftco-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight ftco-animated');
							} else {
								el.addClass('fadeInUp ftco-animated');
							}
							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};
	contentWayPoint();

	// navigation
	var OnePageNav = function() {
		$(".smoothscroll[href^='#'], #ftco-nav ul li a[href^='#']").on('click', function(e) {
		 	e.preventDefault();

		 	var hash = this.hash,
		 			navToggler = $('.navbar-toggler');
		 	$('html, body').animate({
		    scrollTop: $(hash).offset().top
		  }, 700, 'easeInOutExpo', function(){
		    window.location.hash = hash;
		  });


		  if ( navToggler.is(':visible') ) {
		  	navToggler.click();
		  }
		});
		$('body').on('activate.bs.scrollspy', function () {
		  console.log('nice');
		})
	};
	OnePageNav();


	// magnific popup
	$('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
     gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS
    }
  });

  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
  });

 
});
// =======================================================================
// ADMINISTRATIVE
// =====================================================================

function checkAdmin(e) {
	e.preventDefault()
	let admin_id = document.getElementById("admin_id").value;
	let admin_password = document.getElementById("admin_password").value;
	
	let payload = {
		admin_id: admin_id,
		admin_password: admin_password
	}
	
	payload = JSON.stringify(payload)
	console.log(payload);
	
	fetch('http://localhost:8000/admin/logIn', {
		method: 'POST',
		headers: {
			"content-type": "application/json",
			payload: payload
		},
		body: payload
	})
	.then((res) =>
	res.json()
	).then((res) => {
		if(res.err){
			let message3 = document.getElementById("message3");
			message3.innerText = res.err
		}else{
			console.log(res)
			admin_id.value = ""
			admin_password.value = ""
			window.localStorage.setItem("admin", res.admin_id);
			window.localStorage.setItem("authed", 'true');
			let authed = window.localStorage.getItem('authed')
			if (authed) {
				toTop()
				console.log("loggedIn")
				$('.hidden').removeClass('hidden')
				$('#hideAdmin').addClass('hide')
				$('#message3').addClass('hide')
			}
		}}
	)
};
// ==========================================================
// Check Auth() logIN
// ========================================================
hideNav()
checkAuth()
function nextStepToRegister(e) {
    e.preventDefault();
   let firstname = document.getElementById("first_name");
   let lastname = document.getElementById("last_name");
   let state = document.getElementById("state");
   let street_address = document.getElementById	("street_address");
   let apartment = document.getElementById("apartment");
   let city = document.getElementById("city");
   let zip_code = document.getElementById("zip_code");
   let phone =document.getElementById("phone");
   let e_mail = document.getElementById("e_mail");
   let username = document.getElementById("username");
   let password = document.getElementById("password");
   

   let payload={
       first_name: firstname.value,
	   last_name: lastname.value,
	   state: state.value,
	   street_address: street_address.value,
	   apartment: apartment.value,
	   city: city.value,
	   zip_code: zip_code.value,
	   phone: phone.value,
	   e_mail: e_mail.value,
	   username: username.value,
       password: password.value,
      
   }
  
    payload= JSON.stringify(payload)   

    console.log(payload);
    fetch('http://localhost:8000/users/register',{
        method: 'POST',
        headers: {
            "content-type": 'application/json',
            payload: payload
        },
        body: payload
    })
    .then((res) => 
        res.json()
    ).then((res) => {
		if(res.message){
			let message2 = document.getElementById("message2");
			message2.innerText = res.message
		}else{
			console.log(res)
			 firstname.value = ""
			 lastname.value = ""
             state.value = ""
			 street_address.value = ""
			 apartment.value = ""
			 city.value = ""
			 zip_code.value = ""
             phone.value = ""
	         e_mail.value = ""
			 username.value = ""
			 password.value = ""
		
		}}
	)
};
// ====================================================
// LOG IN AUTH
// =====================================================
function logMeIn(e) {
    e.preventDefault();
   let logInUserName = document.getElementById("logInUsername").value;
   let logInPassword= document.getElementById("logInPassword").value;
   let payload={
       username: logInUserName,
       password: logInPassword
   }
    payload = JSON.stringify(payload)
    console.log(payload)
    // sending the HTTP POST req along w/ form data to node server
    fetch('http://localhost:8000/users/logIn',{
        method: 'POST',
        headers: {
            "content-type": 'application/json',
            payload: payload
        },
        body:payload
    })
    .then((res) => 
        res.json()
    ).then((data) =>{ 
        if(data.auth){
            window.localStorage.setItem("userId", data.userId)    
        }
        checkAuth()
    });
   
};
function checkAuth(){
    let loggedIn = window.localStorage.getItem("userId")
    if(loggedIn){
        console.log("Yep, logged in")
        let unhideThisStuff = document.getElementsByClassName("hidden");
        let hideThisStuff = document.getElementsByClassName("logIn"); 
        unHide(unhideThisStuff)
        for (const element of hideThisStuff) {
            element.classList.add("hidden")
        }
    }
}
function unHide(collection){
    collection[0].classList.remove("hidden")
    if(collection.length > 0){
        unHide(collection)
    }
}
function logMeOut(e){
    window.localStorage.removeItem("userId")
	window.location.reload()
	// window.location = 'http://localhost:8000/admin/admin.html'
};
function hideNav(){
    let navLinks = document.getElementsByClassName("nav-item")
    for (const i of navLinks) {
    }
}
// ======================================================
// Quick Apply
// =======================================================
function quickApply(e) {
	e.preventDefault()
	let resource = document.getElementById('quick-resource')
	let number = document.getElementById('quick-apply-number')
	let adult = document.getElementById('quick-adult')
	let child = document.getElementById('quick-child')
	let payload = {
		quick_resource: resource.value,
		quick_apply_number: number.value,
		quick_adult: adult.value,
		quick_child: child.value,
		userId: window.localStorage.getItem('userId')
	}
	payload = JSON.stringify(payload)
	console.log(payload);


	fetch('http://localhost:8000/users/quickApply', {
		method: 'POST',
		headers: {
			"content-type": "application/json",
			payload: payload
		},
		body: payload

	}).then((res) =>
		res.json()
	).then((res) => {
		if (res.err) {
			let message = document.getElementById("message");
			message.innerText = res.err
		}else{
			resource.value = ""
			number.value = ""
			adult.value = ""
			child.value = ""

		}

	})
}
// =============================================
// Yadda House application
// =============================================
const myObj = {
	first: "",
	second: "something",
	third: false,
	fourth: true
}
function validateObject(banana){
	for (const key in banana) {
		if (!banana[key]) {
			return false
		}
	}
	return true
}
function recoveryApply(e) {
	e.preventDefault()
	let recipient = document.getElementById("name-recipient");
	let first_name = document.getElementById('fname');
	let last_name = document.getElementById('lname');
	let date = document.getElementById('date')
	let household_size = document.getElementById('household-size')
	let num_adult = document.getElementById('adult')
	let num_child = document.getElementById('children')
	let f_conviction = document.getElementById('f-conviction')
	let f_explanation = document.getElementById('f-explanation')
	let message = document.getElementById("recovery-message")

	let payload = {
		recipient: recipient.value,
		first_name: first_name.value,
		last_name: last_name.value,
		date: date.value,
		household_size: household_size.value,
		num_adult: num_adult.value,
		num_child: num_child.value,
		f_conviction: f_conviction.value,
		f_explanation: f_explanation.value,
		userId: window.localStorage.getItem('userId')
	}
	const valid = validateObject(payload)
	if(!valid){
		message.innerText = "Please Complete All Fields"
		return
	}else{
		message.innerText = "Congratulations on making the best decision for you and your family! Someone will contact you within 72 hours from The Yadda Yadda Team."
	}
	payload = JSON.stringify(payload)
	console.log(payload);

	fetch('http://localhost:8000/users/recoveryApply', {
		method: 'POST',
		headers: {
			"content-type": "application/json",
			payload: payload
		},
		body: payload

	}).then((res) =>
		res.json()
	).then((res) => {
		recipient.value = ""
		first_name.value = ""
		last_name.value = ""
		num_adult.value = ""
		num_child.value = ""
		f_conviction.value = ""
		f_explanation.value = ""
	})
}
// =============================================
// referral services
// =============================================
function referralProgram(e) {
	e.preventDefault()
	let voucher_program = document.getElementById('voucher-program');
	let contact_number = document.getElementById('contact-phone-number');
	let time_to_contact = document.getElementById('time-to-call');
	let recipient = document.getElementById("name-recipient");
	let first_name = document.getElementById('fname');
	let last_name = document.getElementById('lname');
	let messageReferral = document.getElementById("referral-message")
	let payload = {
		voucher_program: voucher_program.value,
		contact_number: contact_number.value,
		time_to_contact: time_to_contact.value,
		recipient: recipient.value,
		first_name: first_name.value,
		last_name: last_name.value,
		userId: window.localStorage.getItem('userId')
	}
	const valid = validateObject(payload)
	if(!valid){
		messageReferral.innerText = "Please Complete All Fields"
		return
	}else{
		messageReferral.innerText = "Someone will contact you within 72 hours from The Yadda Yadda Team."
	}
	payload = JSON.stringify(payload)
	console.log(payload);

	fetch('http://localhost:8000/users/referralProgram', {
		method: 'POST',
		headers: {
			"content-type": "application/json",
			payload: payload
		},
		body: payload

	}).then((res) =>
		res.json()
	).then((res) => {
		voucher_program.value = ""
		contact_number.value = ""
		time_to_contact.value = ""
		recipient.value = ""
		first_name.value = ""
		last_name.value = ""
	})
}
// ===============================================
// volunteer & donation services
// ===============================================
function volunteerDonation(e) {
	e.preventDefault()
	let name_organization = document.getElementById('name_organization');
	let type_of_help = document.getElementById('type-of-help');
	let help_explained = document.getElementById('help-explained');
	let reciept = document.getElementById("reciept");
	let messageVolunteer = document.getElementById("volunteer-message")
	console.log(name_organization.value);
	
	let payload = {
		name_organization: name_organization.value,
		type_of_help: type_of_help.value,
		help_explained: help_explained.value,
		reciept: reciept.value,
		userId: window.localStorage.getItem('userId')
	}
	const valid = validateObject(payload)
	if(!valid){
		messageVolunteer.innerText = "Please Complete All Fields"
		return
	}else{
		messageVolunteer.innerText = "Thank you for considering our home as your place to donate! We appreciate you."
	}
	payload = JSON.stringify(payload);
	console.log(payload);

	fetch('http://localhost:8000/users/volunteerDonation', {
		method: 'POST',
		headers: {
			"content-type": "application/json",
			payload: payload
		},
		body: payload
	}).then((res) =>
		res.json()
	).then((res) => {
		name_organization.value = ""
		type_of_help.value = ""
		help_explained.value = ""
		reciept.value = ""
	})
}
// ==============================================
// Admin Table see details
//================================================
function seeDetails(e){
	e.preventDefault()
	fetch('http://localhost:8000/admin/details', {
		method: 'GET',
		headers: {
			"content-type": "application/json"
		}
	}).then((res)=>
	res.json()
	).then((results) =>{
		console.log(results);
		let table = document.getElementById("table-hide")
		for (let i = 0; i < results.length; i++) {
			let row = document.createElement("tr");
			let client_name = document.createElement("td");
			let household_size = document.createElement("td");
			let referral_program = document.createElement("td");
			let e_mail = document.createElement("td");
			let case_notes = document.createElement("td");
			let phone_number = document.createElement("td");
			client_name.innerText = `${results[i].first_name} ${results[i].last_name}`;
			household_size.innerText = results[i].household_size;
			referral_program.innerText = results[i].referral_program;
			e_mail.innerText = results[i].e_mail;
			phone_number.innerText = results[i].phone_number;
			case_notes.innerText = results[i].case_notes;
			case_notes.appendChild(createForm())
			row.appendChild(client_name);
			row.appendChild(household_size);
			row.appendChild(referral_program);
			row.appendChild(e_mail);
			row.appendChild(phone_number);
			row.appendChild(case_notes);
			table.appendChild(row);
		}
	})

}
	
	
function createForm(){
	let button = document.createElement("button");
	let div = document.createElement('div');
	div.classList.add('form-group');
	let textarea = document.createElement('textarea');
	textarea.classList.add('form-control');
	div.appendChild(textarea);
	button.innerText = "Case Notes"
	button.appendChild(div)
	// return button;
	
}	

	
