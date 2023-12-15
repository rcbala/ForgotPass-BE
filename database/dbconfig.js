import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()


const mongoUrl = process.env.MONGOURL

const ConnectionDb = async () => {
    
   try {
    
        const connection = await mongoose.connect(mongoUrl);

        console.log("MongoDb Connected");

        return connection;

   } catch (error) {
       console.log(error);
    
   }


    
}
export default ConnectionDb;