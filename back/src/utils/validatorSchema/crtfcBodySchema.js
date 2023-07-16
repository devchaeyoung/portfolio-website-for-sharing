import joi from "joi";

class crtfcBodySchema {
  static postCrtfcSchema() {
    return joi.object({
      title: joi.string().min(1).max(20).required(),
      license: joi.number().required(),
      issuedDate: joi.date().iso().required(),
      issuer: joi.string().min(1).max(20).required(),
      langscore: joi.number().required(),
    });
  }

  static putCrtfcSchema() {
    return joi.object({
      title: joi.string().min(1).max(20).optional(),
      license: joi.number().optional(),
      issuedDate: joi.date().iso().optional(),
      issuer: joi.string().min(1).max(20).optional(),
      langscore: joi.number().optional(),
    });
  }
}

export { crtfcBodySchema };
