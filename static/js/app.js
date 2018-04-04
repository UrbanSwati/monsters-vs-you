new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods:{
        startGame: function(){
            this.gameIsRunning = true;
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.turns = [];
        },
        attack: function(){
            let damage = this.calculateDamage(3, 10);
            this.checkTurns(damage, true);
            this.monsterHealth -= damage;

            this.monsterAttacks();

            if(this.checkWin()){
                return;
            }
        },
        specialAttack: function(){
             let damage = this.calculateDamage(10, 20);
             this.monsterHealth -= damage;
            this.checkTurns(damage, true);
            if(this.checkWin()){
                return;
            }
            this.monsterAttacks();

        },
        heal: function(){
            if(this.playerHealth <= 90){
                this.playerHealth += 10;
                this.monsterAttacks();
            }
        },
        giveUp: function(){
            this.gameIsRunning = false;
            this.turns = [];
        },
        monsterAttacks: function(){
       let damage = this.calculateDamage(5, 12);
       this.playerHealth -= damage;
            this.checkTurns(damage, false);
            this.checkWin();
        },
        calculateDamage: function(min, max){
            return Math.max(Math.floor(Math.random() * max) + 1, min)
        },
        checkWin: function(){
            if(this.monsterHealth <= 0){
                if(confirm('You won! New Game?')){
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;

            }else if (this.playerHealth <= 0){
                if(confirm('You lost! New Game?')){
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return false;
            }
        },
        checkTurns(damage, isPlayer ){

            if (isPlayer){
                this.turns.unshift({
                    isPlayer: isPlayer,
                    text: 'Player hits Monster for ' + damage
                });
            }else{
                this.turns.unshift({
                    isPlayer: isPlayer,
                    text: 'Monster hits Player for ' + damage
                });
            }
          
        }
    }
});