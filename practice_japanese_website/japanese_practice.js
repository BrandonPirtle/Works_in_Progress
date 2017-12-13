var hiragana_objects_base = [
	{ character:  'a', image:"hiragana_images/Hiragana_A.png"   },
	{ character:  'i', image:"hiragana_images/Hiragana_I.png"   },
	{ character:  'u', image:"hiragana_images/Hiragana_U.png"   },
	{ character:  'e', image:"hiragana_images/Hiragana_E.png"   },
	{ character:  'o', image:"hiragana_images/Hiragana_O.png"   },
	{ character: 'ka', image:"hiragana_images/Hiragana_KA.png"  },
	{ character: 'ki', image:"hiragana_images/Hiragana_KI.png"  },
	{ character: 'ku', image:"hiragana_images/Hiragana_KU.png"  },
	{ character: 'ke', image:"hiragana_images/Hiragana_KE.png"  },
	{ character: 'ko', image:"hiragana_images/Hiragana_KO.png"  }
	/* not yet finished */
], hiragana_objects;


var katatana_objects_base = [
	/* not yet implemented */
], katatana_objects;


var kanji_number_objects_base = [
	/* not yet implemented */
], kanji_number_objects;


var current_deck = null;


function showMainButtons() {
	$("#main_buttons").children().each(function() { $(this).show(); });
}


function hideMainButtons() {
	$("#main_buttons").children().each(function() { $(this).hide(); });
}


function showRightWrongButtons() {
	$("#right_wrong_buttons").children().each(function() { $(this).show(); });
}


function hideRightWrongButtons() {
	$("#right_wrong_buttons").children().each(function() { $(this).hide(); });
}


function showNextImage() {
	$("#container").append("<img src=\""+eval(current_deck)[0].image+"\" character=\""+eval(current_deck)[0].character+"\">");
}


function checkIfDeckEmpty() {
	return !eval(current_deck).length ? true : false;
}


function resetToMain() {
	hideRightWrongButtons();
	showMainButtons();
	eval(current_deck+"="+current_deck+"_base.slice()");
	current_deck = null;
}


function prepDeck() {
	hideMainButtons();
	showRightWrongButtons();
	eval(current_deck+"="+current_deck+"_base.slice()");
	shuffle(eval(current_deck));
	showNextImage();
}


function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;
	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
}


$(document).ready(function() {
	hideRightWrongButtons();
	$("#hiragana_start").click(function() {
		current_deck = "hiragana_objects";
		prepDeck();
	});
	$("#katatana_start").click(function() {
		current_deck = "katatana_objects";
		prepDeck();
	});
	$("#kanji_numbers_start").click(function() {
		current_deck = "kanji_number_objects";
		prepDeck();
	});
	$("#check").click(function() {
		$("#container").append("<h1>"+$("#container > img").attr("character")+"</h1>")
		$(this).prop("disabled",true);
		$("#right").prop("disabled",false);
		$("#wrong").prop("disabled",false);
	});
	$("#right").click(function() {
		$("#check").prop("disabled",false);
		$(this).prop("disabled",true);
		$("#wrong").prop("disabled",true);
		$("#container").empty();
		hiragana_objects.shift();
		if (!checkIfDeckEmpty()) {
			showNextImage();
		} else {
			resetToMain();
		}
	});
	$("#wrong").click(function() {
		$("#check").prop("disabled",false);
		$("#right").prop("disabled",true);
		$(this).prop("disabled",true);
		$("#container").empty();
		shuffle(hiragana_objects);
		showNextImage();
	});
});
