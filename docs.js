// USERS

ENDPOINT = "/api/v1/user";

TYPE = "createAccount";
METHOD = "POST"
REQ_BODY = {
  name: String, // required
  email: String, // required
  password: String, //required
};

TYPE = "signin";
METHOD = "POST"
REQ_BODY = {
  email: String, // required
  password: String, // required
};

TYPE = "update";
METHOD = "PUT"
AUTH // Bearer Token Required
REQ_BODY = {
  phone: String,
  address: [
    {
      title: String,
      default: Boolean,
      address: {
        lat: Number,
        lng: Number,
        formatted_address: String,
      },
    },
  ],
};

// PRODUCTS

ENDPOINT = "/api/v1/product";

TYPE = "createProduct";

// SINCE IT CONTAINS IMAGE SEND AS FORMDATA

METHOD = "POST"
AUTH // Bearer Token Required
REQ_BODY = {
  shop : ObjectId,
  owner: ObjectId,
  name: String,
  slug: String,
  description: String,
  sku: String,
  quantity: Number,
  media : [{
    thumbnail: String
  }],
  price: Number,
  sale_price: Number,
  tag: [{
    name: String,
    slug: String
  }],
  variants: [{
    option: String,  // Size or Color
    sku: String,
    description: String,
    quantity: Number,
    price: Number
  }],
  is_best_selling : Boolean,
  is_new_arrival : Boolean,
  isActive : Boolean,
};


TYPE = "createProduct";

// SINCE IT CONTAINS IMAGE SEND AS FORMDATA

METHOD = "PUT"
AUTH // Bearer Token Required
REQ_BODY = {
  shop : ObjectId,
  owner: ObjectId,
  name: String,
  slug: String,
  description: String,
  sku: String,
  quantity: Number,
  media : [{
    thumbnail: String
  }],
  price: Number,
  sale_price: Number,
  tag: [{
    name: String,
    slug: String
  }],
  variants: [{
    option: String,  // Size or Color
    sku: String,
    description: String,
    quantity: Number,
    price: Number
  }],
  is_best_selling : Boolean,
  is_new_arrival : Boolean,
  isActive : Boolean,
};


TYPE = "/";
METHOD = "GET"
AUTH // Bearer Token Required
REQ_BODY = {
    shop: ObjectId
}


TYPE = "single";
METHOD = "GET"
AUTH // Bearer Token Required
REQ_BODY = {
    shop: ObjectId,
    _id: ObjectId // Product ID
}


// SHOP

ENDPOINT = "/api/v1/shop";

TYPE = "createShop";

// SINCE IT CONTAINS IMAGE SEND AS FORMDATA

METHOD = "POST"
AUTH // Bearer Token Required
REQ_BODY = {
    owner_id: ObjectId,
      owner_name: String,
      shop_name: String,
      shop_slug: String,
      description: String,
      cover_image: String,  
      logo: String,
      phone: String,
      website: String,
      address: String,
}

TYPE = "update";

// SINCE IT CONTAINS IMAGE SEND AS FORMDATA

METHOD = "PUT"
AUTH // Bearer Token Required
REQ_BODY = {
    owner_id: ObjectId,
      owner_name: String,
      shop_name: String,
      shop_slug: String,
      description: String,
      cover_image: String,  
      logo: String,
      phone: String,
      website: String,
      address: String,
}


// GET SHOP BY USER ID

TYPE = "/";

// SINCE IT CONTAINS IMAGE SEND AS FORMDATA

METHOD = "GET"
AUTH // Bearer Token Required
REQ_BODY = {
    _id: ObjectId
}