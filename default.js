import { products } from "./constants/product.js";

import Product from "./model/productSchema.js";

const DefaultData = async ()=>{
    try{
        await Product.deleteMany({});           //  it will delete the initial data and store the new fresh data(remove duplicasy)
        await Product.insertMany(products);

        console.log('data imported successfully');
    }catch(error){
        console.log('error: ',error.message);
    }
}

export default DefaultData;