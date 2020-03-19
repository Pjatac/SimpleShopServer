"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class PurchaseController {
    constructor(server) {
        this.server = server;
    }
    onPurchase() {
        return __awaiter(this, void 0, void 0, function* () {
            const server = this.server;
            return function (req, res) {
                return __awaiter(this, void 0, void 0, function* () {
                    let card = yield server.db.card.findOne();
                    const purchase = new server.db.purchase();
                    for (let prod of card.card) {
                        purchase.purchases.push({ name: prod.name, qnt: prod.qnt, price: prod.price, cost: prod.price * prod.qnt });
                        yield server.db.product.findOne({
                            name: prod.name
                        }, function (err, toBuy) {
                            return __awaiter(this, void 0, void 0, function* () {
                                if (err)
                                    throw err;
                                if (toBuy.qnt === 0) {
                                    toBuy.remove();
                                }
                            });
                        });
                    }
                    purchase.save();
                    yield server.db.card.collection.drop();
                    server.io.emit('getProducts', yield server.getProducts());
                    server.io.emit('getPurchases', yield server.getPurchases());
                    return res.json(`Thank you for using our shop!`);
                });
            };
        });
    }
}
exports.PurchaseController = PurchaseController;
//# sourceMappingURL=purchaseController.js.map