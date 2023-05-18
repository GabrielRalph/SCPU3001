import {SvgPlus} from "../SvgPlus/4.js"

const powerin = `<svg viewBox="0 0 53.9 53.9" style="enable-background:new 0 0 53.9 53.9;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#3B90E4;}
	.st1{fill:none;stroke:#FFFFFF;stroke-width:3;stroke-linecap:square;stroke-miterlimit:10;}
</style>
<g>
	<circle class="st0" cx="26.9" cy="26.9" r="21.7"/>
	<g>
		<g>
			<line class="st1" x1="17.8" y1="23" x2="21.2" y2="18.1"/>
			<line class="st1" x1="36.5" y1="23" x2="33" y2="18.1"/>
		</g>
		<line class="st1" x1="27.1" y1="32.6" x2="27.1" y2="39.2"/>
	</g>
</g>
</svg>`

function toWatts(num) {
  let unit = "W";
  num = Math.round(num/10) * 10;
  if (num > 1e3) {
    num = num/1e3;
    unit = "kW";
  }
  return num + unit;
}
function toPercent(num){
  return Math.round(num*100) + "%";
}

class Device extends SvgPlus {
  constructor(device, total) {
    super("div");
    if (!device.iconName) device.iconName = "Assets/power-in.svg";
    else if (device.iconName === "in") device.iconName = "Assets/power-out.svg";
    this.device = device;
    this.class = "device";
    this.icon = this.createChild("div", {content: powerin, class: "icon"});
    this.middle = this.createChild("div", {content: `<em>${toPercent(device.usage/total)}</em>${device.name}`});
    this.end = this.createChild("div");
    this.end.createChild("b", {content: `<b>${toWatts(device.usage)}</b>`});
    this.switch = this.end.createChild("div", {class: "switch", content: "<div></div>"});
    this.switch.onclick = () => this.toggleSwitch();
    this.switch.toggleAttribute("selected", !!device.on)
    this.end.toggleAttribute("selected", !!device.on)
  }

  toggleSwitch() {
    this.device.on = !this.device.on;
    this.switch.toggleAttribute("selected", this.device.on);
    this.end.toggleAttribute("selected", this.device.on);
  }
}

class DeviceList extends SvgPlus {
  constructor(el){
    super(el);
    this.devices = [];
  }

  render(){
    let {devices} = this;
    let total = 0;
    for (let device of devices) {
      total += device.usage;
    }

    let div = new DocumentFragment();
    for (let device of devices) {
      let d = new Device(device, total);
      div.append(d);
    }
    this.innerHTML = "";
    this.appendChild(div);

    // let add = this.createChild("div", {class: "device", style: {"font-size": "1.3em"}});
    // add.createChild("img", {src: "./Assets/add.svg", class: "icon"});
    // add.createChild("div", {content: "Add Device"})
  }


  add(item) {
    this.devices.push(item);
    this.render();
  }
}

SvgPlus.defineHTMLElement(DeviceList);
