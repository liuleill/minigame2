window.__require = function e(t, s, i) {
function a(n, c) {
if (!s[n]) {
if (!t[n]) {
var o = n.split("/");
o = o[o.length - 1];
if (!t[o]) {
var d = "function" == typeof __require && __require;
if (!c && d) return d(o, !0);
if (r) return r(o, !0);
throw new Error("Cannot find module '" + n + "'");
}
}
var h = s[n] = {
exports: {}
};
t[n][0].call(h.exports, function(e) {
return a(t[n][1][e] || e);
}, h, h.exports, e, t, s, i);
}
return s[n].exports;
}
for (var r = "function" == typeof __require && __require, n = 0; n < i.length; n++) a(i[n]);
return a;
}({
GameScene: [ function(e, t, s) {
"use strict";
cc._RF.push(t, "34d35qFUUtIf7p2KhmORnl4", "GameScene");
e("./card_node");
var i = [], a = [], r = [], n = [], c = [], o = [], d = [], h = !1;
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
cardmaskBtn0: {
default: null,
type: cc.Button
},
cardmaskBtn1: {
default: null,
type: cc.Button
},
cardmaskBtn2: {
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
start: function() {
this.onload();
},
onload: function() {
this.StartBtn.node.active = !0;
this.SeeCardsBtn.node.active = !1;
this.PackBtn.node.active = !1;
this.SideShowBtn.node.active = !1;
this.TimeCounts.node.active = !1;
this.NextRoundBtn.node.active = !1;
this.WinnerAnimation.node.active = !1;
this.BankerWinnerTip.node.active = !1;
this.MyWinnerTip.node.active = !1;
for (var e = 0; e < 2; e++) {
this.NodeList[e].active = !1;
this.JokerMaskList[e].node.active = !1;
}
for (e = 0; e < 3; e++) this.PublicCardsNodeList[e].node.active = !1;
cc.debug.setDisplayStats(!1);
},
BtnClickEvents: function(e, t) {
cc.log(t);
switch (t) {
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

case "card_mask0":
this.publiccardBtn0();
break;

case "card_mask1":
this.publiccardBtn1();
break;

case "card_mask2":
this.publiccardBtn2();
}
},
publiccardBtn0: function() {
this.JokerMaskList[0].spriteFrame = this.PublicCardsNodeList[0].spriteFrame;
a.splice(0, 1, o[0]);
r.splice(0, 1, d[0]);
cc.log("MyHandCardsValue: " + a);
},
publiccardBtn1: function() {
this.JokerMaskList[0].spriteFrame = this.PublicCardsNodeList[1].spriteFrame;
a.splice(0, 1, o[1]);
r.splice(0, 1, d[1]);
cc.log("MyHandCardsValue: " + a);
},
publiccardBtn2: function() {
this.JokerMaskList[0].spriteFrame = this.PublicCardsNodeList[2].spriteFrame;
a.splice(0, 1, o[2]);
r.splice(0, 1, d[2]);
cc.log("MyHandCardsValue: " + a);
},
onsideShowfunc: function() {
h || this.showJokerCards();
this.showHandCards();
this.showJokerCardsAction(!0);
this.scheduleOnce(this.showResultfunc, 2);
this.scheduleOnce(function() {
this.NextRoundBtn.node.active = !0;
}, 3);
},
showResultfunc: function() {
var e = 0;
cc.log(a);
cc.log(n);
if (i[0] > i[1]) {
e = i[0];
this.MyWinnerTip.node.active = !0;
this.BankerWinnerTip.node.active = !1;
} else if (i[0] < i[1]) {
e = i[1];
this.MyWinnerTip.node.active = !1;
this.BankerWinnerTip.node.active = !0;
} else {
for (var t = 0, s = 0, r = 0; r < 3; r++) {
s += a[r];
t += n[r];
}
cc.log(a);
cc.log("result: " + s);
cc.log("result1: " + t);
if (s > t) {
e = i[0];
this.MyWinnerTip.node.active = !0;
this.BankerWinnerTip.node.active = !1;
} else {
e = i[1];
this.MyWinnerTip.node.active = !1;
this.BankerWinnerTip.node.active = !0;
}
}
switch (e) {
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
}
this.WinnerAnimation.node.active = !0;
this.WinnerAnimation.play();
},
onseeCardsfunc: function() {
if (!h) {
this.showJokerCards();
h = !0;
}
this.showMyHandCards();
this.showJokerCardsAction(!1);
this.MyCardsNodesList[0].spriteFrame = !1;
this.BankerCardsNodesList[0].spriteFrame = !1;
this.scheduleOnce(function() {
this.BankerCardsNodesList[0].spriteFrame = this.DefaultJokerSprite[1];
}, 2);
},
dropCards: function() {
h || this.showJokerCards();
this.SideShowBtn.node.active = !1;
this.PackBtn.node.active = !1;
this.SeeCardsBtn.node.active = !1;
for (var e = 0; e < 3; e++) this.PublicCardsNodeList[e].node.active = !1;
this.showHandCards(!0);
for (e = 0; e < 3; e++) {
var t = cc.scaleTo(.3, 0), s = cc.moveTo(.3, cc.v2(0, 150)), i = cc.scaleTo(.3, 0), a = cc.moveTo(.3, cc.v2(0, -150));
this.MyCardsMaskList[e].node.active = !0;
this.MyCardsMaskList[e].spriteFrame = this.cardBlock;
this.BankerCardsMaskList[e].node.active = !0;
this.BankerCardsMaskList[e].node.active = !0;
}
t = cc.scaleTo(.3, 0), s = cc.moveTo(.3, cc.v2(0, 150));
this.NodeList[0].runAction(cc.sequence(s, t));
i = cc.scaleTo(.3, 0), a = cc.moveTo(.3, cc.v2(0, -150));
this.NodeList[1].runAction(cc.sequence(a, i));
this.scheduleOnce(function() {
this.NextRoundBtn.node.active = !0;
}, 1);
},
onPackBtn: function() {
this.dropCards();
},
onnextRound: function() {
this.MyCardsNodesList[0].spriteFrame = !1;
this.BankerCardsNodesList[0].spriteFrame = !1;
this.resetTablefunc();
this.countTimes();
this.scheduleOnce(function() {
this.unscheduleAllCallbacks();
this.BothHandCardsValueGive();
this.NextRoundBtn.node.active = !1;
this.SeeCardsBtn.node.active = !0;
this.SideShowBtn.node.active = !0;
this.PackBtn.node.active = !0;
this.TimeCounts.node.active = !1;
this.StartBtn.node.active = !1;
for (var e = 0; e < 2; e++) {
this.NodeList[e].active = !0;
this.JokerMaskList[e].node.active = !0;
}
for (e = 0; e < 3; e++) this.PublicCardsNodeList[e].node.active = !0;
this.giveCardAction();
this.showDefault();
}, 1);
},
showDefault: function() {
this.MyCardsNodesList[0].node.active = !0;
this.MyCardsMaskList[0].node.active = !0;
this.MyCardsNodesList[0].spriteFrame = this.DefaultJokerSprite[1];
this.MyCardsMaskList[0].spriteFrame = this.cardBlock;
this.BankerCardsMaskList[0].node.active = !0;
this.BankerCardsNodesList[0].node.active = !0;
this.BankerCardsNodesList[0].spriteFrame = this.DefaultJokerSprite[0];
this.BankerCardsMaskList[0].spriteFrame = this.cardBlock;
for (var e = 0; e < 3; e++) {
if (e > 0) {
this.MyCardsMaskList[e].node.active = !0;
this.MyCardsNodesList[e].node.active = !0;
this.MyCardsNodesList[e].spriteFrame = this.DefaultJokerSprite[1];
this.BankerCardsMaskList[e].node.active = !0;
this.BankerCardsNodesList[e].node.active = !0;
this.BankerCardsNodesList[e].spriteFrame = this.DefaultJokerSprite[1];
}
this.PublicCardsNodeList[e].spriteFrame = this.DefaultJokerSprite[1];
}
this.MyCardsNodesList[0].spriteFrame = !1;
this.BankerCardsNodesList[0].spriteFrame = !1;
},
resetTablefunc: function() {
r = [];
a = [];
c = [];
n = [];
i = [];
o = [];
d = [];
this.WinnerAnimation.node.active = !1;
this.MyWinnerTip.node.active = !1;
this.BankerWinnerTip.node.active = !1;
this.NextRoundBtn.node.active = !1;
for (var e = 0; e < 2; e++) {
this.NodeList[e].active = !0;
this.NodeList[e].scale = cc.v2(1, 1);
this.JokerMaskList[e].node.active = !0;
}
this.NodeList[0].position = cc.v2(0, 0);
this.NodeList[1].position = cc.v2(0, 0);
for (var t = 0; t < 3; t++) {
this.MyCardsMaskList[t].node.active = !0;
this.MyCardsNodesList[t].node.active = !1;
this.BankerCardsMaskList[t].node.active = !0;
this.BankerCardsNodesList[t].node.active = !1;
this.PublicCardsNodeList[t].node.active = !1;
}
h = !1;
},
countTimes: function() {
var e = 1;
this.schedule(function() {
if (e > 0) {
this.TimeCounts.node.active = !0;
this.TimeCounts.string = "The game starts counting down……" + e;
} else this.TimeCounts.node.active = !1;
e -= 1;
}, 1);
},
onstartGame: function() {
this.giveCardAction();
this.StartBtn.node.active = !1;
this.SeeCardsBtn.node.active = !0;
this.PackBtn.node.active = !0;
this.SideShowBtn.node.active = !0;
for (var e = 0; e < 2; e++) {
this.NodeList[e].active = !0;
this.JokerMaskList[e].node.active = !1;
}
for (e = 0; e < 3; e++) this.PublicCardsNodeList[e].node.active = !0;
this.BothHandCardsValueGive();
this.MyCardsNodesList[0].spriteFrame = !1;
this.BankerCardsNodesList[0].spriteFrame = !1;
},
BothHandCardsValueGive: function() {
for (var e = 0; e < 3; e++) {
var t = 100, s = 101;
if (0 == e) {
switch (t = Math.ceil(99 + 2 * Math.random())) {
case 100:
s = 101;
break;

case 101:
s = 100;
}
a.push(t);
n.push(s);
t = 0;
s = 0;
r.push(t);
c.push(s);
} else {
t = Math.ceil(1 + 3 * Math.random());
s = Math.ceil(1 + 3 * Math.random());
r.push(t);
c.push(s);
t = Math.ceil(2 + 12 * Math.random());
s = Math.ceil(2 + 12 * Math.random());
a.push(t);
n.push(s);
}
var i = 0;
i = Math.ceil(1 + 3 * Math.random());
d.push(i);
i = Math.ceil(2 + 12 * Math.random());
o.push(i);
}
this.checkHandCard();
cc.log("1value :" + a + "    1type:" + r);
cc.log("2value :" + n + "    2type:" + c);
cc.log("3value :" + o + "    3type:" + d);
},
checkHandCard: function() {
for (var e = 0; e < 3; e++) for (var t = 3 - e; t > 0; t--) {
var s = 0, i = 0;
if (d[e] == d[t] && o[e] == o[t]) {
s = Math.ceil(1 + 3 * Math.random());
i = Math.ceil(2 + 12 * Math.random());
if (s != d[e] && i != o[e]) {
d[e] = s;
o[e] = i;
} else this.checkHandCard();
}
if (r[e] == d[t] && a[e] == o[t]) {
s = Math.ceil(1 + 3 * Math.random());
i = Math.ceil(2 + 12 * Math.random());
if (s != r[e] && i != a[e]) {
r[e] = s;
a[e] = i;
} else this.checkHandCard();
}
if (c[e] == d[t] && n[e] == o[t]) {
s = Math.ceil(1 + 3 * Math.random());
i = Math.ceil(2 + 12 * Math.random());
if (s != r[e] && i != n[e]) {
c[e] = s;
n[e] = i;
} else this.checkHandCard();
}
}
for (e = 1; e < 3; e++) {
for (t = 3 - e; t > 1; t--) {
s = 0, i = 0;
if (r[e] == r[t] && a[e] == a[t]) {
s = Math.ceil(1 + 3 * Math.random());
i = Math.ceil(2 + 12 * Math.random());
if (s != r[e] && i != a[e]) {
r[e] = s;
a[e] = i;
} else this.checkHandCard();
}
if (c[e] == c[t] && n[e] == n[t]) {
s = Math.ceil(1 + 3 * Math.random());
i = Math.ceil(2 + 12 * Math.random());
if (s != c[e] && i != n[e]) {
c[e] = s;
n[e] = i;
} else this.checkHandCard();
}
if (r[e] == c[t] && a[e] == n[t]) {
s = Math.ceil(1 + 3 * Math.random());
i = Math.ceil(2 + 12 * Math.random());
if (s != r[e] && i != a[e]) {
r[e] = s;
a[e] = i;
} else this.checkHandCard();
}
}
if (r[1] == c[1] && a[1] == n[1]) {
s = Math.ceil(1 + 3 * Math.random());
i = Math.ceil(2 + 12 * Math.random());
if (s != r[1] && i != a[1]) {
r[1] = s;
a[1] = i;
} else this.checkHandCard();
}
}
},
showHandCards: function() {
for (var e = 0; e < 2; e++) {
this.NodeList[e].active = !0;
this.JokerMaskList[e].node.active = !1;
}
this.SideShowBtn.node.active = !1;
this.PackBtn.node.active = !1;
for (var t = 0; t < 3; t++) {
if (0 == t) {
this.MyCardsMaskList[t].node.active = !0;
this.BankerCardsMaskList[t].node.active = !0;
} else {
this.MyCardsMaskList[t].node.active = !1;
this.BankerCardsMaskList[t].node.active = !1;
}
this.MyCardsNodesList[t].node.active = !0;
var s = a[t] - 2 + (13 * (r[t] - 1) - 1);
this.MyCardsNodesList[t].spriteFrame = this.CardsSpritesList[s];
this.BankerCardsNodesList[t].node.active = !0;
s = n[t] - 2 + (13 * (c[t] - 1) - 1);
this.BankerCardsNodesList[t].spriteFrame = this.CardsSpritesList[s];
}
this.giveBankeroneCard();
},
giveBankeroneCard: function() {
this.JokerMaskList[1].spriteFrame = this.PublicCardsNodeList[0].spriteFrame;
a.splice(0, 1, o[0]);
r.splice(0, 1, d[0]);
},
giveCardAction: function() {
for (var e = 1; e < 3; e++) {
this.MyCardsNodesList[e].node.active = !0;
this.MyCardsMaskList[e].node.active = !0;
this.MyCardsNodesList[e].node.position = cc.v2(-60, 0);
this.MyCardsNodesList[e].node.angle = 22;
this.BankerCardsNodesList[e].node.position = cc.v2(-60, 0);
this.BankerCardsNodesList[e].node.angle = 22;
this.BankerCardsMaskList[e].node.active = !0;
this.BankerCardsNodesList[e].node.active = !0;
var t = cc.rotateTo(.2, 0), s = cc.moveTo(.2, cc.v2(0, 18)), i = cc.rotateTo(.2, 0), a = cc.moveTo(.2, cc.v2(0, 18));
if (2 == e) {
i = cc.rotateTo(.2, -22);
a = cc.moveTo(.2, cc.v2(60, 0));
t = cc.rotateTo(.2, -22);
s = cc.moveTo(.2, cc.v2(60, 0));
}
this.MyCardsNodesList[e].node.runAction(cc.spawn(i, a));
this.BankerCardsNodesList[e].node.runAction(cc.spawn(t, s));
}
},
showMyHandCards: function() {
for (var e = 0; e < 2; e++) {
this.NodeList[e].active = !0;
this.JokerMaskList[e].node.active = !1;
}
this.SideShowBtn.node.active = !0;
this.PackBtn.node.active = !0;
this.SeeCardsBtn.node.active = !1;
for (var t = 0; t < 3; t++) {
this.MyCardsNodesList[t].node.active = !0;
this.MyCardsMaskList[t].node.active = 0 == t;
var s = a[t] - 2 + (13 * (r[t] - 1) - 1);
this.MyCardsNodesList[t].spriteFrame = this.CardsSpritesList[s];
var i = o[t] - 2 + (13 * (d[t] - 1) - 1);
this.PublicCardsNodeList[t].spriteFrame = this.CardsSpritesList[i];
}
},
showJokerCardsAction: function(e) {
for (var t = 0; t < 3; t++) if (e) {
var s = a[t] - 2 + (13 * (r[t] - 1) - 1);
this.MyCardsNodesList[t].active = !0;
this.MyCardsNodesList[t].spriteFrame = this.CardsSpritesList[s];
s = n[t] - 2 + (13 * (c[t] - 1) - 1);
this.BankerCardsNodesList[t].active = !0;
this.BankerCardsNodesList[t].spriteFrame = this.CardsSpritesList[s];
if (1 == this.SeeCardsBtn.node.active) {
this.SeeCardsBtn.node.active = !1;
for (t = 1; t < 3; t++) {
this.MyCardsNodesList[t].node.position = cc.v2(-60, 0);
this.MyCardsNodesList[t].node.angle = 22;
this.BankerCardsNodesList[t].node.position = cc.v2(-60, 0);
this.BankerCardsNodesList[t].node.angle = 22;
var i = cc.rotateTo(.2, 0), o = cc.moveTo(.2, cc.v2(0, 18)), d = cc.rotateTo(.2, 0), h = cc.moveTo(.2, cc.v2(0, 18));
if (2 == t) {
d = cc.rotateTo(.2, -22);
h = cc.moveTo(.2, cc.v2(60, 0));
i = cc.rotateTo(.2, -22);
o = cc.moveTo(.2, cc.v2(60, 0));
}
this.MyCardsNodesList[t].node.runAction(cc.spawn(d, h));
this.BankerCardsNodesList[t].node.runAction(cc.spawn(i, o));
}
} else for (t = 1; t < 3; t++) {
this.BankerCardsNodesList[t].node.position = cc.v2(-60, 0);
this.BankerCardsNodesList[t].node.angle = 22;
d = cc.rotateTo(.2, 0), h = cc.moveTo(.2, cc.v2(0, 18));
if (2 == t) {
d = cc.rotateTo(.2, -22);
h = cc.moveTo(.2, cc.v2(60, 0));
}
this.BankerCardsNodesList[t].node.runAction(cc.spawn(d, h));
}
} else {
if (0 == t) {
this.MyCardsMaskList[t].node.active = !0;
this.BankerCardsMaskList[t].node.active = !0;
} else {
this.MyCardsMaskList[t].node.active = !1;
this.BankerCardsMaskList[t].node.active = !0;
}
s = a[t] - 2 + (13 * (r[t] - 1) - 1);
this.MyCardsNodesList[t].active = !0;
this.MyCardsMaskList[t].node.active = !0;
this.MyCardsNodesList[t].spriteFrame = this.CardsSpritesList[s];
for (t = 1; t < 3; t++) {
this.MyCardsNodesList[t].node.position = cc.v2(-60, 0);
this.MyCardsNodesList[t].node.angle = 22;
d = cc.rotateTo(.2, 0), h = cc.moveTo(.2, cc.v2(0, 18));
if (2 == t) {
d = cc.rotateTo(.2, -22);
h = cc.moveTo(.2, cc.v2(60, 0));
}
this.MyCardsNodesList[t].node.runAction(cc.spawn(d, h));
}
}
},
showJokerCards: function() {
this.NodeList[0].active = !0;
this.NodeList[1].active = !0;
this.sortCardANDTypeNoJoker(a, r);
this.sortCardANDTypeNoJoker(n, c);
this.checkbaozi(a, r) > 0 ? i.push(60) : this.checktonghuashun(a, r) > 0 ? i.push(50) : this.checktonghua(a, r) > 0 ? i.push(40) : this.checkshunzi(a, r) > 0 ? i.push(30) : this.checkdanzhang(a, r) > 0 ? i.push(20) : i.push(10);
cc.log("玩家:" + i);
this.checkbaozi(n, c) > 0 ? i.push(60) : this.checktonghuashun(n, c) > 0 ? i.push(50) : this.checktonghua(n, c) > 0 ? i.push(40) : this.checkshunzi(n, c) > 0 ? i.push(30) : this.checkdanzhang(n, c) > 0 ? i.push(20) : i.push(10);
cc.log("电脑:" + i);
},
sortCardANDType: function(e, t) {
for (var s = 0; s < 3; s++) for (var i = 0; i + 1 < 3 - s; i++) if (e[i] > e[i + 1]) {
var a = e[i], r = e[i + 1], n = t[i], c = t[i + 1];
e[i] = r;
e[i + 1] = a;
t[i] = c;
t[i + 1] = n;
}
},
sortCardANDTypeNoJoker: function(e, t) {
for (var s = 0; s < 3; s++) for (var i = 1; i < 2 - s; i++) if (e[i] > e[i + 1]) {
var a = e[i], r = e[i + 1], n = t[i], c = t[i + 1];
e[i] = r;
e[i + 1] = a;
t[i] = c;
t[i + 1] = n;
}
},
checkbaozi: function(e, t) {
return e[1] == e[2] && e[1] == e[0] ? 60 : 0;
},
checkIsExsitType: function(e) {
for (var t = [], s = 0; s < 3; s++) {
if (a[s] == e) {
0 != r[s] && t.push(r[s]);
for (var i = 0, o = 0; o < t.length; o++) t[o] == r[s] && (i += 1);
0 == i && 0 != r[s] && t.push(r[s]);
}
if (n[s] == e) {
for (i = 0, o = 0; o < t.length; o++) t[o] == c[s] && (i += 1);
0 == i && 0 != c[s] && t.push(c[s]);
}
}
if (4 == t.length) return 0;
var d = 0;
for (s = 0; s < t.length; s++) d += t[s];
switch (d) {
case 10:
d = 0;
break;

case 0:
d = Math.ceil(1 + 3 * Math.random());
break;

case 1:
d = 2;
break;

case 2:
d = 1;
break;

case 3:
d = 2 == t.length ? 3 : 1;
break;

case 4:
d = 2 == t.length ? 2 : 1;
break;

case 5:
2 == t.length && (d = t[1] - t[0] == 1 || t[0] - t[1] == 1 ? 1 : 2);
break;

case 6:
d = 2 == t.length ? 1 : 4;
break;

case 7:
d = 1;
break;

case 8:
d = 2;
break;

case 9:
d = 1;
}
return d;
},
find: function(e, t) {
var s = 0;
if (0 == e.length) return 0;
for (var i = 0; i < e.length; i++) e[i] != t && (s += 1);
return s;
},
checkTypeIsExsit: function(e, t) {
for (var s = 0, i = 0; i < 3; i++) e != a[i] ? s += 1 : e == a[i] && t != r[i] && (s += 1);
var o = 0;
for (i = 0; i < 3; i++) e != n[i] ? o += 1 : e == n[i] && t != c[i] && (o += 1);
return 3 != s || 3 != o;
},
checktonghuashun: function(e, t) {
return t[2] == t[1] && t[0] == t[1] && (e[1] + 1 == e[2] && e[1] + 2 == e[0] || e[1] + 1 == e[2] && e[1] - 1 == e[0]) ? 50 : 0;
},
checktonghua: function(e, t) {
return t[1] == t[2] && t[1] == t[0] ? 40 : 0;
},
checkshunzi: function(e, t) {
return e[0] + 1 == e[1] && e[0] + 2 == e[2] ? 30 : e[0] - 1 == e[2] && e[0] - 2 == e[1] ? 30 : e[0] - 1 == e[1] && e[0] + 1 == e[2] ? 30 : 0;
},
checkduizi: function(e, t) {
return (t[0] == t[1] && t[0] != t[2] || t[0] != t[1] && t[0] == t[1] || t[0] != t[1] && t[0] != t[2]) && (e[0] == e[1] && e[0] != e[2] || e[0] == e[2] && e[0] != e[1] || e[1] == e[2] && e[0] != e[1]) ? 20 : 0;
},
checkdanzhang: function(e, t) {
var s = this.checkIsExsitType(e[1]), i = this.checkIsExsitType(e[2]);
if (0 != i) {
t[0] = i;
e[0] = e[2];
return 10;
}
if (0 != s) {
t[0] = s;
e[0] = e[1];
return 10;
}
return 0;
}
});
cc._RF.pop();
}, {
"./card_node": "card_node"
} ],
card_node: [ function(e, t, s) {
"use strict";
cc._RF.push(t, "ecb3a5dII1DWYX+R3g3YjYH", "card_node");
cc.Class({
extends: cc.Component,
properties: {
cardSpriteFrames: {
default: [],
type: cc.SpriteFrame
}
},
showCard: function(e, t) {
return cardSpriteFrames[e * t];
}
});
cc._RF.pop();
}, {} ],
define: [ function(e, t, s) {
"use strict";
cc._RF.push(t, "a1d38Eij/1NwaTpSOuT9WlN", "define");
Object.defineProperty(s, "__esModule", {
value: !0
});
var i = {};
i.cardValueMap = {
2: 2,
3: 3,
4: 4,
5: 5,
6: 6,
7: 7,
8: 8,
9: 9,
10: 10,
11: 11,
12: 12,
13: 13,
14: 14
};
i.cardTypeMap = {};
s.default = i;
t.exports = s.default;
cc._RF.pop();
}, {} ]
}, {}, [ "GameScene", "card_node", "define" ]);