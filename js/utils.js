"use strict";
var utils = {
	numberOfMistakes: function(decision) {
		var mistakes = 0;
		for (var i in decision) {
			if (decision[i].isTrue == false) {
				mistakes += 1;
			}
		}
		return mistakes
	}
}