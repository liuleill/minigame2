"use strict";
cc._RF.push(module, 'ecb3a5dII1DWYX+R3g3YjYH', 'card_node');
// Script/card_node.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        cardSpriteFrames: {
            default: [],
            type: cc.SpriteFrame
        }
    },

    showCard: function showCard(cardValue, cardType) {
        return cardSpriteFrames[cardValue * cardType];
    }
});

cc._RF.pop();