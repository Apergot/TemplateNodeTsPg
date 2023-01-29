import { body } from "express-validator";

export const UserRegistrationValidation = [
    body('email').isEmail().withMessage('Please provide valid email'),
    body('password')
        .isLength({ min: 4, max: 20 })
        .withMessage('Password must be between 4 and 20 characters')
];