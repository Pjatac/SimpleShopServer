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
var CardController = /** @class */ (function () {
    function CardController(server) {
        this.server = server;
    }
    CardController.prototype.onGetCard = function () {
        var server = this.server;
        return function (req, res) {
            return __awaiter(this, void 0, void 0, function () {
                var card;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, server.db.card.findOne()];
                        case 1:
                            card = _a.sent();
                            return [2 /*return*/, res.json(card)];
                    }
                });
            });
        };
    };
    CardController.prototype.onAddToCard = function () {
        var server = this.server;
        return function (req, res) {
            return __awaiter(this, void 0, void 0, function () {
                var card, already, _loop_1, _i, _a, prod, newCard;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, server.db.card.findOne()];
                        case 1:
                            card = _b.sent();
                            if (card === null)
                                card = new server.db.card();
                            already = false;
                            _loop_1 = function (prod) {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(prod.name === req.body.name)) return [3 /*break*/, 2];
                                            return [4 /*yield*/, server.db.product.findOne({
                                                    name: req.body.name
                                                }, function (err, onStock) {
                                                    return __awaiter(this, void 0, void 0, function () {
                                                        var _a, _b, _c;
                                                        return __generator(this, function (_d) {
                                                            switch (_d.label) {
                                                                case 0:
                                                                    if (err)
                                                                        throw err;
                                                                    if (!(onStock.qnt > 0)) return [3 /*break*/, 2];
                                                                    onStock.qnt -= 1;
                                                                    onStock.save();
                                                                    prod.qnt += 1;
                                                                    _b = (_a = server.io).emit;
                                                                    _c = ['getProducts'];
                                                                    return [4 /*yield*/, server.getProducts()];
                                                                case 1:
                                                                    _b.apply(_a, _c.concat([_d.sent()]));
                                                                    _d.label = 2;
                                                                case 2: return [2 /*return*/];
                                                            }
                                                        });
                                                    });
                                                })];
                                        case 1:
                                            _a.sent();
                                            already = true;
                                            _a.label = 2;
                                        case 2: return [2 /*return*/];
                                    }
                                });
                            };
                            _i = 0, _a = card.card;
                            _b.label = 2;
                        case 2:
                            if (!(_i < _a.length)) return [3 /*break*/, 5];
                            prod = _a[_i];
                            return [5 /*yield**/, _loop_1(prod)];
                        case 3:
                            _b.sent();
                            _b.label = 4;
                        case 4:
                            _i++;
                            return [3 /*break*/, 2];
                        case 5:
                            if (!!already) return [3 /*break*/, 8];
                            return [4 /*yield*/, server.db.product.findOne({
                                    name: req.body.name
                                }, function (err, onStock) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        var _a, _b, _c;
                                        return __generator(this, function (_d) {
                                            switch (_d.label) {
                                                case 0:
                                                    if (err)
                                                        throw err;
                                                    onStock.qnt -= 1;
                                                    onStock.save();
                                                    _b = (_a = server.io).emit;
                                                    _c = ['getProducts'];
                                                    return [4 /*yield*/, server.getProducts()];
                                                case 1:
                                                    _b.apply(_a, _c.concat([_d.sent()]));
                                                    return [2 /*return*/];
                                            }
                                        });
                                    });
                                })];
                        case 6:
                            _b.sent();
                            return [4 /*yield*/, card.card.push({ name: req.body.name, qnt: 1, price: req.body.currPrice })];
                        case 7:
                            _b.sent();
                            _b.label = 8;
                        case 8:
                            card.save();
                            return [4 /*yield*/, server.db.card.findOne()];
                        case 9:
                            newCard = _b.sent();
                            return [2 /*return*/, res.json(newCard)];
                    }
                });
            });
        };
    };
    CardController.prototype.onInq = function () {
        var server = this.server;
        return function (req, res) {
            return __awaiter(this, void 0, void 0, function () {
                var card, _loop_2, _i, _a, prod;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, server.db.card.findOne()];
                        case 1:
                            card = _b.sent();
                            _loop_2 = function (prod) {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(prod.name === req.body.name)) return [3 /*break*/, 2];
                                            return [4 /*yield*/, server.db.product.findOne({
                                                    name: req.body.name
                                                }, function (err, onStock) {
                                                    return __awaiter(this, void 0, void 0, function () {
                                                        var _a, _b, _c;
                                                        return __generator(this, function (_d) {
                                                            switch (_d.label) {
                                                                case 0:
                                                                    if (err)
                                                                        throw err;
                                                                    if (!(onStock.qnt > 0)) return [3 /*break*/, 2];
                                                                    onStock.qnt -= 1;
                                                                    onStock.save();
                                                                    prod.qnt += 1;
                                                                    _b = (_a = server.io).emit;
                                                                    _c = ['getProducts'];
                                                                    return [4 /*yield*/, server.getProducts()];
                                                                case 1:
                                                                    _b.apply(_a, _c.concat([_d.sent()]));
                                                                    _d.label = 2;
                                                                case 2: return [2 /*return*/];
                                                            }
                                                        });
                                                    });
                                                })];
                                        case 1:
                                            _a.sent();
                                            _a.label = 2;
                                        case 2: return [2 /*return*/];
                                    }
                                });
                            };
                            _i = 0, _a = card.card;
                            _b.label = 2;
                        case 2:
                            if (!(_i < _a.length)) return [3 /*break*/, 5];
                            prod = _a[_i];
                            return [5 /*yield**/, _loop_2(prod)];
                        case 3:
                            _b.sent();
                            _b.label = 4;
                        case 4:
                            _i++;
                            return [3 /*break*/, 2];
                        case 5:
                            card.save();
                            return [2 /*return*/, res.json(card)];
                    }
                });
            });
        };
    };
    CardController.prototype.onDeq = function () {
        var server = this.server;
        return function (req, res) {
            return __awaiter(this, void 0, void 0, function () {
                var card, _loop_3, _i, _a, prod;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, server.db.card.findOne()];
                        case 1:
                            card = _b.sent();
                            _loop_3 = function (prod) {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(prod.name === req.body.name && prod.qnt > 1)) return [3 /*break*/, 2];
                                            return [4 /*yield*/, server.db.product.findOne({
                                                    name: req.body.name
                                                }, function (err, onStock) {
                                                    return __awaiter(this, void 0, void 0, function () {
                                                        var _a, _b, _c;
                                                        return __generator(this, function (_d) {
                                                            switch (_d.label) {
                                                                case 0:
                                                                    if (err)
                                                                        throw err;
                                                                    if (!(prod.qnt > 1)) return [3 /*break*/, 2];
                                                                    onStock.qnt += 1;
                                                                    onStock.save();
                                                                    prod.qnt -= 1;
                                                                    _b = (_a = server.io).emit;
                                                                    _c = ['getProducts'];
                                                                    return [4 /*yield*/, server.getProducts()];
                                                                case 1:
                                                                    _b.apply(_a, _c.concat([_d.sent()]));
                                                                    _d.label = 2;
                                                                case 2: return [2 /*return*/];
                                                            }
                                                        });
                                                    });
                                                })];
                                        case 1:
                                            _a.sent();
                                            _a.label = 2;
                                        case 2: return [2 /*return*/];
                                    }
                                });
                            };
                            _i = 0, _a = card.card;
                            _b.label = 2;
                        case 2:
                            if (!(_i < _a.length)) return [3 /*break*/, 5];
                            prod = _a[_i];
                            return [5 /*yield**/, _loop_3(prod)];
                        case 3:
                            _b.sent();
                            _b.label = 4;
                        case 4:
                            _i++;
                            return [3 /*break*/, 2];
                        case 5:
                            card.save();
                            return [2 /*return*/, res.json(card)];
                    }
                });
            });
        };
    };
    CardController.prototype.onRemove = function () {
        var server = this.server;
        return function (req, res) {
            return __awaiter(this, void 0, void 0, function () {
                var card, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, server.db.card.findOne()];
                        case 1:
                            card = _a.sent();
                            i = 0;
                            _a.label = 2;
                        case 2:
                            if (!(i < card.card.length)) return [3 /*break*/, 5];
                            if (!(card.card[i].name === req.body.name)) return [3 /*break*/, 4];
                            card.card.splice(i, 1);
                            return [4 /*yield*/, server.db.product.findOne({
                                    name: req.body.name
                                }, function (err, toReturn) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        var _a, _b, _c;
                                        return __generator(this, function (_d) {
                                            switch (_d.label) {
                                                case 0:
                                                    if (err)
                                                        throw err;
                                                    toReturn.qnt += req.body.qnt;
                                                    toReturn.save();
                                                    _b = (_a = server.io).emit;
                                                    _c = ['getProducts'];
                                                    return [4 /*yield*/, server.getProducts()];
                                                case 1:
                                                    _b.apply(_a, _c.concat([_d.sent()]));
                                                    return [2 /*return*/];
                                            }
                                        });
                                    });
                                })];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            i++;
                            return [3 /*break*/, 2];
                        case 5:
                            card.save();
                            return [2 /*return*/, res.json(card)];
                    }
                });
            });
        };
    };
    return CardController;
}());
exports.CardController = CardController;
//# sourceMappingURL=cardController.js.map