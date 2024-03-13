const {Timestamp} = require("firebase-admin/firestore");
const {fetchMongoDB} = require("../databases");

const location =  "driver-locations"
const driveronline = "driver-online-timestamp"

const updateDriverStatus = async (req,res) => {
    try{
        const {status, userId} = req.body.data;
        const start = performance.now();
        const mongoDB = fetchMongoDB();
        const dbCollection = mongoDB.collection(driveronline);
        const payload = {
            status: status,
            timestamp: Timestamp.now(),
            userId,
        };
        const response = await dbCollection.insertOne(payload);
        const end = performance.now();
        console.log("diff----", (end-start)/1000);
        response.time = (end-start)/1000
        return res.status(200).json({response})
    }catch(error){
        return res.status(400).json({
            message: error.message,
          });
    }
   
};

module.exports = updateDriverStatus;
