"use strict";
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
/**
 *
 */
var GameBehavior = (function () {
    /**
     *
     */
    function GameBehavior(IDname, world) {
        this.name = IDname;
        this.world = world;
    }
    /**
     *
     */
    GameBehavior.prototype.start = function () {
        // TODO implement here
    };
    /**
     *
     */
    GameBehavior.prototype.update = function () {
        // TODO implement here
    };
    return GameBehavior;
}());
/**
 *
 */
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
/**
 * 游戏场景里面所有的游戏角色
 */
var GameUser = (function (_super) {
    __extends(GameUser, _super);
    function GameUser() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.aimPosition = new Vector3();
        //速度
        _this.speed = new Vector3();
        return _this;
    }
    return GameUser;
}(GameBehavior));
/**
 *
 */
var Log = (function () {
    function Log() {
    }
    /**
     * @param l
     */
    Log.log = function (l) {
        // TODO implement here
        console.log(l);
    };
    return Log;
}());
/**
 *
 */
var MainClass = (function () {
    /**
     *
     */
    function MainClass() {
    }
    /**
     *
     */
    MainClass.prototype.main = function () {
        // TODO implement here
        console.log("main");
        var world = new World("world1");
        world.init();
        var loop = function () {
            if (MainClass.run) {
                world.update();
                requestAnimationFrame(loop);
            }
        };
        loop();
    };
    MainClass.run = true;
    return MainClass;
}());
window.onload = function () {
    test();
    new MainClass().main();
};
var test = function () {
    var x;
    x = {};
    x["name"] = "nameValue";
    console.log(x);
};
/**
 *
 */
var MePlayer = (function (_super) {
    __extends(MePlayer, _super);
    function MePlayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //上一个影子帧，
        _this.deltPos = new Vector3();
        _this.deltEle = 0;
        //最新的影子帧
        _this.thisPos = new Vector3();
        _this.thisEle = 0;
        return _this;
    }
    MePlayer.prototype.update = function () {
    };
    MePlayer.prototype.start = function () {
        //光源
        var light = new THREE.PointLight(0xffffff, 1, 200);
        light.position.set(0, 10, -5);
        //3维度物体
        var cp = new THREE.Mesh(new THREE.CubeGeometry(0.1, 0.5, 0.05), new THREE.MeshPhongMaterial({ color: 0xaaffff, shininess: 1000, specular: 0xaaffff }));
        var cp2 = new THREE.Mesh(new THREE.CubeGeometry(1, 1.5, 0.5), new THREE.MeshPhongMaterial({ color: 0xffaaff, shininess: 1000, specular: 0xffaaff }));
        this.shandow = cp2;
        var bgm = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('./res/bg.jpg', {}, function (t) {
            }),
            shininess: 0
        });
        //     cp.material = bgm;
        bgm.map.wrapS = THREE.RepeatWrapping;
        bgm.map.wrapT = THREE.RepeatWrapping;
        bgm.map.repeat.set(100, 100);
        var bg = new THREE.Mesh(new THREE.CubeGeometry(100, 0.01, 100), bgm);
        /*
            bg.receiveShadow  = true;
            cp.castShadow  = true;
            light.castShadow = true;
        */
        this.world.scence.add(bg);
        this.world.scence.add(cp2);
        this.threeObj = cp;
        this.threeObj.add(this.world.mainCamera.threeObj);
        this.threeObj.add(light);
        this.world.mainCamera.threeObj.position.set(0, 3, -5);
        this.world.mainCamera.threeObj.lookAt(this.threeObj.position);
        Log.log(this.world);
    };
    /**
     *
     */
    MePlayer.prototype.getNextPosition = function () {
        // TODO implement here
    };
    return MePlayer;
}(GameBehavior));
/**
 * 与websocket服务端建立一个连接，并用于处理和传递通信内容。
 */
