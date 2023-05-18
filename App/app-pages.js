import {SvgPlus} from "../SvgPlus/4.js"


class AppPages extends SvgPlus {
  constructor(el){
    super(el);
    this.pages = {};
  }

  onconnect(){
    let idx = 0;
    for (let child of this.children) {
      let value = child.getAttribute("value");
      this.pages[value] = child;
      child.index = idx;
      idx += 1;
    }
    this.innerHTML = "";
    this.rel = this.createChild("div", {
      styles: {
        position: "relative",
        width: "100%",
        height: "100%"
      }
    })
    if (this._value) this.value = this._value;
  }

  set value(value){
    this._value = value;
    if (value in this.pages) {
      this.page = this.pages[value];
      this.rel.appendChild(this.pages[value]);
    }
  }
  get value(){return this._value;}

  async moveTo(page) {
    if (this.moving || !(page in this.pages) || (this.value == page)) {return false}
    this.moving = true;
    this._value = page;
    let nextPage = this.pages[page];
    let oldPage = this.page;

    let dir = nextPage.index > oldPage.index ? 1 : -1;
    nextPage.style.setProperty("left", `${dir * 100}%`);
    this.rel.appendChild(nextPage);
    await this.waveTransition((a) => {
      oldPage.style.setProperty("left", `${-1 * dir * a*100}%`);
      nextPage.style.setProperty("left", `${dir * (1 - a)*100}%`);
    }, 400, true)
    oldPage.remove();
    this.page = nextPage;
    this.moving = false;
    return true;
  }

  static get observedAttributes(){return ["value"]}
}

SvgPlus.defineHTMLElement(AppPages)
