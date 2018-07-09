require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://localhost:3001/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["j"] = startGame;
/* harmony export (immutable) */ __webpack_exports__["i"] = handleFlip;
const START_GAME = 'START_GAME';
/* harmony export (immutable) */ __webpack_exports__["g"] = START_GAME;

const TIMER_TICK = 'TIMER_TICK';
/* harmony export (immutable) */ __webpack_exports__["h"] = TIMER_TICK;

const FLIP_CARD = 'FLIP_CARD';
/* harmony export (immutable) */ __webpack_exports__["d"] = FLIP_CARD;

const QUEUE_CARD = 'QUEUE_CARD';
/* harmony export (immutable) */ __webpack_exports__["e"] = QUEUE_CARD;

const ADD_RECORD = 'ADD_RECORD';
/* harmony export (immutable) */ __webpack_exports__["b"] = ADD_RECORD;

const RESTART_GAME = 'RESTART_GAME';
/* harmony export (immutable) */ __webpack_exports__["f"] = RESTART_GAME;

const ADD_MATCH = 'ADD_MATCH';
/* harmony export (immutable) */ __webpack_exports__["a"] = ADD_MATCH;

const EMPTY_QUEUE = 'EMPTY_QUEUE';
/* harmony export (immutable) */ __webpack_exports__["c"] = EMPTY_QUEUE;


function restartGame() {
	return {
		type: RESTART_GAME,
		gameStarted: false
	};
}

function startGame() {
	return (dispatch, getState) => {

		clearInterval(timer);
		let timer = setInterval(() => dispatch({ type: TIMER_TICK }), 1000);

		let set = getState().data[getState().level.difficulty].map((symbol, idx) => {
			return {
				type: symbol,
				position: null,
				key: idx
			};
		});

		dispatch({
			type: START_GAME,
			cards: set,
			newRecord: false
		});
	};
}

