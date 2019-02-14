exports.XAnimationInfo = class {
    constructor() {
        this.animeName = "";
        this.boneName = "";
        this.targetBone = null;

        this.keyType = 4;
        this.frameStartLv = 0;
        this.keyFrames = [];
        this.InverseMx = null;
    }
}