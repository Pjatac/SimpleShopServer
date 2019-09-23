import { ShopServer } from "server";

export class CardController {

    server: ShopServer;
    
    constructor(server: ShopServer) {
        this.server = server;
    }

    public onGetCard() {
        const server = this.server;
        return async function (req, res) {
            const card = await server.db.card.findOne();
            return res.json(card);
        }
    }

    public onAddToCard() {
        const server = this.server;
        return async function (req, res) {
            let card = await server.db.card.findOne();
            if (card === null)
                card = new server.db.card();
            var already = false;
            for (let prod of card.card) {
                if (prod.name === req.body.name) {
                    await server.db.product.findOne({
                        name: req.body.name
                    }, async function (err, onStock) {
                        if (err) throw err;
                        if (onStock.qnt > 0) {
                            onStock.qnt -= 1;
                            onStock.save();
                            prod.qnt += 1;
                            server.io.emit('getProducts', await server.getProducts());
                        }
                    });
                    already = true;
                }
            }
            if (!already) {
                await server.db.product.findOne({
                    name: req.body.name
                }, async function (err, onStock) {
                    if (err) throw err;
                    onStock.qnt -= 1;
                    onStock.save();
                    server.io.emit('getProducts', await server.getProducts());
                });

                await card.card.push({ name: req.body.name, qnt: 1, price: req.body.currPrice });
            }
            card.save();
            const newCard = await server.db.card.findOne();
            return res.json(newCard);
        }
    }

    public onInq() {
        const server = this.server;
        return async function (req, res) {
            let card = await server.db.card.findOne();
            for (let prod of card.card) {
                if (prod.name === req.body.name) {
                    await server.db.product.findOne({
                        name: req.body.name
                    }, async function (err, onStock) {
                        if (err) throw err;
                        if (onStock.qnt > 0) {
                            onStock.qnt -= 1;
                            onStock.save();
                            prod.qnt += 1;
                            server.io.emit('getProducts', await server.getProducts());
                        }
                    });
                }
            }
            card.save();
            return res.json(card);
        }
    }

    public onDeq() {
        const server = this.server;
        return async function (req, res) {
            let card = await server.db.card.findOne();
            for (let prod of card.card) {
                if (prod.name === req.body.name && prod.qnt > 1) {
                    await server.db.product.findOne({
                        name: req.body.name
                    }, async function (err, onStock) {
                        if (err) throw err;
                        if (prod.qnt > 1) {
                            onStock.qnt += 1;
                            onStock.save();
                            prod.qnt -= 1;
                            server.io.emit('getProducts', await server.getProducts());
                        }
                    });
                }
            }
            card.save();
            return res.json(card);
        }
    }

    public onRemove() {
        const server = this.server;
        return async function (req, res) {
            let card = await server.db.card.findOne();
            for (let i = 0; i < card.card.length; i++) {
                if (card.card[i].name === req.body.name) {
                    card.card.splice(i, 1);
                    await server.db.product.findOne({
                        name: req.body.name
                    }, async function (err, toReturn) {
                        if (err) throw err;
                            toReturn.qnt += req.body.qnt;
                            toReturn.save();
                            server.io.emit('getProducts', await server.getProducts());
                    });
                }
            }
            card.save();
            return res.json(card);
        }
    }
}