import mongoose from "mongoose";
//desafio 4-4-23
import mongoosePaginate from "mongoose-paginate-v2";


const cartSchema = new mongoose.Schema({
  products: {
      type: [
          {
              product: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "products",
              },
              quantity: {
                  type: Number,
                  default: 1,
              },
          },
      ],
      default: [],
  },
});

//4-4-23 paginate

cartSchema.pre("findOne", function() {
  this.populate.lean()("products.product");
 
});

cartSchema.plugin(mongoosePaginate)

const cartModel = mongoose.model("carts", cartSchema);
export default cartModel;