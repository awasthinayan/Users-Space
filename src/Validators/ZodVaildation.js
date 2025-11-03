export const Vailidation = (schema) => {
  return async (req, res, next) => {
    try {
        console.log(req.body);
        await schema.parse(req.body);
        next();
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "vaildation failed",
            errors: error.errors
        });
    }
  };
};