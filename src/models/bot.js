import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    team: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
      },
    ],
    name: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['PROD', 'HOM'],
    },
    apikey: {
      type: String,
      required: true,
      unique: true,
    },
    service_url: {
      type: String,
      required: true,
      unique: true,
    },
    skill_id: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Bot', schema);