var Messager = (function (_super) {
    __extends(Messager, _super);
    function Messager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.connected = function (evt) {
            Log.log("connected");
            _this.conected = true;
            _this.ws.send(_this.message);
        };
        _this.onMessage = function (e) {
            var es = e.data;
            var arr = es.split("|");
            var thisGameID = arr[0];
            //     console.log(thisGameID);
            var game = JSON.parse(arr[1]);
            console.log(game);
            var gs = game.gamers;
            // console.log(new Date().getTime()-this.sendTime);
            _this.sendTime = new Date().getTime();
            _this.ws.send(_this.message);
            for (var i = 0; i < gs.length; i++) {
                if (thisGameID == gs[i].gamerID) {
                    _this.player.shandow.position.x = gs[i].positionX;
                    _this.player.shandow.position.z = gs[i].positionY;
                    _this.player.shandow.rotation.y = gs[i].elur;
                }
            }
            //    var pos = 
            //    Log.log(gs);
        };
        /**
         * 与websocket服务端建立一个连接，并用于处理和传递通信内容。
         */
        /**
         * 服务端地址
         */
        _this.serverURL = "ws://60.205.181.78:5555/game/websocket";
        /**
         *
         */
        _this.message = "0|0|0";
        _this.conected = false;
        /**
         * 每个多少时间发送一次消息
         */
        _this.frameTime = 100;
        /**
         * 上一帧发送消息的时间
         */
        _this.lastSendTime = 0;
        return _this;
    }
    Messager.prototype.start = function () {
        this.ws = new WebSocket(this.serverURL);
        this.ws.onopen = this.connected;
        this.ws.onmessage = this.onMessage;
        this.player = this.world.objs.get("mePlayer");
    };
    Messager.prototype.update = function () {
        //  this.sendMes();
    };
    /**
     *
     */
    Messager.prototype.setMesage = function () {
        // TODO implement here
    };
    /**
     *
     */
    Messager.prototype.sendMes = function () {
        // TODO implement here
        if (!this.conected) {
            return;
        }
        this.thisFrameTime = new Date().getTime();
        if (this.lastSendTime + this.frameTime < this.thisFrameTime) {
            this.ws.send(this.message);
            this.lastSendTime = this.thisFrameTime;
        }
    };
    return Messager;
}(GameBehavior));
/**
 *
 */
var OtherPlayer = (function (_super) {
    __extends(OtherPlayer, _super);
    function OtherPlayer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return OtherPlayer;
}(GameUser));
/**
 *
 */
var TestGameBehavior = (function (_super) {
    __extends(TestGameBehavior, _super);
    function TestGameBehavior() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TestGameBehavior.prototype.update = function () {
        Log.log("TestUpdate");
    };
    TestGameBehavior.prototype.start = function () {
        Log.log("Test Start");
    };
    return TestGameBehavior;
}(GameBehavior));
/**
 * 游戏的控制器，用于控制主角移动
 */
var UserControler = (function (_super) {
    __extends(UserControler, _super);
    function UserControler() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         *
         */
        _this.controlerVector3 = new Vector3();
        /**
         *
         */
        _this.thisPos = new Vector3();
        /**
         *
         */
        _this.deltPos = new Vector3();
        _this.isDown = false;
        return _this;
    }
    UserControler.prototype.update = function () {
        if (this.isDown) {
            var v = this.getMoveVector2();
            //    Log.log(v);
            //    var el = Math.atan2(v.y,v.x);
            //    console.log(el)
            this.deltPos.x = this.thisPos.x;
            this.deltPos.y = this.thisPos.y;
            var p = this.world.objs.get("mePlayer");
            var ppp = { x: p.threeObj.position.x, y: p.threeObj.position.y, z: p.threeObj.position.z };
            var eee = p.threeObj.rotation.y;
            p.threeObj.rotation.y = p.threeObj.rotation.y + v.x / 100;
            p.threeObj.translateZ(0.02);
            this.world.objs.get("messager").message = p.threeObj.position.x + "<->" + p.threeObj.position.z + "<->" + p.threeObj.rotation.y;
            //       (<Messager>this.world.objs.get("messager")).message = 0.0001999966666833333+"<->"+0.0001999966666833333+"<->"+0.0001999966666833333;
            //    Log.log("mes:"+(<Messager>this.world.objs.get("messager")).message);
            //发送小心后恢复
            //       p.threeObj.position.set(ppp.x,ppp.y,ppp.z);
            //       p.threeObj.rotation.y = eee;
            //       console.log(p.threeObj.translateZ);
            //    this.world.objs.get("mePlayer").threeObj.rotation.y = v.y;
        }
    };
    UserControler.prototype.start = function () {
        var _this = this;
        addEventListener("mousedown", function (event) {
            _this.isDown = true;
            //初始化鼠标位置(重置)
            _this.thisPos.x = event.screenX;
            _this.thisPos.y = event.screenY;
            _this.deltPos.x = event.screenX;
            _this.deltPos.y = event.screenY;
        }, false);
        //鼠标抬起
        addEventListener("mouseup", function (event) {
            _this.isDown = false;
        }, false);
        //鼠标移动
        addEventListener("mousemove", function (event) {
            _this.thisPos.x = event.screenX;
            _this.thisPos.y = event.screenY;
        });
    };
    /**
     * 设置玩家角色的加速度
     */
    UserControler.prototype.setMePlayerA = function () {
        // TODO implement here
    };
    /**
     * @return
     */
    UserControler.prototype.getMoveVector2 = function () {
        // TODO implement here
        var v = new Vector3();
        v.x = this.thisPos.x - this.deltPos.x;
        v.y = this.thisPos.y - this.deltPos.y;
        return v;
    };
    UserControler.prototype.getCenterVector = function () {
        var v = new Vector3();
        v.x = this.thisPos.x - this.world.screenWidth / 2;
        v.y = this.thisPos.y - this.world.screenHeight / 2;
        return v;
    };
    return UserControler;
}(GameBehavior));
/**
 * 游戏中所有的游戏对象的hashmap，数据来自于服务器，并在每一帧更新（判断是否有新对象加入或者老对象需要销毁）
 */
