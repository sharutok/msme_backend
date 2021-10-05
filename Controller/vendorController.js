const model = require("../models");

//POST
exports.sendData = async (req, res) => {
  const data = {
    supplier_number: req.body.supplier_number,
    organization: req.body.organization,
    supplier_name: req.body.supplier_name,
    type: req.body.type,
    created_date: req.body.created_date,
    inactive_date: req.body.inactive_date,
  };

  try {
    await model.vendor_master.create(data);
    res.json([{ message: "ok", data }]);
  } catch (error) {
    res.json({ message: "not ok" });
  }
};

// GET
exports.seeData = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await model.vendor_master.findOne({
      where: { supplier_number: id },
    });
    res.json([
      {
        data,
      },
    ]);
  } catch (error) {
    res.json({ messgae: `not there` });
  }
};

//UPDATE
exports.updateData = async (req, res) => {
  const id = req.params.id;
  const data = {
    supplier_number: req.body.supplier_number,
    organization: req.body.organization,
    supplier_name: req.body.supplier_name,
    type: req.body.type,
    created_date: req.body.created_date,
    inactive_date: req.body.inactive_date,
  };

  try {
    const UpdatedData = await model.vendor_master.update(data, {
      where: { id },
    });
    res.json([
      {
        message: "updated data",
        UpdatedData,
      },
    ]);
  } catch (error) {
    res.json({
      message: "something wrong.....",
    });
  }
};

//DELETE
exports.deleteData = async (req, res) => {
  const id = req.params.id;
  try {
    await model.vendor_master.destroy({ where: { id } });
    res.json({
      message: "deleted",
    });
  } catch (error) {
    res.json({
      message: "Something wrong.....",
    });
  }
};
