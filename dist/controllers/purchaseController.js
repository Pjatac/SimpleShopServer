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
var PurchaseController = /** @class */ (function () {
    function PurchaseController(server) {
        this.server = server;
    }
    PurchaseController.prototype.onPurchase = function () {
        return __awaiter(this, void 0, void 0, function () {
            var server;
            return __generator(this, function (_a) {
                server = this.server;
                return [2 /*return*/, function (req, res) {
                        return __awaiter(this, void 0, void 0, function () {
                            var card, purchase, _i, _a, prod, _b, _c, _d, _e, _f, _g;
                            return __generator(this, function (_h) {
                                switch (_h.label) {
                                    case 0: return [4 /*yield*/, server.db.card.findOne()];
                                    case 1:
                                        card = _h.sent();
                                        purchase = new server.db.purchase();
                                        _i = 0, _a = card.card;
                                        _h.label = 2;
                                    case 2:
                                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                                        prod = _a[_i];
                                        purchase.purchases.push({ name: prod.name, qnt: prod.qnt, price: prod.price, cost: prod.price * prod.qnt });
                                        return [4 /*yield*/, server.db.product.findOne({
                                                name: prod.name
                                            }, function (err, toBuy) {
                                                return __awaiter(this, void 0, void 0, function () {
                                                    return __generator(this, function (_a) {
                                                        if (err)
                                                            throw err;
                                                        if (toBuy.qnt === 0) {
                                                            toBuy.remove();
                                                        }
                                                        return [2 /*return*/];
                                                    });
                                                });
                                            })];
                                    case 3:
                                        _h.sent();
                                        _h.label = 4;
                                    case 4:
                                        _i++;
                                        return [3 /*break*/, 2];
                                    case 5:
                                        purchase.save();
                                        return [4 /*yield*/, server.db.card.collection.drop()];
                                    case 6:
                                        _h.sent();
                                        _c = (_b = server.io).emit;
                                        _d = ['getProducts'];
                                        return [4 /*yield*/, server.getProducts()];
                                    case 7:
                                        _c.apply(_b, _d.concat([_h.sent()]));
                                        _f = (_e = server.io).emit;
                                        _g = ['getPurchases'];
                                        return [4 /*yield*/, server.getPurchases()];
                                    case 8:
                                        _f.apply(_e, _g.concat([_h.sent()]));
                                        return [2 /*return*/, res.json("Thank you for using our shop!")];
                                }
                            });
                        });
                    }];
            });
        });
    };
    return PurchaseController;
}());
exports.PurchaseController = PurchaseController;
//# sourceMappingURL=purchaseController.js.map