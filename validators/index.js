const { body, param, validationResult } = require("express-validator")
const validate = {}

validate.createGameValidator = () => {
  return [
    body('name')
      .exists().withMessage('name is required')
      .bail()
      .isString().withMessage('name must be a string')
      .bail()
      .notEmpty().withMessage('name cannot be empty'),

    body('release_date')
      .exists().withMessage('release_date is required')
      .bail()
      .isISO8601().withMessage('release_date must be a valid date (YYYY-MM-DD)')
      .toDate(),

    body('genre')
      .exists().withMessage('genre is required')
      .bail()
      .isArray({ min: 1 }).withMessage('genre must be an array with at least one entry')
      .bail()
      .custom((arr) => arr.every(g => typeof g === 'string' && g.length > 0))
      .withMessage('each genre must be a non-empty string'),

    body('company')
      .exists().withMessage('company is required')
      .bail()
      .isString().withMessage('company must be a string')
      .bail()
      .notEmpty().withMessage('company cannot be empty'),

    body('total_sales')
      .exists().withMessage('total_sales is required')
      .bail()
      .isInt({ min: 0 }).withMessage('total_sales must be a non-negative integer')
      .toInt(),

    body('platform')
      .exists().withMessage('platform is required')
      .bail()
      .isArray({ min: 1 }).withMessage('platform must be an array with at least one entry')
      .bail()
      .custom((arr) => arr.every(p => typeof p === 'string' && p.length > 0))
      .withMessage('each platform must be a non-empty string'),
  ];
}

validate.checkCreateData = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
}

validate.updateGameValidator = () => {
  return [
    param('id')
      .exists().withMessage('game id is required')
      .bail()
      .isMongoId().withMessage('invalid game id'),

    body('name')
      .optional()
      .isString().withMessage('name must be a string')
      .bail()
      .notEmpty().withMessage('name cannot be empty'),

    body('release_date')
      .optional()
      .isISO8601().withMessage('release_date must be a valid date (YYYY-MM-DD)')
      .toDate(),

    body('genre')
      .optional()
      .isArray({ min: 1 }).withMessage('genre must be an array with at least one entry')
      .bail()
      .custom((arr) => arr.every(g => typeof g === 'string' && g.length > 0))
      .withMessage('each genre must be a non-empty string'),

    body('company')
      .optional()
      .isString().withMessage('company must be a string')
      .bail()
      .notEmpty().withMessage('company cannot be empty'),

    body('total_sales')
      .optional()
      .isInt({ min: 0 }).withMessage('total_sales must be a non-negative integer')
      .toInt(),

    body('platform')
      .optional()
      .isArray({ min: 1 }).withMessage('platform must be an array with at least one entry')
      .bail()
      .custom((arr) => arr.every(p => typeof p === 'string' && p.length > 0))
      .withMessage('each platform must be a non-empty string'),
  ];
}

validate.checkUpdateData = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
}

module.exports = validate;