import { crtfcAuthService } from "../services/crtfcService";

const postCrtfc = async (req, res, next) => {
  try {
    const author = req.currentUserId;
    const { title, licence, issuedDate, issuer, langscore } = req.body;

    const newCrtfc = await crtfcAuthService.addCrtfc(
      title,
      licence,
      issuedDate,
      issuer,
      langscore,
      author
    );
    res.status(201).json(newCrtfc);
  } catch (error) {
    next(error);
  }
};

const userGetCrtfc = async (req, res, next) => {
  try {
    const crtfc = await crtfcAuthService.getCrtfc(req.currentUserId);

    res.status(200).send(crtfc);
  } catch (error) {
    next(error);
  }
};

const getCrtfc = async (req, res, next) => {
  try {
    const crtfcId = await crtfcAuthService.getCrtfc(req.params.id);
    res.status(200).send(crtfcId);
  } catch (error) {
    next(error);
  }
};

const putCrtfc = async (req, res, next) => {
  try {
    const crtfcId = req.params.id;

    const title = req.body.title ?? null;
    const licence = req.body.licence ?? null;
    const issuedDate = req.body.issuedDate ?? null;
    const issuer = req.body.issuer ?? null;
    const langscore = req.body.langscore ?? null;

    const toUpdate = { title, licence, issuedDate, issuer, langscore };

    const updatedCrtfc = await crtfcAuthService.setCrtfc(crtfcId, {
      toUpdate: { ...req.body },
    });

    res.status(201).send(updatedCrtfc);
  } catch (error) {
    next(error);
  }
};

const deleteCrtfc = async (req, res, next) => {
  try {
    const deleteCrtfc = await crtfcAuthService.deleteCrtfc(req.params.id);
    res.status(200).send(deleteCrtfc);
  } catch (error) {
    next(error);
  }
};

export { postCrtfc, userGetCrtfc, getCrtfc, putCrtfc, deleteCrtfc };
