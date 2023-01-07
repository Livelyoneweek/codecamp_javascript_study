const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector('#todo-list');

const savedTodoList = JSON.parse(localStorage.getItem('saved-items'));

const creteTodo = function(storageData) {

    let todoContents = todoInput.value;
    if(storageData) {
        todoContents = storageData.contents
    }

    const newLi = document.createElement('li');
    const newSpan = document.createElement('span');
    const newBtn = document.createElement('button');

    

    newBtn.addEventListener('click',() => {
        newLi.classList.toggle('complete')
        saveItemsFn();
    })

    newBtn.addEventListener('dblclick',() => {
        newLi.remove();
        saveItemsFn();
    })

    if(storageData?.complete) {
        newLi.classList.add('complete');
    } 

    newSpan.textContent = todoContents;
    newLi.appendChild(newBtn);
    newLi.appendChild(newSpan);
    todoList.appendChild(newLi);
    todoInput.value='';
    saveItemsFn();
}

const keyCodeCheck = function () {
    if(window.event.keyCode===13 && todoInput.value !=='') {
        creteTodo();
    }
};

const deleteAll = function() {
    const liList = document.querySelectorAll('li')
    for(let i = 0; i<liList.length; i++) {
        liList[i].remove();
    }
    saveItemsFn();
}

const saveItemsFn = function () {
    const saveItems = [];
    
    for(let i =0; i<todoList.children.length; i++) {
        // let todo = todoList.children[i].querySelector('span').textContent;
        let todoObj = {
            contents: todoList.children[i].querySelector('span').textContent,
            complete: todoList.children[i].classList.contains('complete')
        };

        saveItems.push(todoObj);
    }

    saveItems.length === 0 ? 
    localStorage.removeItem('saved-items') : localStorage.setItem('saved-items',JSON.stringify(saveItems));


}
    

if(savedTodoList) {
    for(let i = 0; i<savedTodoList.length; i++) {
        creteTodo(savedTodoList[i])
    }
}

const weatherSearch = function(position) {

    // JSON.parse는 헤더가 있으면 동작하지않음 , body있을떄만 사용가능

    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${position.latitude}&lon=${position.longitude}&appid=e4d1ef5b35eb2d501c5da5d378e6d904`)
        .then((res) => {
            return res.json();
        }).then( (json) => {
            console.log(json.name, json.weather[0].description);
        })
        .catch( (err) => {
            console.error(err);
        })
}

const accessToGeo = function(position) {
    const positionObj= {
        latitude : position.coords.latitude,
        longitude : position.coords.longitude
    }

    console.log(positionObj);
    weatherSearch(positionObj);
}


const askForLocation = function() {
    navigator.geolocation.getCurrentPosition(accessToGeo, (err) => {
        console.log(err);
    })
}

askForLocation();

// const promiseTest = function() {
//     return new Promise((resolver,reject) => {
//         setTimeout(() => {
//             resolver(100);
//             // reject('err');
//         }, 1000);
        
//     });
// }
// promiseTest().then( (res) => {
//     console.log(res);
// } )



