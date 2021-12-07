const { isNumber } = require('../../Utils');

const __isConstructable = Symbol('isHealthConstructable');

class Health {
  constructor(value, _full, _isConstructable) {
    if (!isNumber(value)) {
      throw new Error('Health value must be a number');
    }

    if (_full !== undefined && _isConstructable !== __isConstructable) {
      throw new Error('Parameter "_full" is only for private use');
    }

    this._value = value;
    this._full = isNumber(_full) ? _full : value;
  }

  damage(damage) {
    return new Health(this._value - damage, this._full, __isConstructable);
  }

  get value() {
    return this._value;
  }

  get full() {
    return this._full;
  }
}

module.exports = Health;
