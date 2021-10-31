class Attack {
  min = 100;
  max = 100_000;

  constructor(value) {
    if (value < this.min || value > this.max) {
      throw new Error("Invalid attack value");
    }

    this._value = value;
  }

  get value() {
    return this._value;
  }
}

module.exports = Attack;
