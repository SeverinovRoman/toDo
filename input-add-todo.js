// Создаем контейнер куда помещаем форму отправки - поле ввода и кнопку
let inputForm = document.querySelector('.input-field')

// Создаем контейнер куда помещаем наш список дел
let todoList = document.querySelector('.todo-list')

// Создаем контейнер куда помещаем поле ввода, для получения его данных
let input = document.querySelector('.input')

// Загружаем данные хранилища
loadData();

// Функция выполняется, когда внутри контейнера формы нажимаем на кнопку сабмит 
inputForm.addEventListener('submit', function(event) {
    // добавляем метод, который отменяет обновление страницы при отправке формы
    event.preventDefault();

    // Создаем контейнер в который добавляем значения контейнера инпут веденные пользователем
    let newTextinInput = input.value
    
    // Создаем переменную которая при отправке формы создает ХТМЛ элемент с содержанием из поля ввода
    let newToDo = 
    `<li class="new-To-Do"> <span class="text-content">${newTextinInput}</span>
        <div class="li-buttons">
            <button data-action="ready" type="button">Готово</button>
            <button data-action="delete" type="button">Удалить</button>
        </div>
    </li>`

    // В контейнер списка дел ul добавляем нашу переменную с содержанием li, при этом в начале списка
    todoList.insertAdjacentHTML('afterbegin', newToDo)

    // После этого очищаем поле ввода 
    input.value=''
    
    // Сохраняет фокус на поле ввода
    input.focus()

    // Вызываем функцию когда срабатывает функция при отправке формы и добавлении на страницу нового элемента
    toggleDefaultListItem();

    // Сохраняем в ЛС при добавлении элемента
    saveData()
}) 


// Создаем функцию которая отвечает за переключение элемента li который стоит по умолчанию
function toggleDefaultListItem() {

    // Если в списке дел количество дочерних элементов больше единицы
    if (todoList.children.length > 1) {

        // То применяем к нашему элементу ли который стоит по умолчанию стиль display: none, который скрывает элемент, но не удаляет из кода
        document.querySelector('.default').style.display = "none";
        console.log('hide')

      // Иначе стиль остается display: flex     
    } else {
        document.querySelector('.default').style.display = 'flex';
        console.log('show')
    }
}

// Создаем событие, в котором прослушиваем клик в нашем списке дел
todoList.addEventListener('click', function(event) {

    // Затем проверяем если при нашем событии event мы кликаем и попадаем на элемент с атрибутом data-action и его значение совпадает со значением delete  
    if(event.target.getAttribute('data-action') == 'delete') {

        // Тогда находим ближайщий родительский элемент и удаляем его
        event.target.closest('.new-To-Do').remove()

        // Также добавляем функцию проверки на количество записей li при удалении
        toggleDefaultListItem()

      // Иначе если при нашем событии event мы кликаем и попадаем на элемент с атрибутом data-action и его значение совпадает со значением ready
    } else if (event.target.getAttribute('data-action') == 'ready') {

        // Тогда создаем переменную где получаем доступ к ближайшему родительскому элементу и в нем находим по селектору span
        let textContent = event.target.closest('.new-To-Do')
        textContent.querySelector('.text-content')

        // Которому добавляем класс ready, в результате чего срабатывает правило из CSS, которое зачеркивает текст
        textContent.classList.add('ready')

        // В теге ul наш элемент li после нажатия кнопки готово перемещаем в конец
        todoList.insertAdjacentElement('beforeend', textContent)
    }

    //Сохраняем в ЛС при нажатии кнопок
    saveData()  
})

// Создаем функцию которая сохраняет все введенные нами данные
function saveData() {
    // Сохраняет их как todoItem из нашего списка ul
    localStorage.setItem('todoItem', todoList.innerHTML)
}

// Создаем функцию которая загружает данные из хранилища 
function loadData() {
    // Проверяет есть ли данные в хранилище
    if (localStorage.getItem('todoItem')) {
        // Если данные есть то в наш список ul помещаем данные из этого хранилища
        todoList.innerHTML = localStorage.getItem('todoItem')
    }
}