function handleFlip(id, type) {

	return (dispatch, getState) => {
		let priorQueue = getState().game.queue;
		let queue = () => getState().game.queue;
		let queueLength = () => getState().game.queue.length;
		let matchLength = getState().game.matches.length;
		let matchNumber = getState().level.matchNumber;
		let deckLength = getState().game.cards.length;
		let currCard = { [id]: type };
		let level = getState().level.difficulty;
		let lowestTime = () => getState().game.lowestTime[level];
		let secondsElapsed = () => getState().game.secondsElapsed;

		let positionCards = getState().game.cards.map(card => {
			return card.key === id ? Object.assign(card, { position: 'flipped' }) : card;
		});

		dispatch({
			type: FLIP_CARD,
			cards: positionCards
		});

		if (queueLength() === 0) {
			dispatch({
				type: QUEUE_CARD,
				card: currCard
			});
		}

		if (priorQueue.length > 0) {
			// Compare current symbol with last symbol in queue
			if (Object.values(queue()[queueLength() - 1])[0] === type) {
				// If queue has not reached matchNumber - 1
				if (queueLength() < matchNumber - 1) {

					dispatch({
						type: QUEUE_CARD,
						card: currCard
					});
				} else if (queueLength() === matchNumber - 1) {
					// Check if winning selection

					if (matchLength === deckLength - matchNumber) {
						// Game is won
						if (lowestTime() != '') {
							if (secondsElapsed() < lowestTime()) {
								dispatch({
									type: 'ADD_RECORD',
									record: { [level]: secondsElapsed },
									newRecord: true
								});
							}
						} else {
							dispatch({
								type: 'ADD_RECORD',
								record: { [level]: secondsElapsed() },
								newRecord: true
							});
						}

						setTimeout(restartGame(), 2000);
					} else {
						// a match short of winning
						dispatch({
							type: ADD_MATCH,
							cards: priorQueue.concat(currCard),
							queue: []
						});
					}
				}
			} else {
				dispatch({
					type: EMPTY_QUEUE,
					queue: []
				});
			}
		}
	};
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = {
	"root": "Game-root--j3E7t",
	"start": "Game-start--2CVGJ",
	"level": "Game-level--1wyLd",
	"prompt": "Game-prompt--2N9iv",
	"time": "Game-time--14iMr",
	"loading": "Game-loading--1bext",
	"header": "Game-header--NquO6",
	"restart": "Game-restart--3e1cU",
	"timer": "Game-timer---ZGNE",
	"intro": "Game-intro--UqIsf",
	"stats": "Game-stats--123Hv",
	"easy": "Game-easy--Qa-wU",
	"hard": "Game-hard--3CicP",
	"crazy": "Game-crazy--Nv11Q",
	"flipped": "Game-flipped--1gpjb",
	"front": "Game-front--1HNTK",
	"back": "Game-back--11fB_",
	"progressContainer": "Game-progressContainer--3Z61U",
	"shuffle-15": "Game-shuffle-15--1uz6p",
	"shuffleIn": "Game-shuffleIn--2PM2Z"
};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = receiveData;
const RECEIVE_DATA = 'RECEIVE_DATA';
/* harmony export (immutable) */ __webpack_exports__["a"] = RECEIVE_DATA;


function receiveData(data) {
	return {
		type: RECEIVE_DATA,
		data
	};
}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = setLevel;
const SET_LEVEL = 'SET_LEVEL';
/* harmony export (immutable) */ __webpack_exports__["a"] = SET_LEVEL;


function setLevel(level) {
	return (dispatch, getState) => {
		const cards = getState().data[level];

		dispatch({
			type: SET_LEVEL,
			level,
			cards
		});
	};
}

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_compression__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_compression___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_compression__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_path__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_dom_server__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_dom_server___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_dom_server__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_App_App__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__template__ = __webpack_require__(30);








const clientAssets = __webpack_require__(31); // eslint-disable-line import/no-dynamic-require
console.log(clientAssets);
const port = parseInt(process.env.PORT || "3000", 10);
const app = __WEBPACK_IMPORTED_MODULE_0_express___default.a();

// Remove annoying Express header addition.
app.disable('x-powered-by');

// Compress (gzip) assets in production.
app.use(__WEBPACK_IMPORTED_MODULE_1_compression___default.a());

// Setup the public directory so that we can server static assets.
app.use(__WEBPACK_IMPORTED_MODULE_0_express___default.a.static(__WEBPACK_IMPORTED_MODULE_2_path___default.a.join(process.cwd(), "src/public")));

app.get('*', (request, response) => {
  response.send(__WEBPACK_IMPORTED_MODULE_6__template__["a" /* default */]({
    html: __WEBPACK_IMPORTED_MODULE_4_react_dom_server__["renderToString"](__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__components_App_App__["a" /* default */], null)),
    manifestJSBundle: clientAssets['manifest.js'],
    mainJSBundle: clientAssets['main.js'],
    vendorJSBundle: clientAssets['vendor.js'],
    mainCSSBundle: clientAssets['main.css']
  }));
});

app.listen(port, () => {
  console.log(`server started on port: ${port}`); // eslint-disable-line no-console
});

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Game_Game__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__reducers__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__middleware__ = __webpack_require__(28);








const store = __WEBPACK_IMPORTED_MODULE_3_redux__["createStore"](__WEBPACK_IMPORTED_MODULE_4__reducers__["a" /* default */], __WEBPACK_IMPORTED_MODULE_5__middleware__["a" /* default */]);

const App = () => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
  __WEBPACK_IMPORTED_MODULE_2_react_redux__["Provider"],
  { store: store },
  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__Game_Game__["a" /* default */], null)
);

/* harmony default export */ __webpack_exports__["a"] = (App);

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Game_scss__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Game_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Game_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Cards__ = __webpack_require__(14);




class Game extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

	render() {
		return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			null,
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__Cards__["a" /* default */], null)
		);
	}
}

/* harmony default export */ __webpack_exports__["a"] = (Game);

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Game_scss__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Game_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Game_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Levels__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Start__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_flip_move__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_flip_move___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react_flip_move__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Card__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ProgressBar__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Bullseye__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__actions_level__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__actions_game__ = __webpack_require__(0);













let lodashShuffle = __webpack_require__(23);

