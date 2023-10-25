(function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == 'function' && require;
                if (!u && a) return a(o, !0);
                if (i) return i(o, !0);
                var f = new Error("Cannot find module '" + o + "'");
                throw ((f.code = 'MODULE_NOT_FOUND'), f);
            }
            var l = (n[o] = { exports: {} });
            t[o][0].call(
                l.exports,
                function (e) {
                    var n = t[o][1][e];
                    return s(n ? n : e);
                },
                l,
                l.exports,
                e,
                t,
                n,
                r
            );
        }
        return n[o].exports;
    }
    var i = typeof require == 'function' && require;
    for (var o = 0; o < r.length; o++) s(r[o]);
    return s;
})(
    {
        1: [
            function (require, module, exports) {
                'use strict';

                var _typeof =
                    typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
                        ? function (obj) {
                              return typeof obj;
                          }
                        : function (obj) {
                              return obj &&
                                  typeof Symbol === 'function' &&
                                  obj.constructor === Symbol &&
                                  obj !== Symbol.prototype
                                  ? 'symbol'
                                  : typeof obj;
                          };

                function init(instance) {
                    var Reveal = instance;
                    var haveEvents = 'ongamepadconnected' in window;
                    var controllers = {};
                    var cooldownedButtons = [];

                    const COOLDOWN = 300; // in ms
                    const POINTER_SPEED = 20;

                    // Comments : Joycon bindings
                    var BUTTON = {
                        A: 0,
                        B: 1,
                        X: 2,
                        Y: 3,
                        LB: 4,
                        RB: 5,
                        LT: 6,
                        RT: 7,
                        BACK: 8,
                        START: 9,
                        LEFTSTICK: 10,
                        RIGHTSTICK: 11,
                        DUP: 12,
                        DDOWN: 13,
                        DLEFT: 14,
                        DRIGHT: 15
                    };

                    var RJ_BUTTON = {
                        A: 0,
                        X: 1,
                        B: 2,
                        Y: 3,
                        SL: 4,
                        SR: 5,
                        ZR: 7,
                        R: 8,
                        PLUS: 9,
                        STICK: 10
                    };

                    var AXIS = {
                        LOX: 0,
                        LOY: 1,
                        ROX: 2,
                        ROY: 3
                    };

                    var RJ_AXIS = {
                        LOX: 0,
                        LOY: 1,
                        ROX: 2,
                        ROY: 3
                    };

                    var pointing = false;
                    var pointer = document.createElement('div');
                    pointer.style.position = 'absolute';
                    pointer.style.width = '20px';
                    pointer.style.height = '20px';
                    pointer.style.boxShadow = '3px 2px 2px #333';
                    pointer.style.background = '#f00';
                    pointer.style.top = 0;
                    pointer.style.left = 0;
                    pointer.style.zIndex = 99;
                    pointer.style.borderRadius = '50%';
                    pointer.style.display = 'none';
                    document.body.appendChild(pointer);

                    function cooldown(b) {
                        if (cooldownedButtons.indexOf(b) < 0) {
                            cooldownedButtons.push(b);

                            setTimeout(function () {
                                cooldownedButtons = cooldownedButtons.filter(function (v) {
                                    return v !== b;
                                });
                            }, COOLDOWN);

                            return true;
                        }

                        return false;
                    }

                    function addgamepad(gamepad) {
                        controllers[gamepad.index] = gamepad;

                        requestAnimationFrame(updateStatus); // eslint-disable-line
                    }

                    function scangamepads() {
                        var gamepads = navigator.getGamepads
                            ? navigator.getGamepads()
                            : navigator.webkitGetGamepads
                            ? navigator.webkitGetGamepads()
                            : []; // eslint-disable-line no-nested-ternary
                        for (var i = 0; i < gamepads.length; i++) {
                            if (gamepads[i]) {
                                if (gamepads[i].index in controllers) {
                                    controllers[gamepads[i].index] = gamepads[i];
                                } else {
                                    addgamepad(gamepads[i]);
                                }
                            }
                        }
                    }

                    function updateStatus() {
                        var i = 0;
                        var j = void 0;

                        if (!haveEvents) {
                            scangamepads();
                        }

                        for (j in controllers) {
                            if (Object.prototype.hasOwnProperty.call(controllers, j)) {
                                var controller = controllers[j];

                                for (i = 0; i < controller.buttons.length; i++) {
                                    var val = controller.buttons[i];
                                    var pressed = void 0;

                                    if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {
                                        pressed = val.pressed;
                                    }

                                    if (pressed && cooldown('button-' + i)) {
                                        // handleXbox360Button(i);
                                        handleRightJoyConButton(i);
                                    }
                                }

                                for (i = 0; i < controller.axes.length; i++) {
                                    var _val = controller.axes[i];

                                    if (Math.abs(_val) > 0.85 && !pointing) {
                                        if (cooldown('axis-' + i)) {
                                            switch (i) {
                                                case AXIS.LOX: {
                                                    if (_val < 0) {
                                                        Reveal.left();
                                                    } else {
                                                        Reveal.right();
                                                    }
                                                    break;
                                                }
                                                case AXIS.LOY: {
                                                    if (_val < 0) {
                                                        Reveal.up();
                                                    } else {
                                                        Reveal.down();
                                                    }
                                                    break;
                                                }

                                                // no default
                                            }
                                        }
                                    }

                                    if (Math.abs(_val) > 0.2 && pointing) {
                                        var left = pointer.style.left.replace('px', '') * 1;
                                        var top = pointer.style.top.replace('px', '') * 1;
                                        var constrainValue = function constrainValue(newVal) {
                                            return Math.min(Math.max(newVal, 0), window.innerWidth);
                                        };
                                        // handleXbox360Axis(i, left, top, constrainValue);
                                        handleRightJoyConAxis(i, _val, left, top, constrainValue);
                                    }
                                }
                            }
                        }

                        requestAnimationFrame(updateStatus);
                    }

                    function handleXbox360Axis(i, _val, left, top, constrainValue) {
                        switch (i) {
                            case AXIS.ROX: {
                                var newVal = _val * 2 + left;
                                pointer.style.left = constrainValue(newVal) + 'px';
                                break;
                            }
                            case AXIS.ROY: {
                                var _newVal = _val * 2 + top;
                                pointer.style.top = constrainValue(_newVal) + 'px';
                                break;
                            }
                            case AXIS.LOX: {
                                var _newVal2 = _val * POINTER_SPEED + left;
                                pointer.style.left = constrainValue(_newVal2) + 'px';
                                break;
                            }
                            case AXIS.LOY: {
                                var _newVal3 = _val * POINTER_SPEED + top;
                                pointer.style.top = constrainValue(_newVal3) + 'px';
                                break;
                            }
                            // no default
                        }
                    }

                    function handleRightJoyConAxis(i, _val, left, top, constrainValue) {
                        switch (i) {
                            case AXIS.LOX: {
                                console.log(`i=${i}, axis=LOY`);
                                var _newVal3 = -_val * POINTER_SPEED + top;
                                pointer.style.top = constrainValue(_newVal3) + 'px';
                                break;
                            }
                            case AXIS.LOY: {
                                console.log(`i=${i}, axis=LOX`);
                                var _newVal2 = _val * POINTER_SPEED + left;
                                pointer.style.left = constrainValue(_newVal2) + 'px';
                                break;
                            }
                            // no default
                        }
                    }

                    function handleXbox360Button(button) {
                        switch (button) {
                            case BUTTON.A:
                                console.log('BUTTON A');
                                if (Reveal.isOverview()) {
                                    Reveal.toggleOverview();
                                } else {
                                    Reveal.next();
                                }
                                break;
                            case BUTTON.B:
                                console.log('BUTTON X');
                                Reveal.prev();
                                break;
                            case BUTTON.LB:
                                console.log('BUTTON SL');
                                Reveal.prev();
                                break;
                            case BUTTON.RB:
                                console.log('BUTTON SR');
                                Reveal.next();
                                break;
                            case BUTTON.LT:
                                console.log('BUTTON LT');
                                Reveal.left();
                                break;
                            case BUTTON.RT:
                                console.log('BUTTON RT');
                                Reveal.right();
                                break;
                            case BUTTON.BACK:
                                console.log('BUTTON BACK');
                                Reveal.togglePause();
                                break;
                            case BUTTON.START:
                                console.log('BUTTON +');
                                Reveal.toggleOverview();
                                break;
                            case BUTTON.DUP:
                                console.log('BUTTON DUP');
                                Reveal.up();
                                break;
                            case BUTTON.DDOWN:
                                console.log('BUTTON DDOWN');
                                Reveal.down();
                                break;
                            case BUTTON.DLEFT:
                                console.log('BUTTON DLEFT');
                                Reveal.left();
                                break;
                            case BUTTON.DRIGHT:
                                console.log('BUTTON DRIGHT');
                                Reveal.right();
                                break;
                            case BUTTON.RIGHTSTICK:
                                console.log('BUTTON RIGHTSTICK');
                                pointing = !pointing;
                                pointer.style.display = pointing ? 'block' : 'none';
                                break;
                            default:
                                console.log('Not mapped', button);
                        }
                    }

                    function handleRightJoyConButton(button) {
                        switch (button) {
                            case RJ_BUTTON.A:
                                console.log('BUTTON A');
                                Reveal.right();
                                break;
                            case RJ_BUTTON.B:
                                console.log('BUTTON B');
                                Reveal.down();
                                break;
                            case RJ_BUTTON.X:
                                console.log('BUTTON X');
                                Reveal.prev();
                                break;
                            case RJ_BUTTON.Y:
                                console.log('BUTTON Y');
                                Reveal.left();
                                break;
                            case RJ_BUTTON.SL:
                                console.log('BUTTON SL');
                                Reveal.prev();
                                break;
                            case RJ_BUTTON.SR:
                                console.log('BUTTON SR');
                                Reveal.next();
                                break;
                            case RJ_BUTTON.R:
                                console.log('BUTTON R');
                                Reveal.toggleOverview();
                                break;
                            case RJ_BUTTON.ZR:
                                console.log('BUTTON ZR');
                                if (Reveal.isOverview()) {
                                    Reveal.toggleOverview();
                                } else {
                                    Reveal.next();
                                }
                                break;
                            case RJ_BUTTON.PLUS:
                                console.log('BUTTON +');
                                Reveal.togglePause();
                                break;
                            case RJ_BUTTON.STICK:
                                console.log('BUTTON STICK "CLICK"');
                                pointing = !pointing;
                                pointer.style.display = pointing ? 'block' : 'none';
                                break;
                            default:
                                console.log('Not mapped', button);
                        }
                    }

                    function connecthandler(e) {
                        addgamepad(e.gamepad);
                    }

                    function removegamepad(gamepad) {
                        delete controllers[gamepad.index];
                    }

                    function disconnecthandler(e) {
                        removegamepad(e.gamepad);
                    }

                    window.addEventListener('gamepadconnected', connecthandler);
                    window.addEventListener('gamepaddisconnected', disconnecthandler);

                    if (!haveEvents) {
                        setInterval(scangamepads, 500);
                    }
                }
                window.initGamepad = init;
            },
            {}
        ]
    },
    {},
    [1]
);

//# sourceMappingURL=gamepad.js.map
