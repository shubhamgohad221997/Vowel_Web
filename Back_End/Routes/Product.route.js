const { Router } = require("express");
const app = Router();
const User = require("../Model/Product.model");




app.get("/", async (req, res) => {
  const { page = 1, limit = 16, orderBy = "id", order = "asc" } = req.query;
  const user = await User.find({})
    .sort({ [orderBy]: order === "asc" ? 1 : -1 })
    .skip((page - 1) * limit)
    .limit(limit);
  res.send(user);
});



app.post("/", async (req, res)=>{

const {title, image, price}= req.body;

const product= await User.create({title, image, price})
res.send(product)

})


app.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id });
  res.send(user);
});



app.delete("/:id", async (req, res) => {
    
    const { id } = req.params;
    
      try {
        let remove = await User.findByIdAndRemove({ _id: id });
        return res.status(200).send("Item Deleted successfully");
      } catch (err) {
        return res.send(err.message);
      }
 
  });



  app.put("/:id",  async (req, res) => {
    
    let { id } = req.params;
   
      try {
        const updateCart = await User.findByIdAndUpdate(
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
