const list = document.getElementById("ft_list")
let TodoList = []

function createTodo(text) {
    const element = document.createElement('div')
    element.classList.add('todo')
    element.innerHTML = `<p>${text}</p><button onclick="remove('${text}')">Delete</button>`
    return element;
}

function render() {
    list.innerHTML = ''
    TodoList.forEach(item => {
        list.appendChild(createTodo(item))
    })
}

function saveCookies() {
    document.cookie = `todos=${encodeURIComponent(JSON.stringify(TodoList))}; path=/`
}

function loadCookies() {
    const cookies = document.cookie.split('; ')
    const todoCookie = cookies.find(row => row.startsWith('todos='))
    if (todoCookie) {
        try {
            TodoList = JSON.parse(decodeURIComponent(todoCookie.split('=')[1]))
        } catch (e) {
            TodoList = []
        }
    }
}

function newTodo() {
    let name = prompt("Name the todo.")
    if (name && name.trim().length > 0) {
        TodoList.unshift(name.trim())
        saveCookies()
        render()
    }
}

function remove(text) {
    if (confirm('Are you sure to remove?')) {
        TodoList = TodoList.filter(item => item !== text)
        saveCookies()
        render()
    }
}

window.onload = function () {
    loadCookies()
    render()
}
