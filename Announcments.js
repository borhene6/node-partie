const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define the Announcements Schema
const announcementsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Announcements = mongoose.model('Announcements', announcementsSchema);

module.exports = Announcements;
