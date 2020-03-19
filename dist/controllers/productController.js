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
class ProductController {
    constructor(server) {
        this.server = server;
    }
    onGetProducts() {
        const server = this.server;
        return function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                const products = yield server.db.product.find();
                return res.json(products);
            });
        };
    }
    onAddProduct() {
        const server = this.server;
        return function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                const count = yield server.db.product.countDocuments();
                if (count < 5) {
                    let alreadyExist = false;
                    yield server.db.product.findOne({
                        name: req.body.name
                    }, function (err, prod) {
                        return __awaiter(this, void 0, void 0, function* () {
                            if (err)
                                throw err;
                            if (prod !== null)
                                alreadyExist = true;
                        });
                    });
                    if (alreadyExist)
                        return res.json(`Sorry, product with such name is already on stock`);
                    else {
                        const product = new server.db.product(req.body);
                        product.save();
                        server.io.emit('getProducts', yield server.getProducts());
                        return res.json(product);
                    }
                }
                else {
                    return res.json(`Sorry, maximum store capacity (5) reached`);
                }
            });
        };
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=productController.js.map