import Color from "../beans/Color.js"
import DifferentialFunction from "../beans/DifferentialFunction.js"
export default class Spectrum {
  constructor(...colors) {
    this.colors = [];
    this.differentialFunctions = [];
    console.log(colors);
    if (colors.length >= 2) {
      for (const c in colors) {
        if (typeof colors[c] == 'string') {
          const tmp_color = this._hexToRgb(colors[c]);
          if (tmp_color) {
            this.colors.push(new Color(tmp_color.r, tmp_color.g, tmp_color.b));
          } else {
            console.log("Invalid parameters")
            this.colors.push(new Color(0, 0, 0));
            this.colors.push(new Color(0, 0, 0));
          }
        } else if (typeof colors[c] == 'object') {
          if (colors[c].hasOwnProperty("r") && colors[c].hasOwnProperty("g") && colors[c].hasOwnProperty("b")) {
            this.colors.push(new Color(colors[c].r, colors[c].g, colors[c].b));
          }
        }
      }
      if (this.colors.length < 2) {
        console.log("Invalid parameters")
        this.colors.push(new Color(0, 0, 0));
        this.colors.push(new Color(0, 0, 0));
      }
    } else {
      console.log("Invalid parameters")
      this.colors.push(new Color(0, 0, 0));
      this.colors.push(new Color(0, 0, 0));
    }

    this.setDifferentialFunctions();
  }

  properties() {
    console.log("*********************");
    console.log("*  ");

    console.log("*  " + this.differentialFunctions.length + " differential functions");
    console.log("*  " + this.colors.length + " colours");
    for (let i = 0; i < this.colors.length; i++) {
      process.stdout.write("*  ");
      console.log({ r: this.colors[i].r, g: this.colors[i].g, b: this.colors[i].b });
    }
    process.stdout.write("*  ");
    for (let i = 0; i < this.colors.length; i++) {
      process.stdout.write(Math.round(100 / (this.colors.length - 1) * i) + ((i == this.colors.length - 1) ? "" : " => "));
    }
    console.log();
    console.log("*  ");
    console.log("*********************");
    console.log();
    console.log();
  }

  setDifferentialFunctions() {
    for (let i = 0; i <= this.colors.length - 2; i++) {
      const diffR = new DifferentialFunction(this.colors[i].r, (this.colors[i + 1].r)).getFunction(i, this.colors.length);
      const diffG = new DifferentialFunction(this.colors[i].g, (this.colors[i + 1].g)).getFunction(i, this.colors.length);
      const diffB = new DifferentialFunction(this.colors[i].b, (this.colors[i + 1].b)).getFunction(i, this.colors.length);
      this.differentialFunctions.push({
        d_r: diffR,
        d_g: diffG,
        d_b: diffB,
      });
    }
  }

  getColor(input) {
    if (input < 0) input = 0;
    if (input >= 100) input = 99;
    const step = Math.floor((this.colors.length - 1) * input / 100);
    const new_r = this.differentialFunctions[step].d_r(input);
    const new_g = this.differentialFunctions[step].d_g(input);
    const new_b = this.differentialFunctions[step].d_b(input);
    return new Color(Math.abs(Math.round(new_r)), Math.abs(Math.round(new_g)), Math.abs(Math.round(new_b)));
  }

  _hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
}
