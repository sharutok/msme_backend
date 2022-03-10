const { vendor_master, User, image_uploader } = require("../models");
const sequelize = require("sequelize");
const Op = sequelize.Op;
const sendEmail = require("../email");
var LocalStorage = require("node-localstorage").LocalStorage;
localStorage = new LocalStorage("./scratch");
const moment = require("moment");
const mysqlConfig = require("../config/config.json");
const mysql = require("mysql2");
var json2xls = require("json2xls");
const fs = require("fs");

function op_plant(plant) {
  if (plant === "CHD") {
    return (a = [
      "CD (CHD DEALERS)",
      "CE (CHD EQPT)",
      "CG (CHD PWRG)",
      "CJ (CHD PROJ)",
      "CW (CHD WAPS)",
      "PE (PMP EQPT)",
    ]);
  } else if (plant === "CHN") {
    return (b = ["CC (CHN CONS)"]);
  } else if (plant === "HO") {
    return (c = ["HO (HEAD OFFICE)"]);
  } else if (plant === "RPR") {
    return (d = ["RC (RPR CONS)"]);
  } else if (plant === "SIL") {
    return (e = ["SC (SIL CONS)"]);
  } else if (plant === "ALL") {
    return (d = [
      "HO (HEAD OFFICE)",
      "RC (RPR CONS)",
      "SC (SIL CONS)",
      "CC (CHN CONS)",
      "CJ (CHD PROJ)",
      "CE (CHD EQPT)",
      "CG (CHD PWRG)",
      "PE (PMP EQPT)",
      "CW (CHD WAPS)",
      "CD (CHD DEALERS)",
      "CH (CHD CONS)",
      "PE (PMP EQPT)",
    ]);
  }
}

function plant_op(op) {
  if (
    [
      "CD (CHD DEALERS)",
      "CE (CHD EQPT)",
      "CG (CHD PWRG)",
      "CJ (CHD PROJ)",
      "CW (CHD WAPS)",
      "PE (PMP EQPT)",
    ].includes(op)
  ) {
    return "CHD";
  } else if (["CC (CHN CONS)"].includes(op)) {
    return "CHN";
  } else if (["HO (HEAD OFFICE)"].includes(op)) {
    return "HO";
  } else if (["RC (RPR CONS)"].includes(op)) {
    return "RPR";
  } else if (["SC (SIL CONS)"].includes(op)) {
    return "SIL";
  } else if (["ALL"].includes(op)) {
    return "ALL";
  }
}

let plantValueFromCookie;
//GET ALL VENDERS
exports.allVendor = async (req, res) => {
  const { plant } = req.params;
  console.log(plant);
  let result = op_plant(plant);
  localStorage.setItem("plant", plant);
  let allVendor = await vendor_master.findAll({
    where: {
      organization: result,
      delete_flag: false,
    },
    order: [
      ["status", "ASC"],
      ["id", "ASC"],
    ],
  });
  res.json({
    result_length: allVendor.length,
    allVendor,
  });
};
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
    remarks: req.body.remarks,
  };
  const id = req.params.id;
  try {
    const findData = await vendor_master.findOne({
      where: { supplier_number: id },
    });

    if (findData === null) {
      try {
        await vendor_master.create(data);
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
  const org = req.params.org;
  console.log(id, org);
  try {
    const data = await vendor_master.findOne({
      where: { supplier_number: id, organization: org, delete_flag: false },
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
        remarks,
        status,
        delete_flag,
        isMSME_flag,
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
            isMSME_flag,
          },
        ],
      });
    }
  } catch (error) {
    res.status(404).json({
      message: error,
      data: "unsuccessfull",
    });
  }
};

//UPDATE VENDOR USING
exports.updateData = async (req, res) => {
  const id = req.params.id;
  const {
    // supplier_number,
    // supplier_name,
    // organization,
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
    isMSME_flag,
  } = req.body;
  const data = {
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
    isMSME_flag,
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
    await vendor_master.update(
      { delete_flag: true },
      { where: { supplier_number: id } }
    );
    res.json({
      message: "deleted",
    });
  }
};

//GET STATUS ACCEPTED OR PENDING
exports.vendorStatus = async (req, res) => {
  // console.log("GET STATUS ACCEPTED OR PENDING");
  let cookies = localStorage.getItem("plant");
  const status = req.params.status;
  try {
    const isStatus = await vendor_master.findAll({
      where: {
        status,
        delete_flag: false,
        organization: op_plant(cookies),
      },
    });
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
  let cookies = localStorage.getItem("plant");
  try {
    const searchResult = await vendor_master.findAll({
      where: {
        delete_flag: false,
        organization: op_plant(cookies),
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
        ],
      },
    });
    res.status(200).json({
      length: searchResult.length,
      result: searchResult,
    });
    // console.log(searchResult);
  } catch (error) {
    res.status(400).json({
      message: "something went wrong......",
    });
  }
};

