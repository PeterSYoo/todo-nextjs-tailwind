import mongoose from "mongoose";

const DB_URL = process.env.DB_URL;

if (!DB_URL) {
  throw new Error("No database found");
}

// @ts-ignore
let cached = global.mongoose;

if (!cached) {
  // @ts-ignore
  cached = global.mongoose = { conn: null, promise: null };
}

const dbConnect = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
  }

  // @ts-ignore
  cached.promise = mongoose.connect(DB_URL, options).then((mongoose) => {
    return mongoose;
  });

  cached.conn = await cached.promise;
  return cached.conn;
};

export default dbConnect;
