import './styles.css';

import murkup from '../src/handlTamplate/main.hbs';



const ref = {
    main: document.querySelector('.main')
}
   

fetch('https://restcountries.eu/rest/v2/name/france').then(r => {
    return r.json()
}).then(country => {
    ref.main.insertAdjacentHTML('beforeend', murkup(country))
    console.log(country)
    
})



