const GameScene = {
	displayables: {
		questionBox: document.getElementById('question-container'),
		dimSumBox: document.getElementById('question-image'),
		timeline: document.getElementById('timeline'),
		progress: document.getElementById('progress'),
		scoreContainer: document.getElementById('score-container')
	},
	clickables: {
		choiceA: document.getElementById('choice-a'),
		choiceB: document.getElementById('choice-b'),
		choiceC: document.getElementById('choice-c'),
		choiceD: document.getElementById('choice-d'),
	},
	takeChoice: function(evt) {
		GameScene.confirmChoice(evt.target.innerText)
	},
	confirmChoice: function(ans) {
		var {overlay, container, title, content, selection} = GameManager.popups
		title.innerHTML = '<p>confirm</p>'
		content.innerHTML = `<p>Are you Sure the answer is <span style="font-size: 25px; padding-left: 5px; padding-right: 5px font-style: italic; color: #C1221A">${ans}</span>  ?</p>`;

		var confirmBtn = document.createElement('button')
		confirmBtn.className = 'button is-success selection-btn'
		confirmBtn.innerText = 'confirm'
		var cancelBtn = document.createElement('button')
		cancelBtn.className = 'button is-danger selection-btn'
		cancelBtn.innerText = 'Cancel'

		selection.innerHTML = ""
		selection.appendChild(confirmBtn)
		selection.appendChild(cancelBtn)

		confirmBtn.onclick = function() {
			GameManager.checkAnswer(ans)
			overlay.classList.remove('is-active')
		}
		cancelBtn.onclick = function() {
			overlay.classList.remove('is-active')
		}

		overlay.classList.add('is-active')
	}
}

GameScene.clickables.choiceA.addEventListener('click', GameScene.takeChoice)
GameScene.clickables.choiceB.addEventListener('click', GameScene.takeChoice)
GameScene.clickables.choiceC.addEventListener('click', GameScene.takeChoice)
GameScene.clickables.choiceD.addEventListener('click', GameScene.takeChoice)