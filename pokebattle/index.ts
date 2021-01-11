import {Move,Attack,Defence,Heal, Stun, Protection} from "./Move";
import {Pokemon} from "./Pokemon";
import {Battle} from "./Battle"

const thunderShock = new Attack("Eclair",40,"Electric");
const quickAttack = new Attack("Attaque éclair",40,"Normal");
const potion = new Heal("Potion",35);
const sweetKiss = new Stun("Doux Baiser",1);
const vineWhip = new Attack("Fouet Lianes",45,"Grass");
const tackle = new Attack("Charge",40,"Normal");
const growl = new Protection("Rugissement",1);

var pikachu = new Pokemon("Pikachu","Electric",[thunderShock,quickAttack,sweetKiss,potion]);
var bulbasaur = new Pokemon("Bulbizarre","Grass",[vineWhip,tackle,growl,potion]);

let battle1 = new Battle(pikachu,bulbasaur);

battle1.throws(quickAttack);
battle1.throws(potion);
battle1.throws(sweetKiss);
battle1.throws(quickAttack);
battle1.throws(growl);
battle1.throws(thunderShock);
battle1.throws(vineWhip);



