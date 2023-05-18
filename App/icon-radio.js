import {SvgPlus} from "../SvgPlus/4.js"

class BarIcon extends SvgPlus {
  constructor(){
    super("div");
    this.class = "bar-icon";
    this.createChild("div");
  }

  async fade(inout){
    await this.waveTransition((a) => {
      this.styles = {
        opacity: a
      }
    }, 150, inout)
  }
}

class IconRadio extends SvgPlus {
  onconnect(){
    let barIcon = new BarIcon();
    for (let child of this.children) {
      let sfun = async (e) => {
        e.preventDefault();
        if (this.selectionHandler(child)) {
          await barIcon.fade(false);
          child.appendChild(barIcon);
          await barIcon.fade(true);
        }
      }
      child.ontouchstart = sfun;
      child.onclick = sfun;
    }
    this.children[0].appendChild(barIcon);
  }

  selectionHandler(child){
    const event = new Event("change");
    event.value = child.getAttribute("value");
    this.dispatchEvent(event);
    console.log(event);
    console.log(event.stop);
    return !event.stop;
  }
}

SvgPlus.defineHTMLElement(IconRadio)
