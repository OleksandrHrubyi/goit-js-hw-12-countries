import './styles.css';
import { input, btn } from './js/refs';
import { onDel, onInput } from './js/functions';
const lodash = require('lodash');

btn.addEventListener('click', onDel);
input.addEventListener('input', _.debounce(onInput, 500));

