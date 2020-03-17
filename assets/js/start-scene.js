const StartScene = {
	clickables: {
		start: document.getElementById('start-btn'),
		help: document.getElementById('help-btn')
	},
	startGame: function() {
		GameManager.startGame()
		//GameManager.getQuestionSet()
		//SceneManager.activeScene('game')
	},
	helpScene: function() {
		console.log('it is exist')
	}
}

StartScene.clickables.start.addEventListener('click', StartScene.startGame)
StartScene.clickables.help.addEventListener('click', StartScene.helpScene)