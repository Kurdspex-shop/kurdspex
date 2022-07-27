let Joi = require("joi");
let appError = require("../scripts/AppError");

let itemSchema = Joi.object({
    item: Joi.object({
        item_name: Joi.string().required(),
        item_type: Joi.string().required(),
        mode: Joi.string().required(),
        visible: Joi.string().required(),
        main_image: Joi.string().required(),
        sub_image_1: Joi.string().required(),
        sub_image_2: Joi.string().required(),
        sub_image_3: Joi.string().required(),
        item_description: Joi.string().required(),
        details: Joi.string().required(),
        body: Joi.string(),
        rating: Joi.number().required(),
        price: Joi.number().required(),
        profit: Joi.number().required(),
        discount: Joi.number().required(),
        coin: Joi.number().required().min(0),
        quantity: Joi.number().required(),
        tags: Joi.string().required()
    }).required()
});

let coinSchema = Joi.object({
    coin: Joi.object({
        item_name: Joi.string().required(),
        mode: Joi.string().required(),
        visible: Joi.string().required(),
        main_image: Joi.string().required(),
        sub_image_1: Joi.string().required(),
        sub_image_2: Joi.string().required(),
        sub_image_3: Joi.string().required(),
        item_description: Joi.string().required(),
        details: Joi.string().required(),
        body: Joi.string().required(),
        price: Joi.number().required(),
        quantity: Joi.number().required()
    }).required()
});

let recordSchema = Joi.object({
    record: Joi.object({
        record_money: Joi.number().required(),
        record_type: Joi.string().required(),
        record_description: Joi.string().required()
    }).required()
});

let logInSchema = Joi.object({
    email: Joi.string().email().required(),
    user_password: Joi.string().required()
});

let signUpSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.number().required(),
    user_password: Joi.string().required(),
    code: Joi.string()
});

let middleware = {
    validateItem: (req, res, next) => {
        const { error } = itemSchema.validate(req.body);

        if(error) {
            let message = error.details.map(el => el.message).join(',');
            throw new appError(message, 400);
        } else {
            next();
        }
    },
    validateCoin: (req, res, next) => {
        const { error } = coinSchema.validate(req.body);

        if(error) {
            let message = error.details.map(el => el.message).join(',');
            throw new appError(message, 400);
        } else {
            next();
        }
    },
    validateRecord: (req, res, next) => {
        const { error } = recordSchema.validate(req.body);

        if(error) {
            let message = error.details.map(el => el.message).join(',');
            throw new appError(message, 400);
        } else {
            next();
        }
    },
    validateLogIn: (req, res, next) => {
        const { error } = logInSchema.validate(req.body);

        if(error) {
            let message = error.details.map(el => el.message).join(',');
            throw new appError(message, 400);
        } else {
            next();
        }
    },
    validateSignUp: (req, res, next) => {
        const { error } = signUpSchema.validate(req.body);

        if(error) {
            let message = error.details.map(el => el.message).join(',');
            throw new appError(message, 400);
        } else {
            next();
        }
    }
}

module.exports = middleware;