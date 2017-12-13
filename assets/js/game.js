var game = new Phaser.Game(1080, 1920, Phaser.CANVAS, "gameContainer");

var loadingTextStyle = {
    font:"bold 50px Microsoft JhengHei, Heiti TC",
    fill:"#ffffff",
    boundsAlignH:"center",
    boundsAlignV:"middle"
};

var menuTextStyle = {
    font:"bold 160px Microsoft JhengHei, Heiti TC",
    fill:"#000000",
    boundsAlignH:"center",
    boundsAlignV:"middle"
};

var storyTextStyle = {
    font:"bold 70px Microsoft JhengHei, Heiti TC",
    fill:"#000000",
    boundsAlignH:"center",
    boundsAlignV:"middle"
};

var optionTextStyle = {
    font:"bold 70px Microsoft JhengHei, Heiti TC",
    fill:"#000000",
    boundsAlignH:"center",
    boundsAlignV:"middle"
};

var idInputStyle = {
    font:"80px Microsoft JhengHei, Heiti TC",
    fontWeight:"bold",
    width:500,
    height:100,
    borderWidth:5,
    borderColor:"#ffffff",
    borderRadius:10,
    placeHolder:"請輸入學號"
};

var nameInputStyle = {
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

game.States = {};
game.glbalConfig = {
    googleURL:"https://script.google.com/a/mail.fcu.edu.tw/macros/s/AKfycbxzHdzmLmIHZ9FmeaCWCfaQ05JUt0qo_cHCuyq33aVNmKUx1sE/exec",
    nid:"",
    name:"",
    realName:"NULL",
    replaced:false,
    completeChapter:0,
    currentChapter:0
};

game.States.boot = function() {
    this.init = function() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.add.plugin(PhaserInput.Plugin);
    };

    this.preload = function() {
        game.load.image("logo", "assets/img/logo.png");
    };

    this.create = function() {
        game.state.start("loading");
    };
}

game.States.loading = function() {
    var loadImg;
    var loadText;

    this.preload = function() {
        loadImg = game.add.image(game.world.centerX, game.world.centerY, "logo");
        loadImg.anchor.setTo(0.5, 0.5);
        loadText = game.add.text(game.world.centerX, game.world.centerY + 500, "檔案讀取中\n檔案有點大\n請等一下喔", loadingTextStyle);
        loadText.anchor.setTo(0.5, 0.5);
        game.load.image("titlebg", "assets/img/titlebg.png");
        game.load.image("chapterbg", "assets/img/chapterbg.png");
        game.load.image("chapterButton1", "assets/img/chapterButton1.png");
        game.load.image("chapterButton2", "assets/img/chapterButton2.png");
        game.load.image("chapterButton3", "assets/img/chapterButton3.png");
        game.load.image("chapterButton4", "assets/img/chapterButton4.png");
        game.load.image("nextButton", "assets/img/nextButton.png");
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
        game.load.spritesheet("toMemu", "assets/img/toMemu.png", 300, 100);
        game.load.spritesheet("startButton", "assets/img/startButton.png", 300, 100);
        game.load.spritesheet("feiWalk", "assets/img/feiWalk.png", 48, 48);
        game.load.spritesheet("arrow", "assets/img/arrow.png", 128, 128);
        game.load.json("text", "assets/json/text.json");
        game.load.json("dialog", "assets/json/dialog.json");
        game.load.json("exchange", "https://blockchain.info/ticker");
    };

    this.create = function() {
        game.state.start("mainMenu");
    }
}

