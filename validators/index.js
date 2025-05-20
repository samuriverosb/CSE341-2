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

validate.createUserValidator = () => {
  return [
    body('username')
      .exists().withMessage('username is required').bail()
      .isString().withMessage('username must be a string').bail()
      .matches(/^[A-Za-z0-9_]{3,30}$/)
      .withMessage('username must be 3-30 chars and contain only letters, numbers, or underscores'),

    body('password')
      .exists().withMessage('password is required').bail()
      .isString().withMessage('password must be a string').bail()
      .isLength({ min: 8 }).withMessage('password must be at least 8 characters'),

    body('email')
      .exists().withMessage('email is required').bail()
      .isEmail().withMessage('email must be a valid email address')
      .normalizeEmail(),

    body('first_name')
      .exists().withMessage('first_name is required').bail()
      .isString().withMessage('first_name must be a string').bail()
      .notEmpty().withMessage('first_name cannot be empty'),

    body('last_name')
      .exists().withMessage('last_name is required').bail()
      .isString().withMessage('last_name must be a string').bail()
      .notEmpty().withMessage('last_name cannot be empty'),

    body('date_of_birth')
      .exists().withMessage('date_of_birth is required').bail()
      .isISO8601().withMessage('date_of_birth must be a valid date (YYYY-MM-DD)')
      .toDate(),

    body('favourite_games')
      .optional()
      .isArray().withMessage('favourite_games must be an array').bail()
      .custom(arr => arr.every(g => typeof g === 'string' && g.trim().length > 0))
      .withMessage('each favourite game must be a non-empty string'),
  ];
}

validate.checkCreateUserData = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
}

validate.updateUserValidator = () => {
  return [
    param('id')
      .exists().withMessage('user id is required').bail()
      .isMongoId().withMessage('invalid user id'),

    body('username')
      .optional()
      .isString().withMessage('username must be a string').bail()
      .matches(/^[A-Za-z0-9_]{3,30}$/)
      .withMessage('username must be 3-30 chars and contain only letters, numbers, or underscores'),

    body('password')
      .optional()
      .isString().withMessage('password must be a string').bail()
      .isLength({ min: 8 }).withMessage('password must be at least 8 characters'),

    body('email')
      .optional()
      .isEmail().withMessage('email must be a valid email address')
      .normalizeEmail(),

    body('first_name')
      .optional()
      .isString().withMessage('first_name must be a string').bail()
      .notEmpty().withMessage('first_name cannot be empty'),

    body('last_name')
      .optional()
      .isString().withMessage('last_name must be a string').bail()
      .notEmpty().withMessage('last_name cannot be empty'),

    body('date_of_birth')
      .optional()
      .isISO8601().withMessage('date_of_birth must be a valid date (YYYY-MM-DD)')
      .toDate(),

    body('favourite_games')
      .optional()
      .isArray().withMessage('favourite_games must be an array').bail()
      .custom(arr => arr.every(g => typeof g === 'string' && g.trim().length > 0))
      .withMessage('each favourite game must be a non-empty string'),
  ];
}

validate.checkUpdateUserData = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
}

module.exports = validate;