const { Router } = require("express");
const app = Router();
const Cart = require("../Model/Cart.model");
const middleWare = (req, res, next) => {
  const authHeader = req.headers["x-authorization"];
  if (authHeader) {
    const id = authHeader.split(" ")[1];
    req.user_id = id;
    next();
  } else {
    res.status(401).send("You are not authonticated");
  }
};

app.get("/", middleWare, async (req, res) => {
  const id = req.user_id;
  try {
    const cart = await Cart.find({ user_id: id });
    return res.status(200).send(cart);
  } catch (e) {
    return res.status(500).send({ message: "Internal Server Error", e });
  }


});
app.get("/total", middleWare, async (req, res) => {
  const id = req.user_id;
  try {
    let sum = 0;
    const cart = await Cart.find({ user_id: id });
    for (let i = 0; i < cart.length; i++) {
      sum += cart[i].quantity * Number(cart[i].actual_price);
    }
    return res.status(200).send(sum.toString());
  } catch (e) {
    return res.status(500).send({ message: "Internal Server Error", e });
  }
});

app.post("/",  async (req, res) => {
  const user_id = req.user_id;
  console.log(user_id);
  const {
    product_id,
    title,
    image,
    price,
    quantity,
  } = req.body;
  try {
    let cartData = await Cart.create({
      user_id,
      product_id,
      title,
      image,
      price,
      quantity,
    });
    res.send(cartData);
  } catch (err) {
    console.log(err.message);
  }
});

app.delete("/:id", async (req, res) => {
  const user_id = req.user_id;
  const { id } = req.params;
  
    try {
      let remove = await Cart.findByIdAndDelete({ _id: id });
      return res.status(200).send("Item Deleted successfully");
    } catch (err) {
      return res.send(err.message);
    }
  
});



app.put("/:id",  async (req, res) => {
  const user_id = req.user_id;
  let { id } = req.params;
 
    try {
      const updateCart = await Cart.findByIdAndUpdate(
        { _id: req.params.id },
        {
          quantity: req.body.quantity,
        },
        { new: true }
      );
      res.status(200).send(updateCart);
    } catch (err) {
      res.status(500).send(err);
    }
  
});
module.exports = app;
