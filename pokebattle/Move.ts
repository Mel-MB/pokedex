import {Pokemon} from "./Pokemon"

    export class Move {
        readonly name: string;
        protected power: number;
        protected impact: number;

        constructor (name: string, power: number){
            this.name = name;
            this.power = power;
            this.impact = power;
        }

    }
    export class Attack extends Move {
        readonly type: string;
    
        constructor (name: string, power: number, type: string){
            super(name, power);
            this.type= type;
        }
        moveDoes(throwingPokemon: {pokemon: Pokemon, pv: number}, opponent: {pokemon: Pokemon, pv: number}){
            if (this.type == (throwingPokemon.pokemon as Pokemon).type) {
                this.impact = this.power *= 1.5;
            }
            console.log(`${this.name}: ${(opponent.pokemon as Pokemon).name} -${this.impact} PV.`);
            return this.power;
        }

    }
    export class Heal extends Move {
        constructor (name: string, power: number){
            super(name, power);
        }
        moveDoes(throwingPokemon: {pokemon: Pokemon, pv: number}){
            console.log(`${this.name}: ${(throwingPokemon.pokemon as Pokemon).name} +${this.impact} PV.`);
            return this.power;
        }
    }
    export class Defence extends Move {

    } 
    export class Stun extends Defence {
        moveDoes(opponent: {pokemon: Pokemon, pv: number}) {
            console.log(`${this.name}: ${(opponent.pokemon as Pokemon).name} est paralysé pour ${this.impact} tours.`);
            return this.skipTurn();
        }
        skipTurn() {
            let skip: Array<boolean> = [];
            while (this.power !== 0){
                skip.push(null);
                this.power --;
            };
            return skip;
        }
    }
    export class Protection extends Defence {
        moveDoes() {
            console.log(`${this.name}, il sera protègé au prochain tour.`);
        }
    }

    