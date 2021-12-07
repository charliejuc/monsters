const { isNumber } = require('../../Utils');

class Attack {
  constructor(value) {
    if (!isNumber(value)) {
      throw new TypeError('Attack value must be a number');
    }

    this._value = value;
  }

  get value() {
    return this._value;
  }
}

module.exports = Attack;
