// commonjs 语法
import Koa from 'koa';
import config from './config/';
import initController from './controllers';
import render from 'koa-swig';
import staticServer from 'koa-static';
import co from 'co';
import {
    historyApiFallback
} from 'koa2-connect-history-api-fallback';
import errorHandler from './middlewares/ErrorHandler';
import log4js from "log4js";


const app = new Koa();

log4js.configure({
    // 日志存放目录
    appenders: {
        globalError: {
            type: "file",
            filename: "./logs/error.log"
        }
    },
    // 日志分类
    categories: {
        default: {
            appenders: ["globalError"],
            level: "error"
        }
    }
});
const logger = log4js.getLogger('globalError');
/* logger.trace("Entering cheese testing");
logger.debug("Got cheese.");
logger.info("Cheese is Comté.");
logger.warn("Cheese is quite smelly.");

logger.error("Cheese is too ripe!");
logger.fatal("Cheese was breeding ground for listeria."); */


app.use(historyApiFallback({
    index: '/',
    whiteList: ['/api', 'books']
}));
app.use(staticServer(config.staticDir));
errorHandler.error(app, logger);
initController(app);
app.context.render = co.wrap(render({
    root: config.viewDir,
    autoescape: true, // v-html v-text
    cache: config.cache, // disable, set to false
    ext: 'html',
    varControls: ['[[', ']]'],
    writeBody: false
}));

app.listen(config.port, () => {
    console.log(`server is running at http://localhost:${config.port}`)
});