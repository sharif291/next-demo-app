// lib/mongodb.js
import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://user1:XuENCjqnUdqcLdTk@cluster0.48cvj.mongodb.net/";
const options = {};

let client;
let clientPromise;

if (!uri) {
    throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the client is not recreated
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    // In production mode, it's best to not use a global variable
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise
export default clientPromise;
