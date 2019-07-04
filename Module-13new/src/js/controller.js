export default class Controller {
    constructor(model, view) {
      this.model = model;
      this.view = view;
      this.link = null;
      this.view.eventListeners();
      view.on("add", this.addCard.bind(this));
      view.on("delete", this.deleteCard.bind(this));
      view.on("checkIfExists", this.checkIfExists.bind(this));
      view.on("reloading", this.reloading.bind(this));
      window.onload = this.view.onReload();
    }
    deleteCard(id) {
      this.model.deleteCardFromArr(id);
      this.view.deleteCard(id);
      // console.log(this.model.resArr);
    }
    addCard(input) {
      console.log("input", input);
      this.model
        .addCardToArr(input)
        .then(item => {
          if (this.link) {
            this.view.handleExists();
            return;
          }
          this.view.creatingCards(this.view.urlHolder, item, this.view.box);
        })
        .then(res => {
          this.view.deleteBtn = document.querySelector(".delete-btn");
          this.view.removeCardListener(this.view.deleteBtn);
        });
    }
    checkIfExists(value) {
      this.link = this.model.checkIfLinkAlreadyExists(value);
    }
    deleteCard(value) {
      this.model.deleteCardFromArr(value);
      this.view.deleteCard(value);
    }
    reloading() {
      const locStor = this.model.ifLocalStorage();
      console.log(locStor);
      if (locStor) {
        this.view.creatingCards(
          this.view.urlHolderderForLists,
          locStor,
          this.view.box
        );
        this.view.reloading();
      }
    }
  }