const Monster = require('../monster/Monster');

class Field {
  constructor(firstMonstersTeam, secondMonstersTeam) {
    this._monsters = Monster.adjustMonstersPoints([...firstMonstersTeam, ...secondMonstersTeam]);

    this._firstMonstersTeam = Monster.adjustMonstersPoints(this._monsters);
    this._secondMonstersTeam = Monster.adjustMonstersPoints(this._monsters);
  }

  battle() {}
}
