const mongoose = require('mongoose');

const clickSchema = new mongoose.Schema({
  insertedAt: { type: Date, default: Date.now },
  ipAddress: { type: String },
  targetParamValue: { type: String }
});

const targetValueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: String, required: true }
});

const linkSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  clicks: [clickSchema],
  targetParamName: { type: String, default: 't' },
  targetValues: [targetValueSchema]
});

module.exports = mongoose.model('Link', linkSchema);
