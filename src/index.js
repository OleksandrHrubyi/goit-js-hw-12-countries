import './styles.css';
const lodash = require('lodash');

import murkup from '../src/handlTamplate/main.hbs';



const ref = {
    main: document.querySelector('.main'),
    input: document.querySelector('.input'),
    btn: document.querySelector('.btn-del')
}
ref.btn.addEventListener('click', onDel)


ref.input.addEventListener('input', _.debounce(onInput, 500)
)
   


function onInput(event)
{
    
    console.log(event.target.value)
    let name = event.target.value
    
    fetch(`https://restcountries.eu/rest/v2/name/${name}`).then(r => {
    return r.json()
}).then(country => {
    ref.main.insertAdjacentHTML('beforeend', murkup(country))
    console.log(country)
    
})
}


function onDel(){
    location.reload()
}



 