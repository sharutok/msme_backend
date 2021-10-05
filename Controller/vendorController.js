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
    await model.vendor_master.create(data).then((result) => {
      res.json([
        { message: "created" },
        {
          result,
        },
      ]);
    });
  } catch (error) {
    error.errors.map((x) => {
      res.json({
        message: x.message,
      });
    });
  }
};

// GET
exports.seeData = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await model.vendor_master.findOne({
      where: { supplier_number: id },
    });
    if (data === null) {
      res.json({
        message: `there is no supplier id of '${id}' exist!!!`,
      });
    } else {
      const {
        supplier_number,
        organization,
        supplier_name,
        type,
        created_date,
        inactive_date,
      } = data;
      res.json({
        result: [
          {
            supplier_number,
            organization,
            supplier_name,
            type,
            created_date,
            inactive_date,
          },
        ],
      });
    }
  } catch (error) {
    res.json({
      message: error,
    });
  }
};

//UPDATE
exports.updateData = async (req, res) => {
  const id = req.params.id;
  const data = {
    supplier_number: req.params.id,
    organization: req.body.organization,
    supplier_name: req.body.supplier_name,
    type: req.body.type,
    created_date: req.body.created_date,
    inactive_date: req.body.inactive_date,
  };
  const isSupplier_id = await model.vendor_master.findOne({
    where: { supplier_number: id },
  });
  if (isSupplier_id === null) {
    res.json({
      message: `there is no supplier id of '${id}' exist!!!`,
    });
  } else {
    const UpdatedData = await model.vendor_master.update(data, {
      where: { supplier_number: id },
    });
    res.json({
      UpdatedData,
    });
  }
};

//DELETE
exports.deleteData = async (req, res) => {
  const id = req.params.id;
  const isSupplier_id = await model.vendor_master.findOne({
    where: { supplier_number: id },
  });

  if (isSupplier_id === null) {
    res.json({
      message: `there is no supplier id of '${id}' exist!!!`,
    });
  } else {
    model.vendor_master.destroy({ where: { supplier_number: id } });
    res.json({
      message: "deleted",
    });
  }
};
