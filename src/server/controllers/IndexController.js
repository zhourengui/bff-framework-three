import Controller from './Controller';

class IndexController extends Controller {
    constructor() {
        super();
    }
    async actionIndex(ctx) {
        // throw new Error('自定义错误');
        ctx.body = "🏮首页"
    }
}
export default IndexController;