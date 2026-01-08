const mongoose=require("mongoose");
const data=require("./data.js");
const Listing=require("../models/listing.js")

const MONGOSE_URL="mongodb://127.0.0.1:27017/wonderlust";

async function main(){
    await mongoose.connect(MONGOSE_URL);
}

main()
.then(()=>{
    console.log("connected to database");
})
.catch((err)=>{
    console.log(err);
})

const initDB=async()=>{
     await Listing.deleteMany({});
    await Listing.insertMany(
        data.data.map(obj => ({
            ...obj,
            owner: "68f8bdf817fd1c4e96c27535" // sample user ObjectId
        }))
    );
     console.log("data was initiatized")
}
initDB();