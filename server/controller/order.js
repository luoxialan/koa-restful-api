const order = require("../service").order;

class OrderController {
    static async getOrders(ctx) {
        let { page, limit } = ctx.query;
        let data = await order.getOrders(page, limit)
        ctx.response.status = 200;
        ctx.body = data
    }

    static async createOrder(ctx) {
        const { origin, destination } = ctx.request.body;
        const data = await order.createOrder(origin, destination)
        ctx.response.status = 200;
        ctx.body = data
    }

    static async takeOrder(ctx) {
        let { id } = ctx.params;
        const data = await order.takeOrder(id)
        ctx.response.status = 200;
        ctx.body = data
    }
}

module.exports = OrderController;