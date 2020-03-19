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
const http_1 = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const product_1 = require("./schemas/product");
const purchase_1 = require("./schemas/purchase");
const priceChange_1 = require("./schemas/priceChange");
const card_1 = require("./schemas/card");
const productController_1 = require("./controllers/productController");
const purchaseController_1 = require("./controllers/purchaseController");
const cardController_1 = require("./controllers/cardController");
const api = require("./routes/api");
class ShopServer {
    constructor() {
        this.productController = new productController_1.ProductController(this);
        this.purchaseController = new purchaseController_1.PurchaseController(this);
        this.cardController = new cardController_1.CardController(this);
        this.db = Object();
        this.createApp();
        this.config();
        this.createServer();
        this.sockets();
        this.listen();
        this.routing();
    }
    createApp() {
        this.app = express();
    }
    routing() {
        return __awaiter(this, void 0, void 0, function* () {
            api.register(this.app);
            this.app.post('/addProduct', yield this.productController.onAddProduct());
            this.app.get('/products', yield this.productController.onGetProducts());
            this.app.get('/purchase', yield this.purchaseController.onPurchase());
            this.app.get('/card', yield this.cardController.onGetCard());
            this.app.post('/card', yield this.cardController.onAddToCard());
            this.app.post('/card/inq', yield this.cardController.onInq());
            this.app.post('/card/remove', yield this.cardController.onRemove());
            this.app.post('/card/deq', yield this.cardController.onDeq());
        });
    }
    createServer() {
        this.server = http_1.createServer(this.app);
    }
    config() {
        this.port = process.env.PORT || ShopServer.PORT;
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        const corsOptions = {
            origin: '*',
            optionsSuccessStatus: 200
        };
        this.app.use(cors(corsOptions));
        //const MONGODB_CONNECTION: string = "mongodb://localhost/product";
        const MONGODB_CONNECTION = "mongodb://dbg-user-db:OH4OScBqA3SZhpG4nyZ802pQTiLdeuNkyvn0EmmqhyMskpCwnZizkf6IuoxU6uGW4cQ8fvJAykA8Kp07zD5FAw==@dbg-user-db.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@dbg-user-db@";
        mongoose.connect(MONGODB_CONNECTION, { useNewUrlParser: true })
            .then(() => console.log('Connect to DB sucess'))
            .catch((err) => console.log(err));
        let connection = mongoose.createConnection(MONGODB_CONNECTION, { useNewUrlParser: true });
        this.db.product = connection.model("Product", product_1.productSchema);
        this.db.purchase = connection.model("Purchase", purchase_1.purchaseSchema);
        this.db.priceChange = connection.model("PriceChange", priceChange_1.priceChangeSchema);
        this.db.card = connection.model("Card", card_1.cardSchema);
        this.timer = global.setInterval(() => this.myTimer(), 20000);
    }
    sockets() {
        this.io = socketIo(this.server);
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });
        this.io.on('connect', (socket) => __awaiter(this, void 0, void 0, function* () {
            console.log('Connected client on port %s.', this.port);
            socket.on('getProducts', () => __awaiter(this, void 0, void 0, function* () {
                this.io.emit('getProducts', yield this.getProducts());
            }));
            socket.on('getPurchases', () => __awaiter(this, void 0, void 0, function* () {
                this.io.emit('getPurchases', yield this.getPurchases());
            }));
            socket.on('getPriceChanges', () => __awaiter(this, void 0, void 0, function* () {
                this.io.emit('getPriceChanges', yield this.getPriceChanges());
            }));
            socket.on('getCard', () => __awaiter(this, void 0, void 0, function* () {
                this.io.emit('getCard', yield this.getCard());
            }));
            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        }));
    }
    getCard() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.card.findOne((err, card) => {
                if (err)
                    return (err);
                return JSON.stringify(card.map(el => el.toObject()));
            });
        });
    }
    getProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.product.find((err, products) => {
                if (err)
                    return (err);
                return JSON.stringify(products.map(el => el.toObject()));
            });
        });
    }
    getPriceChanges() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.priceChange.find((err, priceChanges) => {
                if (err)
                    return (err);
                return JSON.stringify(priceChanges.map(el => el.toObject()));
            });
        });
    }
    getPurchases() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.purchase.find((err, purchses) => {
                if (err)
                    return (err);
                return JSON.stringify(purchses.map(el => el.toObject()));
            });
        });
    }
    getApp() {
        return this.app;
    }
    myTimer() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.product.find((err, products) => {
                for (let prod of products) {
                    let dateNow = new Date().toUTCString();
                    let change = Math.floor(Math.random() * 6) + 10;
                    let growth = (Math.random() > 0.5);
                    if (growth) {
                        prod.currPrice += (Math.round(prod.currPrice * change)) / 100;
                        prod.priceChange = change;
                        prod.save();
                        let priceChange = new this.db.priceChange({ name: prod.name, price: prod.currPrice, date: dateNow });
                        priceChange.save();
                    }
                    else if (prod.currPrice - prod.currPrice * change / 100 >= 0.1) {
                        prod.currPrice -= (Math.round(prod.currPrice * change)) / 100;
                        prod.priceChange = 0 - change;
                        prod.save();
                        let priceChange = new this.db.priceChange({ name: prod.name, price: prod.currPrice, date: dateNow });
                        priceChange.save();
                    }
                }
            });
            this.io.emit('getProducts', yield this.getProducts());
            this.io.emit('getPriceChanges', yield this.getPriceChanges());
        });
    }
}
ShopServer.PORT = 8080;
exports.ShopServer = ShopServer;
//# sourceMappingURL=server.js.map