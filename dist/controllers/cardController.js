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
class CardController {
    constructor(server) {
        this.server = server;
    }
    onGetCard() {
        const server = this.server;
        return function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                const card = yield server.db.card.findOne();
                return res.json(card);
            });
        };
    }
    onAddToCard() {
        const server = this.server;
        return function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                let card = yield server.db.card.findOne();
                if (card === null)
                    card = new server.db.card();
                var already = false;
                for (let prod of card.card) {
                    if (prod.name === req.body.name) {
                        yield server.db.product.findOne({
                            name: req.body.name
                        }, function (err, onStock) {
                            return __awaiter(this, void 0, void 0, function* () {
                                if (err)
                                    throw err;
                                if (onStock.qnt > 0) {
                                    onStock.qnt -= 1;
                                    onStock.save();
                                    prod.qnt += 1;
                                    server.io.emit('getProducts', yield server.getProducts());
                                }
                            });
                        });
                        already = true;
                    }
                }
                if (!already) {
                    yield server.db.product.findOne({
                        name: req.body.name
                    }, function (err, onStock) {
                        return __awaiter(this, void 0, void 0, function* () {
                            if (err)
                                throw err;
                            onStock.qnt -= 1;
                            onStock.save();
                            server.io.emit('getProducts', yield server.getProducts());
                        });
                    });
                    yield card.card.push({ name: req.body.name, qnt: 1, price: req.body.currPrice });
                }
                card.save();
                const newCard = yield server.db.card.findOne();
                return res.json(newCard);
            });
        };
    }
    onInq() {
        const server = this.server;
        return function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                let card = yield server.db.card.findOne();
                for (let prod of card.card) {
                    if (prod.name === req.body.name) {
                        yield server.db.product.findOne({
                            name: req.body.name
                        }, function (err, onStock) {
                            return __awaiter(this, void 0, void 0, function* () {
                                if (err)
                                    throw err;
                                if (onStock.qnt > 0) {
                                    onStock.qnt -= 1;
                                    onStock.save();
                                    prod.qnt += 1;
                                    server.io.emit('getProducts', yield server.getProducts());
                                }
                            });
                        });
                    }
                }
                card.save();
                return res.json(card);
            });
        };
    }
    onDeq() {
        const server = this.server;
        return function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                let card = yield server.db.card.findOne();
                for (let prod of card.card) {
                    if (prod.name === req.body.name && prod.qnt > 1) {
                        yield server.db.product.findOne({
                            name: req.body.name
                        }, function (err, onStock) {
                            return __awaiter(this, void 0, void 0, function* () {
                                if (err)
                                    throw err;
                                if (prod.qnt > 1) {
                                    onStock.qnt += 1;
                                    onStock.save();
                                    prod.qnt -= 1;
                                    server.io.emit('getProducts', yield server.getProducts());
                                }
                            });
                        });
                    }
                }
                card.save();
                return res.json(card);
            });
        };
    }
    onRemove() {
        const server = this.server;
        return function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                let card = yield server.db.card.findOne();
                for (let i = 0; i < card.card.length; i++) {
                    if (card.card[i].name === req.body.name) {
                        card.card.splice(i, 1);
                        yield server.db.product.findOne({
                            name: req.body.name
                        }, function (err, toReturn) {
                            return __awaiter(this, void 0, void 0, function* () {
                                if (err)
                                    throw err;
                                toReturn.qnt += req.body.qnt;
                                toReturn.save();
                                server.io.emit('getProducts', yield server.getProducts());
                            });
                        });
                    }
                }
                card.save();
                return res.json(card);
            });
        };
    }
}
exports.CardController = CardController;
//# sourceMappingURL=cardController.js.map