import { ShopServer } from "server";

export class ProductController {
    server: ShopServer;

    constructor(server: ShopServer) {
        this.server = server;
    }
    public onGetProducts() {
        const server = this.server;
        return async function (req, res) {
            const products = await server.db.product.find();
            return res.json(products);
        }
    }
    public onAddProduct() {
        const server = this.server;
        return async function (req, res) {
            const count = await server.db.product.countDocuments();
            if (count < 5) {
                let alreadyExist = false;
                await server.db.product.findOne({
                    name: req.body.name
                }, async function (err, prod) {
                    if (err) throw err;
                    if (prod !== null)
                        alreadyExist = true;
                });
                if (alreadyExist)
                    return res.json(`Sorry, product with such name is already on stock`);
                else {
                    const product = new server.db.product(req.body);
                    product.save();
                    server.io.emit('getProducts', await server.getProducts());
                    return res.json(product);
                }
            } else {
                return res.json(`Sorry, maximum store capacity (5) reached`);
            }
        }
    }
}
