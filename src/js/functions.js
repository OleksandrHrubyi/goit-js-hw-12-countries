import markup from '../handlTamplate/main.hbs';
import remarkup from '../handlTamplate/list.hbs';
import { error } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import * as Confirm from "@pnotify/confirm";
import "@pnotify/confirm/dist/PNotifyConfirm.css";
import { main, input, btn } from './refs';

let counter = 0;
const mainHref = 'https://restcountries.eu/rest';





export const onInput = function (event)
{
    let name = event.target.value.trim();
   
    
    if (name.length === 0)
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
        };
        return;
    };
        
};




export const onDel = function() {
    clear();
}



export const render = function (country) {
    
    if (country.length === 1)
    {
        main.insertAdjacentHTML('beforeend', markup(country));
        counter += 1;
        return;
    }
   

    else if (country.length <= 10 && country.length > 1)
    {
        main.insertAdjacentHTML('beforeend', remarkup(country));
        return;
    }
    

   else if (country.length > 10)
    {
        errorTooManySearching();
        return;
    }
    
    else
    {
        errorNotFound();
        return;
          
    }
   
}
 


export const clear = function ()
{
    main.innerHTML = "";
    counter = 0;
    input.value = "";
}







export const errorNotFound = function () {
  error({
    text:
          "Sorry, we cant find your country. Please try again",
      
    modules: new Map([
      [
        Confirm,
        {
          confirm: true,
          buttons: [
            {
              text: "Ok",
              primary: true,
              click: notice => {
                notice.close();
              }
            }
          ]
        }
      ]
    ])
  });
}

export const errorTooManySearching = function () {
  error({
    text:
      "Sorry, too many matches found. Please enter a more specific query.",
    modules: new Map([
      [
        Confirm,
        {
          confirm: true,
          buttons: [
            {
              text: "Ok",
              primary: true,
              click: notice => {
                notice.close();
              }
            }
          ]
        }
      ]
    ])
  });
}
