export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    view.on("add", this.addCard.bind(this));
    view.on("remove", this.removeCard.bind(this));
    this.model.updateLocStor();
    this.view.updateViwe(this.model.cards); //отрисовывает закладки при загрузке
  }

  addCard(input) {
    if (this.model.isNotCorect(input)) {
      this.view.addCard(this.model.isNotCorect(input));
    } else {
      this.model.addCard(input).then(cards => this.view.addCard(cards));
    }
  }
  removeCard(curentURL) {
    this.view.updateViwe(this.model.removeCard(curentURL));
  }
}