export class Color {
  r: number = 255;
  g: number = 255;
  b: number = 255;
  a: number = 255;

  constructor(
    r: number = 255,
    g: number = 255,
    b: number = 255,
    a: number = 255
  ) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  tostyle() {
    return `rgba(${this.r},${this.g},${this.b},${this.a})`;
  }
}

export class Vec2 {
  x: number = 0;
  y: number = 0;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  add(dir: Vec2): Vec2 {
    this.x += dir.x;
    this.y += dir.y;
    return this;
  }
}

export class Dimensions {
  w: number = 0;
  h: number = 0;

  constructor(w = 0, h = 0) {
    this.w = w;
    this.h = h;
  }
}
