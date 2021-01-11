import {Pokemon} from "./Pokemon";
import {Move,Attack,Defence,Protection,Heal, Stun} from "./Move";

export class Battle {
    private player1: {pokemon: Pokemon, pv: number};
    private player2: {pokemon: Pokemon, pv: number};
    private turn: Array<boolean> = [true];
    private currentPlayer: {current: {pokemon: Pokemon, pv: number}, opponent: {pokemon: Pokemon, pv: number}};
    private action: boolean = true;
    private isOver: boolean = false;

    constructor (pokemon1: Pokemon, pokemon2: Pokemon){
        this.player1= {pokemon: pokemon1, pv: pokemon1.getPv()};
        //this.pokemon1.pokemon = player1;
        //this.pokemon1.pv= player1.getPv();
        this.player2= {pokemon: pokemon2, pv: pokemon2.getPv()};
        //this.pokemon2.pokemon = player2;
        //this.pokemon2.pv= player2.getPv();
        console.log(`Au tour de ${pokemon1.name}.`);
        this.currentPlayer= {
            current: {
                pokemon:this.player1.pokemon,
                pv:this.player1.pv
            },
            opponent: {
                pokemon:this.player2.pokemon,
                pv:this.player2.pv
            }};
    }

    private whosTurn(actualTurn: boolean[]) {
        if (actualTurn.length === 1){
            if (actualTurn[0] === false){
                this.player2.pv = this.currentPlayer.current.pv;
                this.player1.pv = this.currentPlayer.opponent.pv;
                if (this.anyKO()){
                    return this.anyKO;
                }else{
                    this.currentPlayer.current= {pokemon:this.player1.pokemon, pv:this.player1.pv};
                    this.currentPlayer.opponent= {pokemon:this.player2.pokemon, pv:this.player2.pv};
                    this.turn.push(true);
                }
            }else {
                this.player1.pv = this.currentPlayer.current.pv;
                this.player2.pv = this.currentPlayer.opponent.pv;
                if (this.anyKO()){
                    return this.anyKO;
                }else{
                this.currentPlayer.current= {pokemon:this.player2.pokemon, pv:this.player2.pv};
                this.currentPlayer.opponent= {pokemon:this.player1.pokemon, pv:this.player1.pv};
                this.turn.push(false);
                }
            }
        };
        this.turn.shift();
        console.log(`Au tour de ${(this.currentPlayer.current.pokemon as Pokemon).name}.`);
        return this.currentPlayer;
    }
    private anyKO(){
        if((this.player1.pv<=0) || (this.player2.pv <= 0)){
            if(this.player1.pv <= 0){
                console.log(`${this.player1.pokemon.name} est KO. ${this.player2.pokemon.name} gagne.`);
            }else{
                console.log(`${this.player2.pokemon.name} est KO. ${this.player1.pokemon.name} gagne.`);
            }
            return this.isOver = true;

        }else{
            return this.isOver = false;
        }
    }
    throws(move: Move){
            if (this.isOver){
                console.log(`Fin de la partie`);
            }else{
                console.log(`${this.currentPlayer.current.pokemon.name} lance `);
                this.moveActsAs(move);
                this.whosTurn(this.turn);
            }
    }
    private moveActsAs(move: Move){
            let impact: number;
            if (move instanceof Protection) {
                this.action = false;
                (move as Protection).moveDoes();
            }else{
                if (move instanceof Stun){
                    this.action = true;
                    (move as Stun).moveDoes(this.currentPlayer.opponent).forEach(i => this.turn.push(this.turn[this.turn.length - 1]));
                } else if (move instanceof Attack){
                    if (this.action === true){
                        impact = (move as Attack).moveDoes(this.currentPlayer.current,this.currentPlayer.opponent)
                    }else{
                        console.log(`${(this.currentPlayer.opponent.pokemon as Pokemon).name} n'a pas été affecté par ${(move as Attack).name}`);
                    }
                    this.currentPlayer.opponent.pv -= impact;
                } else if (move instanceof Heal) {

                    impact = (move as Heal).moveDoes(this.currentPlayer.current);
                    this.currentPlayer.current.pv += impact;
                };
                this.action = true;
            };    
        return this.action;
    }
}
    


    

    
