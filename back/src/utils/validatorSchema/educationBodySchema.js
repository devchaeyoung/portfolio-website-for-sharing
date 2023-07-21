import joi from "joi";

class educationBodySchema {
  static postEducationSchema() {
    return joi.object({
      title: joi.string().min(1).required(),
      major: joi.string().min(1).required(),
      grades: joi.number().required().min(0).max(4.5),
      startDate: joi.date().iso().required(),
      endDate: joi.date().iso().required().greater(joi.ref("startDate")),
    });
  }

  static putEducationSchema() {
    return joi.object({
      title: joi.string().min(1).optional(),
      major: joi.string().min(1).optional(),
      grades: joi.number().optional().min(0).max(4.5),
      startDate: joi.date().iso().optional(),
      endDate: joi.date().iso().optional().greater(joi.ref("startDate")),
    });
  }
}

export { educationBodySchema };
