const mongoose = require("mongoose");

  const NotificationSchema = new mongoose.Schema({
      description: { 
          type: String, 
          required: true 
        },
      date: {
        type: Date,
        default: Date.now(),
      },
      status: { 
        type: String, 
        required: true 
      },
    },
    
  )

const Notification = mongoose.model("Notification", NotificationSchema);
module.exports = Notification;