import EventEmitter from "../helper/eventEmitter.js";

export default class View extends EventEmitter {
  constructor() {
    super();

    (this.form = document.querySelector(".js-form")),
      (this.input = document.querySelector(".input-js")),
      (this.result = document.querySelector(".result-list")),
      (this.popup = document.querySelector("dialog"));
    (this.source = document
      .querySelector("#template-container")
      .innerHTML.trim()),
      this.inputValue,
      (this.template = Handlebars.compile(this.source));

    this.form.addEventListener("submit", this.formSubmitClick.bind(this));
    this.result.addEventListener("click", this.deleteResultClick.bind(this));

    
    this.htmlElement = document.querySelector("html");
    this.htmlElement.addEventListener("click", this.closePopupClick.bind(this));
  }

  closePopupClick({ target }) {
    if (target.nodeName != "DIALOG") {
      this.popup.close();
    }
  }
  showPopupClick(param) {
    if (param == "notCorect") {
      this.popup.childNodes[1].innerHTML = "Не верный формат!";
      this.popup.show();
      return false;
    } else if (param == "haveIt") {
      this.popup.firstChild.nextSibling.innerHTML = "Такая закладка уже существует!";
      this.popup.show();
      return false;
    }
    return true;
  }
  formSubmitClick(evt) {
    evt.preventDefault();
    this.inputValue = this.input.value;
    this.input.value = "";
    this.emit("add", this.inputValue);
  }

  addCard(cards) {
    const isCorectValue = this.showPopupClick(cards);
    if (isCorectValue) this.updateViwe(cards);
  }
  updateViwe(cards) {
    const markup = cards.reduce((acc, el) => (acc += this.template(el)), "");
    this.result.innerHTML = markup;
  }

  deleteResultClick(evt) {
    if (evt.target.nodeName === "BUTTON") {
      //передадим ссылку, которую хотим удалить
      this.emit(
        "remove",
        evt.target.parentNode.firstChild.nextElementSibling.innerHTML
      );
    } else {
      return;
    }
  }
}