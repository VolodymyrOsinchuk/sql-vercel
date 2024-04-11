require("dotenv").config();
// const { createClient } = require("@supabase/supabase-js");

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// const supabase = createClient(supabaseUrl, supabaseKey);
// // console.log("🚀 ~ file: db.js:6 ~ supabase.storage", supabase.storage);

// module.exports = supabase;
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  logging: false,
});

module.exports = sequelize;
