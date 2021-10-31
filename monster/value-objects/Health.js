class Health {
  min = 100;
  max = 100_000;

  constructor(value) {
    if (value < this.min || value > this.max) {
      throw new Error("Invalid health value");
    }

    this._value = value;
  }

  damage(damage) {
    return new Health(this._value - damage);
  }

  get value() {
    return this._value;
  }
}

module.exports = Health;
