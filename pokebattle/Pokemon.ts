import {Move} from "./Move";

export class Pokemon {
    name: string;
    readonly type: string;
    level: number = 1;
    private pv: number;
    readonly knownMoves: Array<Move>;

    constructor (name: string, type: string, knownMoves: Array<Move>) {
        this.name = name;
        this.type = type;
        this.pv =  40 * (this.level*1.5);
        this.knownMoves = knownMoves;
    }

    getPv(){
        return this.pv;
    }
}
