const START_SCENE = 'start-scene'
const GAME_SCENE = 'game-scene'
const END_SCENE = 'end-scene'
const GAME_CORRECT = 'game-correct'
const GAME_LOSE = 'game-lose'

const SceneManager ={
	container: document.getElementById('scene-container'),
	scenes: {
		start: document.getElementById(START_SCENE),
		game: document.getElementById(GAME_SCENE), 
		end: document.getElementById(END_SCENE),
		correct: document.getElementById(GAME_CORRECT),
		lose: document.getElementById(GAME_LOSE),
	},
	activeScene: function(sceneName) {
		Object.keys(SceneManager.scenes).forEach(sceneKey => SceneManager.scenes[sceneKey].classList.remove('is-active'))
		SceneManager.scenes[sceneName].classList.add('is-active')
	}
}

const GameManager = {
	contaienr: document.getElementById('game-container'),
	popups: {
		overlay: document.getElementById('pop-up-overlay'),
		container: document.getElementById('pop-ups'),
		title: document.getElementById('pop-up-title'),
		content: document.getElementById('pop-up-content'),
		selection: document.getElementById('pop-up-selection')
	},
	timePause: false,
	timeReplay: function() {
		GameManager.timePause = false
		GameManager.timeTick()
	},
	timeCounter: 0,
	timeLimit: 15000,
	timeTick: function() {
		setTimeout(function() {
			if (GameManager.timePause) return
			GameManager.timeCounter += 1000
			GameScene.displayables.progress.style.width = `${GameManager.timeCounter / GameManager.timeLimit * 100}%`
			console.log(GameManager.timeCounter)
			if (GameManager.timeCounter >= GameManager.timeLimit + 1000) {
				GameManager.checkAnswer(null)
			} else {
				GameManager.timeTick()
			}
		}, 1000)
	},

	score: 0,
	questionSet: null,
	currentQ: null,
	startGame: function() {
		GameManager.initialGame()
		GameManager.getQuestionSet()
		SceneManager.activeScene('game')
	},
	getQuestionSet: function(theSet) {
		Object.keys(questiones).includes(theSet) ? GameManager.questionSet = Array.from(questiones[theSet]) : GameManager.questionSet = Array.from(questiones['dimSumA'])
		for (var i = 0; i < GameManager.questionSet.length; i++) {
			var div = document.createElement('div')
			div.className = "not-answered"
			GameScene.displayables.scoreContainer.appendChild(div)
		}
		GameManager.nextQuestion()
	},
	initialGame: function() {
		GameScene.displayables.scoreContainer.innerHTML = "";
		GameManager.score = 0
		GameManager.timePause = false
		GameManager.timeCounter = 0
		GameManager.questionSet = null
		GameManager.currentQ = null
		Object.keys(GameScene.clickables).forEach(key => {
			var btns = GameScene.clickables[key].querySelectorAll('button')
			Array.from(btns).forEach(btn => btn.disabled = false)
		})
		GameManager.timeTick()
	},
	nextQuestion: function() {
		GameManager.currentQ = GameManager.questionSet.shift()
		GameScene.displayables.questionBox.innerHTML = `<p class="p-question-display">${GameManager.currentQ.question}</p>`
		Object.keys(GameScene.clickables).forEach(choice => {
			GameScene.clickables[choice].querySelector('button').innerText = GameManager.currentQ[choice]
		})
		GameScene.displayables.dimSumBox.style.backgroundImage = `url(assets/${GameManager.currentQ.imgSrc})`
	},
	checkAnswer: function(ans) {
		GameManager.timePause = true
		GameManager.timeCounter = 0
		GameScene.displayables.progress.style.width = 0
		GameScene.displayables.progress.style.transition = ""
		Object.keys(GameScene.clickables).forEach(key => {
			var btns = GameScene.clickables[key].querySelectorAll('button')
			Array.from(btns).forEach(btn => btn.disabled = true)
		})

		setTimeout(function() {
			if (ans === GameManager.currentQ.correct) {
				GameManager.answerCorrect()
			} else {
				GameManager.answerWrong()
			}
			if (GameManager.questionSet.length === 0) {
				GameManager.gameEnd()
				return
			}
			GameManager.timeReplay()
			GameScene.displayables.progress.style.transition = "all 1s linear"
			Object.keys(GameScene.clickables).forEach(key => {
				var btns = GameScene.clickables[key].querySelectorAll('button')
				Array.from(btns).forEach(btn => btn.disabled = false)
			})
			GameManager.nextQuestion()
		}, 1000)
	},
	answerCorrect: function() {
		var scoreDiv = document.querySelector('.not-answered')
		scoreDiv.className = 'is-correct'
		GameManager.score += 1
	},
	answerWrong: function() {
		var scoreDiv = document.querySelector('.not-answered')
		scoreDiv.className = 'is-wrong'
	},
	gameEnd: function() {
		setTimeout(function() {
			var confirm = window.confirm(`The game is end and your score is ${GameManager.score}`)
			if (confirm) {
				GameManager.startGame()
			} else {
				SceneManager.activeScene('start')
			}
		}, 500)
	},

}