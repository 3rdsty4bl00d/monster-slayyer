new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        count: 0,
        healCount: 0,
        turns: []
    },
    methods: {
        startGame: function () {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
        },
        attack: function () {
            ++this.count;
            ++this.healCount;
            var damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'player hits monster for ' + damage
            });
            if (this.checkWin()) {
                return;
            }
            this.monsterAttacks();
            console.log(this.count);
            console.log(this.healCount);
        },
        specialAttack: function () {
            
            if (this.count < 6) {
                alert('use after 6 attack uses');
            } else {
                ++this.healCount;
                var damage = this.calculateDamage(10, 20);
                this.monsterHealth -= damage;
                
                this.monsterHealth -= damage;
                this.turns.unshift({
                isPlayer: true,
                text: 'player hits monster for ' + damage
                });
                if (this.checkWin()) {
                    return;
                }
                this.monsterAttacks();
                this.count = 0;
            }
        },
        heal: function () {
            if(this.healCount < 4){
                alert('you can only heal after 4 attacks');
            } else {
                
                if (this.playerHealth <= 90) {
                this.playerHealth += 10;
                } else {
                    this.playerHealth = 100;
                }   
                this.turns.unshift({
                    isPlayer: true,
                    text: 'player heals for 10'
                });
                this.monsterAttacks();
                console.log(this.healCount);
                this.healCount = 0;
            }
            
        },
        giveUp: function () {
            this.gameIsRunning = false;
        },
        calculateDamage: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        monsterAttacks: function () {
            var damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                text: 'monster hits player for ' + damage
            });
            this.checkWin();
        },
        checkWin: function () {
            if (this.monsterHealth <= 0) {
                if (confirm('you won! New Game?')) {
                    this.count = 0;
                    this.healCount = 0;
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('you lost! New Game?')) {
                    this.count = 0;
                    this.healCount = 0;
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        },
    }
});