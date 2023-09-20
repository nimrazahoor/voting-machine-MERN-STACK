// Function to seed the admin user
const { User } = require("../modals/modals");
const bcrypt = require('bcryptjs')
const mongoose = require("mongoose");

async function seedAdminUser() {
    try {
      const existingAdmin = await User.findOne({ userType: "Admin" });
  
      if (existingAdmin) {
      } else {
        const adminData = {
          username: "admin",
          email: "admin@gmail.com",
          password: "admin123", 
          userType: "Admin",
          constituency :"PP-123",
          cnic: "35403-1573908-4", 
        };
        const adminUser = new User(adminData);
        await adminUser.save();
      }
    } catch (error) {
      console.error("Error creating admin user:", error);
    }
  }
  seedAdminUser().then(() => {
    mongoose.connection.close();
  });
  