class CardContainer extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
	constructor(props) {
		super(props);
		this.state = {
			gameStarted: false,
			secondsElapsed: 0,
			latestTime: 0,
			lowestTime: { 'easy': '', 'hard': '', 'crazy': '' },
			level: 'easy',
			matchNumber: '',
			shuffleDuration: '15', // Keep in component state?
			cards: [],
			matches: [],
			queue: []
		};

		this.restartGame = this.restartGame.bind(this);
		this.formatBoard = this.formatBoard.bind(this);
		this.clickEvent = this.clickEvent.bind(this);
		this.flipLater = this.flipLater.bind(this);
		this.shuffle = this.shuffle.bind(this);
	}

	tick() {
		this.setState({
			secondsElapsed: this.state.secondsElapsed + 1
		});
	}

	flipLater(ids) {

		this.setState(prevState => {
			cards: prevState.cards.map(card => {
				ids.forEach(id => {
					if (card.id.toString() === id) {
						card.position = null;
					}
				});

				return card;
			});
		});
	}

	shuffle() {
		this.setState({
			cards: lodashShuffle(this.state.cards)
		});
	}

	restartGame() {
		this.setState({
			gameStarted: false,
			cards: [],
			matches: [],
			queue: []
		});

		clearInterval(this.timeInterval);
		clearInterval(this.shuffleInterval);
	}

	clickEvent(id, type) {

		this.props.dispatch(__WEBPACK_IMPORTED_MODULE_10__actions_game__["i" /* handleFlip */](id, type));
		let obj = {};
		obj[id] = type;

		let queueLength = this.state.queue.length;

		this.setState(prevState => {
			cards: prevState.cards.map(card => {
				if (card.id === id) {
					card.position = 'flipped';
				}

				return card;
			});
		});

		if (queueLength === 0) {
			this.setState({
				queue: this.state.queue.concat(obj)
			});
		}

		if (queueLength > 0) {
			// Compare current symbol with last symbol in queue
			if (Object.values(this.state.queue[queueLength - 1])[0] === type) {
				if (queueLength < this.state.matchNumber - 1) {
					this.setState({
						queue: this.state.queue.concat(obj)
					});
				} else if (queueLength === this.state.matchNumber - 1) {
					// Check if winning selection
					if (this.state.matches.length === this.state.cards.length - this.state.matchNumber) {

						if (this.state.lowestTime[this.state.level] != '') {
							this.setState(prevState => {
								prevState.lowestTime[this.state.level] = this.state.lowestTime[this.state.level] < this.state.secondsElapsed ? this.state.lowestTime[this.state.level] : this.state.secondsElapsed;
								lowestTime: prevState.lowestTime;
							});
						} else {
							this.setState(prevState => {
								prevState.lowestTime[this.state.level] = this.state.secondsElapsed;
								lowestTime: prevState.lowestTime;
							});
						}

						this.setState({
							latestTime: this.state.secondsElapsed
						});

						clearInterval(this.timeInterval);

						setTimeout(function () {
							this.restartGame();
						}.bind(this), 2000);
					} else {
						this.setState({
							matches: this.state.matches.concat(this.state.queue.concat(obj)),
							queue: []
						});
					}
				}
			} else {
				let cardsToFlip = this.state.queue.concat(obj);
				cardsToFlip = cardsToFlip.map(card => Object.keys(card)[0]);

				this.setState({ queue: [] });

				setTimeout(function () {
					this.flipLater(cardsToFlip);
				}.bind(this), 1000);
			}
		}
	}

	formatBoard(difficulty) {
		this.props.dispatch(__WEBPACK_IMPORTED_MODULE_9__actions_level__["b" /* setLevel */](difficulty));
		this.props.dispatch(__WEBPACK_IMPORTED_MODULE_10__actions_game__["j" /* startGame */]());
		let symbols;

		if (difficulty === 'easy') {
			this.setState({
				level: 'easy',
				matchNumber: 2
			});

			symbols = __WEBPACK_IMPORTED_MODULE_3__Levels__["a" /* levels */][0].cards;
		}

		if (difficulty === 'hard') {
			this.setState({
				level: 'hard',
				matchNumber: 2
			});

			symbols = __WEBPACK_IMPORTED_MODULE_3__Levels__["a" /* levels */][1].cards;
		}

		if (difficulty === 'crazy') {
			this.setState({
				level: 'crazy',
				matchNumber: 3
			});

			symbols = __WEBPACK_IMPORTED_MODULE_3__Levels__["a" /* levels */][2].cards;
		}

		let cards = symbols.map((symbol, idx) => {
			return {
				type: symbol,
				position: null,
				id: idx
			};
		});

		this.setState({
			secondsElapsed: 0,
			cards,
			gameStarted: true,
			latestTime: ''
		});

		this.timeInterval = setInterval(this.tick.bind(this), 1000);
		this.shuffleInterval = setInterval(this.shuffle.bind(this), 15000);
	}

	render() {
		const formatTime = time => {
			if (time < 0) return '--:--';
			const h = Math.floor(time / 3600);
			const m = Math.floor(time % 3600 / 60);
			const mm = m < 10 ? `0${m}` : m;
			const s = time % 60;
			const ss = s < 10 ? `0${s}` : s;
			if (h > 0) return [h, mm, ss].join(':');
			return `${m}:${ss}`;
		};

		const Timer = ({ time = 0 }) => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'p',
			{ className: __WEBPACK_IMPORTED_MODULE_2__Game_scss___default.a.timer },
			formatTime(time)
		);
		let lowestTimeFormat = formatTime(this.state.lowestTime[this.state.level]);
		let latestTimeFormat = formatTime(this.state.latestTime);
		let progressClass = this.state.gameStarted ? 'shuffle-15' : null;

		return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			{ style: { position: 'relative' } },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ style: this.state.gameStarted ? { display: 'none' } : { display: 'block' }, className: __WEBPACK_IMPORTED_MODULE_2__Game_scss___default.a.start },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					__WEBPACK_IMPORTED_MODULE_4__Start__["a" /* default */],
					{ newPlayer: this.state.lowestTime[this.state.level] != '', lowestTime: lowestTimeFormat, latestTime: latestTimeFormat },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'p',
						{ className: __WEBPACK_IMPORTED_MODULE_2__Game_scss___default.a.level, onClick: () => this.formatBoard('easy') },
						'Easy'
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'p',
						{ className: __WEBPACK_IMPORTED_MODULE_2__Game_scss___default.a.level, onClick: () => this.formatBoard('hard') },
						'Hard'
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'p',
						{ className: __WEBPACK_IMPORTED_MODULE_2__Game_scss___default.a.level, onClick: () => this.formatBoard('crazy') },
						'Crazy'
					)
				)
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: __WEBPACK_IMPORTED_MODULE_2__Game_scss___default.a.intro },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'h1',
					{ className: __WEBPACK_IMPORTED_MODULE_2__Game_scss___default.a.header },
					'Memory Game'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'p',
					{ className: __WEBPACK_IMPORTED_MODULE_2__Game_scss___default.a.restart, onClick: this.restartGame },
					'\u21BB'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ className: __WEBPACK_IMPORTED_MODULE_2__Game_scss___default.a.stats },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Timer, { time: this.state.secondsElapsed }),
					this.state.lowestTime[this.state.level] != '' && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'p',
						null,
						'Time to beat: ',
						lowestTimeFormat
					)
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__ProgressBar__["a" /* default */], { className: __WEBPACK_IMPORTED_MODULE_2__Game_scss___default.a[progressClass] })
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				__WEBPACK_IMPORTED_MODULE_5_react_flip_move___default.a,
				{ typeName: 'ul', className: __WEBPACK_IMPORTED_MODULE_2__Game_scss___default.a[this.state.level] },
				this.state.cards.map((card, idx) => {
					return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						__WEBPACK_IMPORTED_MODULE_6__Card__["a" /* default */],
						{ key: card.id, type: card.type, onClick: () => this.clickEvent(card.id, card.type), className: __WEBPACK_IMPORTED_MODULE_2__Game_scss___default.a[card.position] },
						__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
							'div',
							null,
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__Bullseye__["a" /* default */], null),
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('figure', { className: __WEBPACK_IMPORTED_MODULE_2__Game_scss___default.a.front }),
							__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'figure',
								{ className: __WEBPACK_IMPORTED_MODULE_2__Game_scss___default.a.back },
								card.type
							)
						)
					);
				})
			)
		);
	}
}

