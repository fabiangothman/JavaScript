class Point {
  constructor(azimuth, center, radius) {
    this.blobCenter = center;
    this.blobRadius = radius;

    this.azimuth = Math.PI - azimuth;
    this._components = {
      x: Math.cos(this.azimuth),
      y: Math.sin(this.azimuth),
    };
    this.progress = Math.random() * 2 * Math.PI;
    this.targetSpeed = Math.random() * 0.8 + 0.8;
    this.speed = this.targetSpeed;
    this.amplitude = 0.1;
  }

  update(delta) {
    if (Math.abs(this.speed) > this.targetSpeed) {
      if (this.speed < 0) {
        this.speed += delta * 5;
      } else {
        this.speed -= delta * 5;
      }
    }

    this.radialEffect =
      Math.sin(this.progress) * this.getRadius() * this.amplitude;
  }

  getRadius() {
    return this.blobRadius * (1 - this.amplitude / 2);
  }

  solveWith(leftPoint, rightPoint, delta) {
    this.progress += this.speed * delta;
    this.update(delta);
  }

  get position() {
    return {
      x:
        this.blobCenter.x +
        this.components.x * (this.getRadius() + this.radialEffect),
      y:
        this.blobCenter.y +
        this.components.y * (this.getRadius() + this.radialEffect),
    };
  }

  get components() {
    return this._components;
  }
}

export default Point;
