//POST
exports.uploadFileImg = async (req, res) => {
  if (req.files === null) {
    res.status(400).json({
      msg: "NO FILE UPLOADED",
    });
    const file = req.files.file;
    file.mv(`${__dirname}/client/public/upload/${file.name}`, (err) => {
      console.log(err);
      res.status(500).send(err);
    });
  }
};
