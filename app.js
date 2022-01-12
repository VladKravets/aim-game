const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['#854442 ', '#0057e7', '#fed766', '#ffa700', '#f4f4f8', '#011f4b', '#651e3e', '#f6cd61', '#7bc043', '#e0a899']
const firstScreen=document.querySelector('#first-screen')

let time = 0
let score = 0

startBtn.addEventListener('click', (event) => {
	event.preventDefault()
	screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
	if (event.target.classList.contains('time-btn')) {
		time = parseInt(event.target.getAttribute('data-time'));
		screens[1].classList.add('up')
		startGame()
	}
})

board.addEventListener('click', event => {
	if (event.target.classList.contains('circle')) {
		score++
		event.target.remove('circle')
		createRandomCircle()
	}
})



function startGame(params) {
	setInterval(decreeseTime, 1000)
	createRandomCircle()
	setTime(time)
	getRandomColor()
}

function decreeseTime(params) {
	if (time === 0) {
		finishGame()
	} else {
		let current = --time
		if (current < 10) {
			current = `0${current}`
		}
		setTime(current)
	}
}
function setTime(value) {
	timeEl.innerHTML = `00:${value}`

}
function finishGame(params) {
	timeEl.parentNode.classList.add('hide')
	board.innerHTML = `<h2>Ваш результат: <span class='primary'>${score}</span></h2>`
	return firstScreen
}

function createRandomCircle(params) {
	const circle = document.createElement('div')
	const size = getRandomNumber(10, 60)
	const { width, height } = board.getBoundingClientRect()
	const x = getRandomNumber(0, width - size)
	const y = getRandomNumber(0, height - size)

	circle.classList.add('circle')
	circle.style.width = `${size}px`
	circle.style.height = `${size}px`
	circle.style.top = `${y}px`
	circle.style.left = `${x}px`
	setColor(circle)

	board.append(circle)
}

function getRandomNumber(min, max) {
	return Math.round(Math.random() * (max - min) + min)
}
function setColor(element) {
	const color = getRandomColor()
	element.style.background = color
}
function getRandomColor() {
	const index = Math.floor(Math.random() * colors.length)
	return colors[index]
}