function mapStateToProps() {
	return {};
}
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"](mapStateToProps)(CardContainer));

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const levels = [{
	cards: ["✈", "♘", "✈", "♫", "♫", "☆", "♘", "☆"],
	difficulty: "easy"
}, {
	cards: ["❄", "⍨", "♘", "✈", "☯", "♠", "☆", "❄", "♫", "♫", "☯", "☆", "✈", "⍨", "♠", "♘"],
	difficulty: "hard"
}, {
	cards: ["⍨", "✈", "☆", "♘", "⍨", "♫", "♠", "✈", "❄", "✈", "♘", "☆", "❄", "☯", "☯", "♫", "♠", "⍨", "☯", "☆", "❄", "♘", "♫", "♠"],
	difficulty: "crazy"
}];
/* harmony export (immutable) */ __webpack_exports__["a"] = levels;


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Game_scss__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Game_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Game_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions_shared__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_redux__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_redux__);





class Start extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.props.dispatch(__WEBPACK_IMPORTED_MODULE_2__actions_shared__["a" /* handleInitialData */]());
	}

	render() {
		const greeting = this.props.newPlayer ? 'Ready for Another Round?' : 'Memory Game';
		const prompt = this.props.lowestTime === this.props.latestTime ? 'Congrats! You made a new time:' : 'Latest Time:';
		const Time = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			null,
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'p',
				{ className: __WEBPACK_IMPORTED_MODULE_1__Game_scss___default.a.prompt },
				prompt
			),
			this.props.lowestTime === this.props.latestTime && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'p',
				{ className: __WEBPACK_IMPORTED_MODULE_1__Game_scss___default.a.time },
				this.props.lowestTime
			),
			this.props.latestTime != this.props.lowestTime && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				null,
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'p',
					{ className: __WEBPACK_IMPORTED_MODULE_1__Game_scss___default.a.time },
					this.props.latestTime === '0:00' ? '--:--' : this.props.latestTime
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'p',
					null,
					'Time to Beat:'
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'p',
					{ className: __WEBPACK_IMPORTED_MODULE_1__Game_scss___default.a.time },
					this.props.lowestTime
				)
			)
		);

		return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			null,
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { style: this.props.loading ? { display: 'block' } : { display: 'none' }, className: __WEBPACK_IMPORTED_MODULE_1__Game_scss___default.a.loading }),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'h1',
				null,
				greeting
			),
			this.props.lowestTime != '0:00' && Time,
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'p',
				null,
				'Choose your level:'
			),
			this.props.children
		);
	}
}

