import './styles.css';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css'
import markup from '../src/handlTamplate/main.hbs';
import remarkup from '../src/handlTamplate/list.hbs';

const lodash = require('lodash');
const {error} = require('@pnotify/core')
const mainHref = 'https://restcountries.eu/rest';
const ref = {
    main: document.querySelector('.js-search'),
    input: document.querySelector('.input-text'),
    btn: document.querySelector('.btn-del'),
}

let counter = 0;


ref.btn.addEventListener('click', onDel)
ref.input.addEventListener('input', _.debounce(onInput, 1000))


function onInput(event)
{
    let name = event.target.value.trim()
   
    
    if(name.length === 0)
    {
        clear();
        return;
      
    }
    else {
        counter += 1;
        if (counter === 1)
        {
            fetch(`${mainHref}/v2/name/${name}`).then(response => {
                return response.json()
            }).then(country => {
                render(country)
            }).catch(clear)
        }
        return
    }
        
}




function onDel(){
   clear()
   }



function render(country) {

  if (country.length === 1)
    {
        ref.main.insertAdjacentHTML('beforeend', markup(country))
        counter += 1
        
        return
    
        }
   

     if (country.length <= 10 && country.length > 1) {
         ref.main.insertAdjacentHTML('beforeend', remarkup(country))
        console.log(country)
       return
    }
    
    
    
      if (country.length > 10) {
            error({
                text: 'to many country',
                type: 'info',
           
            })
         return
      }
    
      else {
           error({
                text: 'Sorry, we can not find your country, please try again',
                type: 'info',
           
            })
         return
          
      }
   
    
  
}
 


function clear()
{
    ref.main.innerHTML = "";
    counter = 0;
    ref.input.value = "";
   
}






