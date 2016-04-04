"use strict";
var MasterController = {
	availableGenerators: Object.keys(AppDelegate.Generators),
	GenerateTasks: function (generators) {
		var preparedTasks = []
		var preparedTasksWithDuplicates = []
		for (var i = 0; i < generators.length; i++) {
			var preparedTasksFromOneGenerator = [];
			while (preparedTasksFromOneGenerator.length != generators[i]["variants"]) {
				var preparedTask = AppDelegate.Generators[generators[i]["title"]].Generate();
				if ((preparedTasksWithDuplicates.indexOf(preparedTask.task) == '-1')) { preparedTasksFromOneGenerator.push(preparedTask);
					preparedTasksWithDuplicates.push(preparedTask.task);
				};
			}
			preparedTasks = preparedTasks.concat(preparedTasksFromOneGenerator);
		};
		return preparedTasks
	},
	ShowTasks: function(tasks) {
		TestZone.innerHTML = "";
		for (var i in tasks) {
			TestZone.innerHTML += "<p><strong>Задание № " + (Number(i)+1) + ": </strong>" + tasks[i]["task"] + "</p>";
			var preparedTests = ""
			preparedTests += "<form class=\"AnswerZone\" id=\"A" + i + "\">";
			for (var b in tasks[i]["answers"]) {
				if (typeof(tasks[i]["answers"][b]) != 'object') {
					preparedTests += "<input class=\"TextField\" id=\"" + b + "\"/>"
					// "<p>" + tasks[i]["answers"][b] + "</p>"
					;
				} else {
					var replaceable = tasks[i]["answers"][b];
					for (var p in replaceable) {
						if (p != 'valueOf') {
							preparedTests += "<input class=\"TextField\" id=\"" + p + "\"/>"
							// "<p>" + replaceable[p] + "</p>"
							;
						};
					};
				};
			};
			preparedTests += "</form>";
			TestZone.innerHTML += preparedTests;
		};
		console.log(tasks)		
	},
	ShowAvailableGenerators: function() {
		for (var i in this.availableGenerators) {
			// console.log(AppDelegate.Generators[this.availableGenerators[i]].title);
			var row = GeneratorsTable.insertRow(i); row.id = i;
			var inputCheck = row.insertCell(0); inputCheck.innerHTML = "<input type=\"checkbox\" id=\"" + i + "\" checked />";
			var title = row.insertCell(1); title.innerHTML = AppDelegate.Generators[this.availableGenerators[i]].title;
			var description = row.insertCell(2); description.innerHTML = AppDelegate.Generators[this.availableGenerators[i]].description;
			var numberOfGenerations = row.insertCell(3); numberOfGenerations.innerHTML = "<input type=\"number\" min=\"1\" max=\"10\" value=\"1\" />";
			var secondaryTitle = row.insertCell(4); secondaryTitle.innerHTML = this.availableGenerators[i];
		};
	},
	FetchUserRequest: function() {
		generators = []
		for (var i = 0; i < GeneratorsTable.rows.length; i++) {
			var row = GeneratorsTable.rows[i];
			var generator = {
				title: "",
				variants: 1,
			};
			var isUsed = row.cells[0].getElementsByTagName('input')[0];
			if (isUsed.checked){
				generator.title = row.cells[4].innerHTML;
				generator.variants = row.cells[3].getElementsByTagName('input')[0].value;
				generators.push(generator);
			};
		};
		if (generators.length > 0) {
			return generators
		} else { return 0 };
	},
	CheckUserAnswer: function(rightAnswers, userAnswer) {
		// rightAnswers: tasks Object
		// userAnswer: answer {ID: answerID, answer: answer}
		var rightAnswer = rightAnswers[userAnswer.ID].answers;
		for (var i in rightAnswer) {
			if (userAnswer.answer[i] != rightAnswer[i] && (typeof(userAnswer.answer[i]) == 'string'
			|| typeof(userAnswer.answer[i]) == 'number')) {
				return false;
			} else if (i == "replaceable") {
				for (var b in userAnswer.answer) {
					if ((rightAnswer[i].valueOf().indexOf(Number(userAnswer.answer[b])) == -1) && (b != 'undefined')) {
						return false;
					};
				};
			};
		};
		return true;
	},
	CheckUserAnswers: function(rightAnswers, userAnswers) {
		// rightAnswers: tasks Object
		// userAnswers: answers {answerN: answer}
		var decision = { };
		for (var i in userAnswers) {
			var userAnswer = userAnswers[i];
			if (this.CheckUserAnswer(rightAnswers, userAnswer)) {
				decision[i] = { ID: i, "isTrue": true };
			} else {
				decision[i] = { ID: i, "isTrue": false };
			}
		}
		console.log(decision)
		return decision;
	},
};