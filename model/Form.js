const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  auditorName: {
    type: String,
    required: true,
  },
  auditDate: {
    type: Date,
  },
  patientName: {
    type: String,
    required: true,
  },
  eatDate: {
    type: Date,
    required: true
  },
  portionLeft: [
    {
      type: Number,
    }
  ],
  foodSupply: {
    type: Number
  },
  foodLeft: {
    type: Number
  },
  isFulfilled: {
    type: Boolean
  }
},{ timestamps: true })

const Form = mongoose.model('Form', formSchema);
module.exports = Form

