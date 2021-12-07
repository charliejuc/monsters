class Name {
  constructor(value) {
    if (typeof value !== 'string') {
      throw new TypeError('Value must be a string');
    }

    this._value = value;
  }

  get value() {
    return this._value;
  }
}

module.exports = Name;
