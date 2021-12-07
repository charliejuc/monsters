const { isNumber } = require('../../Utils');

class Defense {
  constructor(value) {
    if (!isNumber(value)) {
      throw new Error('Defense value must be a number');
    }

    this._value = value;
  }

  get value() {
    return this._value;
  }
}

module.exports = Defense;
