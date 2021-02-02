(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/GameScene.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '34d35qFUUtIf7p2KhmORnl4', 'GameScene', __filename);
// Script/GameScene.js

"use strict";

var card_node = require("./card_node");
var CardsResultType = [];
var MYHandCardsValue = [];
var MYHandCardsType = [];
var BANKERHandCardsValue = [];
var BANKERHandCardsType = [];
var PUBLICCardsValue = [];
var PUBLICCardsType = [];
var IsBOOl = false;

cc.Class({
    extends: cc.Component,

    properties: {
        JokersSprites: {
            default: [],
            type: cc.Sprite
        },
        CardsSpritesList: {
            default: [],
            type: cc.SpriteFrame
        },
        SeeCardsBtn: {
            default: null,
            type: cc.Button
        },
        PackBtn: {
            default: null,
            type: cc.Button
        },
        SideShowBtn: {
            default: null,
            type: cc.Button
        },
        NextRoundBtn: {
            default: null,
            type: cc.Button
        },
        StartBtn: {
            default: null,
            type: cc.Button
        },
        TimeCounts: {
            default: null,
            type: cc.Label
        },
        NodeList: {
            default: [],
            type: cc.Node
        },
        JokerMaskList: {
            default: [],
            type: cc.Sprite
        },
        MyCardsMaskList: {
            default: [],
            type: cc.Sprite
        },
        BankerCardsMaskList: {
            default: [],
            type: cc.Sprite
        },

        PublicCardsMaskList: {
            default: [],
            type: cc.Sprite
        },

        MyCardsNodesList: {
            default: [],
            type: cc.Sprite
        },

        BankerCardsNodesList: {
            default: [],
            type: cc.Sprite
        },

        PublicCardsNodeList: {
            default: [],
            type: cc.Sprite
        },

        cardBlock: {
            default: null,
            type: cc.SpriteFrame
        },
        WinnerAnimation: {
            default: null,
            type: cc.Animation
        },
        WinnerAnimationText: {
            default: null,
            type: cc.Label
        },
        MyWinnerTip: {
            default: null,
            type: cc.Sprite
        },
        BankerWinnerTip: {
            default: null,
            type: cc.Sprite
        },
        DefaultJokerSprite: {
            default: [],
            type: cc.SpriteFrame
        },
        defaultSprite: {
            default: null,
            type: cc.SpriteFrame
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {
        this.onload();
    },


    onload: function onload() {
        this.StartBtn.node.active = true;
        this.SeeCardsBtn.node.active = false;
        this.PackBtn.node.active = false;
        this.SideShowBtn.node.active = false;
        this.TimeCounts.node.active = false;
        this.NextRoundBtn.node.active = false;
        this.WinnerAnimation.node.active = false;
        this.BankerWinnerTip.node.active = false;
        this.MyWinnerTip.node.active = false;
        for (var i = 0; i < 2; i++) {
            this.NodeList[i].active = false;
            this.JokerMaskList[i].node.active = false;
        }

        for (var i = 0; i < 3; i++) {
            this.PublicCardsNodeList[i].node.active = false;
        }

        cc.debug.setDisplayStats(false);
    },

    BtnClickEvents: function BtnClickEvents(event, cusutomData) {

        switch (cusutomData) {
            case "PackBtn":
                this.onPackBtn();
                break;
            case "SideShowBtn":
                this.onsideShowfunc();
                break;
            case "SeeCardsBtn":
                this.onseeCardsfunc();
                break;
            case "NextRoundBtn":
                this.onnextRound();
                break;
            case "StartBtn":
                this.onstartGame();
                break;
            default:
                break;
        }
    },

    onsideShowfunc: function onsideShowfunc() {

        if (!IsBOOl) {
            this.showJokerCards();
        }

        this.showHandCards();
        this.showJokerCardsAction(true);

        this.scheduleOnce(this.showResultfunc, 2); ////延后两秒执行函数this.showResultfunc
        this.scheduleOnce(function () {
            this.NextRoundBtn.node.active = true;
        }, 3);
    },

    showResultfunc: function showResultfunc() {
        /////比牌结果，点数相加??????????
        var tempResultType = 0;
        if (CardsResultType[0] > CardsResultType[1]) {
            tempResultType = CardsResultType[0];
            this.MyWinnerTip.node.active = true;
            this.BankerWinnerTip.node.active = false;
        } else if (CardsResultType[0] < CardsResultType[1]) {
            tempResultType = CardsResultType[1];
            this.MyWinnerTip.node.active = false;
            this.BankerWinnerTip.node.active = true;
        } else {
            var result1 = 0;
            var result = 0;
            for (var index = 0; index < 3; index++) {
                result += MYHandCardsValue[index];
                result1 += BANKERHandCardsValue[index];
            }
            cc.log("result: " + result);
            cc.log("result1: " + result1);
            if (result > result1) {
                tempResultType = CardsResultType[0];
                this.MyWinnerTip.node.active = true;
                this.BankerWinnerTip.node.active = false;
            } else {
                tempResultType = CardsResultType[1];
                this.MyWinnerTip.node.active = false;
                this.BankerWinnerTip.node.active = true;
            }
            cc.log("CardsResultType[0]: " + CardsResultType[0]);
        }

        switch (tempResultType) {
            case 60:
                this.WinnerAnimationText.string = "TRAIL";
                break;
            case 50:
                this.WinnerAnimationText.string = "PURE SEQUENCE";
                break;
            case 40:
                this.WinnerAnimationText.string = "SEQUENCE";
                break;
            case 30:
                this.WinnerAnimationText.string = "COLOR";
                break;
            case 20:
                this.WinnerAnimationText.string = "PAIR";
                break;
            case 10:
                this.WinnerAnimationText.string = "HIGH CARD";
                break;
            default:
                break;
        }

        this.WinnerAnimation.node.active = true;
        this.WinnerAnimation.play();
    },

    onseeCardsfunc: function onseeCardsfunc() {

        if (!IsBOOl) {
            this.showJokerCards();
            IsBOOl = true;
        }

        this.showMyHandCards();
        this.showJokerCardsAction(false);
    },

    dropCards: function dropCards() {
        if (!IsBOOl) {
            this.showJokerCards();
        }

        this.SideShowBtn.node.active = false;
        this.PackBtn.node.active = false;
        this.SeeCardsBtn.node.active = false;
        for (var i = 0; i < 3; i++) {
            this.PublicCardsNodeList[i].node.active = false;
        }

        this.showHandCards(true);

        for (var i = 0; i < 3; i++) {
            var scaleTo = cc.scaleTo(0.3, 0);
            var moveTo = cc.moveTo(0.3, cc.v2(0, 150));

            var scaleTo1 = cc.scaleTo(0.3, 0);
            var moveTo1 = cc.moveTo(0.3, cc.v2(0, -150));

            this.MyCardsMaskList[i].node.active = true;
            this.MyCardsMaskList[i].spriteFrame = this.cardBlock;
            this.BankerCardsMaskList[i].node.active = true;
            this.BankerCardsMaskList[i].node.active = true;
        }

        var scaleTo = cc.scaleTo(0.3, 0);
        var moveTo = cc.moveTo(0.3, cc.v2(0, 150));
        this.NodeList[0].runAction(cc.sequence(moveTo, scaleTo)); //逐步执行动画

        var scaleTo1 = cc.scaleTo(0.3, 0);
        var moveTo1 = cc.moveTo(0.3, cc.v2(0, -150));
        this.NodeList[1].runAction(cc.sequence(moveTo1, scaleTo1)); //逐步执行动画

        this.scheduleOnce(function () {
            this.NextRoundBtn.node.active = true;
        }, 1);
    },

    //重新洗牌并且发牌
    onPackBtn: function onPackBtn() {
        this.dropCards();
    },

    onnextRound: function onnextRound() {
        ////下一次牌

        this.resetTablefunc();
        this.countTimes();

        this.scheduleOnce(function () {

            this.unscheduleAllCallbacks();
            this.BothHandCardsValueGive();

            this.NextRoundBtn.node.active = false;
            this.SeeCardsBtn.node.active = true;
            this.SideShowBtn.node.active = true;
            this.PackBtn.node.active = true;
            this.TimeCounts.node.active = false;
            this.StartBtn.node.active = false;

            for (var i = 0; i < 2; i++) {
                this.NodeList[i].active = true;
                this.JokerMaskList[i].node.active = true;
            }

            for (var i = 0; i < 3; i++) {
                this.PublicCardsNodeList[i].node.active = true;
            }
            this.giveCardAction();
            this.showDefault();
        }, 4);
    },

    showDefault: function showDefault() {
        this.MyCardsNodesList[0].node.active = true;
        this.MyCardsMaskList[0].node.active = true;
        this.MyCardsNodesList[0].spriteFrame = this.DefaultJokerSprite[0]; //如果注释了这一行，那么第一张百搭牌下次开始不会变成反面
        this.MyCardsMaskList[0].spriteFrame = this.cardBlock;

        this.BankerCardsMaskList[0].node.active = true;
        this.BankerCardsNodesList[0].node.active = true;
        this.BankerCardsNodesList[0].spriteFrame = this.DefaultJokerSprite[0];
        this.BankerCardsMaskList[0].spriteFrame = this.cardBlock;

        for (var index = 0; index < 3; index++) {
            if (index > 0) {
                this.MyCardsMaskList[index].node.active = true;
                this.MyCardsNodesList[index].node.active = true;
                this.MyCardsNodesList[index].spriteFrame = this.DefaultJokerSprite[1];

                this.BankerCardsMaskList[index].node.active = true;
                this.BankerCardsNodesList[index].node.active = true;
                this.BankerCardsNodesList[index].spriteFrame = this.DefaultJokerSprite[1];
            }
            this.PublicCardsNodeList[index].spriteFrame = this.DefaultJokerSprite[1]; ////这是为了让下次洗牌时
            ///让三张公牌反面显示@！！！！！！！！
        }
    },

    resetTablefunc: function resetTablefunc() {
        MYHandCardsType = [];
        MYHandCardsValue = [];
        BANKERHandCardsType = [];
        BANKERHandCardsValue = [];
        CardsResultType = [];
        PUBLICCardsValue = [];
        PUBLICCardsType = [];
        this.WinnerAnimation.node.active = false; ///隐藏桌面的条状图标
        this.MyWinnerTip.node.active = false;
        this.BankerWinnerTip.node.active = false;
        this.NextRoundBtn.node.active = false;

        for (var i = 0; i < 2; i++) {
            this.NodeList[i].active = true;
            this.NodeList[i].scale = cc.v2(1, 1);

            this.JokerMaskList[i].node.active = true;
        }
        this.NodeList[0].position = cc.v2(0, 0);
        this.NodeList[1].position = cc.v2(0, 0);

        for (var index = 0; index < 3; index++) {
            this.MyCardsMaskList[index].node.active = true;
            this.MyCardsNodesList[index].node.active = false; //洗牌前，隐藏自己的三张牌
            this.BankerCardsMaskList[index].node.active = true;
            this.BankerCardsNodesList[index].node.active = false;
            //this.PublicCardsMaskList[index].node.active = true;
            this.PublicCardsNodeList[index].node.active = false; /////洗牌前，下一把开始前，隐藏三张共有牌
        }

        IsBOOl = false;
    },

    countTimes: function countTimes() {
        var tempInt = 1;

        this.schedule(function () {
            if (tempInt > 0) {
                this.TimeCounts.node.active = true;
                this.TimeCounts.string = "The game starts counting down……" + tempInt;
            } else {
                this.TimeCounts.node.active = false;
            }
            tempInt -= 1;
        }, 1);
    },

    onstartGame: function onstartGame() {

        this.giveCardAction();
        this.StartBtn.node.active = false; ///不让激活才能隐藏，就是说执行完startbtn后，要让按钮消失
        this.SeeCardsBtn.node.active = true; //激活才能显示出来
        this.PackBtn.node.active = true;
        this.SideShowBtn.node.active = true;

        for (var i = 0; i < 2; i++) {
            this.NodeList[i].active = true;
            this.JokerMaskList[i].node.active = true;
        }

        for (var i = 0; i < 3; i++) {
            this.PublicCardsNodeList[i].node.active = true;
        }
        //cc.log("zzzzzz")
        this.BothHandCardsValueGive(); //发牌！！！！！
    },

    /*双方发牌 */
    BothHandCardsValueGive: function BothHandCardsValueGive() {

        for (var i = 0; i < 3; i++) {
            var temp = 100; //黑白颜色的joker
            var temp1 = 101; //彩色的joker
            if (i == 0) {
                temp = Math.ceil(99 + (100 - 99 + 1) * Math.random());
                switch (temp) {
                    case 100:
                        temp1 = 101;
                        break;
                    case 101:
                        temp1 = 100;
                        break;
                    default:
                        break;
                }

                MYHandCardsValue.push(temp);
                BANKERHandCardsValue.push(temp1);
                temp = 0; //   Joker无类型
                temp1 = 0; //   Joker无类型
                MYHandCardsType.push(temp);
                BANKERHandCardsType.push(temp1);
            } else {

                temp = Math.ceil(1 + (3 - 1 + 1) * Math.random());
                temp1 = Math.ceil(1 + (3 - 1 + 1) * Math.random());
                MYHandCardsType.push(temp);
                BANKERHandCardsType.push(temp1);
                temp = Math.ceil(2 + (13 - 2 + 1) * Math.random());
                temp1 = Math.ceil(2 + (13 - 2 + 1) * Math.random());
                MYHandCardsValue.push(temp);
                BANKERHandCardsValue.push(temp1);
            }

            var publiccard0 = 0;
            var publiccard1 = 0;
            var publiccard2 = 0;
            // for(var i=0;i<3;i++)
            // {
            //     publiccard = Math.ceil((1 + (3 - 1 + 1) * Math.random()));
            //     // publiccard1 = Math.ceil((1 + (3 - 1 + 1) * Math.random()));
            //     // publiccard2 = Math.ceil((1 + (3 - 1 + 1) * Math.random()));
            //     // PUBLICCardsType.push(publiccard0);
            //     // PUBLICCardsType.push(publiccard1);
            //     PUBLICCardsType.push(publiccard);
            //     publiccard = Math.ceil((2 + (13 - 2 + 1) * Math.random()));
            //     // publiccard1 = Math.ceil((2 + (13 - 2 + 1) * Math.random()));
            //     // publiccard2 = Math.ceil((2 + (13 - 2 + 1) * Math.random()));
            //     // PUBLICCardsValue.push(publiccard0);
            //     // PUBLICCardsValue.push(publiccard1);
            //     PUBLICCardsValue.push(publiccard);

            // }

            // publiccard0 = Math.ceil((1 + (3 - 1 + 1) * Math.random()));
            // publiccard1 = Math.ceil((1 + (3 - 1 + 1) * Math.random()));
            // publiccard2 = Math.ceil((1 + (3 - 1 + 1) * Math.random()));
            // PUBLICCardsType.push(publiccard0);
            // PUBLICCardsType.push(publiccard1);
            // PUBLICCardsType.push(publiccard2);
            // publiccard0 = Math.ceil((2 + (13 - 2 + 1) * Math.random()));
            // publiccard1 = Math.ceil((2 + (13 - 2 + 1) * Math.random()));
            // publiccard2 = Math.ceil((2 + (13 - 2 + 1) * Math.random()));
            // PUBLICCardsValue.push(publiccard0);
            // PUBLICCardsValue.push(publiccard1);
            // PUBLICCardsValue.push(publiccard2);


            var publiccard = 0;
            publiccard = Math.ceil(1 + (3 - 1 + 1) * Math.random());
            PUBLICCardsType.push(publiccard);
            publiccard = Math.ceil(2 + (13 - 2 + 1) * Math.random());
            PUBLICCardsValue.push(publiccard);
        }

        this.checkHandCard();
        cc.log("1value :" + MYHandCardsValue + "    1type:" + MYHandCardsType);
        cc.log("2value :" + BANKERHandCardsValue + "    2type:" + BANKERHandCardsType);
        cc.log("3value :" + PUBLICCardsValue + "    3type:" + PUBLICCardsType);
    },

    /*检测双方手中有同样的牌  重复就重新发牌 非Joker*/
    checkHandCard: function checkHandCard() {

        //检测双方自己手牌中有无重复牌 第二张牌开始比 
        for (var i = 1; i < 3; i++) {
            for (var j = 3 - i; j > 1; j--) {
                var temp = 0;
                var temp1 = 0;
                // 自己                 /////？？？？？？？？这是为了干嘛，，检测同样的牌？
                if (MYHandCardsType[i] == MYHandCardsType[j] && MYHandCardsValue[i] == MYHandCardsValue[j]) {
                    temp = Math.ceil(1 + (3 - 1 + 1) * Math.random());
                    temp1 = Math.ceil(2 + (13 - 2 + 1) * Math.random());
                    if (temp != MYHandCardsType[i] && temp1 != MYHandCardsValue[i]) {
                        MYHandCardsType[i] = temp;
                        MYHandCardsValue[i] = temp1;
                    } else {
                        this.checkHandCard();
                    }
                }

                //庄家
                if (BANKERHandCardsType[i] == BANKERHandCardsType[j] && BANKERHandCardsValue[i] == BANKERHandCardsValue[j]) {
                    temp = Math.ceil(1 + (3 - 1 + 1) * Math.random()); ///向上取整Math.ceil
                    temp1 = Math.ceil(2 + (13 - 2 + 1) * Math.random());
                    if (temp != BANKERHandCardsType[i] && temp1 != BANKERHandCardsValue[i]) {

                        BANKERHandCardsType[i] = temp;
                        BANKERHandCardsValue[i] = temp1;
                    } else {
                        this.checkHandCard();
                    }
                }

                if (MYHandCardsType[i] == BANKERHandCardsType[j] && MYHandCardsValue[i] == BANKERHandCardsValue[j]) {
                    temp = Math.ceil(1 + (3 - 1 + 1) * Math.random());
                    temp1 = Math.ceil(2 + (13 - 2 + 1) * Math.random());
                    if (temp != MYHandCardsType[i] && temp1 != MYHandCardsValue[i]) {

                        MYHandCardsType[i] = temp;
                        MYHandCardsValue[i] = temp1;
                    } else {
                        this.checkHandCard();
                    }
                }
            }

            if (MYHandCardsType[1] == BANKERHandCardsType[1] && MYHandCardsValue[1] == BANKERHandCardsValue[1]) {
                temp = Math.ceil(1 + (3 - 1 + 1) * Math.random());
                temp1 = Math.ceil(2 + (13 - 2 + 1) * Math.random());
                if (temp != MYHandCardsType[1] && temp1 != MYHandCardsValue[1]) {

                    MYHandCardsType[1] = temp;
                    MYHandCardsValue[1] = temp1;
                } else {
                    this.checkHandCard();
                }
            }
        }
    },

    /*SideShowBtn 按钮响应函数 */
    showHandCards: function showHandCards() {
        for (var i = 0; i < 2; i++) {
            this.NodeList[i].active = true;
            this.JokerMaskList[i].node.active = false;
        }
        this.SideShowBtn.node.active = false;
        this.PackBtn.node.active = false;

        for (var index = 0; index < 3; index++) {
            ///让双方的玩家牌都显示出正面
            if (index == 0) {
                ////如果是第一张百搭牌的时候
                this.MyCardsMaskList[index].node.active = true; ////如果是false，第一张排不是灰色的了？
                this.BankerCardsMaskList[index].node.active = true;
            } else {
                this.MyCardsMaskList[index].node.active = false;
                this.BankerCardsMaskList[index].node.active = false;
            }

            this.MyCardsNodesList[index].node.active = true; ////true是为了让自己的三张牌显示出来，否则的话，就不能显示三张牌
            var local = MYHandCardsValue[index] - 2 + ((MYHandCardsType[index] - 1) * 13 - 1);
            this.MyCardsNodesList[index].spriteFrame = this.CardsSpritesList[local];

            this.BankerCardsNodesList[index].node.active = true;
            local = BANKERHandCardsValue[index] - 2 + ((BANKERHandCardsType[index] - 1) * 13 - 1);
            this.BankerCardsNodesList[index].spriteFrame = this.CardsSpritesList[local];

            // cc.log("Banker:  " + BANKERHandCardsType[index] + "  "+ BANKERHandCardsValue[index]);
            // cc.log("My:  "+ MYHandCardsType[index] + "  "+ MYHandCardsValue[index]);
        }
    },

    giveCardAction: function giveCardAction() {
        ///????

        for (var index = 1; index < 3; index++) {
            this.MyCardsNodesList[index].node.active = true;
            this.MyCardsMaskList[index].node.active = true;
            this.MyCardsNodesList[index].node.position = cc.v2(-60, 0);
            this.MyCardsNodesList[index].node.angle = 22;
            this.BankerCardsNodesList[index].node.position = cc.v2(-60, 0);
            this.BankerCardsNodesList[index].node.angle = 22;
            this.BankerCardsMaskList[index].node.active = true;
            this.BankerCardsNodesList[index].node.active = true;

            var rotateTo1 = cc.rotateTo(0.2, 0);
            var moveTo1 = cc.moveTo(0.2, cc.v2(0, 18)); //移动
            var rotateTo = cc.rotateTo(0.2, 0); //旋转
            var moveTo = cc.moveTo(0.2, cc.v2(0, 18)); //移动导致定的坐标
            if (index == 2) {
                ///？？
                rotateTo = cc.rotateTo(0.2, -22);
                moveTo = cc.moveTo(0.2, cc.v2(60, 0));

                rotateTo1 = cc.rotateTo(0.2, -22);
                moveTo1 = cc.moveTo(0.2, cc.v2(60, 0));
            }

            this.MyCardsNodesList[index].node.runAction(cc.spawn(rotateTo, moveTo)); ///runAction，节点运行这个action动作
            this.BankerCardsNodesList[index].node.runAction(cc.spawn(rotateTo1, moveTo1)); ///
        }
    },

    /*SeeBtn 按钮响应函数 */
    showMyHandCards: function showMyHandCards() {
        for (var i = 0; i < 2; i++) {
            this.NodeList[i].active = true; ///如果是false，那么会隐藏庄家和自己的共6张牌
            this.JokerMaskList[i].node.active = false;
        }

        this.SideShowBtn.node.active = true;
        this.PackBtn.node.active = true;
        this.SeeCardsBtn.node.active = false; //隐藏seebtn按钮

        for (var index = 0; index < 3; index++) {
            this.MyCardsNodesList[index].node.active = true;
            if (index == 0) {
                this.MyCardsMaskList[index].node.active = true;
            } else {
                this.MyCardsMaskList[index].node.active = false; //// 如果是true会变灰色
            }

            var local = MYHandCardsValue[index] - 2 + ((MYHandCardsType[index] - 1) * 13 - 1); ////可以显示出牌的正面
            this.MyCardsNodesList[index].spriteFrame = this.CardsSpritesList[local]; ////让牌从反面变成正面的效果
            var local_public = PUBLICCardsValue[index] - 2 + ((PUBLICCardsType[index] - 1) * 13 - 1);
            this.PublicCardsNodeList[index].spriteFrame = this.CardsSpritesList[local_public];
        }
    },

    //开牌动画 所有牌 包括joker
    showJokerCardsAction: function showJokerCardsAction(isShowBothHandCards) {
        for (var index = 0; index < 3; index++) {

            if (isShowBothHandCards) {
                /* if (index == 0) {
                    this.MyCardsMaskList[index].node.active = true;
                    this.BankerCardsMaskList[index].active = true;
                } else {
                    this.MyCardsMaskList[index].node.active = false;
                    this.BankerCardsMaskList[index].active = false;
                } */

                var local = MYHandCardsValue[index] - 2 + ((MYHandCardsType[index] - 1) * 13 - 1);
                this.MyCardsNodesList[index].active = true;
                this.MyCardsNodesList[index].spriteFrame = this.CardsSpritesList[local];

                local = BANKERHandCardsValue[index] - 2 + ((BANKERHandCardsType[index] - 1) * 13 - 1);
                this.BankerCardsNodesList[index].active = true;
                this.BankerCardsNodesList[index].spriteFrame = this.CardsSpritesList[local];

                if (this.SeeCardsBtn.node.active == true) {
                    this.SeeCardsBtn.node.active = false;
                    for (var index = 1; index < 3; index++) {
                        this.MyCardsNodesList[index].node.position = cc.v2(-60, 0);
                        this.MyCardsNodesList[index].node.angle = 22;
                        this.BankerCardsNodesList[index].node.position = cc.v2(-60, 0);
                        this.BankerCardsNodesList[index].node.angle = 22;
                        var rotateTo1 = cc.rotateTo(0.2, 0);
                        var moveTo1 = cc.moveTo(0.2, cc.v2(0, 18));
                        var rotateTo = cc.rotateTo(0.2, 0);
                        var moveTo = cc.moveTo(0.2, cc.v2(0, 18));
                        if (index == 2) {
                            rotateTo = cc.rotateTo(0.2, -22);
                            moveTo = cc.moveTo(0.2, cc.v2(60, 0));

                            rotateTo1 = cc.rotateTo(0.2, -22);
                            moveTo1 = cc.moveTo(0.2, cc.v2(60, 0));
                        }

                        this.MyCardsNodesList[index].node.runAction(cc.spawn(rotateTo, moveTo));
                        this.BankerCardsNodesList[index].node.runAction(cc.spawn(rotateTo1, moveTo1));
                    }
                } else {

                    for (var index = 1; index < 3; index++) {
                        this.BankerCardsNodesList[index].node.position = cc.v2(-60, 0);
                        this.BankerCardsNodesList[index].node.angle = 22;

                        var rotateTo = cc.rotateTo(0.2, 0);
                        var moveTo = cc.moveTo(0.2, cc.v2(0, 18));
                        if (index == 2) {
                            rotateTo = cc.rotateTo(0.2, -22);
                            moveTo = cc.moveTo(0.2, cc.v2(60, 0));
                        }

                        this.BankerCardsNodesList[index].node.runAction(cc.spawn(rotateTo, moveTo));
                    }
                }
            } else {

                if (index == 0) {
                    this.MyCardsMaskList[index].node.active = true;
                    this.BankerCardsMaskList[index].node.active = true;
                } else {
                    this.MyCardsMaskList[index].node.active = false;
                    this.BankerCardsMaskList[index].node.active = true;
                }

                var local = MYHandCardsValue[index] - 2 + ((MYHandCardsType[index] - 1) * 13 - 1);
                this.MyCardsNodesList[index].active = true;
                this.MyCardsMaskList[index].node.active = true;
                this.MyCardsNodesList[index].spriteFrame = this.CardsSpritesList[local];

                for (var index = 1; index < 3; index++) {
                    this.MyCardsNodesList[index].node.position = cc.v2(-60, 0);
                    this.MyCardsNodesList[index].node.angle = 22;
                    var rotateTo = cc.rotateTo(0.2, 0);
                    var moveTo = cc.moveTo(0.2, cc.v2(0, 18));
                    if (index == 2) {
                        rotateTo = cc.rotateTo(0.2, -22);
                        moveTo = cc.moveTo(0.2, cc.v2(60, 0));
                    }

                    this.MyCardsNodesList[index].node.runAction(cc.spawn(rotateTo, moveTo));
                }
            }
        }
    },

    showJokerCards: function showJokerCards() {

        this.NodeList[0].active = true;
        this.NodeList[1].active = true;

        this.sortCardANDTypeNoJoker(MYHandCardsValue, MYHandCardsType);
        this.sortCardANDTypeNoJoker(BANKERHandCardsValue, BANKERHandCardsType);

        if (this.checkbaozi(MYHandCardsValue, MYHandCardsType) > 0) {
            CardsResultType.push(60);
        } else if (this.checktonghuashun(MYHandCardsValue, MYHandCardsType) > 0) {
            CardsResultType.push(50);
        } else if (this.checktonghua(MYHandCardsValue, MYHandCardsType) > 0) {
            CardsResultType.push(40);
        } else if (this.checkshunzi(MYHandCardsValue, MYHandCardsType) > 0) {
            CardsResultType.push(30);
        } else if (this.checkdanzhang(MYHandCardsValue, MYHandCardsType) > 0) {
            CardsResultType.push(20);
        } else {
            CardsResultType.push(10);
        }

        if (this.checkbaozi(BANKERHandCardsValue, BANKERHandCardsType) > 0) {
            CardsResultType.push(60);
        } else if (this.checktonghuashun(BANKERHandCardsValue, BANKERHandCardsType) > 0) {
            CardsResultType.push(50);
        } else if (this.checktonghua(BANKERHandCardsValue, BANKERHandCardsType) > 0) {
            CardsResultType.push(40);
        } else if (this.checkshunzi(BANKERHandCardsValue, BANKERHandCardsType) > 0) {
            CardsResultType.push(30);
        } else if (this.checkdanzhang(BANKERHandCardsValue, BANKERHandCardsType) > 0) {
            CardsResultType.push(20);
        } else {
            CardsResultType.push(10);
        }
    },

    /*数组所有牌排序  从大到小*/
    sortCardANDType: function sortCardANDType(CardHandValue, CardHandType) {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j + 1 < 3 - i; j++) {
                if (CardHandValue[j] > CardHandValue[j + 1]) {
                    var tempvalue = CardHandValue[j];
                    var tempvalue1 = CardHandValue[j + 1];
                    var temptype = CardHandType[j];
                    var temptype1 = CardHandType[j + 1];
                    CardHandValue[j] = tempvalue1;
                    CardHandValue[j + 1] = tempvalue;
                    CardHandType[j] = temptype1;
                    CardHandType[j + 1] = temptype;
                }
            }
        }
    },

    /*排序 非joker牌 从大到小*/
    sortCardANDTypeNoJoker: function sortCardANDTypeNoJoker(CardHandValue, CardHandType) {
        for (var i = 0; i < 3; i++) {
            for (var j = 1; j < 3 - 1 - i; j++) {
                if (CardHandValue[j] > CardHandValue[j + 1]) {
                    var tempvalue = CardHandValue[j];
                    var tempvalue1 = CardHandValue[j + 1];
                    var temptype = CardHandType[j];
                    var temptype1 = CardHandType[j + 1];
                    CardHandValue[j] = tempvalue1;
                    CardHandValue[j + 1] = tempvalue;
                    CardHandType[j] = temptype1;
                    CardHandType[j + 1] = temptype;
                }
            }
        }
    },

    /*检测豹子*/
    checkbaozi: function checkbaozi(CardHandValue, CardHandType) {

        if (CardHandValue[1] == CardHandValue[2]) {
            var temp = this.checkIsExsitType(CardHandValue[1]);
            if (temp != 0) {
                CardHandValue[0] = CardHandValue[1];
                CardHandType[0] = temp;
                return 60;
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    },

    //检查双方不存在哪个花色 
    checkIsExsitType: function checkIsExsitType(value) {
        var CountsRepeat = 0;
        var noexist = [];

        for (var index = 0; index < 3; index++) {
            if (MYHandCardsValue[index] == value) {
                if (MYHandCardsType[index] != 0) {
                    noexist.push(MYHandCardsType[index]);
                }

                var count = 0;
                for (var i = 0; i < noexist.length; i++) {
                    if (noexist[i] == MYHandCardsType[index]) {
                        count += 1;
                    }
                }

                /*     for(var i= 1 ;i<5 ;i++){
                        for(var j = 0;j<noexist.length;j++){
                            if(noexist[j]== i){
                                count+=1;
                            }
                        }
                        
                    } */

                if (count == 0 && MYHandCardsType[index] != 0) {
                    noexist.push(MYHandCardsType[index]);
                }
            }

            if (BANKERHandCardsValue[index] == value) {
                //noexist.push(BANKERHandCardsType[index]);
                var count = 0;
                for (var i = 0; i < noexist.length; i++) {
                    if (noexist[i] == BANKERHandCardsType[index]) {
                        count += 1;
                    }
                }

                if (count == 0 && BANKERHandCardsType[index] != 0) {
                    noexist.push(BANKERHandCardsType[index]);
                }
            }
        }

        if (noexist.length == 4) {
            return 0;
        } else {
            var temp = 0;
            for (var index = 0; index < noexist.length; index++) {
                temp += noexist[index];
            }

            switch (temp) {
                case 10:
                    temp = 0;
                    break;
                case 0:

                    temp = Math.ceil(1 + (3 - 1 + 1) * Math.random());
                    break;
                case 1:
                    temp = 2;
                    break;
                case 2:
                    temp = 1;
                    break;
                case 3:
                    if (noexist.length == 2) {
                        temp = 3;
                    } else {
                        temp = 1;
                    }

                    break;
                case 4:
                    if (noexist.length == 2) {
                        temp = 2;
                    } else {
                        temp = 1;
                    }

                    break;
                case 5:
                    if (noexist.length == 2) {
                        if (noexist[1] - noexist[0] == 1 || noexist[0] - noexist[1] == 1) {
                            temp = 1;
                        } else {
                            temp = 2;
                        }
                    }

                    break;
                case 6:
                    if (noexist.length == 2) {
                        temp = 1;
                    } else {
                        temp = 4;
                    }

                    break;
                case 7:
                    temp = 1;
                    break;
                case 8:
                    temp = 2;
                    break;
                case 9:
                    temp = 1;
                    break;
                default:
                    break;
            }

            return temp;
        }
    },

    find: function find(arr, num) {
        var count = 0;

        if (arr.length == 0) {
            return 0;
        } else {
            for (var index = 0; index < arr.length; index++) {
                if (arr[index] != num) {
                    count += 1;
                }
            }
        }

        return count;
    },

    //检查新生成的值是否存在  true 为存在  false为不存在 
    checkTypeIsExsit: function checkTypeIsExsit(value, type) {
        var isexistmycardscount = 0;
        for (var index = 0; index < 3; index++) {
            if (value != MYHandCardsValue[index]) {
                isexistmycardscount += 1;
            } else if (value == MYHandCardsValue[index]) {
                if (type != MYHandCardsType[index]) {
                    isexistmycardscount += 1;
                }
            }
        }

        var isexistbankercardscount = 0;
        for (var index = 0; index < 3; index++) {
            if (value != BANKERHandCardsValue[index]) {
                isexistbankercardscount += 1;
            } else if (value == BANKERHandCardsValue[index]) {
                if (type != BANKERHandCardsType[index]) {
                    isexistbankercardscount += 1;
                }
            }
        }

        if (isexistmycardscount == 3 && isexistbankercardscount == 3) {
            return false;
        } else {
            return true;
        }
    },

    /*检测同花顺*/
    checktonghuashun: function checktonghuashun(CardHandValue, CardHandType) {

        if (CardHandValue[2] == CardHandValue[1] + 1 && CardHandType[2] == CardHandType[1]) {

            if (CardHandValue[2] + 1 < 16 || CardHandValue[1] - 1 > 0) {
                var temp = this.checkTypeIsExsit(CardHandValue[2] + 1, CardHandType[2]);
                var temp1 = this.checkTypeIsExsit(CardHandValue[1] - 1, CardHandType[1]);
                if (temp == false) {
                    CardHandType[0] = CardHandType[2];
                    CardHandValue[0] = CardHandValue[2] + 1;
                    return 50;
                } else if (temp1 == false) {
                    CardHandType[0] = CardHandType[1];
                    CardHandValue[0] = CardHandValue[1] - 1;
                    return 50;
                } else {
                    return 0;
                }
            }
        } else if (CardHandValue[2] - 2 == CardHandValue[1] && CardHandType[2] == CardHandType[1]) {
            //判断例如2 ,4 同花
            if (CardHandValue[2] - 1 > 0) {
                var temp = this.checkTypeIsExsit(CardHandValue[2] - 1, CardHandType[2]);
                if (temp == false) {
                    CardHandType[0] = CardHandType[2];
                    CardHandValue[0] = CardHandValue[2] - 1;

                    return 50;
                } else {
                    return 0;
                }
            }
        } else {
            return 0;
        }
    },

    /*检测同花*/
    checktonghua: function checktonghua(CardHandValue, CardHandType) {
        if (CardHandType[1] == CardHandType[2]) {
            for (var num = 15; num >= 2; num--) {
                var temp = this.checkTypeIsExsit(num, CardHandType[1]);
                if (temp == false) {
                    CardHandValue[0] = num;
                    CardHandType[0] = CardHandType[1];
                    return 40;
                } else {
                    return 0;
                }
            }
        } else {
            return 0;
        }
    },

    /*检测顺子*/
    checkshunzi: function checkshunzi(CardHandValue, CardHandType) {
        if (CardHandValue[1] + 1 == CardHandValue[2]) {

            if (CardHandType[2] + 1 < 16) {
                var temp = this.checkIsExsitType(CardHandValue[2] + 1);
                var temp1 = this.checkIsExsitType(CardHandValue[1] - 1);

                if (temp != 0) {
                    CardHandType[0] = temp;
                    CardHandValue[0] = CardHandValue[2] + 1;

                    return 30;
                } else if (temp1 != 0) {
                    CardHandType[0] = temp1;
                    CardHandValue[0] = CardHandValue[1] - 1;

                    return 30;
                } else {
                    return 0;
                }
            } else {
                return 0;
            }
        } else if (CardHandValue[1] == CardHandValue[2] - 2) {
            var temp = this.checkIsExsitType(CardHandValue[2] - 1);
            if (temp != 0) {
                CardHandType[0] = temp;
                CardHandValue[0] = CardHandValue[2] - 1;

                return 30;
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    },

    /*检测单张*/
    checkdanzhang: function checkdanzhang(CardHandValue, CardHandType) {
        var temp = this.checkIsExsitType(CardHandValue[1]);
        var temp1 = this.checkIsExsitType(CardHandValue[2]);
        if (temp1 != 0) {
            CardHandType[0] = temp1;
            CardHandValue[0] = CardHandValue[2];
            return 10;
        } else if (temp != 0) {
            CardHandType[0] = temp;
            CardHandValue[0] = CardHandValue[1];
            return 10;
        } else {
            return 0;
        }
    }

    //,update (dt) {},
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=GameScene.js.map
        