function mapStateToProps({ data }) {

	return {
		loading: data === null
	};
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_3_react_redux__["connect"](mapStateToProps)(Start));

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = handleInitialData;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__data__ = __webpack_require__(5);


function getLevels(url) {
	return fetch(url).then(data => {
		return data.json();
	});
}

function getInitialData() {
	return Promise.all([getLevels('https://web-code-test-dot-nyt-games-prd.appspot.com/cards.json'), getLevels('https://web-code-test-dot-nyt-games-prd.appspot.com/triples.json')]).then(levels => {
		return levels;
	});
}

function handleInitialData() {
	return dispatch => {
		return getInitialData().then(levels => {
			levels = {
				easy: levels[0].levels[0].cards,
				hard: levels[0].levels[1].cards,
				crazy: levels[1].cards
			};

			dispatch(__WEBPACK_IMPORTED_MODULE_0__data__["b" /* receiveData */](levels));
		});
	};
}

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("react-flip-move");

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);



class Card extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
	constructor(props) {
		super(props);
	}

	render() {

		return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'li',
			{ key: this.props.key, type: this.props.type, id: this.props.id, onClick: this.props.onClick, className: this.props.className },
			this.props.children
		);
	}
}

Card.propTypes = {
	key: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
	type: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
	onClick: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
	children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.element.isRequired
};

/* harmony default export */ __webpack_exports__["a"] = (Card);

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Game_scss__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Game_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Game_scss__);



const ProgressBar = props => {
	return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
		'div',
		{ className: __WEBPACK_IMPORTED_MODULE_1__Game_scss___default.a.progressContainer },
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { className: props.className })
	);
};

/* harmony default export */ __webpack_exports__["a"] = (ProgressBar);

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


const Bullseye = props => {
	return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
		'svg',
		{ viewBox: '0 0 100 100', xmlns: 'http://www.w3.org/2000/svg' },
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('circle', { fill: '#1d8ba5', cx: '50', cy: '50', r: '50' }),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('circle', { fill: '#fa5d59', cx: '50', cy: '50', r: '30' })
	);
};

/* harmony default export */ __webpack_exports__["a"] = (Bullseye);

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("lodash.shuffle");

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__level__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__game__ = __webpack_require__(27);





