const orderCtrl = require('./../controller').order;
const joiRouter = require('koa-joi-router');
const Joi = joiRouter.Joi;
const router = joiRouter();

// Orders
router.route({
    method: 'post',
    path: '/orders',
    validate: {
        type: 'json',
        body: Joi.object({
            origin: Joi.array().items(Joi.string().required()).length(2).required(),
            destination: Joi.array().items(Joi.string().required()).length(2).required()
        }).options({ abortEarly: false }),
        continueOnError: true
    },
    handler: async (ctx) => {
        if (ctx.invalid) {
            ctx.response.status = 400;
            const error = 'Invalid Request';
            ctx.body = {
                error
            };
        } else {
            await orderCtrl.createOrder(ctx);
        }
    }
})

router.route({
    method: 'patch',
    path: '/orders/:id',
    validate: {
        type: 'json',
        params: Joi.object({
            id: Joi.number().integer().greater(0).required()
        }).options({ abortEarly: false }),
        body: Joi.object({
            status: Joi.string().valid("TAKEN").required()
        }).options({ abortEarly: false }),
        continueOnError: true
    },
    handler: async (ctx) => {
        if (ctx.invalid) {
            ctx.status = 400;
            const error = 'Invalid Request';
            ctx.body = {
                error
            };
        } else {
            await orderCtrl.takeOrder(ctx);
        }
    }
})

router.route({
    method: 'GET',
    path: '/orders',
    validate: {
        query: Joi.object().optional().keys({
            page: Joi.number().integer().greater(0).required(),
            limit: Joi.number().integer().required()
        }).options({ abortEarly: false }),
        continueOnError: true
    },
    handler: async (ctx) => {
        if (ctx.invalid) {
            ctx.status = 400;
            const error = 'Invalid Request';
            ctx.body = {
                error
            };
        } else {
            await orderCtrl.getOrders(ctx);
        }
    }
})

module.exports = router;


