import "./style.scss";
import View from "./js/view.js";
import Model from "./js/model.js";
import Controller from "./js/controller.js";

const view = new View();
const model = new Model();

new Controller(model, view);