/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_redux__["combineReducers"]({
	data: __WEBPACK_IMPORTED_MODULE_1__data__["a" /* default */],
	level: __WEBPACK_IMPORTED_MODULE_2__level__["a" /* default */],
	game: __WEBPACK_IMPORTED_MODULE_3__game__["a" /* default */]
}));

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = data;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions_data__ = __webpack_require__(5);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



function data(state = null, action) {
  switch (action.type) {

    case __WEBPACK_IMPORTED_MODULE_0__actions_data__["a" /* RECEIVE_DATA */]:

      return _extends({}, state, action.data);

    default:
      return state;
  }
}

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = level;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions_level__ = __webpack_require__(6);


function level(state = {}, action) {

	switch (action.type) {
		case __WEBPACK_IMPORTED_MODULE_0__actions_level__["a" /* SET_LEVEL */]:
			return {
				difficulty: action.level,
				matchNumber: action.level === 'crazy' ? 3 : 2
			};

		default:
			return state;
	}
}

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = game;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions_game__ = __webpack_require__(0);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };










const initialState = {
	started: false,
	lowestTime: { 'easy': '', 'hard': '', 'crazy': '' }
};

function game(state = initialState, action) {
	switch (action.type) {

		case __WEBPACK_IMPORTED_MODULE_0__actions_game__["g" /* START_GAME */]:
			return _extends({}, state, {
				started: true,
				cards: action.cards,
				queue: [],
				matches: [],
				secondsElapsed: 0,
				newRecord: false
			});

		case __WEBPACK_IMPORTED_MODULE_0__actions_game__["h" /* TIMER_TICK */]:
			return _extends({}, state, {
				secondsElapsed: state.secondsElapsed + 1
			});

		case __WEBPACK_IMPORTED_MODULE_0__actions_game__["d" /* FLIP_CARD */]:
			return _extends({}, state, {
				cards: action.cards
			});

		case __WEBPACK_IMPORTED_MODULE_0__actions_game__["e" /* QUEUE_CARD */]:
			return _extends({}, state, {
				queue: state.queue.concat(action.card)
			});

		case __WEBPACK_IMPORTED_MODULE_0__actions_game__["c" /* EMPTY_QUEUE */]:
			return _extends({}, state, {
				queue: action.queue
			});

		case __WEBPACK_IMPORTED_MODULE_0__actions_game__["a" /* ADD_MATCH */]:
			return _extends({}, state, {
				matches: state.matches.concat(action.cards),
				queue: action.queue
			});

		case __WEBPACK_IMPORTED_MODULE_0__actions_game__["b" /* ADD_RECORD */]:

			return _extends({}, state, {
				lowestTime: _extends({}, state.lowestTime, action.record),
				newRecord: action.newRecord
			});

		case __WEBPACK_IMPORTED_MODULE_0__actions_game__["f" /* RESTART_GAME */]:

			return {
				gameStarted: action.gameStarted
			};

		default:
			return state;
	}
}

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux_thunk__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux_thunk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux_thunk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux__);



const composeEnhancers = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || __WEBPACK_IMPORTED_MODULE_1_redux__["compose"];

/* harmony default export */ __webpack_exports__["a"] = (composeEnhancers(__WEBPACK_IMPORTED_MODULE_1_redux__["applyMiddleware"](__WEBPACK_IMPORTED_MODULE_0_redux_thunk___default.a)));

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* eslint-disable prefer-template, max-len */

const getDeferScript = src => src ? `<script defer src="${src}"></script>` : '';

/* harmony default export */ __webpack_exports__["a"] = (vo => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta charSet='utf-8' />
    <meta httpEquiv="Content-Language" content="en" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css">
    ${vo.mainCSSBundle ? '<link rel="stylesheet" type="text/css" href="' + vo.mainCSSBundle + '">' : ''}

    <title>Memory Game</title>
  </head>

  <body>
    <div style="height: 100vh; overflow: hidden;" id="root"><div>${vo.html}</div></div>
    ${getDeferScript(vo.manifestJSBundle)}
    ${getDeferScript(vo.vendorJSBundle)}
    ${getDeferScript(vo.mainJSBundle)}
  </body>
</html>`);

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = {"main.js":"http://localhost:3001/main.js"}

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map