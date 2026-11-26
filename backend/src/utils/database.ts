import dns from "dns";
import mongoose from "mongoose";

const DATABASE_URL = process.env.DATABASE_URL as string;

// Opsional (buat lokal): kalau DNS bawaan Node gagal resolve SRV record
// "mongodb+srv://", isi DNS_SERVERS di .env, misal "8.8.8.8,1.1.1.1".
// Di Render nggak usah diisi.
if (process.env.DNS_SERVERS) {
  dns.setServers(process.env.DNS_SERVERS.split(",").map((s) => s.trim()));
}

const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URL, {
      dbName: "db-temu",
    });

    return Promise.resolve("Database connected successfully");
  } catch (error) {
    return Promise.reject(error);
  }
};

export default connectDB;
