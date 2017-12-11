var game = new Phaser.Game(1080, 1920, Phaser.CANVAS, "gameContainer");

menuTextStyle = {
    font:"bold 300px Microsoft JhengHei, Heiti TC",
    fill:"#000000",
    boundsAlignH:"center",
    boundsAlignV:"middle"
};

idInputStyle = {
    font:"80px Microsoft JhengHei, Heiti TC",
    fontWeight:"bold",
    width:500,
    height:100,
    borderWidth:5,
    borderColor:"#ffffff",
    borderRadius:10,
    placeHolder:"請輸入學號"
};

nameInputStyle = {
    font:"80px Microsoft JhengHei, Heiti TC",
    fontWeight:"bold",
    width:500,
    height:100,
    borderWidth:5,
    borderColor:"#ffffff",
    borderRadius:10,
    max:6,
    placeHolder:"請輸入暱稱"
};

storyTextStyle = {
    font:"bold 70px Microsoft JhengHei, Heiti TC",
    fill:"#000000",
    boundsAlignH:"center",
    boundsAlignV:"middle"
};

optionTextStyle = {
    font:"bold 70px Microsoft JhengHei, Heiti TC",
    fill:"#000000",
    boundsAlignH:"center",
    boundsAlignV:"middle"
};

game.States = {};
game.glbalConfig = {
    googleURL:"https://script.google.com/a/mail.fcu.edu.tw/macros/s/AKfycbxzHdzmLmIHZ9FmeaCWCfaQ05JUt0qo_cHCuyq33aVNmKUx1sE/exec",
    nid:"",
    name:"",
    completeChapter:0,
    currentChapter:0
};

game.States.mainMenu = function() {
    var idInput;
    var nameInput;
    var startButton;

    this.init = function() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.add.plugin(PhaserInput.Plugin);
    };
    this.preload = function() {
        game.load.image("titlebg", "assets/img/titlebg.png");
        game.load.spritesheet("startButton", "assets/img/startButton.png", 300, 100)
    };
    this.create = function() {
        game.add.image(0, 0, "titlebg");
        var text = game.add.text(game.world.centerX, 150, "Title", menuTextStyle);
        text.anchor.setTo(0.5);
        idInput = game.add.inputField(game.world.centerX-250, 300, idInputStyle);
        idInput.blockInput = false;
        idInput.focusOutOnEnter = false;
        nameInput = game.add.inputField(game.world.centerX-250, 450, nameInputStyle);
        nameInput.blockInput = false;
        nameInput.focusOutOnEnter = false;
        startButton = game.add.button(game.world.centerX, 650, "startButton", this.clickButton, this, 1, 0, 1, 0);
        startButton.anchor.setTo(0.5);
        keyEnter = game.input.keyboard.addKey(Phaser.KeyCode.ENTER);
        keyEnter.onDown.add(function(e) {
            if(idInput.focus == true || nameInput.focus == true) {
                this.clickButton();
            }
        }, this);
        keyTab = game.input.keyboard.addKey(Phaser.KeyCode.TAB);
        keyTab.onDown.add(function(e) {
            if(idInput.focus == true) {
                idInput.endFocus();
                nameInput.endFocus();
                nameInput.startFocus();
            }
        }, this);
    };
    this.clickButton = function() {
        var reS = /^[demp]{1}[0-9]{7}$/i;
        var reT = /^[t]{1}[0-9]{5}$/i;
        if(!reS.test(idInput.value) && !reT.test(idInput.value)) {
            alert("nid格式錯誤，請重新輸入。");
            idInput.setText("");
            idInput.endFocus();
            nameInput.endFocus();
            idInput.startFocus();
        }
        else if(nameInput.value == "") {
            alert("請輸入暱稱。");
            idInput.endFocus();
            nameInput.endFocus();
            nameInput.startFocus();
        }
        else{
            var responseData;
            startButton.visible = false;
            game.glbalConfig.nid = idInput.value;
            game.glbalConfig.name = nameInput.value;
            $.ajax({
                type:"post",
                data:{
                    "method":"read",
                    "NID":game.glbalConfig.nid
                },
                url:game.glbalConfig.googleURL,
                success:function(e) {
                    if(e == "nodata") {
                        $.ajax({
                            type:"post",
                            data:{
                                "method":"write",
                                "NID":game.glbalConfig.nid,
                                "stage":1,
                                "ans1":"因為有人不改後端所以要用這行代表第一關然後我後面的關卡全部都要往後移一格"
                            },
                            url:game.glbalConfig.googleURL,
                            success:function(e) {
                                game.glbalConfig.completeChapter = 0;
                                game.state.start("chapterMenu");
                            },
                            error:function() {
                                console.log("傳送資料失敗");
                            }
                        });
                    }
                    else {
                        var temp = parseInt(e, 10);
                        if(temp == 1) {
                            temp = 0;
                        }
                        else if(2 <= temp && temp <= 3) {
                            temp = 1;
                        }
                        else if(4 <= temp && temp <= 6) {
                            temp = 2;
                        }
                        else {
                            temp = 3;
                        }
                        game.glbalConfig.completeChapter = temp;
                        game.state.start("chapterMenu");
                    }
                },
                error:function() {
                    alert("讀取進度失敗");
                    startButton.visible = true;
                }
            });
        }
    };
};

