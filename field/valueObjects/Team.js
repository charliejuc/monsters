class Team {
  constructor(value) {
    if (Array.isArray(value)) {
      throw new TypeError('Team must be an array');
    }

    this._value = value;
  }

  get value() {
    return this._value;
  }
}

module.exports = Team;
