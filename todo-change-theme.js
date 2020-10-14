let content = document.querySelector('.page')
let themeButton = document.querySelector('.change-theme')

themeButton.onclick = function() {
    content.classList.toggle('light-theme')
    content.classList.toggle('dark-theme')
}