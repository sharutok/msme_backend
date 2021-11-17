const { vendor_master } = require("../models");
const sequelize = require("sequelize");
const Op = sequelize.Op;
const sendEmail = require("../email");

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
    remarks: req.body.remarks
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
        remarks
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
            remarks
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

//GET ALL VENDERS
exports.allVendor = async (req, res) => {
  const allVendor = await vendor_master.findAll(
    { where: { delete_flag: false, isMSME_flag: true } }
  );

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
    remarks: req.body.remarks
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
    await vendor_master.update({ delete_flag: true }, { where: { supplier_number: id } });
    res.json({
      message: "deleted",
    });
  }
};

//GET STATUS ACCEPTED OR PENDING
exports.vendorStatus = async (req, res) => {
  const status = req.params.status;

  try {
    const isStatus = await vendor_master.findAll({ where: { status, delete_flag: false } });
    if (status === "Approved" || status === "approved")
      // console.log("in approved");
      res.status(200).json({
        result_for: status,
        result: isStatus.length,
        isStatus,
      });
    if (status === "Pending" || status === "pending")
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
  try {
    const searchResult = await vendor_master.findAll({
      where: {
        [Op.or]: [
          {
            supplier_number: {
              [Op.like]: `%${searchVariable}%`,
            },
          },
          {
            organization: {
              [Op.like]: `%${searchVariable}%`,
            },
          },
          {
            supplier_name: {
              [Op.like]: `%${searchVariable}%`,
            },
          },
          ///MSME NO
          {
            certificate_no: {
              [Op.like]: `%${searchVariable}%`,
            },
          },
          {
            status: {
              [Op.like]: `%${searchVariable}%`,
            },
          },
        ],
      },
    });
    res.status(200).json({
      length: searchResult.length,
      result: searchResult,
    });
  } catch (error) {
    res.status(400).json({
      message: "something went wromg......",
    });
  }
};

//POST-SEND EMAIL
exports.sendEmail = async (req, res) => {
  const vendor_email = req.body.vendor_email;
  const supplier_number = req.body.supplier_number;
  const portalLink = req.body.portal_link;

  console.log(vendor_email, supplier_number, portalLink);
  try {
    await sendEmail({
      email: vendor_email,
      subject: "Test Subject",
      message: `Dear Vendor,
      Please Click ${portalLink} and fill in the required details along with uploading of certificate.
      Your Vendor Number is : ${supplier_number}
      
      `,
    });
    res.json({
      message: `send to email ${vendor_email}`,
    });
  } catch (error) {
    res.json({
      message: `something went wrong`,
      error,
    });
  }
};

//DATA FOR TODAY 
exports.dataForToday = async (req, res) => {
  const TODAY_START = new Date().setHours(0, 0, 0, 0);
  const NOW = new Date();
  try {
    const dataToday = await vendor_master.findAll({
      where: {
        createdAt: {
          [Op.gt]: TODAY_START,
          [Op.lt]: NOW
        }
      }
    });

    res.json({
      length: dataToday.length,
      data: {
        dataToday
      }

    })
  } catch (error) {
    res.json({
      message: `something went wrong`
    })
  }

}

