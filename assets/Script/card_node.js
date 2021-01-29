cc.Class({
    extends: cc.Component,

    properties: {
        cardSpriteFrames:{
            default : [],
            type : cc.SpriteFrame,
        },
    },

    showCard: function(cardValue,cardType){
        return cardSpriteFrames[cardValue*cardType];
    },
});