game.States.chapterMenu = function() {
    this.preload = function() {
        game.load.image("chapterbg", "assets/img/chapterbg.png");
        game.load.spritesheet("feiWalk", "assets/img/feiWalk.png", 48, 48);
        game.load.image("chapterButton1", "assets/img/chapterButton1.png");
        game.load.image("chapterButton2", "assets/img/chapterButton2.png");
        game.load.image("chapterButton3", "assets/img/chapterButton3.png");
        game.load.image("chapterButton4", "assets/img/chapterButton4.png");
    };
    this.create = function() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.add.image(0, 0, "chapterbg");
        fei = game.add.sprite(0, 0, "feiWalk");
        fei.width = 164;
        fei.height = 205;
        fei.animations.add("walk");
        fei.animations.play("walk", 5, true);
        ch1Button = game.add.button(220, 550, "chapterButton1", this.clickChButton, this);
        ch1Button.data = {chapter:0};
        ch2Button = game.add.button(670, 850, "chapterButton2", this.clickChButton, this);
        ch2Button.data = {chapter:1};
        ch3Button = game.add.button(220, 1150, "chapterButton3", this.clickChButton, this);
        ch3Button.data = {chapter:2};
        ch4Button = game.add.button(760, 1420, "chapterButton4", this.clickChButton, this);
        ch4Button.data = {chapter:3};
        chButtonArr = [ch1Button, ch2Button, ch3Button, ch4Button];
        this.processButton();
    };
    this.clickChButton = function(button) {
        game.glbalConfig.currentChapter = button.data.chapter;
        walkTo = game.add.tween(fei).to({x:button.x, y:button.y}, 500, Phaser.Easing.Linear.None, true);
        walkTo.onComplete.add(this.toChapter, this);
    };
    this.toChapter = function() {
        game.state.start("showText");
    };
    this.processButton = function() {
        for(var i = 0; i < 4 ; i++) {
            if(i == game.glbalConfig.completeChapter) {
                fei.x = chButtonArr[i].x;
                fei.y = chButtonArr[i].y - 210;
            }
            if(i <= game.glbalConfig.completeChapter) {
                chButtonArr[i].visible = true;
            }
            else {
                chButtonArr[i].visible = false;
            }
        }
    };
};

