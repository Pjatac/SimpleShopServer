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
exports.__esModule = true;
var PurchaseController = /** @class */ (function () {
    function PurchaseController(server) {
        this.server = server;
    }
    PurchaseController.prototype.onPurchase = function () {
        var server = this.server;
        return function (req, res) {
            return __awaiter(this, void 0, void 0, function () {
                var products, key, _i, products_1, prod, product, _loop_1, _a, products_2, prod, purchase, _b, products_3, prod, _c, _d, _e, _f, _g, _h;
                return __generator(this, function (_j) {
                    switch (_j.label) {
                        case 0:
                            products = new Array();
                            for (key in req.body) {
                                if (req.body.hasOwnProperty(key)) {
                                    products.push(req.body[key]);
                                }
                            }
                            _i = 0, products_1 = products;
                            _j.label = 1;
                        case 1:
                            if (!(_i < products_1.length)) return [3 /*break*/, 4];
                            prod = products_1[_i];
                            return [4 /*yield*/, server.db.product.findById(prod._id)];
                        case 2:
                            product = _j.sent();
                            if (product && prod.qnt > product.qnt)
                                return [2 /*return*/, res.send("Sorry, insufficient stock quantity for " + prod.name)];
                            _j.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4:
                            _loop_1 = function (prod) {
                                server.db.product.findById(prod._id, function (err, product) {
                                    if (err)
                                        return res.send(err);
                                    if (product && prod.qnt < product.qnt) {
                                        product.qnt -= prod.qnt;
                                        product.save();
                                    }
                                    else {
                                        server.db.product.findOneAndDelete(product.id, function (err) {
                                            if (err)
                                                console.log(err);
                                        });
                                    }
                                });
                            };
                            for (_a = 0, products_2 = products; _a < products_2.length; _a++) {
                                prod = products_2[_a];
                                _loop_1(prod);
                            }
                            purchase = new server.db.purchase();
                            for (_b = 0, products_3 = products; _b < products_3.length; _b++) {
                                prod = products_3[_b];
                                purchase.purchases.push({ name: prod.name, qnt: prod.qnt, price: prod.currPrice, cost: prod.currPrice * prod.qnt });
                            }
                            purchase.save();
                            return [4 /*yield*/, server.db.card.collection.drop()];
                        case 5:
                            _j.sent();
                            _d = (_c = server.io).emit;
                            _e = ['getProducts'];
                            return [4 /*yield*/, server.getProducts()];
                        case 6:
                            _d.apply(_c, _e.concat([_j.sent()]));
                            _g = (_f = server.io).emit;
                            _h = ['getPurchases'];
                            return [4 /*yield*/, server.getPurchases()];
                        case 7:
                            _g.apply(_f, _h.concat([_j.sent()]));
                            return [2 /*return*/, res.send("ok")];
                    }
                });
            });
        };
    };
    return PurchaseController;
}());
exports.PurchaseController = PurchaseController;
