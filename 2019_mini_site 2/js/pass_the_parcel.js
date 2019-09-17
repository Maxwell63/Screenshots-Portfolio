// SUBMISSION 1: Unwrap the parcel:
$('#player_details').on("submit", function (unwrap) {

	// Restrict form submission that will reload the page
	event.preventDefault(unwrap);

	// REPLACE THIS WITH AN AJAX OUTCOME RESPONSE (winner='0'/'1')
	urlParams = new URLSearchParams(window.location.search);
	const winner = urlParams.get('winner');

	scroll_to_top();
	jump();
	pause('1650');

	// Shake parcel:
	setTimeout(function () {
		$('.artwork').addClass("shake");
	}, 1600);

	// Unwrap parcel:
	setTimeout(function () {
		$('.parcel').css("animation-play-state", "running");
		$('.artwork').removeClass("shake");
	}, 2000);

	// Show outcome:
	setTimeout(function () {
		$('button').removeClass("loading");
		$('.parcel_front').addClass("end");
		$('.parcel_back , .flares').show();
		$('.parcel').hide();
		$('.section_intro').addClass("slide_out");

		// No prize:
		if (winner == "0") {
			$('.better_luck_next_time').show().addClass("appear");
			$(".section").replaceWith("<div class=\"section slide_in\"><p>Your parcel is empty. Better luck next time!</p>" + h1_pass_the_parcel + form_invite + button_invite + "</form></div>");
		}

		// Prize:
		else if (winner == "1") {
			$('.prize').show().addClass("appear");
			$(".section").replaceWith("<div class=\"section slide_in\"><h1>Congratulations, <span class='name'>" + $("input[name='player_name']").val() + "!</span></h1><p>You've won a R200 bobBucks voucher! We emailed your voucher to <span>" + $("input[name='player_email']").val() + "</span></p>" + h1_pass_the_parcel + form_invite + button_invite + "</form></div>");
		}

		// Not available (no more entires left):
		else {
			$('.pass_the_parcel').removeClass("swallow").addClass("appear");
			$(".section").replaceWith("<div class=\"section slide_in\"><p>You already unwrapped your available parcels.</p>" + h1_pass_the_parcel + form_invite + button_invite + "</form></div>");
		}

		// SUBMISSION 2: Forward the parcel:
		forward();

	}, 2000);
});

// Reposition scroll:
function scroll_to_top() {
	$('html,body').animate({
		scrollTop: 0
	}, 300);
	$('button').addClass("loading");
}

// Jump and swallow text:
function jump() {
	$('.pass_the_parcel').addClass("swallow");
	$('.parcel_front').removeClass("start");
	$('.parcel').css("animation", "parcel 2s steps(5) forwards");
	$('.flares').hide();
}

// Pause when sealed:
function pause(delay) {
	setTimeout(function () {
		$('.parcel').css("animation-play-state", "paused");
	}, delay);
}

// Pass parcel:
function pass(position) {
	setTimeout(function () {
		$('button').removeClass("loading");
		$('.parcel').css("animation", "parcel steps(5) 2s " + position + " paused, pass_parcel .75s 0s ease-in forwards");
		$(".section").replaceWith(h1_passed_to + $("input[name='friend_name']").val() + "!</span></span></h1>" + p_pass_another + form_invite + button_invite + "</form></div>");
	}, 2000);
}

// Reset animation:
function set_initial_state() {
	setTimeout(function () {
		$(".parcel").removeAttr("style");
		$('.pass_the_parcel').removeClass("swallow disappear").addClass("appear");
		$('.parcel_front').show().addClass("start");
		$('.parcel_back , .prize').hide();
		$('.prize').removeClass("disappear");
		$('.flares').show();
	}, 3000);
}

// Forward parcel:
function forward() {
	$('#friend_details').on("submit", function (forward) {
		// Restrict form submission that will reload the page
		event.preventDefault(forward);

		scroll_to_top();

		// Prepare:
		$('.flares').hide();
		$('.pass_the_parcel , .prize , .better_luck_next_time').addClass("disappear");

		// Play in reverse:
		setTimeout(function () {
			$('.parcel_back').hide();
			$('.parcel_front').removeClass("end");
			$('.parcel').show().css("animation-direction", "reverse");
		}, 500);

		// Seal parcel:
		setTimeout(function () {
			$('.parcel').css({
				"animation-direction": "",
				"animation-delay": "-.75s"
			});
		}, 800);

		pause('1400');
		pass('-.75s');
		set_initial_state();

		// SUBMISSION 3++: Forward the parcel again:
		forward_again();
	})
}

// Forward parcel again:
function forward_again() {
	setTimeout(function () {
		$(".parcel").removeAttr("style");
		$('.pass_the_parcel').removeClass("swallow disappear").addClass("appear");
		$('.parcel_front').show().addClass("start");
		$('.parcel_back , .prize').hide();
		$('.prize').removeClass("disappear");
		$('.flares').show();
		forward()
	}, 2000);
}

// Toggle custom checkboxes:
$('input[type=checkbox]').click(function () {
	$(this).toggleClass("checked");
});

// 'replaceWith' string variables:
var h1_pass_the_parcel = "<h1><span>Pass the parcel</span></h1>";
var form_invite = "<p>Invite your friends and you could WIN the grand price of <span>R20,000</span> in bobBucks!</p><form id=\"friend_details\"><input type=\"text\" placeholder=\"Your friend's name\" name=\"friend_name\" required><input type=\"email\" placeholder=\"Your friend's email address\" name=\"friend_email\" required>";
var button_invite = "<button type=\"submit\">Pass the parcel!</button>";
var h1_passed_to = "<div class=\"section slide_in\"><h1>You passed the parcel to <span class='name'>";
var p_pass_another = "<p>Visit bidorbuy.co.za for awesome deals and a variety of products.</p><h1><span>Pass another parcel</span></h1>";