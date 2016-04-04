"use strict";
var _ = require('underscore'); // http://underscorejs.org
var AppDelegate = {
	tasks: {},
	ApplicationDidFinishLaunching: function () {
		// Some initialisation here
		MasterController.ShowAvailableGenerators();
		var gui = require('nw.gui');
		var win = gui.Window.get();
		var nativeMenuBar = new gui.Menu({ type: "menubar" });
		try {
		nativeMenuBar.createMacBuiltin("My App");
		win.menu = nativeMenuBar;
		} catch (ex) {
		console.log(ex.message);
		}
	},
	ShowTasks: function() {
		var generators = MasterController.FetchUserRequest();
		this.tasks = MasterController.GenerateTasks(generators);
		var tasks = this.tasks;
		MasterController.ShowTasks(tasks);
		Decision.innerHTML = " ";
		CheckUserAnswers.style.display = "inline-block";
	},
	CheckUserAnswers: function() {
		var userAnswers = [];
		var userAnswersArray = {};
		var length = this.tasks.length;
		for (var i=0; i < this.tasks.length; i++) {
			userAnswers.push(document.getElementById(("A" + i)));
		};
		for (var i in userAnswers) {
			var inputFields = userAnswers[i].getElementsByTagName('input');
			userAnswersArray[i] = { ID: i, answer: {} };
			for (var b in inputFields) {
				userAnswersArray[i].answer[inputFields[b].id] = inputFields[b].value; // Ex for slice(1): A23 = 23
			};
		};
		var decision = MasterController.CheckUserAnswers(this.tasks, userAnswersArray);
		var decisionInString = "";
		var numberOfMistakes = utils.numberOfMistakes(decision);
		var percentage = Math.round(100-((numberOfMistakes / length) * 100));
		for (var i in decision) {
			var isTrue = "верно";
			if ((decision[i].isTrue) != true) { isTrue = "неверно" };
			decisionInString += "<strong>Задание № " + (Number(decision[i].ID)+1) + ": </strong>" 
			+ isTrue + "<br />";
		}
		Decision.innerHTML = decisionInString + percentage + "% правильных ответов.";
		window.scrollTo(0,document.body.scrollHeight);
	},
};

AppDelegate.Generators = require('./js/generators.js');