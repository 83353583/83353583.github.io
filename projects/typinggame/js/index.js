class Game {
    constructor(setting) {
        this.sence = document.querySelector(".sence");
        this.scoreEle = document.querySelector(".score span");
        this.levelEle = document.querySelector(".level span");
        this.senceWidth = this.sence.offsetWidth;
        this.t = setInterval(this._move, 50);
        this.initLife = setting.life || 5;
        this.life = this.initLife;
        this.intispeed = setting.speed || 4;
        this.speed = this.intispeed;
        this.lifeEle = document.querySelector(".life span");
        this.num = setting.num || 3;
        this.status = true;
        this._init();
        this.sum = 0;
        this.overSence = document.querySelector(".over");
        this.restartBtn = document.querySelector("#restart");
        this.exitBtn = document.querySelector("#exit");
        this.cover = document.querySelector(".cover");
    }

    changeDiff(diff) {
        this.initLife = diff.life;
        this.intispeed = diff.speed;
        this.num = diff.num;
        this._init();
    }

    _init() {
        this.sum = 0;
        this.obj = {};
        clearInterval(this.t);
        this.score = 0;
        this.scoreEle.innerHTML = this.score;
        this.level = 1;
        this.levelEle.innerHTML = this.level;
        this.life = this.initLife;
        this.speed = this.intispeed;
        this.lifeEle.innerHTML = this.initLife;
        this.sence.innerHTML = "";
    }

    _creatLetter() {
        let newItem = document.createElement("div");
        newItem.classList.add("letter");
        this.sence.appendChild(newItem);
        do {
            var randomNumber = Math.floor(Math.random() * 26 + 65);
            var randomLetter = String.fromCharCode(randomNumber);
        } while (this.obj[randomLetter]);
        newItem.style.backgroundImage = "url(images/" + randomLetter + ".png)";
        do {
            var randomLeft = Math.floor(Math.random() * (this.senceWidth - 100));
        } while (this._checkLeft(randomLeft));
        let randomTop = -Math.floor(Math.random() * 100);
        newItem.style.left = randomLeft + "px";
        newItem.style.top = randomTop + "px";
        this.obj[randomLetter] = {left: randomLeft, top: randomTop, ele: newItem};
    };

    _checkLeft(newLeft) {
        for (let i in this.obj) {
            if (newLeft > this.obj[i].left - 100 && newLeft < this.obj[i].left + 100) {
                return true;
            }
        }
        return false;
    }

    start() {
        if (this.status) {
            for (let i = 0; i < this.num; i++) {
                this._creatLetter();
            }
            this._falldown();
            this._keydown();
        }
        this.status = false;
        this.restartBtn.onclick = null;
    }

    _falldown() {
        this.t = setInterval(this._move.bind(this), 50);
    };

    _levelUp() {
        if (this.score % 20 === 0) {
            this.speed++;
            this.level++;
            this.levelEle.innerHTML = this.level;
        }
    }

    _move() {
        for (let i in this.obj) {
            let top = this.obj[i].top;
            top += this.speed;
            this.obj[i].ele.style.top = top + "px";
            this.obj[i].top = top;
            if (top >= window.innerHeight) {
                this.sence.removeChild(this.obj[i].ele);
                delete this.obj[i];
                this._creatLetter();
                this.life--;
                this.lifeEle.innerHTML = this.life;
                if (this.life <= 0) {
                    this.life = 0;
                    setTimeout(function () {
                        this.gg();
                    }.bind(this), 20)

                }
            }
        }
    }

    gg() {
        let radio = Math.round(this.score / this.sum * 10000) / 100;
        if (!radio) {
            radio = 0;
        }
        this.overSence.style.display = "block";
        this.cover.style.display = "block";
        this.overSence.firstElementChild.innerHTML = `当前得分为${this.score}，正确率为${radio}%，是否重新开始?`;
        clearInterval(this.t);
        this.restartBtn.onclick = function () {
            this.overSence.style.display = "none";
            this.cover.style.display = "none";
            this._init();
        }.bind(this);
        this.exitBtn.onclick = function () {
            history.go(0);
        }.bind(this);
        this.status = true;
    }

    _keydown() {
        document.onkeydown = function (e) {
            this.sum++;
            let key = e.keyCode;
            let Letter = String.fromCharCode(key);
            if (this.obj[Letter] && flag) {
                this.sence.removeChild(this.obj[Letter].ele);
                delete this.obj[Letter];
                this._creatLetter();
                this.score++;
                this.scoreEle.innerHTML = this.score;
                this._levelUp();
            }
        }.bind(this);
    }
}
let diffObjs = document.querySelectorAll(".diffbtn");
let startObj = document.querySelector("#start");
let pauseObj = document.querySelector("#pause");
let overObj = document.querySelector("#over");
let easyObj = document.querySelector("#easy");
let mediumObj = document.querySelector("#medium");
let hardObj = document.querySelector("#hard");
let hellObj = document.querySelector("#hell");
let easy = {life: 5, speed: 3, num: 3};
let medium = {life: 3, speed: 4, num: 4};
let hard = {life: 3, speed: 5, num: 5};
let hell = {life: 1, speed: 7, num: 5};
let game = new Game(easy);
let flag = true;
startObj.onclick = function () {
    game.start();
};
pauseObj.onclick = function () {
    if (!game.status) {
        if (flag) {
            clearInterval(game.t);
            flag = false;
            pauseObj.value = "继续";
        } else {
            game._falldown();
            flag = true;
            pauseObj.value = "暂停";
        }
    }
};
overObj.onclick = function () {
    if (!game.status && confirm("确定退出吗？")) {
        history.go(0);
    }
};
diffObjs.forEach(function (ele) {
    ele.onclick = function () {
        if (game.status) {
            for (let i = 0; i < diffObjs.length; i++) {
                diffObjs[i].classList.remove("selected");
            }
            ele.classList.add("selected");
            switch (ele.name) {
                case "easy":
                    game.changeDiff(easy);
                    break;
                case "medium":
                    game.changeDiff(medium);
                    break;
                case "hard":
                    game.changeDiff(hard);
                    break;
                case "hell":
                    game.changeDiff(hell);
                    break;
            }
        }
    }
})