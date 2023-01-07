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
    if(window.event.keyCode===13 && todoInput.value.trim() !=='') {
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

const weatherDataActive = function ({location,weather}) {
    console.log(weather);
    const locationNameTag=document.querySelector('#location-name-tag');
    locationNameTag.textContent = location;
    document.body.style.backgroundImage=`url('./images/${weather}.jpg')`;
}

const weatherSearch = function(latitude,longitude) {
    // JSON.parse는 헤더가 있으면 동작하지않음 , body있을떄만 사용가능
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=e4d1ef5b35eb2d501c5da5d378e6d904`)
        .then((res) => {
            return res.json();
        }).then( (json) => {
            const weatherData = {
                location:json.name,
                weather:json.weather[0].main
            }
            weatherDataActive(weatherData);
        })
        .catch( (err) => {
            console.error(err);
        })
}

//{coords} 는 구조분해 할당 한거임 원래 들어오는 객체 안에 coords 객체가 있는데 그냥 바로 받음!!!
const accessToGeo = function({coords}) {

    //구조분해할당 함
    const {latitude, longitude} = coords

    //객체 안에 키와 값이 똑같으면 값 생략가능!!!
    // shorthand property 라고 부름
    const positionObj = {
        latitude,
        longitude
    }

    // const positionObj= {
    //     latitude : position.coords.latitude,
    //     longitude : position.coords.longitude
    // }

    console.log(positionObj);
    weatherSearch(latitude,longitude);
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

// 구조분해할당, spared 연산자

// 객체 완전 복사 방법
// obj이라는 객체가 있다고 할떄 완전 복사하려면 let copyObj = {...obj} 로 복사하면
// copyObj 안에 속성 값 변경하여도 원본은 바뀌지않음
// !! 하지만 obj 안에 필드에 또 다른 객체가 있을 경우 그 값은 완전복사가 되지 않음

// 얕은복사, 깊은 복사가 있음
// 얕은 복사는 주소값 까지만 복사
// 깊은 복사는 데이터 값 까지도 복사
// 깊은 복사하려면 const copy = JSON.stringify(origin) 하고 난뒤 const deepCopy = JSON.parse(copy) 로 하면 된다.


// Rest 파라미터
// const {필드1,필드2, ...rest} = origin
// 위를 진행하면 rest에는 origin에서 필드1, 필드2 를 제외한 나머지 필드를 가진 객체로 만들어짐 (rest는 나머지란 뜻)
//rest일 필요는 없다, 객체 이름을 원하는대로 지정







