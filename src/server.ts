import { createServer, Server } from 'http';
import * as express from 'express';
import * as bodyParser from "body-parser";
import * as socketIo from 'socket.io';
import mongoose = require("mongoose");
import * as cors from "cors";
import { IModel } from "./models/model";
import { IProductModel } from "./models/product";
import { IPurchaseModel } from './models/purchase';
import { IPriceChangeModel } from './models/priceChange';
import { ICardModel } from 'models/card';
import { productSchema } from "./schemas/product";
import { purchaseSchema } from './schemas/purchase';
import { priceChangeSchema } from './schemas/priceChange';
import { cardSchema } from './schemas/card';
import { ProductController } from './controllers/productController';
import { PurchaseController } from './controllers/purchaseController';
import { CardController } from './controllers/cardController';
import * as api from './routes/api';


export class ShopServer {
    public static readonly PORT: number = 8080;
    private app: express.Application;
    private server: Server;
    public io: SocketIO.Server;
    private port: string | number;
    public db: IModel;
    private timer: NodeJS.Timer;
    private productController: ProductController;
    private purchaseController: PurchaseController;
    private cardController: CardController;

    constructor() {
        this.productController = new ProductController(this);
        this.purchaseController = new PurchaseController(this);
        this.cardController = new CardController(this);
        this.db = Object();
        this.createApp();
        this.config();
        this.createServer();
        this.sockets();
        this.listen();
        this.routing();
    }

    private createApp(): void {
        this.app = express();
    }

    private async routing() {
        api.register(this.app);
        this.app.post('/addProduct', await this.productController.onAddProduct());
        this.app.get('/products', await this.productController.onGetProducts());
        this.app.get('/purchase', await this.purchaseController.onPurchase());
        this.app.get('/card', await this.cardController.onGetCard());
        this.app.post('/card', await this.cardController.onAddToCard());
        this.app.post('/card/inq', await this.cardController.onInq());
        this.app.post('/card/remove', await this.cardController.onRemove());
        this.app.post('/card/deq', await this.cardController.onDeq());
    }

    private createServer(): void {
        this.server = createServer(this.app);
    }

    private config(): void {
        this.port = process.env.PORT || ShopServer.PORT;
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        const corsOptions = {
            origin: '*',
            optionsSuccessStatus: 200
        }
        this.app.use(cors(corsOptions));
        mongoose.connect('mongodb://localhost/product', { useNewUrlParser: true })
            .then(() => console.log('Connect to DB sucess'))
            .catch((err) => console.log(err));

        const MONGODB_CONNECTION: string = "mongodb://localhost/product";
        let connection: mongoose.Connection = mongoose.createConnection(MONGODB_CONNECTION, { useNewUrlParser: true });

        this.db.product = connection.model<IProductModel>("Product", productSchema);
        this.db.purchase = connection.model<IPurchaseModel>("Purchase", purchaseSchema);
        this.db.priceChange = connection.model<IPriceChangeModel>("PriceChange", priceChangeSchema);
        this.db.card = connection.model<ICardModel>("Card", cardSchema);
        
        this.timer = global.setInterval(() => this.myTimer(), 20000);
    }

    private sockets(): void {
        this.io = socketIo(this.server);
    }

    private listen(): void {
        this.server.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });
        this.io.on('connect', async (socket: any) => {
            console.log('Connected client on port %s.', this.port);
            socket.on('getProducts', async () => {
                this.io.emit('getProducts', await this.getProducts());
            });
            socket.on('getPurchases', async () => {
                this.io.emit('getPurchases', await this.getPurchases());
            });
            socket.on('getPriceChanges', async () => {
                this.io.emit('getPriceChanges', await this.getPriceChanges());
            });
            socket.on('getCard', async () => {
                this.io.emit('getCard', await this.getCard());
            });
            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }

    public async getCard() {
        return await this.db.card.findOne((err, card) => {
            if (err)
                return (err);
            return JSON.stringify(card.map(el => el.toObject()));
        });
    }

    public async getProducts() {
        return await this.db.product.find((err, products) => {
            if (err)
                return (err);
            return JSON.stringify(products.map(el => el.toObject()));
        });
    }

    public async getPriceChanges() {
        return await this.db.priceChange.find((err, priceChanges) => {
            if (err)
                return (err);
            return JSON.stringify(priceChanges.map(el => el.toObject()));
        });
    }

    public async getPurchases() {
        return await this.db.purchase.find((err, purchses) => {
            if (err)
                return (err);
            return JSON.stringify(purchses.map(el => el.toObject()));
        });
    }
    
    public getApp(): express.Application {
        return this.app;
    }

    public async myTimer() {
        await this.db.product.find((err, products) => {
            for (let prod of products) {
                let dateNow = new Date().toUTCString();
                let change = Math.floor(Math.random() * 6) + 10;
                let growth = (Math.random() > 0.5)
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
        this.io.emit('getProducts', await this.getProducts());
        this.io.emit('getPriceChanges', await this.getPriceChanges());
    }
}