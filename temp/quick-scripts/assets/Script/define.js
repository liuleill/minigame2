(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/define.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a1d38Eij/1NwaTpSOuT9WlN', 'define', __filename);
// Script/define.js

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Defines = {};
var cardShapeMap = {
  Spade: 4, //黑桃
  Heart: 3, //红桃
  Club: 2, //梅花
  Diamond: 1 //方片
};
Defines.cardValueMap = {
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  '10': 10,
  '11': 11,
  '12': 12,
  '13': 13,
  '14': 14
};
Defines.cardTypeMap = {};
exports.default = Defines;
module.exports = exports['default'];

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
        //# sourceMappingURL=define.js.map
        