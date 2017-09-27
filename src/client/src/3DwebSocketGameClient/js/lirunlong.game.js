var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var World = (function () {
    function World() {
        this.isUping = true;
    }
    World.prototype.init = function () {
    };
    World.prototype.render = function () {
    };
    World.prototype.update = function () {
        if (this.isUping) {
            //更新所有对象
            for (var obj in this.objs) {
                try {
                    this.objs.update();
                }
                catch (e) {
                    console.log(e);
                }
            }
            //渲染
            this.render();
            window.requestAnimationFrame(this.update);
            // setTimeout(world.updata,35);
        }
    };
    return World;
}());
var GameObjs = (function () {
    function GameObjs() {
        this.objArray = {};
    }
    GameObjs.prototype.update = function () {
        for (var k in this.objArray) {
            this.objArray[k].update();
        }
    };
    GameObjs.prototype.add = function (obj) {
        this.objArray[obj.name] = obj;
    };
    GameObjs.prototype.remove = function (key) {
        delete this.objArray[key];
    };
    GameObjs.prototype.get = function (key) {
        return this.objArray[key];
    };
    GameObjs.prototype.getSize = function () {
    };
    return GameObjs;
}());
var GameBehavior = (function () {
    function GameBehavior(name) {
        this.name = name;
    }
    GameBehavior.prototype.start = function () {
    };
    GameBehavior.prototype.update = function () {
        console.log(this.name + " updating");
    };
    return GameBehavior;
}());
var UsersMap = (function (_super) {
    __extends(UsersMap, _super);
    function UsersMap() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UsersMap;
}(GameBehavior));
var Vector3 = (function () {
    function Vector3(x, y, z) {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.x = x;
        this.y = y;
        this.z = z;
    }
    return Vector3;
}());
var test = function () {
    var g1 = new GameBehavior('g1');
    var g2 = new GameBehavior('g2');
    var g3 = new UsersMap("g3");
    var objs = new GameObjs();
    objs.add(g1);
    objs.add(g2);
    objs.add(g3);
    console.log(objs);
    objs.update();
};
test();
