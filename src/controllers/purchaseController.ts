import { ShopServer } from "server";

export class PurchaseController {
    server: ShopServer;

    constructor(server: ShopServer) {
        this.server = server;
    }
    public onPurchase() {
        const server = this.server;
        return async function (req, res) {
            const products = new Array();
            for (var key in req.body) {
                if (req.body.hasOwnProperty(key)) {
                    products.push(req.body[key]);
                }
            }
            for (let prod of products) {
                const product = await server.db.product.findById(prod._id);
                if (product && prod.qnt > product.qnt)
                    return res.send(`Sorry, insufficient stock quantity for ${prod.name}`);
            }
            for (let prod of products) {
                server.db.product.findById(prod._id, (err, product) => {
                    if (err)
                        return res.send(err);
                    if (product && prod.qnt < product.qnt) {
                        product.qnt -= prod.qnt;
                        product.save();
                    } else {
                        server.db.product.findOneAndDelete(product.id, function (err) {
                            if (err)
                                console.log(err);
                        });
                    }
                });
            }
            const purchase = new server.db.purchase();
            for (let prod of products) {
                purchase.purchases.push({ name: prod.name, qnt: prod.qnt, price: prod.currPrice, cost: prod.currPrice * prod.qnt })
            }
            purchase.save();
            await server.db.card.collection.drop();
            server.io.emit('getProducts', await server.getProducts());
            server.io.emit('getPurchases', await server.getPurchases());
            return res.send(`ok`);
        }
    }
}