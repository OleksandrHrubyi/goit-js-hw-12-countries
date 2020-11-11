import { getTimerComponents } from './functions';


export default class CountdownTimer {
    constructor({ selector, targetDate, day, houre, minute, secs }) {

        this.selector = selector;
        this.targetDate = targetDate;
        this.day = day;
        this.houre = houre;
        this.minute = minute;
        this.secs = secs;
        this.timerCounter();
        

        this.valueDays = document.querySelector(`${selector} [data-value="days"]`);
        this.valueHours = document.querySelector(`${selector} [data-value="hours"]`);
        this.valueMinutes = document.querySelector(`${selector} [data-value="mins"]`);
        this.valueSeconds = document.querySelector(`${selector} [data-value="secs"]`);
       
    }


    updateClock({ days, hours, mins, secs }) {
         
    this.valueDays.textContent = `${days}`;
    this.valueHours.textContent = `${hours}`;
    this.valueMinutes.textContent = `${mins}`;
    this.valueSeconds.textContent = `${secs}`;
    };

    
    timerCounter()
    {
        setInterval(() => {
            const currentTime = Date.now();
            const timeLeft = this.targetDate - currentTime;
            const time = getTimerComponents(timeLeft);
            this.updateClock(time);            
        }, 1000)
    };
    
};





