const Health = require('./valueObjects/Health');
const Attack = require('./valueObjects/Attack');
const Defense = require('./valueObjects/Defense');
const { isNumber } = require('../Utils');

class Monster {
  // ???: id
  constructor({ health, attack, defense }) {
    if (!(health instanceof Health && attack instanceof Attack && defense instanceof Defense)) {
      throw new Error('Invalid constructor params');
    }

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
      ...this.values,
      health: this.attributes.health.full,
    });

    this._totalPoints = values.reduce((acc, value) => acc + value);

    return this._totalPoints;
  }

  _areValidPoints() {
    const values = Object.values(this.values);

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

  get attributes() {
    return {
      health: this._health,
      attack: this._attack,
      defense: this._defense,
    };
  }

  get values() {
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
}

const monster = new Monster({
  health: new Health(500),
  attack: new Attack(200),
  defense: new Defense(200),
});

const monster2 = new Monster({
  health: new Health(400),
  attack: new Attack(250),
  defense: new Defense(200),
});

console.log(monster);

console.log(monster.attack(monster2));

const maxMonster = Monster.maxPoints(monster, monster2);

module.exports = Monster;
