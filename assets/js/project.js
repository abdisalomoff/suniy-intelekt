var originalText;
var amountWords = 0; // Asl matndagi so'zlar soni.
var text;
var words = [];
var wordsRank = [];
var vWords = [];
var sentences = [];
var scores = [];
var scoreSentence = [];

// Matn uchun to'plamlarga bo'lish funksiyalari
function setText(txt) {
	text = txt;
}

// Asosiy matnni sozlash
function setOriginalText(txt) {
	originalText = txt;
}

// Asosiy matnni olish
function getOriginalText() {
	return originalText;
}

// Joriy matnni olish
function getText() {
	return text;
}

// Matn uzunligini olish
function getSizeText() {
	return getText().length;
}

// So'z qo'shish
function setWord(word) {
	words.push(word);
}

// Berilgan indeksdagi so'zni olish
function getWord(pos) {
	return words[pos];
}

// Butun so'zlar massivini sozlash
function setArrayWords(array) {
	words = array;
}

// Butun so'zlar massivini olish
function getArrayWords() {
	return words;
}

// Matndagi so'zlar sonini olish
function getAmountWords() {
	return words.length;
}

// Jumla qo'shish
function setSentence(sentence) {
	sentences.push(sentence);
}

// Berilgan indeksdagi jumlaning olish
function getSentence(pos) {
	return getArraySentences()[pos];
}

// Butun jumla massivini olish
function getArraySentences() {
	return sentences;
}

// Matndagi jumla sonini olish
function getAmountSentences() {
	return getArraySentences().length;
}

// Jumlalar baholangan massivini olish
function getScoreSentence() {
	return scoreSentence;
}

// Jumlalar baholangan sonini olish
function getAmountScoreSentence() {
	return getScoreSentence().length;
}

// Matnni so'zlarga bo'lish
function sliceWords(txt) {
	var word;
	var firstLetter = 0;
	var lastLetter;
	var foundLetter = false;
	var foundSomething = false;

	// Matndagi har bir belgini tekshirish
	for (var i = 0; i <= getSizeText(); i++) {
		if (
			foundLetter == false &&
			txt[i] != ' ' &&
			txt[i] != '.' &&
			txt[i] != ',' &&
			txt[i] != ';' &&
			txt[i] != ':' &&
			txt[i] != '\n' &&
			txt[i] != null
		) {
			firstLetter = i;
			foundLetter = true;
		} else if (
			foundLetter == true &&
			(txt[i] == ' ' ||
				txt[i] == '.' ||
				txt[i] == ',' ||
				txt[i] == ';' ||
				txt[i] == ':' ||
				txt[i] == '\n' ||
				txt[i] == null ||
				txt[i] == '?' ||
				txt[i] == '!')
		) {
			lastLetter = i;
			word = txt.substring(firstLetter, lastLetter);
			if (word != '?' && word != '!') {
				setWord(word.trim());
				amountWords++;
			}
			foundLetter = false;
		}
	}
}

// Matndagi so'zlarning har biri uchun jumla sonini olish
function getAmountWordsSentence(pos) {
	var words = 0;
	var sentence = getSentence(pos);
	var foundLetter = false;
	for (var i = 0; i <= sentence.length; i++) {
		if (
			foundLetter == false &&
			sentence[i] != ' ' &&
			sentence[i] != '.' &&
			sentence[i] != ',' &&
			sentence[i] != ';' &&
			sentence[i] != ':' &&
			sentence[i] != '\n' &&
			sentence[i] != null
		) {
			foundLetter = true;
		} else if (
			foundLetter == true &&
			(sentence[i] == ' ' ||
				sentence[i] == '.' ||
				sentence[i] == ',' ||
				sentence[i] == ';' ||
				sentence[i] == ':' ||
				sentence[i] == '\n' ||
				sentence[i] == null ||
				sentence[i] == '?' ||
				sentence[i] == '!')
		) {
			words++;
			foundLetter = false;
		}
	}
	return words;
}

// Matndagi jumlalarni ajratish
function sliceSentences(txt) {
	var sentencee;
	var firstLetter = 0;
	var lastLetter;
	var foundLetter = false;

	for (var i = 0; i <= getSizeText(); i++) {
		if (
			foundLetter == false &&
			txt[i] != ' ' &&
			txt[i] != '.' &&
			txt[i] != ',' &&
			txt[i] != ';' &&
			txt[i] != ':' &&
			txt[i] != '\n' &&
			txt[i] != null
		) {
			firstLetter = i;
			foundLetter = true;
		} else if (
			foundLetter == true &&
			(txt[i] == '.' || txt[i] == '?' || txt[i] == '!' || txt[i] == '...' || txt[i] == null)
		) {
			lastLetter = i;
			sentencee = txt.substring(firstLetter, lastLetter + 1); // Plyus 1 nuqtani ham qo'lga kiritish uchun.
			setSentence(sentencee);
			foundLetter = false;
		}
	}
}

