import EventEmitter from "../helper/eventEmitter.js";

export default class View extends EventEmitter {
  constructor() {
    super();
    this.form = document.querySelector(".main-form");
    this.input = this.form.querySelector("input");
    this.box = document.querySelector(".url-list");
    this.urlHolder = document.querySelector("#url-holder");
    this.urlHolderderForLists = document.querySelector(
      "#url-holder-saved-cards"
    );
    this.deleteBtn = null;
    this.deleteBtns = null;
  }
  creatingCards(input, data, output) {
    const source = input.innerHTML.trim();
    console.log(source);
    const template = Handlebars.compile(source);
    const res = template(data);
    output.insertAdjacentHTML("afterbegin", res);
  }
  addCard(e) {
    e.preventDefault();
    const inputValue = this.input.value;
    this.emit("add", inputValue);
    this.form.reset();
  }
  deleteCard(id) {
    const elTarget = id.parentNode;
    elTarget.remove();
    this.form.reset();
  }
  removeCard(e) {
    const elem = e.target;
    this.emit("delete", elem);
  }
  removeCardListener(el) {
    el.addEventListener("click", this.removeCard.bind(this));
  }
  onChange(e) {
    const target = e.target.value;
    this.emit("checkIfExists", target);
  }
  handleExists() {
    alert("such link already exists");
    this.form.reset();
  }
  onReload() {
    this.emit('reloading', 'fjfkldfjk')
  }
  reloading(){
    this.deleteBtns = document.querySelectorAll(".delete-btn");
    this.deleteBtns.forEach(el => this.removeCardListener(el));
  }

  eventListeners() {
    this.form.addEventListener("input", this.onChange.bind(this));
    this.form.addEventListener("submit", this.addCard.bind(this));
    
  }
}