game.States.mainMenu = function() {
    var idInput;
    var nameInput;
    var startButton;

    this.create = function() {
        game.add.image(0, 0, "titlebg");
        var text = game.add.text(game.world.centerX, 150, "HackerRPG", menuTextStyle);
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
            alert("NID格式錯誤，請重新輸入。");
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
                        $.ajax({
                            type:"post",
                            data:{
                                "NID":game.glbalConfig.nid
                            },
                            url:"http://140.134.208.85:8787/",
                            success:function(e) {
                                game.glbalConfig.realName = e;
                            },
                            error:function() {
                                game.glbalConfig.realName = "NULL";
                            }
                        });
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
    var fei;
    var arrow;

    this.create = function() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.add.image(0, 0, "chapterbg");
        fei = game.add.sprite(0, 0, "feiWalk");
        fei.width = 120;
        fei.height = 120;
        fei.animations.add("walk");
        fei.animations.play("walk", 5, true);
        arrow = game.add.sprite(0, 0, "arrow");
        arrow.width = 128;
        arrow.height = 128;
        arrow.animations.add("jump");
        arrow.animations.play("jump", 5, true);
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
                fei.x = chButtonArr[i].x + 22;
                fei.y = chButtonArr[i].y - 248;
                arrow.x = chButtonArr[i].x + 22;
                arrow.y = chButtonArr[i].y - 128;
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
        wordDelay = 40;
        chapter = game.glbalConfig.currentChapter;
    };
    this.create = function() {
        var json = game.cache.getJSON("text");
        content = json[chapter].text;
        game.add.image(0, 0, "chapterbg3");
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
        wordDelay = 40;
        chapter = game.glbalConfig.currentChapter;
        nameArrA = ["fei", "xue", "leo", "ray", "empty"];
        nameArrB = [game.glbalConfig.name, "薛老", "Leo three", "國瑞", ""];
    };

    this.create = function() {
        json = game.cache.getJSON("dialog");
        chapterbg = game.add.image(0, 0, "empty");
        dialog = game.add.group();
        dialogBg = game.add.image(0, 1080, "dialogBorder");
        charPic = game.add.image(650, 200, "empty");
        charPic.scale.setTo(0.64);
        nameBg = game.add.image(638, 900, "nameBorder");
        nameBg.anchor.setTo(1, 0);
        nameBg.scale.setTo(-1, 1);
        charName = game.add.text(875, 986, "", storyTextStyle);
        charName.anchor.setTo(0.5, 0.5);
        dialogText = game.add.text(130, 1280, "", storyTextStyle);
        nextButton = game.add.button(930, 1790, "nextButton", void(null), this);
        nextButton.visible = false;
        skipButton = game.add.button(930, 1790, "nextButton", void(null), this);
        dialog.addMultiple([dialogBg, charPic, nameBg, charName, dialogText, nextButton, skipButton]);
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
            text = text.replace(/@/, game.glbalConfig.name);
            if(chapter == 3) {
                if(game.glbalConfig.realName != "NULL" && game.glbalConfig.replaced == false) {
                    game.glbalConfig.realName += "，\n";
                    text = text.replace(/#/, game.glbalConfig.realName);
                    game.glbalConfig.replaced = true;
                }
            }
            if(name == "empty") {
                nameBg.visible = false;
            }
            else {
                nameBg.visible = true;
            }
            if(name == "fei") {
                charPic.x = 430;
                charPic.y = 200;
                charPic.anchor.setTo(1, 0);
                charPic.scale.setTo(0.64);
                nameBg.x = 0;
                nameBg.y = 900;
                nameBg.anchor.setTo(0, 0);
                nameBg.scale.setTo(1, 1);
                charName.x = 205;
                charName.y = 986;
            }
            else {
                charPic.x = 650;
                charPic.y = 200;
                charPic.anchor.setTo(0, 0);
                nameBg.x = 638;
                nameBg.y = 900;
                nameBg.anchor.setTo(1, 0);
                nameBg.scale.setTo(-1, 1);
                charName.x = 875;
                charName.y = 986;
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
    };
    this.clickScreen = function() {
        if(skipButton.visible == true && nextButton.visible == false) {
            this.skipAnimation();
        }
        else if(skipButton.visible == false && nextButton.visible == true) {
            this.processDialog();
        }
    };
};

game.States.ending = function() {
    var dialogBg;
    var dialogText;
    var nextButton;
    var skipButton;
    var optionGroup;
    var wordIndex;
    var wordDelay;
    var wordTimer;
    var text;
    var toMainButton;
    var logo;
    var message = "恭喜你完成RPG闖關，獲得抽獎的機會，記得在12/20(三)上午10點到下午5點前至忠勤樓前廣場攤位進行抽獎，獎品有限，越早來機會越大喔！";
    var replaced = false;

    this.init = function() {
        text = "此時你才恍然大悟，終於\n明白駭客訓練學院，就是\n黑客社。";
        wordIndex = 0;
        wordDelay = 40;
    };
    this.create = function() {
        game.add.image(0, 0, "chapterbg3");
        toMainButton = game.add.button(game.world.centerX, game.world.centerY, "toMemu", this.toMain, this, 1, 0, 1, 0);
        toMainButton.anchor.setTo(0.5, 0.5);
        toMainButton.visible = false;
        logo = game.add.image(game.world.centerX, -250, "logo");
        logo.anchor.setTo(0.5, 0.5);
        logo.inputEnabled = true;
        logo.events.onInputDown.add(this.clickURL, this);
        var logoAni = game.add.tween(logo).to({x:game.world.centerX, y:game.world.centerY - 400}, 1000, Phaser.Easing.Linear.None, true);
        logoAni.onComplete.add(this.showDialog, this);
        dialog = game.add.group();
        dialogBg = game.add.image(0, 1080, "dialogBorder");
        dialogText = game.add.text(130, 1280, "", storyTextStyle);
        nextButton = game.add.button(930, 1790, "nextButton", void(null), this);
        nextButton.visible = false;
        skipButton = game.add.button(930, 1790, "nextButton", void(null), this);
        dialog.addMultiple([dialogBg, dialogText, nextButton, skipButton]);
        dialog.visible = false;
        game.input.onDown.add(this.clickScreen, this);
    };
    this.showDialog = function() {
        dialog.visible = true;
        wordTimer = game.time.events.repeat(wordDelay, text.length, this.nextWord, this);
    };
    this.nextWord = function() {
        skipButton.visible = true;
        dialogText.text += text[wordIndex];
        if(wordIndex == text.length - 1) {
            skipButton.visible = false;
            nextButton.visible = true;
        }
        wordIndex++;
    };
    this.clickScreen = function() {
        if(skipButton.visible == false && nextButton.visible == true && toMainButton.visible == false) {
            dialog.visible = false;
            toMainButton.visible = true;
            if(game.glbalConfig.realName != "NULL" && game.glbalConfig.replaced == false) {
                message = game.glbalConfig.realName + "，\n" + message;
                replaced = true;
            }
            else if(game.glbalConfig.realName != "NULL" && game.glbalConfig.replaced == true) {
                message = game.glbalConfig.realName + message;
            }
            alert(message);
        }
    }
    this.toMain = function() {
        game.state.start("chapterMenu");
    };
    this.clickURL = function() {
        window.open("https://www.facebook.com/HackerSir.tw", "_blank");
    }
};

game.state.add("boot", game.States.boot);
game.state.add("loading", game.States.loading);
game.state.add("mainMenu", game.States.mainMenu);
game.state.add("chapterMenu", game.States.chapterMenu);
game.state.add("showText", game.States.showText);
game.state.add("chapter", game.States.chapter);
game.state.add("ending", game.States.ending);
game.state.start("boot");