// So'zlardan qattiq so'zlarni olib tashlash
function removeBorderWords() {
	var words = getArrayWords();
	var wordsLength = getAmountWords();
	for (var i = 0; i <= wordsLength * 0.3; i++) {
		words.shift();
		setArrayWords();
	}
	for (var i = wordsLength * 0.7; i <= wordsLength; i++) {
		words.pop();
		setArrayWords(words);
	}
}

// So'zlar bahoiga ko'ra tartiblash
function rankWords(words) {
	var aux;
	var aux2;

	for (var x = 0; x < words.length; x++) {
		vWords[x] = 0;
	}

	for (var i = 0; i < words.length; i++) {
		for (var j = 0; j < words.length; j++) {
			if (words[i] == words[j]) {
				vWords[i] = vWords[i] + 1;
				if (vWords[i] > 1) {
					words.splice(j, 1);
					vWords.splice(j, 1);
				}
			}
		}
	}
	// So'zlar bahoiga ko'ra tartiblash
	for (var i = 0; i < words.length; i++) {
		for (var j = i; j < words.length; j++) {
			if (vWords[i] < vWords[j]) {
				aux = vWords[i];
				vWords[i] = vWords[j];
				vWords[j] = aux;

				aux2 = words[i];
				words[i] = words[j];
				words[j] = aux2;
			}
		}
	}
}

// Graf yaratish
function createGraph(amountSentences, amountWords) {
	window.table = [amountSentences];
	var str;
	var check;
	for (var i = 0; i < amountWords; i++) {
		window.table[i] = [amountSentences];
	}

	for (var i = 0; i < amountSentences; i++) {
		for (var j = 0; j < amountWords; j++) {
			str = getSentence(i);
			check = str.indexOf(getWord(j));

			if (check >= 0) {
				window.table[j][i] = vWords[j];
			} else {
				window.table[j][i] = 0;
			}
		}
	}
}

// Grafni olish
function getTable() {
	return window.table;
}

// Jumlalarni baho qilish
function scoreSentences() {
	scoreSentence = [getAmountSentences()];
	for (var i = 0; i < getAmountSentences() - 1; i++) {
		scoreSentence[i] = [getAmountSentences()];
	}
	for (var i = 0; i < getAmountSentences(); i++) {
		scoreSentence[0][i] = 0;
	}
	for (var i = 0; i < getAmountSentences(); i++) {
		for (var j = 0; j < getAmountWords(); j++) {
			scoreSentence[0][i] += window.table[j][i];
			scoreSentence[1][i] = i;
			console.log(window.table[j][i]);
		}
	}

	var aux;
	var aux2;
	for (var i = 0; i < scoreSentence.length; i++) {
		for (var j = i; j < scoreSentence.length; j++) {
			if (scoreSentence[0][i] < scoreSentence[0][j]) {
				aux = scoreSentence[0][i];
				scoreSentence[0][i] = scoreSentence[0][j];
				scoreSentence[0][j] = aux;
				aux2 = scoreSentence[1][i];
				scoreSentence[1][i] = scoreSentence[1][j];
				scoreSentence[1][j] = aux2;
			}
		}
	}
}

// Jumlalarni tanlash
function selectSentences(percentage) {
	var maxWords = amountWords - (amountWords * percentage) / 100;
	var amountWordsNow = 0;
	var text = "";
	var sentencesSelected = [];
	var aux;

	for (var i = 0; i < getAmountScoreSentence(); i++) {
		if (amountWordsNow + getAmountWordsSentence(scoreSentence[1][i]) <= maxWords) {
			amountWordsNow += getAmountWordsSentence(scoreSentence[1][i]);
			sentencesSelected.push(scoreSentence[1][i]);
		}
	}
	for (var i = 0; i < getAmountScoreSentence(); i++) {
		for (var j = i; j < getAmountSentences(); j++) {
			if (sentencesSelected[i] > sentencesSelected[j]) {
				aux = sentencesSelected[i];
				sentencesSelected[i] = sentencesSelected[j];
				sentencesSelected[j] = aux;
			}
		}
	}
	for (var i = 0; i < sentencesSelected.length; i++) {
		text += sentences[sentencesSelected[i]];
	}

	return text;
}

// Matnni qisqa xulosa qilish
function summarize(percentage) {
	amountWords = 0;
	words = [];
	wordsRank = [];
	vWords = [];
	sentences = [];
	scores = [];
	scoreSentence = [];

	sliceWords(getText());
	sliceSentences(getText());
	rankWords(getArrayWords());
	removeBorderWords();
	createGraph(getAmountSentences(), getAmountWords());
	scoreSentences();
	console.log(selectSentences(percentage));

	document.getElementById("summ").value = selectSentences(percentage);
}