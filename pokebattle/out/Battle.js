"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Battle = void 0;
const Move_1 = require("./Move");
class Battle {
    constructor(pokemon1, pokemon2) {
        this.turn = [true];
        this.action = true;
        this.isOver = false;
        this.player1 = { pokemon: pokemon1, pv: pokemon1.getPv() };
        //this.pokemon1.pokemon = player1;
        //this.pokemon1.pv= player1.getPv();
        this.player2 = { pokemon: pokemon2, pv: pokemon2.getPv() };
        //this.pokemon2.pokemon = player2;
        //this.pokemon2.pv= player2.getPv();
        console.log(`Au tour de ${pokemon1.name}.`);
        this.currentPlayer = {
            current: {
                pokemon: this.player1.pokemon,
                pv: this.player1.pv
            },
            opponent: {
                pokemon: this.player2.pokemon,
                pv: this.player2.pv
            }
        };
    }
    whosTurn(actualTurn) {
        if (actualTurn.length === 1) {
            if (actualTurn[0] === false) {
                this.player2.pv = this.currentPlayer.current.pv;
                this.player1.pv = this.currentPlayer.opponent.pv;
                if (this.anyKO()) {
                    return this.anyKO;
                }
                else {
                    this.currentPlayer.current = { pokemon: this.player1.pokemon, pv: this.player1.pv };
                    this.currentPlayer.opponent = { pokemon: this.player2.pokemon, pv: this.player2.pv };
                    this.turn.push(true);
                }
            }
            else {
                this.player1.pv = this.currentPlayer.current.pv;
                this.player2.pv = this.currentPlayer.opponent.pv;
                if (this.anyKO()) {
                    return this.anyKO;
                }
                else {
                    this.currentPlayer.current = { pokemon: this.player2.pokemon, pv: this.player2.pv };
                    this.currentPlayer.opponent = { pokemon: this.player1.pokemon, pv: this.player1.pv };
                    this.turn.push(false);
                }
            }
        }
        ;
        this.turn.shift();
        console.log(`Au tour de ${this.currentPlayer.current.pokemon.name}.`);
        return this.currentPlayer;
    }
    anyKO() {
        if ((this.player1.pv <= 0) || (this.player2.pv <= 0)) {
            if (this.player1.pv <= 0) {
                console.log(`${this.player1.pokemon.name} est KO. ${this.player2.pokemon.name} gagne.`);
            }
            else {
                console.log(`${this.player2.pokemon.name} est KO. ${this.player1.pokemon.name} gagne.`);
            }
            return this.isOver = true;
        }
        else {
            return this.isOver = false;
        }
    }
    throws(move) {
        if (this.isOver) {
            console.log(`Fin de la partie`);
        }
        else {
            console.log(`${this.currentPlayer.current.pokemon.name} lance `);
            this.moveActsAs(move);
            this.whosTurn(this.turn);
        }
    }
    moveActsAs(move) {
        let impact;
        if (move instanceof Move_1.Protection) {
            this.action = false;
            move.moveDoes();
        }
        else {
            if (move instanceof Move_1.Stun) {
                this.action = true;
                move.moveDoes(this.currentPlayer.opponent).forEach(i => this.turn.push(this.turn[this.turn.length - 1]));
            }
            else if (move instanceof Move_1.Attack) {
                if (this.action === true) {
                    impact = move.moveDoes(this.currentPlayer.current, this.currentPlayer.opponent);
                }
                else {
                    console.log(`${this.currentPlayer.opponent.pokemon.name} n'a pas été affecté par ${move.name}`);
                }
                this.currentPlayer.opponent.pv -= impact;
            }
            else if (move instanceof Move_1.Heal) {
                impact = move.moveDoes(this.currentPlayer.current);
                this.currentPlayer.current.pv += impact;
            }
            ;
            this.action = true;
        }
        ;
        return this.action;
    }
}
exports.Battle = Battle;
//# sourceMappingURL=Battle.js.map