import Point from "./Point.js";
export default class DifferentialFunction {
  constructor(start_color, end_color) {
    this.start_color = start_color;
    this.end_color = end_color;
  }
  getFunction = (index, size) => {
    return (x) => {
      const point = new Point(Math.round(100 / (size - 1) * index), this.start_color);
      const point_bis = new Point(Math.round(100 / (size - 1) * (index + 1)), this.end_color);
      const m = (point_bis.y - point.y) / (point_bis.x - point.x);
      const b = Math.round(point_bis.y - m * point_bis.x);
      return m * x + b;
    }
  }
}
