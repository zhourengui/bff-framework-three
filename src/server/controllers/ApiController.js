import Controller from './Controller'
import BooksModel from '../models/BooksModel';

class ApiController extends Controller {
    constructor() {
        super();
    }
    async actionBooksList(ctx) {
        const booksModel = new BooksModel();
        const result = await booksModel.getBooksList()
        ctx.body = "接口返回的数据";
    }
}
export default ApiController;