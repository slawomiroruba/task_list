let todoInput //miejsce gdzie użytkownik wpisuje treść zadania
let errorInfo //info o braku zadań / konieczności wpisania tekstu
let addBtn //przycisk ADD - dodaje nowe elementy do listy 
let ulList //lista zadań, tagi ul
let newTodo

let popup
let popupInfo
let todoToEdit
let popupInput
let popupAddBtn
let popupCloseBtn



const main = () => {
    prepareDOMElements()
    prepareDOMEvents()
}

const prepareDOMElements = () => {
    //pobieramy wszystkie elementy
    todoInput = document.querySelector('.todo-input')
    errorInfo = document.querySelector('.error-info')
    addBtn = document.querySelector('.btn-add')
    ulList = document.querySelector('.todolist ul')

    popup = document.querySelector('.popup')
    popupInfo = document.querySelector('.popup-info')
    popupInput = document.querySelector('.popup-input')
    popupAddBtn = document.querySelector('.accept')
    popupCloseBtn = document.querySelector('.cancel')
}

const prepareDOMEvents = () => {
    addBtn.addEventListener('click', addNewTodo)
    ulList.addEventListener('click', checkClick)
    popupCloseBtn.addEventListener('click', closePopup)
    popupAddBtn.addEventListener('click', changeTodoText)
    todoInput.addEventListener('keyup', enterKeyCheck)
}

const addNewTodo = () => {
    if(todoInput.value !== '') {
        newTodo = document.createElement('li')
        newTodo.textContent = todoInput.value;
        newTodo.dataset.id = 'test4'
        newTodo.append(createToolsArea())
        ulList.append(newTodo)
        todoInput.value = ''
        errorInfo.textContent = ''
    } else {
        errorInfo.textContent = 'Wpisz treść zadania!'
    }
}

const createToolsArea = () => {
    let toolsArea = document.createElement('div')
    toolsArea.classList.add('tools')

    let completeBtn = document.createElement('button')
    completeBtn.classList.add('complete')
    completeBtn.innerHTML = '<i class="fas fa-check"></i>'
    
    let editBtn = document.createElement('button')
    editBtn.classList.add('edit')
    editBtn.innerHTML = 'EDIT'
    
    let deleteBtn = document.createElement('button')
    deleteBtn.classList.add('delete')
    deleteBtn.innerHTML = '<i class="fas fa-times"></i>'

    toolsArea.append(completeBtn, editBtn, deleteBtn)
    return toolsArea
}

const checkClick = e => {
    if(e.target.matches('.complete')){
        e.target.closest('li').classList.toggle('completed')
        e.target.classList.toggle('completed')
    } else if(e.target.matches('.edit')) {
        editTodo(e)
    } else if(e.target.matches('.delete')) {
        deleteTodo(e)
    }
}

const editTodo = e => {
    todoToEdit = e.target.closest('li')
    console.log(todoToEdit.firstChild);
    popupInput.value = todoToEdit.firstChild.textContent
    popup.style.display = 'flex';
}

const closePopup = () => {
    popup.style.display = 'none';
    popupInfo.textContent = ''
}

const changeTodoText = () => {
    if(popupInput.value !== ''){
        todoToEdit.firstChild.textContent = popupInput.value
        closePopup()
    } else {
        popupInfo.textContent = 'Wprowadzona wartość nie może być pusta!'
    }
}

const deleteTodo = e => {
    e.target.closest('li').remove()
    if(ulList.querySelectorAll('li').length == 0) {
        errorInfo.textContent = 'Brak zadań na liście.'
    }
}

const enterKeyCheck = e => {
    if(e.key === 'Enter'){
        addNewTodo()
    }
}

document.addEventListener('DOMContentLoaded', main)
