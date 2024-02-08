const { MongoClient } = require('mongodb');
require('dotenv').config();

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

const MONGO_DB = process.env.MONGO_DB || 'game';
const MONGO_USER = process.env.MONGO_PORT || 'mongo';
const MONGO_PASS = process.env.MONGO_IP || 'admin';

let client = null;

async function mongoConn() {
    try {
      const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@api-example.bx3ji.mongodb.net/?retryWrites=true&w=majority`;
      
      client = new MongoClient(uri, { });
      await client.connect();
      client = client.db(MONGO_DB);
      console.log("Connected to Mongo");
    } 
    catch (error) {
        console.log("Error Connecting to MongoDB", error);
    }
    return client;
}

module.exports = {
    port, 
    host,
    mongoConn
}
