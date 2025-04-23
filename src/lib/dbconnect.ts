import mongoose from "mongoose";

type connectionObject = {
  isConnect?: number;
};

const connection: connectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnect) {
    console.log("Already Connected to database. ℹ");
    return;
  }

  try {
    console.log("Mongodb URI: ", process.env.MONGODB_URI);
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});

    connection.isConnect = db.connections[0].readyState;

    console.log("DB Connection Successful ✔");
  } catch (error) {
    console.error(
      "dbConnect.ts",
      " :: dbConnect() :: DB Connection failed ❌ Error : ",
      error
    );

  }
}

export default dbConnect;
