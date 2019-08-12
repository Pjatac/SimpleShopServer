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
var ProductController = /** @class */ (function () {
    function ProductController(server) {
        this.server = server;
    }
    ProductController.prototype.onGetProducts = function () {
        var server = this.server;
        return function (req, res) {
            return __awaiter(this, void 0, void 0, function () {
                var products;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, server.db.product.find()];
                        case 1:
                            products = _a.sent();
                            return [2 /*return*/, res.json(products)];
                    }
                });
            });
        };
    };
    ProductController.prototype.onAddProduct = function () {
        var server = this.server;
        return function (req, res) {
            return __awaiter(this, void 0, void 0, function () {
                var count, alreadyExist_1, product, _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0: return [4 /*yield*/, server.db.product.countDocuments()];
                        case 1:
                            count = _d.sent();
                            if (!(count < 5)) return [3 /*break*/, 6];
                            alreadyExist_1 = false;
                            return [4 /*yield*/, server.db.product.findOne({
                                    name: req.body.name
                                }, function (err, prod) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            if (err)
                                                throw err;
                                            if (prod !== null)
                                                alreadyExist_1 = true;
                                            return [2 /*return*/];
                                        });
                                    });
                                })];
                        case 2:
                            _d.sent();
                            if (!alreadyExist_1) return [3 /*break*/, 3];
                            return [2 /*return*/, res.json("Sorry, product with such name is already on stock")];
                        case 3:
                            product = new server.db.product(req.body);
                            product.save();
                            _b = (_a = server.io).emit;
                            _c = ['getProducts'];
                            return [4 /*yield*/, server.getProducts()];
                        case 4:
                            _b.apply(_a, _c.concat([_d.sent()]));
                            return [2 /*return*/, res.json(product)];
                        case 5: return [3 /*break*/, 7];
                        case 6: return [2 /*return*/, res.json("Sorry, maximum store capacity (5) reached")];
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
    };
    return ProductController;
}());
exports.ProductController = ProductController;
//# sourceMappingURL=productController.js.map