import _ from 'lodash';
import img from './assets/1.png'
import './style.css'

console.log(img);
function component() {
    const element = document.createElement('div');
  
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello')
  
    return element;
  }
  
  document.body.appendChild(component());