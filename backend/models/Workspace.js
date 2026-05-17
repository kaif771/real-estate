const mongoose = require('mongoose');

const workspaceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: {
    city: { type: String, required: true },
    address: { type: String, required: true }
  },
  type: { 
    type: String, 
    required: true,
    enum: ['private_cabin', 'shared_desk', 'meeting_room']
  },
  capacity: { type: Number, required: true },
  areaSize: { type: Number, required: true }, // in sq.ft.
  price: { type: Number, required: true },
  amenities: [{ type: String }],
  images: [{ type: String }], // URLs to images
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'maintenance', 'unavailable'],
    default: 'available'
  }
}, {
  timestamps: true
});

const Workspace = mongoose.model('Workspace', workspaceSchema);
module.exports = Workspace;
