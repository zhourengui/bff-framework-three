import Router from '@koa/router';
import IndexController from './IndexController';
import BooksController from './BooksController';
import ApiController from './ApiController';

const router = new Router();
const indexController = new IndexController();
const booksController = new BooksController();
const apiController = new ApiController();

function initController(app) {
    router.get('/', indexController.actionIndex);
    router.get('/api/getBooksList', apiController.actionBooksList);
    router.get('/books/list', booksController.actionBooksList);
    router.get('/books/create', booksController.actionBooksCreate);
    app
        .use(router.routes())
        // ctx.staus 404  response 对象header头
        .use(router.allowedMethods());
}


export default initController;