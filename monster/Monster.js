const util = require('util');
const Big = require('big.js');
const { isNumber } = require('../Utils');
const MonsterId = require('./valueObjects/MonsterId');
const Name = require('./valueObjects/Name');
const Health = require('./valueObjects/Health');
const Attack = require('./valueObjects/Attack');
const Defense = require('./valueObjects/Defense');

class Monster {
  // ???: id
  constructor({ id, name, health, attack, defense }) {
    if (
      !(
        id instanceof MonsterId &&
        name instanceof Name &&
        health instanceof Health &&
        attack instanceof Attack &&
        defense instanceof Defense
      )
    ) {
      throw new Error('Invalid constructor params');
    }

    this._id = id;
    this._name = name;
    this._health = health;
    this._attack = attack;
    this._defense = defense;

    if (!this._areValidPoints()) {
      throw new Error('Invalid monters points distribution');
    }
  }

  get totalPoints() {
    if (isNumber(this._totalPoints)) {
      return this._totalPoints;
    }

    const values = Object.values({
      ...this.pointsValues,
      health: this._health.full,
    });

    this._totalPoints = values.reduce((acc, value) => acc + value);

    return this._totalPoints;
  }

  _areValidPoints() {
    const values = Object.values(this.pointsValues);

    const average = this.totalPoints / values.length;
    const minValue = Math.floor(average / 2);
    const maxValue = Math.floor(average * 2);

    const areValuesInRange = values.every((value) => value >= minValue && value <= maxValue);

    return areValuesInRange;
  }

  static maxPoints(...monsters) {
    const mockMonster = { totalPoints: 0 };
    const monsterWithMaxPoints = monsters.reduce(
      (monsterWithMaxPoints, monster) =>
        monster.totalPoints > monsterWithMaxPoints.totalPoints ? monster : monsterWithMaxPoints,
      mockMonster
    );

    return monsterWithMaxPoints === mockMonster ? null : monsterWithMaxPoints;
  }

  static adjustMonstersPoints(...monsters) {
    const monsterWithMaxPoints = Monster.maxPoints(...monsters);
    const maxPoints = monsterWithMaxPoints.totalPoints;

    return monsters.map((monster) => {
      const pointsDiff = maxPoints - monster.totalPoints;
      const propertiesToAdjustLength = 3;
      const pointsPerProperty = new Big(pointsDiff).div(propertiesToAdjustLength);

      const values = monster.values;

      const adjustedMonster = new Monster({
        ...monster.attributes,
        health: new Health(Number(new Big(values.health).plus(pointsPerProperty))),
        attack: new Attack(Number(new Big(values.attack).plus(pointsPerProperty))),
        defense: new Defense(Number(new Big(values.defense).plus(pointsPerProperty))),
      });

      console.log(adjustedMonster);

      return adjustedMonster;
    });
  }

  get attributes() {
    return {
      id: this._id,
      name: this._name,
      health: this._health,
      attack: this._attack,
      defense: this._defense,
    };
  }

  get values() {
    return {
      id: this._id.value,
      name: this._name.value,
      health: this._health.value,
      attack: this._attack.value,
      defense: this._defense.value,
    };
  }

  get pointsValues() {
    return {
      health: this._health.value,
      attack: this._attack.value,
      defense: this._defense.value,
    };
  }

  _calculateDamage(monster) {
    const minDamage = 2;
    const damage = this._attack.value - monster.values.defense / 2;

    return Math.max(damage, minDamage);
  }

  attack(monster) {
    const updatedHealth = monster.attributes.health.damage(this._calculateDamage(monster));

    return new Monster({
      ...this.attributes,
      health: updatedHealth,
    });
  }

  toString() {
    return `${this._name.value}. HP: ${this._health.value}, Attack: ${this._attack.value}, Defense: ${this._defense.value}`;
  }

  [util.inspect.custom]() {
    return this.toString();
  }
}

// const monster = new Monster({
//   name: new Name('Totodile'),
//   health: new Health(400),
//   attack: new Attack(210),
//   defense: new Defense(210),
// });

// const monster2 = new Monster({
//   name: new Name('Pikachu'),
//   health: new Health(400),
//   attack: new Attack(250),
//   defense: new Defense(200),
// });

// console.log(monster);

// console.log(monster.attack(monster2));

// console.log(Monster.adjustMonstersPoints(monster, monster2));

module.exports = Monster;
