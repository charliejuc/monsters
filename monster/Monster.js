const Health = require("./value-objects/Health");
const Attack = require("./value-objects/Attack");
const Defense = require("./value-objects/Defense");

class Monster {
  // ???: id
  constructor({ health, attack, defense }) {
    if (
      !(
        health instanceof Health &&
        attack instanceof Attack &&
        defense instanceof Defense
      )
    ) {
      throw new Error("Invalid constructor params");
    }

    this._health = health;
    this._attack = attack;
    this._defense = defense;
  }

  get attibutes() {
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

  attack(monster) {
    const updatedHealth = this._health.damage(monster.values.attack);

    return new Monster({
      ...this.attibutes,
      health: updatedHealth,
    });
  }
}

const monster = new Monster({
  health: new Health(500),
  attack: new Attack(100),
  defense: new Defense(100),
});

console.log(monster);

console.log(monster.attack(monster));

module.exports = Monster;
