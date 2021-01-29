(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/card_node.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ecb3a5dII1DWYX+R3g3YjYH', 'card_node', __filename);
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
        //# sourceMappingURL=card_node.js.map
        