//POST-SEND EMAIL
exports.sendEmail = async (req, res) => {
  const vendor_email = req.body.vendor_email;
  const supplier_number = req.body.supplier_number;
  const portalLink = req.body.portal_link;
  const vendor = await vendor_master.findOne({
    where: {
      delete_flag: false,
      supplier_number,
    },
  });
  // console.log(vendor.remarks, vendor.status);

  try {
    await sendEmail({
      email: vendor_email,
      subject: "MSME Vendor Form",
      html:
        "<!DOCTYPE html>" +
        "<html><head>" +
        "</head><body><div>" +
        '<img src="https://upload.wikimedia.org/wikipedia/commons/9/98/Ador_Welding_logo.png" alt="Ador Logo" width="100" height="50">' +
        "<p>Dear Vendor.</p>" +
        `MSME Vendor portal: <a href="${portalLink}">Click Here!!!!</a>` +
        `<p>Your Vendor Number: ${supplier_number}</p>` +
        `<p>Status: <b>${vendor.status === "0" ? "Pending" : "Approved"
        }</b></p>` +
        `REMARKS: ${vendor.remarks ? vendor.remarks : "none"}` +
        `<p>Date:${moment().format("L")}</p>` +
        `<p>${moment().format("LT")} </p>` +
        `<i>--- THIS IS AN AUTO GENERATED MAIL ---</i>` +
        "</div></body></html>",
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
        delete_flag: false,
        createdAt: {
          [Op.gt]: TODAY_START,
          [Op.lt]: NOW,
        },
      },
    });

    res.json({
      length: dataToday.length,
      data: {
        dataToday,
      },
    });
  } catch (error) {
    res.json({
      message: `something went wrong`,
    });
  }
};

//DATA FOR GRAPH
exports.dataSetForGraph = async (req, res) => {
  const status_ = [1, 0]; //[Approved,Pending]
  const plant_ = ["CHD", "CHN", "RPR", "HO", "SIL"];
  const ay = [];
  const bz = [];
  let ab = [...status_];
  let bc = [...plant_];
  try {
    for (let i = 0; i <= ab.length - 1; i++) {
      for (let j = 0; j <= bc.length - 1; j++) {
        let foo = await vendor_master.findAndCountAll({
          where: {
            organization: op_plant(bc[j]),
            status: ab[i],
            delete_flag: false,
          },
        });
        ay.push({ _plant_: bc[j], _status_: ab[i], count: foo.count });
      }
    }
    bc = [...plant_];
    for (let i = 0; i <= plant_.length - 1; i++) {
      let poo = await vendor_master.findAndCountAll({
        where: { organization: op_plant(plant_[i]), delete_flag: false },
      });
      bz.push({ _plant_: plant_[i], count: poo.count });
    }

    //no vendors in each plant
    //no of vendors whose status is true or false in each plant
    res.json({
      VendorsInEachPlant: bz,
      vendorStatus: ay,
    });
  } catch {
    res.json({
      mess: "yikessss in dataSetForGraph ",
    });
  }
};
// MSME VENDORS ONLY
exports.showDataOfMSME = async (req, res) => {
  let org = op_plant(plantValueFromCookie);
  let cookies = localStorage.getItem("plant");
  // console.log(cookies);
  const msme_vendors = await vendor_master.findAll({
    where: {
      certificate_no: {
        [Op.ne]: "",
      },
      organization: op_plant(cookies),
      delete_flag: false,
    },
    order: [
      ["status", "ASC"],
      ["id", "ASC"],
    ],
  });

  res.json({
    length: msme_vendors.length,
    msme_vendors,
  });
};



// PRE MAIL CONFIRMATION-USER
exports.preMailConfirmation = async (req, res) => {
  const { vendorNo, plant, user } = req.body;
  console.log({ vendorNo, plant, user });
  const supplier_number = vendorNo;
  try {
    const getEmail = await User.findOne({
      where: { username: user },
    });
    try {
      await sendEmail({
        email: getEmail.email,
        subject: "MSME Vendor Form",
        html:
          "<!DOCTYPE html>" +
          "<html><head>" +
          "</head><body><div>" +
          '<img src="https://upload.wikimedia.org/wikipedia/commons/9/98/Ador_Welding_logo.png" alt="Ador Logo" width="100" height="50">' +
          `<p>Dear ${getEmail.username},</p>` +
          `<p> You have sent mail to Vendor Number: <b>${supplier_number}</b></p>` +
          `<p>Date:${moment().format("L")}</p>` +
          `<p>${moment().format("LT")} </p>` +
          `<i>--- THIS IS AN AUTO GENERATED MAIL ---</i>` +
          "</div></body></html>",
      });
    } catch (error) {
      console.log(`error in send mail confirmation ${error}`);
    }
    res.json({
      mess: "pre mail is working",
    });
  } catch (error) {
    console.log("error in preMailConfirmation getEmail ");
  }
};

