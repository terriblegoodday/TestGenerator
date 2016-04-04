var _ = require('underscore'); // http://underscorejs.org
var utils = require('./utils.js');
module.exports = {
	// Генераторы заданий
	// Должны иметь обязательные аттрибуты title, description
	// И функцию Generate() -> {task, answers}
	// Если вы будет функцию, которая, к примеру, всегда будет возвращать 1,
	// и вы решите генерировать 2 задания с её помощью, это вызовет бесконечный цикл.
	// Ниже пример простейшего генератора

	// MultiplyGenerator: {
	// 	title: "Пример генератора",
	// 	description: "Генерация числа, которое нужно умножить на два.",
	// 	Generate: function() {
	// 		var a = 2;
	// 		var b = "4";
	// 		while (a == 0 || a == this.lastReturn.a) { a = Math.floor(Math.random() * (30 + 1)) -15; };
	// 		var b = a * 2;
	// 		this.lastReturn.a = a;
	// 		return {
	// 			task: "Умножить число " + a + " на 2.",
	// 			answers: {
	// 				multiply: b,
	// 			},
	// 		};
	// 	},
	// },
	
	// [Math.floor(Math.random()*items.length)]

	LinearInequalitiesGenerator: {
		title: "Линейные неравенства",
		description: "ax+b<0, где a и b - любые числа, причем a!=0, а x - неизвестная переменная.",
		lastReturn: {
			// заполнить позже
		},
		Generate: function() {
			var a = 0;
			while (a == 0) {
				a = ((Math.random() * (30 + 1)) -15).toFixed(0);
			};
			var b = 0;
			while (!((b / a).toFixed(0) == b / a) || b == 0 || b / a == 1 || b / a == -1) {
				b = ((Math.random() * (120 + 1)) -60).toFixed(0);
			};
			var c; var d;
			const inequality = _.shuffle(['&lt;', '&gt;', '&ge;', '&le;'])[0];
			var reverse = function(x) {
				switch (x) {
					case '&lt;': c = '&lt;'; d = '&gt;'; break;
					case '&gt;': c = '&gt;'; d = '&lt;'; break;
					case '&ge;': c = '&ge;'; d = '&le;'; break;
					case '&le;': c = '&le;'; d = '&ge;'; break;
				};
			};
			if (Math.sign(a) == -1) {
				reverse(inequality);
			} else {
				d = inequality;
			};
			switch (d) {
				case '&lt;': d='<'; break;
				case '&gt;': d='>'; break;
				case '&ge;': d='>='; break;
				case '&le;': d='<='; break;
			};
			return {
				task: "<p class=\'expression\'>" + utils.factor(a) + "x" + inequality + b + "</p>. Введите решенное неравенство\
				без пробелов и\
					с x в левой части.",
				answers: {
					inequality: ["x" + d + b/a, "1"],
				},
			};
		},
	},
	
	QuadInequalitiesGenerator: {
		title: "Квадратные неравенства",
		description: "Генерация простейших квадратных неравенств.",
		Generate: function() {
			var newX1 = 0;
			var newX2 = 0;
			while (newX1 == 0 || newX2 == 0) {
				newX1 = Math.round((Math.random() * 21) - 10);
				newX2 = Math.round((Math.random() * 21) - 10);
			};
			var p = -(newX1 + newX2);
			if (p > 0) {
				p = "+" + String(p);
			};
			var q = newX1 * newX2;
			if (q > 0) {
				q = "+" + String(q);
			};
			var quadEquation = ["x^2", String(p)+"x", String(q)];
			console.log(quadEquation.join(''))
			var r = _.random(0,2);
			var randomRight = quadEquation[r];
			if (randomRight[0] == '-') {
				randomRight = randomRight.replace('-', '+');
			} else if (randomRight == 'x^2') {
				randomRight = '-x^2';
			} else {
				randomRight = randomRight.replace('+', '-');
			};
			quadEquation.splice(r, 1);
			console.log(randomRight);
			quadEquation = quadEquation.join("");
			if (quadEquation[0] == '+') { quadEquation = quadEquation.replace('+', ''); };
			var a = _.shuffle([-1, +1])[0];
			var c; var d;
			var inequality = _.shuffle(['&lt;', '&gt;', '&ge;', '&le;'])[0];
			var reverse = function(x) {
				switch (x) {
					case '&lt;': c = '&lt;'; d = '&gt;'; break;
					case '&gt;': c = '&gt;'; d = '&lt;'; break;
					case '&ge;': c = '&ge;'; d = '&le;'; break;
					case '&le;': c = '&le;'; d = '&ge;'; break;
				};
			};
			if (Math.sign(a) == -1) {
				reverse(inequality);
			} else {
				c = inequality;
			};
			switch (c) {
				case '&lt;': d='<'; break;
				case '&gt;': d='>'; break;
				case '&ge;': d='>='; break;
				case '&le;': d='<='; break;
			};
			if (Math.sign(newX1) == -1) {
				newX1 = "+" + String(Math.abs(newX1));
			} else {
				newX1 = "-" + String(Math.abs(newX1))
			}
			if (Math.sign(newX2) == -1) {
				newX2 = "+" + String(Math.abs(newX2));
			} else {
				newX2 = "-" + String(Math.abs(newX2));
			}
			return {
				answers: {
					inequality: [
						"(x" + newX1 + ")(x" + newX2 + ")" + d + "0", 
						"(x" + newX2 + ")(x" + newX1 + ")" + d + "0"
					],
				},
				task: "<p class=\'expression\'>" + quadEquation + c + randomRight + "</p>. Введите решенное неравенство\
				без пробелов и\
					с x в левой части.",				
			};
		},
	},

	ProbabilityGenerator: {
		title: "Вероятности",
		description: "Простейшие вероятностные задачи.",
		variants: [
			function() {
				var names = [
					"Владимир",
					"Константин",
					"Иван",
					"Сергей",
					"Виталий",
					"Валентин",
					"Кирилл",
					"Александр",
					"Виктор",
					"Анатолий",
				];
				var surnames = [
					"Владимирович",
					"Константинович",
					"Иванович",
					"Сергеевич",
					"Витальевич",
					"Валентинович",
					"Кириллович",
					"Александрович",
					"Викторович",
					"Анатольевич",
				];
				var candidates = [];
				var asArray = function(object) {
					array = [];
					for (var i in object) {
						array.push(object[i].name + " " + object[i].surname);
					};
					return array;
				};
				var n = Math.floor((Math.random() * 7) + 4);
				for (var i in _.range(0, n)) {
					candidates.push(
						{
							name:    _.shuffle(names)[0],
							surname: _.shuffle(surnames)[0],
						}
					);
				};
				var cases = [
					1, // вероятность выбора одного из кандидатов (1/n)
				];
				switch (_.shuffle(cases)[0]) {
					case 1: 
						return {
							task: "Имеется " + n + " кандидатов. Какова вероятность, что \
							выберут одного из них? Введите вероятность, округленную до сотых.",
							answers: {
								pr: Number(((1/n)*1).toFixed(2)),
							},
						};
					break;
				};
			},
		],
		Generate: function() {
			return _.shuffle(this.variants)[0]()
		}
	},

	GeometricGenerator: {
		title: "Геометрические прогрессии",
		description: "Генерация геометрических прогрессий и представление их в виде теста.",
		lastReturn: {
			firstNumber: 0,
		},
		Generate: function() {
			var q = Math.round((Math.random() * 10) - 5).toFixed(1);
			while (q == 0 || q == 1 || q == -1) {
				q = Math.round((Math.random() * 10) - 5).toFixed(1);
			};
			// var toDivide = [true, false][Math.floor(Math.random() * [true, false].length)];
			var firstNumbers = [Math.floor((Math.random() * 20) - 10)];
			while (firstNumbers[0] == 0 || firstNumbers[0] == 1 || firstNumbers[0] == -1) {
				firstNumbers[0] = [Math.floor((Math.random() * 20) - 10)];
			};
			// if (toDivide == true) {
			// 	while (firstNumbers[0] % )
			// }
			var n = Math.floor((Math.random() * 7) + 4);
			if ((this.lastReturn.firstNumber > 3 ||
				this.lastReturn.firstNumber < 3) && (firstNumbers[0] > 3 || firstNumbers[0] < 3)) {
					while (firstNumbers[0] < 3 || firstNumbers[0] > 3) { firstNumbers[0] = Math.floor((Math.random() * 20) - 10) };
				};
			if (firstNumbers[0] > 3 || firstNumbers[0] < 3) { n = Math.floor((Math.random() * 2) + 4) };
			this.lastReturn.firstNumber = firstNumbers[0];
			var An = firstNumbers[0] * Math.pow(q, n-1);
			var n_old = n;
			while (An > 10000) {
				n -= 1;
				if (n_old = -(n)) {
					n = 4;
					break;
				};
			};
			for (var i = 0; i < 2; i++) {
				firstNumbers.push(Number(Number(firstNumbers[i]) * Number(q)));
			};
			return {
				task: "Найти " + n + " член геометрической прогрессии " + firstNumbers.join(", ") + " и её знаменатель. <br />Первое поле: член геометрической прогрессии; <br />Второе поле: знаменатель.",
				answers: {
					An: An,
					q: Number(Math.round(q).toFixed(1)),
				},
			};
		},
	},
	
	ArithmeticGenerator: {
		title: "Арифметические прогрессии",
		description: "Генерация арифметических прогрессий и представление их в виде теста.",
		lastReturn: {
			task: "Найти разность арифметической прогресии и сумму первых 9 членов арифметической прогрессии 1, 3, 5, ...",
			answers: {
				Sn: "1, 3, 5",
				d: "2",
			},
		},
		Generate: function() {
			var d = Math.round((Math.random() * 11) - 5).toFixed(1);
			while (d == 0) {
				d = Math.round((Math.random() * 11) - 5).toFixed(1);
			}
		
			var firstNumbers = [Math.floor((Math.random() * 21) + 10)];
			for (var i = 0; i < 2; i++) {
				firstNumbers.push(Number(Number(firstNumbers[i]) + Number(d)));
			};
			var n = Math.floor((Math.random() * 7) + 4);
			var Sn = (2*firstNumbers[0]+d*(n-1))/2 * n;
			var arithmeticProgression = firstNumbers.join(", ");
			this.lastReturn.task = "Найти сумму первых " + n + " членов арифметической прогрессии " + 
				arithmeticProgression + ", ...";
			this.lastReturn.answers.Sn = Sn;
			this.lastReturn.answers.d = d;
			return {
				task: "Найти сумму первых " + n + " членов арифметической прогрессии " + arithmeticProgression + ", ... и её разность. <br />Первое поле: сумма; <br />Второе поле: разность.",
				answers: {
					Sn: Sn,
					d: Math.floor(d),
				},
			};
		},
	},
	
	QuadEquationGenerator: {
		title: "Квадратные уравнения",
		description: "Генерация приведенных квадратных уравнений и представление их в виде теста.",
		quadEquation: String('x^2-3x+2'),
		x1: 2,
		x2: 1,
		Generate: function() {
			var newX1 = 0;
			var newX2 = 0;
			while (((this.x1 == 0 || this.x2 == 0)) || (newX1 == 0 || newX2 == 0)
				|| (this.x1 == newX1 && this.x2 == newX2)) {
				newX1 = Math.round((Math.random() * 21) - 10);
				newX2 = Math.round((Math.random() * 21) - 10);
			};
			var p = -(newX1 + newX2);
			if (p > 0) {
				p = "+" + String(p);
			};
			var q = newX1 * newX2;
			if (q > 0) {
				q = "+" + String(q);
			};
			this.quadEquation = String("<p class=\"expression\">x^2"+String(p)+"x"+String(q)+"=0</p>. Первое и второе поля предназначены для ввода пары корней уравнения.");
			this.x1 = newX1;
			this.x2 = newX2;
			return {
				answers: {
					replaceable: {
						x1: this.x1,
						x2: this.x2,
						// Если вы хотите взаимозаменяемые функции, добавьте в аттрибут answers аттрибут replaceable, и в него
						// пишите ответы. Однако обязательно добавьте функцию, которая возвращает эти ответы в виде массива.
						valueOf: function() {
							return [this.x1, this.x2];
						}
					},
				},
				task: this.quadEquation,				
			};
		},
	},
	
	C2EGEGenerator: {
		title: "Генератор заданий C2 из ЕГЭ по информатике",
		description: "Генерация заданий на массивы из ЕГЭ по информатике.",
		Generate: function() {
			var number_1 =  0;
			while (-4 < number_1 && number_1 < 4) {
				number_1 =  Math.round((Math.random() * 200) - 100);
			};
			var number_2 = -(number_1);
			if (number_1 > number_2) { var tmp = number_1; number_1 = number_2; number_2 = tmp; };
			var divides = 1;
			while (divides == 1) {
				divides = Math.round((Math.random() * 10));
			};
			var ends = 1.1;
			for (var i in _.range(number_1, number_2+1)) {
				if ((i % divides) == 0 && (String(i).slice(-1) != divides)) {
					ends = Number(String(i).slice(-1));
				} else if ((i % divides) == 0) {
					ends = Number(String(i).slice(-1));
				};
			};
			if (ends == 1.1) {
				ends = divides;
			}
			return {
				task: "Задан целочисленный массив из " + Math.abs(number_1*2)+1 + " элементов.  Элементы массива могут принимать значения в диапазоне от " + number_1 + " до " + number_2 + ".\
					Опишите на русском языке, или на одном из языков программирования алгоритм, \
					позволяющий найти и вывести  максимальный элемент массива, удовлетворяющий следующим условиям: \
					элемент массива кратен " + divides + " и элемент массива заканчивается на " + ends + ". \
					Гарантируется, что в исходном документе есть хотя бы один такой элемент.",
				answers: {
					
				},
			};
		},
	},
}