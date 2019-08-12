"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var express = require("express");
var bodyParser = require("body-parser");
var socketIo = require("socket.io");
var mongoose = require("mongoose");
var cors = require("cors");
var product_1 = require("./schemas/product");
var purchase_1 = require("./schemas/purchase");
var priceChange_1 = require("./schemas/priceChange");
var card_1 = require("./schemas/card");
var productController_1 = require("./controllers/productController");
var purchaseController_1 = require("./controllers/purchaseController");
var cardController_1 = require("./controllers/cardController");
var api = require("./routes/api");
var ShopServer = /** @class */ (function () {
    function ShopServer() {
        this.productController = new productController_1.ProductController(this);
        this.purchaseController = new purchaseController_1.PurchaseController(this);
        this.cardController = new cardController_1.CardController(this);
        this.db = Object();
        this.createApp();
        this.config();
        this.createServer();
        this.sockets();
        this.listen();
        this.routing();
    }
    ShopServer.prototype.createApp = function () {
        this.app = express();
    };
    ShopServer.prototype.routing = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z;
            return __generator(this, function (_0) {
                switch (_0.label) {
                    case 0:
                        api.register(this.app);
                        _b = (_a = this.app).post;
                        _c = ['/addProduct'];
                        return [4 /*yield*/, this.productController.onAddProduct()];
                    case 1:
                        _b.apply(_a, _c.concat([_0.sent()]));
                        _e = (_d = this.app).get;
                        _f = ['/products'];
                        return [4 /*yield*/, this.productController.onGetProducts()];
                    case 2:
                        _e.apply(_d, _f.concat([_0.sent()]));
                        _h = (_g = this.app).post;
                        _j = ['/purchase'];
                        return [4 /*yield*/, this.purchaseController.onPurchase()];
                    case 3:
                        _h.apply(_g, _j.concat([_0.sent()]));
                        _l = (_k = this.app).get;
                        _m = ['/card'];
                        return [4 /*yield*/, this.cardController.onGetCard()];
                    case 4:
                        _l.apply(_k, _m.concat([_0.sent()]));
                        _p = (_o = this.app).post;
                        _q = ['/card'];
                        return [4 /*yield*/, this.cardController.onAddToCard()];
                    case 5:
                        _p.apply(_o, _q.concat([_0.sent()]));
                        _s = (_r = this.app).post;
                        _t = ['/card/inq'];
                        return [4 /*yield*/, this.cardController.onInq()];
                    case 6:
                        _s.apply(_r, _t.concat([_0.sent()]));
                        _v = (_u = this.app).post;
                        _w = ['/card/remove'];
                        return [4 /*yield*/, this.cardController.onRemove()];
                    case 7:
                        _v.apply(_u, _w.concat([_0.sent()]));
                        _y = (_x = this.app).post;
                        _z = ['/card/deq'];
                        return [4 /*yield*/, this.cardController.onDeq()];
                    case 8:
                        _y.apply(_x, _z.concat([_0.sent()]));
                        return [2 /*return*/];
                }
            });
        });
    };
    ShopServer.prototype.createServer = function () {
        this.server = http_1.createServer(this.app);
    };
    ShopServer.prototype.config = function () {
        var _this = this;
        this.port = process.env.PORT || ShopServer.PORT;
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        var corsOptions = {
            origin: '*',
            optionsSuccessStatus: 200
        };
        this.app.use(cors(corsOptions));
        mongoose.connect('mongodb://localhost/product', { useNewUrlParser: true })
            .then(function () { return console.log('Connect to DB sucess'); })
            .catch(function (err) { return console.log(err); });
        var MONGODB_CONNECTION = "mongodb://localhost/product";
        var connection = mongoose.createConnection(MONGODB_CONNECTION, { useNewUrlParser: true });
        this.db.product = connection.model("Product", product_1.productSchema);
        this.db.purchase = connection.model("Purchase", purchase_1.purchaseSchema);
        this.db.priceChange = connection.model("PriceChange", priceChange_1.priceChangeSchema);
        this.db.card = connection.model("Card", card_1.cardSchema);
        this.timer = global.setInterval(function () { return _this.myTimer(); }, 120000);
    };
    ShopServer.prototype.sockets = function () {
        this.io = socketIo(this.server);
    };
    ShopServer.prototype.listen = function () {
        var _this = this;
        this.server.listen(this.port, function () {
            console.log('Running server on port %s', _this.port);
        });
        this.io.on('connect', function (socket) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                console.log('Connected client on port %s.', this.port);
                socket.on('getProducts', function () { return __awaiter(_this, void 0, void 0, function () {
                    var _a, _b, _c;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                _b = (_a = this.io).emit;
                                _c = ['getProducts'];
                                return [4 /*yield*/, this.getProducts()];
                            case 1:
                                _b.apply(_a, _c.concat([_d.sent()]));
                                return [2 /*return*/];
                        }
                    });
                }); });
                socket.on('getPurchases', function () { return __awaiter(_this, void 0, void 0, function () {
                    var _a, _b, _c;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                _b = (_a = this.io).emit;
                                _c = ['getPurchases'];
                                return [4 /*yield*/, this.getPurchases()];
                            case 1:
                                _b.apply(_a, _c.concat([_d.sent()]));
                                return [2 /*return*/];
                        }
                    });
                }); });
                socket.on('getPriceChanges', function () { return __awaiter(_this, void 0, void 0, function () {
                    var _a, _b, _c;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                _b = (_a = this.io).emit;
                                _c = ['getPriceChanges'];
                                return [4 /*yield*/, this.getPriceChanges()];
                            case 1:
                                _b.apply(_a, _c.concat([_d.sent()]));
                                return [2 /*return*/];
                        }
                    });
                }); });
                socket.on('getCard', function () { return __awaiter(_this, void 0, void 0, function () {
                    var _a, _b, _c;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                _b = (_a = this.io).emit;
                                _c = ['getCard'];
                                return [4 /*yield*/, this.getCard()];
                            case 1:
                                _b.apply(_a, _c.concat([_d.sent()]));
                                return [2 /*return*/];
                        }
                    });
                }); });
                socket.on('disconnect', function () {
                    console.log('Client disconnected');
                });
                return [2 /*return*/];
            });
        }); });
    };
    ShopServer.prototype.getCard = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db.card.findOne(function (err, card) {
                            if (err)
                                return (err);
                            return JSON.stringify(card.map(function (el) { return el.toObject(); }));
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ;
    ShopServer.prototype.getProducts = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db.product.find(function (err, products) {
                            if (err)
                                return (err);
                            return JSON.stringify(products.map(function (el) { return el.toObject(); }));
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ;
    ShopServer.prototype.getPriceChanges = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db.priceChange.find(function (err, priceChanges) {
                            if (err)
                                return (err);
                            return JSON.stringify(priceChanges.map(function (el) { return el.toObject(); }));
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ;
    ShopServer.prototype.getPurchases = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db.purchase.find(function (err, purchses) {
                            if (err)
                                return (err);
                            return JSON.stringify(purchses.map(function (el) { return el.toObject(); }));
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ;
    ShopServer.prototype.getApp = function () {
        return this.app;
    };
    ShopServer.prototype.myTimer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f;
            var _this = this;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0: return [4 /*yield*/, this.db.product.find(function (err, products) {
                            for (var _i = 0, products_1 = products; _i < products_1.length; _i++) {
                                var prod = products_1[_i];
                                var dateNow = new Date().toUTCString();
                                var change = Math.floor(Math.random() * (15 - 10 + 1)) + 10;
                                var growth = (Math.random() > 0.5);
                                if (growth) {
                                    prod.currPrice += (Math.round(prod.currPrice * change)) / 100;
                                    prod.priceChange = change;
                                    prod.save();
                                    var priceChange = new _this.db.priceChange({ name: prod.name, price: prod.currPrice, date: dateNow });
                                    priceChange.save();
                                }
                                else if (prod.currPrice - prod.currPrice * change / 100 >= 0.1) {
                                    prod.currPrice -= (Math.round(prod.currPrice * change)) / 100;
                                    prod.priceChange = 0 - change;
                                    prod.save();
                                    var priceChange = new _this.db.priceChange({ name: prod.name, price: prod.currPrice, date: dateNow });
                                    priceChange.save();
                                }
                            }
                        })];
                    case 1:
                        _g.sent();
                        _b = (_a = this.io).emit;
                        _c = ['getProducts'];
                        return [4 /*yield*/, this.getProducts()];
                    case 2:
                        _b.apply(_a, _c.concat([_g.sent()]));
                        _e = (_d = this.io).emit;
                        _f = ['getPriceChanges'];
                        return [4 /*yield*/, this.getPriceChanges()];
                    case 3:
                        _e.apply(_d, _f.concat([_g.sent()]));
                        return [2 /*return*/];
                }
            });
        });
    };
    ShopServer.PORT = 8080;
    return ShopServer;
}());
exports.ShopServer = ShopServer;
//# sourceMappingURL=server.js.map