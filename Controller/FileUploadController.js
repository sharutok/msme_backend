const { image_uploader } = require("../models");

//POST
exports.uploadFileImgPost = async (req, res) => {
  console.log("in post");
  const id = req.params.id;
  const arr = [];
  const files = req.files;
  console.log(files);
  Object.values(files).map((e) => {
    arr.push(e)
  });
  const data = {
    supplier_number: id,
    img_1_name: `${arr[0].name}/${id}`,
    img_1_data: arr[0].data || "0",
    img_2_name: `${arr[1].name}/${id}`,
    img_2_data: arr[1].data || "0",
    img_3_name: `${arr[2].name}/${id}`,
    img_3_data: arr[2].data || "0",
  };
  console.log(data);
  const isImage = await image_uploader.findOne({
    where: { supplier_number: req.params.id },
  });
  if (isImage) {
    try {
      await image_uploader.update(data, { where: { supplier_number: id } })
      console.log("image there & updated");
    } catch (error) {
      console.log("error in update");
    }
  } else {

    try {
      await image_uploader.create(data);
      return res.json({
        message: "sent",
      });
    } catch (error) {
      console.log(error);
      return res.json({
        error,
      });
    }
  }
};

//DELETE IMG 
exports.deleteImg1 = async (req, res) => {

  const { supplier_number } = req.params
  if (supplier_number) {
    try {
      await image_uploader.destroy({ where: { supplier_number } })
    } catch (error) {
      return res.json({
        error,
      });
    }

  }

}



//GET
exports.uploadFileImgGet = async (req, res) => {
  try {
    const result = await image_uploader.findOne({
      where: { supplier_number: req.params.id },
    });
    res.json({
      supplier_number: result.supplier_number,
      img_1_name: result.img_1_name,
      img_1_data: result.img_1_data.toString("base64"),
      img_2_name: result.img_2_name,
      img_2_data: result.img_2_data.toString("base64"),
      img_3_name: result.img_3_name,
      img_3_data: result.img_3_data.toString("base64"),
    });
  } catch (error) {
    res.json({
      message: "something is wrong",
    });
  }
};
