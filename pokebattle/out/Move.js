"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Protection = exports.Stun = exports.Defence = exports.Heal = exports.Attack = exports.Move = void 0;
class Move {
    constructor(name, power) {
        this.name = name;
        this.power = power;
        this.impact = power;
    }
}
exports.Move = Move;
class Attack extends Move {
    constructor(name, power, type) {
        super(name, power);
        this.type = type;
    }
    moveDoes(throwingPokemon, opponent) {
        if (this.type == throwingPokemon.pokemon.type) {
            this.impact = this.power *= 1.5;
        }
        console.log(`${this.name}: ${opponent.pokemon.name} -${this.impact} PV.`);
        return this.power;
    }
}
exports.Attack = Attack;
class Heal extends Move {
    constructor(name, power) {
        super(name, power);
    }
    moveDoes(throwingPokemon) {
        console.log(`${this.name}: ${throwingPokemon.pokemon.name} +${this.impact} PV.`);
        return this.power;
    }
}
exports.Heal = Heal;
class Defence extends Move {
}
exports.Defence = Defence;
class Stun extends Defence {
    moveDoes(opponent) {
        console.log(`${this.name}: ${opponent.pokemon.name} est paralysé pour ${this.impact} tours.`);
        return this.skipTurn();
    }
    skipTurn() {
        let skip = [];
        while (this.power !== 0) {
            skip.push(null);
            this.power--;
        }
        ;
        return skip;
    }
}
exports.Stun = Stun;
class Protection extends Defence {
    moveDoes() {
        console.log(`${this.name}, il sera protègé au prochain tour.`);
    }
}
exports.Protection = Protection;
//# sourceMappingURL=Move.js.map