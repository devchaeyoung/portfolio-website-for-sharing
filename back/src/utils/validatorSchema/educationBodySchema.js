import joi from "joi";

class educationBodySchema {
  static postEducationSchema() {
    return joi.object({
      title: joi.string().min(1).required(),
      major: joi.string().min(1).required(),
      grades: joi.number().required(),
      startDate: joi.date().iso().required(),
      endDate: joi.date().iso().required(),
    });
  }

  static putEducationSchema() {
    return joi.object({
      title: joi.string().min(1).optional(),
      major: joi.string().min(1).optional(),
      grades: joi.number().optional(),
      startDate: joi.date().iso().optional(),
      endDate: joi.date().iso().optional(),
    });
  }
}

export { educationBodySchema };
