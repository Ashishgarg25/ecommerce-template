const Shop = require("../models/Shop");

const createShop = async (req, res) => {
  try {
    const {
      owner_id,
      owner_name,
      shop_name,
      shop_slug,
      description,
      cover_image,
      logo,
      phone,
      website,
      address,
    } = req.body;

    if (
      !owner_id ||
      !shop_name ||
      !owner_name ||
      !shop_slug ||
      !description ||
      !cover_image ||
      !logo ||
      !phone ||
      !address
    ) {
      return res
        .status(404)
        .json({ variant: "error", msg: "Please enter mandatory fields!" });
    }

    const shop = new Shop({
      owner_id,
      owner_name,
      shop_name,
      shop_slug,
      description,
      cover_image,
      logo,
      phone,
      website,
      address,
      isActive: true,
    });

    const data = await shop.save();

    if (!data) {
      return res.status(403).json({
        variant: "error",
        msg: "Something went wrong. Please try again!",
      });
    }

    return res.status(500).json({
      variant: "success",
      msg: "Shop created Successfully!",
      data,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      variant: "error",
      msg: "Something went wrong. Please try again!",
    });
  }
};

const updateShop = async (req, res) => {
    try {
      const {
        _id,
        owner_id,
        owner_name,
        shop_name,
        shop_slug,
        description,
        cover_image,
        logo,
        phone,
        website,
        address,
      } = req.body;
  
      if (
        !owner_id ||
        !shop_name ||
        !owner_name ||
        !shop_slug ||
        !description ||
        !cover_image ||
        !logo ||
        !phone ||
        !address || !isActive
      ) {
        return res
          .status(404)
          .json({ variant: "error", msg: "Please enter mandatory fields!" });
      }
  
      const shop = await Shop.findById(_id);
    if (!shop) {
      return res.status(400).json({
        variant: "error",
        msg: "No shop found!",
      });
    }

    if(shop_name) shop.shop_name = shop_name
    if(description) shop.description = description
    if(cover_image) shop.cover_image = cover_image
    if(logo) shop.logo = logo
    if(phone) shop.phone = phone
    if(address) shop.address = address
    // if(isActive) shop.isActive = isActive
    if(website) shop.website = website
  
    const updatedShop = await shop.save();

    return res.status(201).json({
      response: updatedShop,
    });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        variant: "error",
        msg: "Something went wrong. Please try again!",
      });
    }
  };

  const getShopByUserId = async(req, res) => {
    try{
        const { _id } = req.body;
        if (!_id) {
            return res.status(400).json({
              variant: "error",
              msg: "No shop found!",
            });
          }
      
          const shop = Shop.find({ owner_id: _id });
      
          if (!shop) {
            return res.status(400).json({
              variant: "error",
              msg: "No shop found!",
            });
          }
      
          return res.status(201).json({
            response: shop,
          });
    }catch(e){
        console.log(e);
        return res.status(500).json({
          variant: "error",
          msg: "Something went wrong. Please try again!",
        });
    }
    
  }

module.exports = {
  createShop,
  updateShop,
  getShopByUserId,
};