var UsersMap = (function (_super) {
    __extends(UsersMap, _super);
    function UsersMap() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UsersMap.prototype.start = function () {
    };
    UsersMap.prototype.update = function () {
    };
    /**
     * 游戏中所有的游戏对象的hashmap，数据来自于服务器，并在每一帧更新（判断是否有新对象加入或者老对象需要销毁）
     */
    /**
     *
     */
    UsersMap.prototype.size = function () {
    };
    ;
    /**
     *
     */
    UsersMap.prototype.get = function () {
        // TODO implement here
        this.users["name"];
    };
    /**
     *
     */
    UsersMap.prototype.put = function (g) {
        // TODO implement here
        this.users["name"] = g;
    };
    return UsersMap;
}(GameBehavior));
/**
 *
 */
var Vector3 = (function () {
    /**
     *
     */
    function Vector3() {
        /**
         *
         */
        this.x = 0;
        /**
         *
         */
        this.y = 0;
        /**
         *
         */
        this.z = 0;
    }
    return Vector3;
}());
/**
 *
 */
var World = (function () {
    /**
     *
     */
    function World(name) {
        this.worldName = name;
    }
    /**
     *
     */
    World.prototype.init = function () {
        // TODO implement here
        Log.log(this.worldName + "  init");
        console.log("world innit :" + this.worldName);
        this.canvas = document.getElementById("world1_canvas");
        //设置屏幕宽度和高度
        this.screenWidth = this.canvas.clientWidth;
        this.screenHeight = this.canvas.clientHeight;
        console.log(this.canvas);
        //设置渲染器
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas
        });
        this.renderer.setSize(this.screenWidth, this.screenHeight); //将渲染的大小设为与Canvas相同
        this.renderer.setClearColor(0xFFFFFF, 0.0); //设置默认颜色与透明度
        //    this.renderer.shadowMapEnabled=true;
        //初始化场景
        this.scence = new THREE.Scene();
        //初始化所有对象，并且添加场景对象
        this.objs = new GameObjs();
        var objMap = this.objs.objArray;
        //设置摄像机
        var cam = new GameBehavior("camera", this);
        this.mainCamera = cam;
        cam.threeObj = new THREE.PerspectiveCamera(75, this.screenWidth / this.screenHeight, 0.1, 1000);
        this.objs.add(cam);
        //添加玩家对象
        var mePlayer = new MePlayer("mePlayer", this);
        this.objs.add(mePlayer);
        //添加消息处理器
        var meser = new Messager("messager", this);
        this.objs.add(meser);
        //添加控制器
        var userControler = new UserControler("userControler", this);
        this.objs.add(userControler);
        for (var obj in objMap) {
            try {
                objMap[obj].start();
                this.scence.add(objMap[obj].threeObj);
            }
            catch (e) {
                console.log("===============");
            }
            console.log(obj + " obj innited");
        }
    };
    /**
     *
     */
    World.prototype.update = function () {
        for (var key in this.objs.objArray) {
            this.objs.objArray[key].update();
        }
        this.renderer.render(this.scence, this.mainCamera.threeObj);
    };
    return World;
}());
//# sourceMappingURL=out.js.map