game.States.showText = function() {
    var text;
    var nextButton;
    var skipButton;
    var wordTimer;
    var content;
    var wordIndex;
    var wordDelay;
    var chapter;
    var btc;

    this.init = function() {
        content = "";
        wordIndex = 0;
        wordDelay = 60;
        chapter = game.glbalConfig.currentChapter;
    };
    this.preload = function() {
        game.load.image("bg", "assets/img/chapterbg3.png");
        game.load.image("nextButton", "assets/img/nextButton.png");
        game.load.json("text", "assets/json/text.json");
        if(chapter == 3) {
            game.load.json("exchange", "https://blockchain.info/ticker");
        }
    };
    this.create = function() {
        var json = game.cache.getJSON("text");
        content = json[chapter].text;
        game.add.image(0, 0, "bg");
        var bar = game.add.graphics();
        bar.beginFill(0xffffff, 0.5);
        bar.drawRect(78, game.world.centerY - 350, 918, 700);
        text = game.add.text(100, game.world.centerY - 300, "", storyTextStyle);
        nextButton = game.add.button(930, 1790, "nextButton", void(null), this);
        nextButton.visible = false;
        skipButton = game.add.button(930, 1790, "nextButton", void(null), this);
        content = content.replace(/#/, game.glbalConfig.name);
        if(chapter == 3) {
            var exchangeJson = game.cache.getJSON("exchange");
            btc = exchangeJson.TWD.last.toString();
            content = content.replace(/@/, btc);
        }
        wordTimer = game.time.events.repeat(wordDelay, content.length, this.nextWord, this);
        game.input.onDown.add(this.clickScreen, this);
    };
    this.nextWord = function() {
        text.text += content[wordIndex];
        if(wordIndex == content.length - 1) {
            skipButton.visible = false;
            nextButton.visible = true;
        }
        wordIndex++;
    };
    this.skipAnimation = function() {
        skipButton.visible = false;
        game.time.events.remove(wordTimer);
        text.text = content;
        nextButton.visible = true;
    };
    this.toNextChapter = function() {
        game.state.start("chapter");
    };
    this.clickScreen = function() {
        if(skipButton.visible == true && nextButton.visible == false) {
            this.skipAnimation();
        }
        else if(skipButton.visible == false && nextButton.visible == true) {
            this.toNextChapter();
        }
    }
};

game.States.chapter = function() {
    var chapter;
    var json;
    var chapterbg;
    var charPic;
    var dialogBg;
    var nameBg;
    var charName;
    var dialogText;
    var type;
    var name;
    var text;
    var option;
    var optionNum;
    var next;
    var nextButton;
    var skipButton;
    var optionGroup;
    var wordIndex;
    var wordDelay;
    var wordTimer;
    var nameArrA;
    var nameArrB;

    this.init = function() {
        next = 0;
        wordIndex = 0;
        wordDelay = 60;
        chapter = game.glbalConfig.currentChapter;
        nameArrA = ["fei", "xue", "leo", "ray", "empty"];
        nameArrB = [game.glbalConfig.name, "薛老", "Leo three", "國瑞", ""];
    };
    this.preload = function() {
        game.load.json("dialog", "assets/json/dialog.json")
        game.load.image("fei", "assets/img/fei.png");
        game.load.image("xue", "assets/img/xue.png");
        game.load.image("leo", "assets/img/leo.png");
        game.load.image("ray", "assets/img/ray.png");
        game.load.image("empty", "assets/img/empty.png");
        game.load.image("optionBorder", "assets/img/optionBorder.png");
        game.load.image("dialogBorder", "assets/img/dialogBorder.png");
        game.load.image("nameBorder", "assets/img/nameBorder.png");
        game.load.image("chapterbg0", "assets/img/chapterbg0.png");
        game.load.image("chapterbg1", "assets/img/chapterbg1.png");
        game.load.image("chapterbg2", "assets/img/chapterbg2.png");
        game.load.image("chapterbg3", "assets/img/chapterbg3.png");
    };
    this.create = function() {
        json = game.cache.getJSON("dialog");
        chapterbg = game.add.image(0, 0, "empty");
        dialog = game.add.group();
        dialogBg = game.add.image(0, 1080, "dialogBorder");
        nameBg = game.add.image(0, 900, "nameBorder");
        charName = game.add.text(10, 940, "", storyTextStyle);
        charPic = game.add.image(430, 200, "empty");
        charPic.anchor.setTo(1, 0);
        charPic.scale.setTo(0.64);
        dialogText = game.add.text(130, 1280, "", storyTextStyle);
        nextButton = game.add.button(930, 1790, "nextButton", void(null), this);
        nextButton.visible = false;
        skipButton = game.add.button(930, 1790, "nextButton", void(null), this);
        dialog.addMultiple([dialogBg, charPic, dialogText, nextButton, skipButton]);
        dialog.visible = false;
        optionGroup = game.add.group();
        optionGroup.visible = false;
        game.input.onDown.add(this.clickScreen, this);
        this.processDialog();
    };
    this.processDialog = function() {
        if(next == -1) {
            if(chapter == 3) {
                game.glbalConfig.completeChapter = 3;
                game.state.start("ending");
            }
            else {
                if(game.glbalConfig.completeChapter <= chapter) {
                    game.glbalConfig.completeChapter += 1;
                }
                game.state.start("chapterMenu");
            }
        }
        else {
            type = json[chapter].content[next].type;
            name = json[chapter].content[next].name;
            text = json[chapter].content[next].text;
            option = json[chapter].content[next].option;
            optionNum = json[chapter].content[next].optionNum;
            next = json[chapter].content[next].next;
            dialogText.text = "";
            wordIndex = 0;
            if(chapter == 0) {
                text = text.replace(/@/, game.glbalConfig.name);
            }
            if(name == "empty") {
                nameBg.visible = false;
            }
            else {
                nameBg.visible = true;
            }
            charName.text = nameArrB[nameArrA.indexOf(name)];
            chapterbg.loadTexture(json[chapter].chapter);
            charPic.loadTexture(name);
            this.showDialog();
        }
    };
    this.showDialog = function() {
        dialog.visible = true;
        wordTimer = game.time.events.repeat(wordDelay, text.length, this.nextWord, this);
    };
    this.showOption = function() {
        for(var i = 0; i < option.length; i++) {
            var tempButton = game.add.button(540, 270 + 520 * i, "optionBorder", this.clickOption, this);
            tempButton.anchor.setTo(0.5, 0.5);
            tempButton.data = {
                nextDialog:next[i],
                optionText:option[i]
            };
            var tempOption = game.add.text(540, 270 + 520 * i, "", optionTextStyle);
            tempOption.anchor.setTo(0.5, 0.5);
            tempOption.text = option[i];
            optionGroup.addMultiple([tempButton, tempOption]);
            optionGroup.addMultiple([tempButton]);
        }
        optionGroup.visible = true;
    };
    this.nextWord = function() {
        skipButton.visible = true;
        dialogText.text += text[wordIndex];
        if(wordIndex == text.length - 1) {
            skipButton.visible = false;
            nextButton.visible = true;
            if(type == "option") {
                nextButton.visible = false;
                this.showOption();
            }
        }
        wordIndex++;
    };
    this.skipAnimation = function() {
        skipButton.visible = false;
        game.time.events.remove(wordTimer);
        dialogText.text = text;
        if(type == "option") {
            nextButton.visible = false;
            this.showOption();
        }
        else {
            nextButton.visible = true;
        }
    };
    this.clickOption = function(button) {
        optionGroup.visible = false;
        this.postData(button.data.optionText);
        next = button.data.nextDialog;
        optionGroup.removeAll(true);
        this.processDialog();
    };
    this.postData = function(optionText) {
        if(optionNum != null && optionNum != -1) {
            $.ajax({
                type:"post",
                data:{
                    "method":"write",
                    "NID":game.glbalConfig.nid,
                    "stage":optionNum,
                    "ans1":optionText
                },
                url:game.glbalConfig.googleURL,
                error:function() {
                    console.log("傳送資料失敗", optionNum);
                }
            });
        }
    }
    this.clickScreen = function() {
        if(skipButton.visible == true && nextButton.visible == false) {
            this.skipAnimation();
        }
        else if(skipButton.visible == false && nextButton.visible == true) {
            this.processDialog();
        }
    }
};

game.States.ending = function() {
    this.preload = function() {
        game.load.image("chapterbg", "assets/img/chapterbg3.png");
    };
    this.create = function() {
        game.add.image(0, 0, "chapterbg");
        var text = game.add.text(game.world.centerX, 0, "www.facebook.com/\nHackerSir.tw", storyTextStyle);
        text.anchor.setTo(0.5, 0.5);
        text.inputEnabled = true;
        text.events.onInputDown.add(this.clickURL, this);
        game.add.tween(text).to({x:game.world.centerX, y:game.world.centerY}, 1000, Phaser.Easing.Linear.None, true);
        var textToMain = game.add.text(game.world.centerX, game.world.centerY + 300, "回主畫面", storyTextStyle);
        textToMain.anchor.setTo(0.5, 0.5);
        textToMain.inputEnabled = true;
        textToMain.events.onInputDown.add(this.toMain, this);
    };
    this.toMain = function() {
        game.state.start("chapterMenu");
    };
    this.clickURL = function() {
        window.open("https://www.facebook.com/HackerSir.tw", "_blank");
    }
};

game.state.add("mainMenu", game.States.mainMenu);
game.state.add("chapterMenu", game.States.chapterMenu);
game.state.add("showText", game.States.showText);
game.state.add("chapter", game.States.chapter);
game.state.add("ending", game.States.ending);
game.state.start("mainMenu");
