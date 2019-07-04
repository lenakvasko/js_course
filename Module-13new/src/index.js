import View from './js/view.js';
import Model from './js/model.js';
import Controller from './js/controller.js';
import './style.scss';


const view = new View();
const model = new Model();
new Controller(model, view);