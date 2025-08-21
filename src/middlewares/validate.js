export function validate(schema) {
  return (req, res, next) => {
    const validation = schema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        // basic validation error, should improve to include specific error messages
        message: 'Validation failed',
      });
    }

    next();
  };
}