// POST MAIL CONFIRMATION-FOR USER
exports.postMailConfirmation = async (req, res) => {
  const link = `http://14.143.203.75:3000/login`;
  // const link = `http://localhost:3000/login`
  console.log(req.body);
  const userPlant = req.body.plant;
  const supplier_number = req.body.supplier_number;
  console.log(userPlant, supplier_number, plant_op(userPlant));
  const getEmail = await User.findOne({
    where: { plant: plant_op(userPlant) },
  });
  console.log(getEmail.username);
  if (getEmail) {
    try {
      await sendEmail({
        email: getEmail.email,
        subject: "MSME Vendor Form",
        html:
          "<!DOCTYPE html>" +
          "<html><head>" +
          "</head><body><div>" +
          '<img src="https://upload.wikimedia.org/wikipedia/commons/9/98/Ador_Welding_logo.png" alt="Ador Logo" width="100" height="50">' +
          `<p>Dear ${getEmail.username},</p>` +
          `<p> Vendor Number:<b>${supplier_number}</b> has submitted the form. Please check and review <a href="${link}">Click Here!!!!</a></p>` +
          `<p>Date:${moment().format("L")}</p>` +
          `<p>${moment().format("LT")} </p>` +
          `<i>--- THIS IS AN AUTO GENERATED MAIL ---</i>` +
          "</div></body></html>",
      });
      res.json({
        mess: `post mail is working and sent to ${getEmail.username}`,
      });
    } catch (error) {
      res.status(400).json({
        mess: "error in send mail confirmation",
      });
    }
  }
};

//VENDOR MASTER TO EXCEL FORMAT CONVERSION
exports.vendor_masterToExcel = async (req, res) => {
  const _plant = localStorage.getItem("plant");
  let result = op_plant(_plant);
  const allVendor = await vendor_master.findAll({
    attributes: [
      'supplier_number', 'organization', 'supplier_name', 'type', 'created_date', 'certificate_no', 'certificate_agency', 'certificate_expiration_date',
      'certificate_registration_date', 'vendor_email',
      [sequelize.literal(`(CASE status WHEN '1' THEN 'YES' ELSE 'NO' END)`), 'isMSME_flag'],
      [sequelize.literal(`(CASE status WHEN '1' THEN 'APPROVED' ELSE 'PENDING' END)`), 'status'],
    ],
    where: {
      organization: result,
      delete_flag: false,
    },
  });
  try {
    res.json({
      allVendor
    });
  } catch (error) {
    console.log("vendor_masterToExcel", error);
    res.json({
      mess: "vendor_masterToExcel",
      error: error
    })
  }
};

//SET MSME FLAG
exports.patchIsMSME = async (req, res) => {
  const { supplier_number, isMSME } = req.body;
  console.log(supplier_number, isMSME);
  if (isMSME === true) {
    try {
      await vendor_master.update(
        { isMSME_flag: true },
        { where: { supplier_number } }
      );
      res.staus(400).json({
        message: `supplier number ${supplier_number} is assigned as msmse Vendor`,
      });
    } catch (error) {
      res.json({
        mess: "error in patchIsMSME ",
        error,
      });
    }
  } else if (isMSME === false) {
    try {
      await vendor_master.update(
        { delete_flag: true, isMSME_flag: false },
        { where: { supplier_number } }
      );
      await image_uploader.update(
        { delete_flag: true },
        { where: { supplier_number } }
      );
      res.staus(400).json({
        message: `supplier number ${supplier_number} is no longer msmse Vendor`,
      });
    } catch (error) {
      res.json({
        mess: "error in patchIsMSME ",
        error,
      });
    }
  }
};

//GET VENDOR STATUS-IF MSME OR NOT
exports.postIsMSME = async (req, res) => {
  const { supplier_number } = req.body;
  console.log({ supplier_number });
  if (supplier_number) {
    try {
      const isMSME = await vendor_master.findOne({
        where: {
          supplier_number,
        },
      });
      res.json({
        isMSME: isMSME.isMSME_flag,
      });
    } catch (error) {
      res.json({
        mess: "error in postIsMSME ",
        error,
      });
    }
  }
};

