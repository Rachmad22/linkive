require("dotenv").config();
const model = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = {
  // post auth/login
  addSpace: (req, res) => {
    const requestBody = req.body;
    const authorization = req.headers.authorization.slice(6).trim();
    const decoded = jwt.verify(authorization, process.env.APP_SECRET_KEY);

    if (!decoded || !decoded.id) {
      res.status(401).json({
        status: "ERROR",
        messages: "Invalid token",
        data: null,
      });
    }

    model.space
      .create({ ...requestBody, createdBy: decoded.id })
      .then((result) => {
        if (!result) throw new Error("Failed insert data");

        res.status(201).json({
          status: "OK",
          messages: "insert success",
          data: null,
        });
      })
      .catch((error) =>
        res.status(400).json({
          status: "ERROR",
          messages: error.message || "Something wrong",
          data: null,
        })
      );
  },
  getSpaceDetail: (req, res) => {
    const authorization = req.headers.authorization.slice(6).trim();
    const decoded = jwt.verify(authorization, process.env.APP_SECRET_KEY);

    if (!decoded || !decoded.id) {
      res.status(401).json({
        status: "ERROR",
        messages: "Invalid token",
        data: null,
      });
    }

    model.space
      .findOne({
        where: { createdBy: decoded.id },
      })
      .then((result) => {
        if (!result) throw new Error("Failed get data");

        res.status(201).json({
          status: "OK",
          messages: "get success",
          data: result,
        });
      })
      .catch((error) =>
        res.status(400).json({
          status: "ERROR",
          messages: error.message || "Something wrong",
          data: null,
        })
      );
  },
};
