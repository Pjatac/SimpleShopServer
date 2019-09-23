import { ShopServer } from "server";

export class PurchaseController {

    server: ShopServer;

    constructor(server: ShopServer) {
        this.server = server;
    }
    
    public async onPurchase() {
        const server = this.server;
        return async function (req, res) {
            let card = await server.db.card.findOne();
            const purchase = new server.db.purchase();
            for (let prod of card.card) {
                purchase.purchases.push({ name: prod.name, qnt: prod.qnt, price: prod.price, cost: prod.price * prod.qnt });
                await server.db.product.findOne({
                    name: prod.name
                }, async function (err, toBuy) {
                    if (err) throw err;
                    if (toBuy.qnt === 0) {
                        toBuy.remove();
                    }
                });
            }
            purchase.save();
            await server.db.card.collection.drop();
            server.io.emit('getProducts', await server.getProducts());
            server.io.emit('getPurchases', await server.getPurchases());
            return res.json(`Thank you for using our shop!`);
        }
    }
}