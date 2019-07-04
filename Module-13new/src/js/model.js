export default class Model {
    constructor() {
      this.url =
        "http://api.linkpreview.net/?key=5d0a4f2789c534b287f908bc71183ecd837b69d417c1a&q=";
      this.linkAlredyExists = false;
      this.linkURL = null;
      this.resArr = [];
      this.linkValidator = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    }
    deleteCardFromArr(id) {
      const deletedLink = id.previousElementSibling.href;
      this.resArr = this.resArr.filter(el => el.url !== deletedLink);
      // const indOfDelCard = array.forEach(el => {
      //   if (el.url === deletedLink) {
      //     array.splice(array.indexOf(el), 1);
      //   }
      // });
      console.log(this.resArr);
      localStorage.setItem("wasOpened", JSON.stringify(this.resArr));
    }
    addCardToArr(value) {
      return fetch(this.url + value)
        .then(res => {
          if (res.ok) return res.json();
          throw new Error("here is an error", error);
        })
        .then(data => {
          if (this.linkAlredyExists) {
            return;
          }
          if (this.linkValidator.test(value)) {
            console.log(data);
            this.resArr.push(data);
            console.log(this.resArr);
            localStorage.setItem("wasOpened", JSON.stringify(this.resArr));
            return data;
            // console.log(this.resArr);
          }
        });
    }
    checkIfLinkAlreadyExists(target) {
      this.linkURL = Array.from(document.querySelectorAll(".url-link"));
      console.log(this.linkURL);
      console.log(target);
      this.linkURL.some(el => {
        if (el.href === target) {
          console.log("yep");
          this.linkAlredyExists = true;
        }
      });
      this.linkURL.every(el => {
        if (el.href !== target) {
          console.log("nope");
          this.linkAlredyExists = false;
        }
      });
      if (this.linkURL.length === 0) {
        console.log("here we go");
        this.linkAlredyExists = false;
      }
      console.log(this.linkAlredyExists);
      return this.linkAlredyExists;
    }
    ifLocalStorage() {
      const check = localStorage.getItem("wasOpened");
      const checkToObj = JSON.parse(check);
      console.log(checkToObj);
      if (check) {
        if (checkToObj.length > 0) {
          checkToObj.forEach(el => this.resArr.push(el));
          console.log("resArr", this.resArr);
  
          // this.deleteCard(deleteBtn, this.resArr);
        }
      }else{
        return
      }
      return checkToObj;
    }
  }