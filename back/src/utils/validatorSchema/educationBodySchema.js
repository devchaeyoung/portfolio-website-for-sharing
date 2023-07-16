import joi from "joi";

class educationBodySchema {
  static postEducationSchema() {
    return joi.object({
      title: joi.string().min(1).required(),
      major: joi.string().min(1).required(),
      crnt: joi.string().min(1).required(),
      startDate: joi.date().iso().required(),
      endDate: joi.date().iso().required(),
    });
  }

  static putEducationSchema() {
    return joi.object({
      title: joi.string().min(1).optional(),
      major: joi.string().min(1).optional(),
      crnt: joi.string().min(1).optional(),
      startDate: joi.date().iso().optional(),
      endDate: joi.date().iso().optional(),
    });
  }
}

export { educationBodySchema };
