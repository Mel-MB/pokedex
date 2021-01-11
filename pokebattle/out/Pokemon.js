"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pokemon = void 0;
class Pokemon {
    constructor(name, type, knownMoves) {
        this.level = 1;
        this.name = name;
        this.type = type;
        this.pv = 40 * (this.level * 1.5);
        this.knownMoves = knownMoves;
    }
    getPv() {
        return this.pv;
    }
}
exports.Pokemon = Pokemon;
//# sourceMappingURL=Pokemon.js.map