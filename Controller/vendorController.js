const { vendor_master } = require("../models");

//POST/SEND DATA
exports.sendData = async (req, res) => {
  const data = {
    supplier_number: req.params.id,
    organization: req.body.organization,
    supplier_name: req.body.supplier_name,
    type: req.body.type,
    created_date: req.body.created_date,
    inactive_date: req.body.inactive_date,
    classification: req.body.classification,
    certificate_no: req.body.certificate_no,
    certificate_agency: req.body.certificate_agency,
    certificate_expiration_date: req.body.certificate_expiration_date,
    certificate_registration_date: req.body.certificate_registration_date,
    vendor_email: req.body.vendor_email,
    status: req.body.status,
  };
  const id = req.params.id;
  try {
    const findData = await vendor_master.findOne({
      where: { supplier_number: id },
    });

    if (findData === null) {
      try {
        await vendor_master.create(data).then((result) => {
          res.json([
            { message: "created" },
            {
              result,
            },
          ]);
        });
      } catch (error) {
        res.status(404).json({
          message: error,
        });
      }
    } else {
      res.status(404).json({
        status: 404,
        message: `supplier id of '${id}' exist!!!`,
      });
    }
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
};

// GET VENDOR USING SUPPLIER_NO
exports.seeData = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await vendor_master.findOne({
      where: { supplier_number: id },
    });
    if (data === null) {
      res.status(404).json({
        status: 404,
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
        classification,
        certificate_no,
        certificate_agency,
        certificate_expiration_date,
        certificate_registration_date,
        status,
        vendor_email,
      } = data;
      res.status(200).json({
        status: 200,
        result: [
          {
            supplier_number,
            organization,
            supplier_name,
            type,
            status,
            certificate_no,
            created_date,
            inactive_date,
            classification,
            certificate_agency,
            certificate_expiration_date,
            certificate_registration_date,
            vendor_email,
          },
        ],
      });
    }
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
};

//GET ALL VANDERS
exports.allVendor = async (req, res) => {
  const allVendor = await vendor_master.findAll();

  res.status(201).json({
    length: allVendor.length,
    allVendor,
  });
};

//UPDATE VENDOR USING
exports.updateData = async (req, res) => {
  const id = req.params.id;
  const data = {
    supplier_number: req.body.supplier_number,
    organization: req.body.organization,
    supplier_name: req.body.supplier_name,
    type: req.body.type,
    created_date: req.body.created_date,
    inactive_date: req.body.inactive_date,
    classification: req.body.classification,
    certificate_no: req.body.certificate_no,
    certificate_agency: req.body.certificate_agency,
    certificate_expiration_date: req.body.certificate_expiration_date,
    certificate_registration_date: req.body.certificate_registration_date,
    status: req.body.status,
    vendor_email: req.body.vendor_email,
  };

  const isSupplier_id = await vendor_master.findOne({
    where: { supplier_number: id },
  });
  if (isSupplier_id === null) {
    console.log("id no match");
    res.status(400).json({
      message: `there is no supplier id of '${id}' exist!!!`,
    });
  } else {
    console.log("id matched");
    const UpdatedData = await vendor_master.update(data, {
      where: { supplier_number: id },
    });
    console.log("update");
    res.json({
      UpdatedData,
    });
  }
};

//DELETE
exports.deleteData = async (req, res) => {
  const id = req.params.id;
  const isSupplier_id = await vendor_master.findOne({
    where: { supplier_number: id },
  });

  if (isSupplier_id === null) {
    res.status(400).json({
      message: `there is no supplier id of '${id}' exist!!!`,
    });
  } else {
    vendor_master.destroy({ where: { supplier_number: id } });
    res.json({
      message: "deleted",
    });
  }
};

//GET STATUS ACCEPTED OR PENDING
exports.vendorStatus = async (req, res) => {
  const status = req.params.status;
  try {
    const isStatus = await vendor_master.findAll({ where: { status } });
    if (isStatus === "Approved" || isStatus === "approved")
      console.log("in approved");
    res.status(200).json({
      result_for: status,
      result: isStatus.length,
      isStatus,
    });
    if (isStatus === "Pending" || isStatus === "pending")
      res.status(200).json({
        result_for: status,
        result: isStatus.length,
        isStatus,
      });
  } catch (error) {
    res.status(400).json({
      message: "something went wromg......",
    });
  }
};

// SMART SEARCH

exports.smartSearch = async (req, res) => {
  const searchVariable = req.params.searchVariable;
  console.log(searchVariable);
  const searchResult = await vendor_master.findAll({
    where: { star: searchVariable },
  });
};

// //POST-UPLOAD IMG
// exports.uploadImgfile = async (req, res) => {
//   if (req.files === null) {
//     return res.status(400).json({ mesg: "no file uploaded" });
//   }
//   const file = req.files.file;
//   file.mv(`${__dirname}`, (err) => {
//     if (err) {
//       console.log(err);
//       return res.statusl;
//     }
//   });
// };
