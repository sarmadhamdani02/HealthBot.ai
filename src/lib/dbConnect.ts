

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
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});

    connection.isConnect = db.connections[0].readyState;

    console.log("DB Connection Successful ✔");
  } catch (error) {
    console.error(
      "dbConnect.ts",
      " :: dbConnect() :: DB Connection failed ❌ Error : ",
      error
    );

    process.exit(1); // exit with failure status
  }
}

export default dbConnect;
