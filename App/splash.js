import {SvgPlus} from "../SvgPlus/4.js"

async function nextFrame(){
  return new Promise((resolve, reject) => {
    window.requestAnimationFrame((t) => {
      resolve(t);
    })
  });
}

class SplashScreen extends SvgPlus {


  async onconnect(){
    let title = this.createChild("div");
    let h1 = title.createChild("h1", {content: "Xenily"})
    let angle = 0;
    let c1 = "var(--main-c)";
    let c2 = "white";
    let max = 80;
    let next = (t) => {
      let a = (1 + Math.sin(t/ 800)) / 2;
      angle = a * 2 * max - max;
      this.gradient = {angle, c1, c2};
      h1.styles = {"transform": `scale(${1 + a})`};
    }

    setTimeout(()=>this.onclick(), 3000);
    while(!this.stop) {
      next(await nextFrame());
    }
  }

  async onclick(){
    await this.waveTransition((a) => {this.styles = {opacity: a}}, 500, false);
    this.stop;
    this.remove();
  }


  set gradient(g) {
    this.styles = {
      "background-image": `linear-gradient(${g.angle}deg, ${g.c1}, ${g.c2})`
    }
  }
}

SvgPlus.defineHTMLElement(SplashScreen)
