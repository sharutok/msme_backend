const { vendor_master } = require("../models");
const sequelize = require("sequelize");
const Op = sequelize.Op;
const sendEmail = require("../email");


 function op_plant(plant) {
    if (plant === "CHD") {
      return a = ["CJ (CHD PROJ)", "CE (CHD EQPT)", "CC(CHN CONS)", "CG (CHD PWRG)", "PE (PMP EQPT)", "CW (CHD WAPS)", "CD (CHD DEALERS)", "CH (CHD CONS)", "PE (PMP EQPT)"]
    }
    else if (plant === "CHN") {
      return b = ["CC(CHN CONS)"]
    }
    else if (plant === "HO") {
      return c = ["HO (HEAD OFFICE)"]
    }
    else if (plant === "RPR") {
      return d = ["RC (RPR CONS)"]
    }
    else if (plant === "SIL") {
      return e = ["SC (SIL CONS)"]
    }
    else if (plant === "ALL") {
      return d = ["HO (HEAD OFFICE)", "RC (RPR CONS)", "SC (SIL CONS)", "CC(CHN CONS)", "CJ (CHD PROJ)", "CE (CHD EQPT)", "CC(CHN CONS)", "CG (CHD PWRG)", "PE (PMP EQPT)", "CW (CHD WAPS)", "CD (CHD DEALERS)", "CH (CHD CONS)", "PE (PMP EQPT)"]
    }
  }

let plantValueFromCookie;
//POST DATA 
exports.sendData = async (req, res) => {
  let data = {
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

        await vendor_master.create(data)

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

// SEE DATA FOR GIVEN VENDOR NO
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
        supplier_name,
        organization,
        type,
        certificate_no,
        created_date,
        certificate_agency,
        certificate_expiration_date,
        certificate_registration_date,
        vendor_email,
        remarks, status, delete_flag, isMSME_flag
      } = data;
      res.status(200).json({
        status: 200,
        result: [
          {
            supplier_number,
            supplier_name,
            organization,
            type,
            certificate_no,
            created_date,
            certificate_agency,
            certificate_expiration_date,
            certificate_registration_date,
            vendor_email,
            remarks,
            status,
            delete_flag,
            isMSME_flag
          },
        ],
      });
    }
  } catch (error) {
    res.status(404).json({
      message: error,
      data: "unsuccessfull"
    });
  }
};

//GET ALL VENDERS
exports.allVendor = async (req, res) => {
  const { plant } = req.params
  // console.log(plant);
  let result = op_plant(plant)
 plantValueFromCookie=result
  let allVendor = await vendor_master.findAll({
    where: {
      organization: result, delete_flag: false
    }
  })
  res.json({
    result_length: allVendor.length,
    allVendor

  })
}

//UPDATE VENDOR USING
exports.updateData = async (req, res) => {
  const id = req.params.id;
  const {
    supplier_number,
    supplier_name,
    organization,
    type,
    certificate_no,
    created_date,
    certificate_agency,
    certificate_expiration_date,
    certificate_registration_date,
    vendor_email,
    remarks, status, delete_flag, isMSME_flag
  } = req.body
  const data = {
    supplier_number,
    supplier_name,
    organization,
    type,
    certificate_no,
    created_date,
    certificate_agency,
    certificate_expiration_date,
    certificate_registration_date,
    vendor_email,
    remarks, status, delete_flag, isMSME_flag
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
console.log(plantValueFromCookie)
  const status = req.params.status;
  try {
    const isStatus = await vendor_master.findAll(
      { where:
       { status, 
       delete_flag: false,
       organization:plantValueFromCookie } });
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
          // {
          //   status: {
          //     [Op.like]: `%${searchVariable}%`,
          //   },
          // },
        ],
      },
    });
    res.status(200).json({
      length: searchResult.length,
      result: searchResult,
    });
    console.log(searchResult);
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

