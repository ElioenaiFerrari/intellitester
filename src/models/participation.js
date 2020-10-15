import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    bot: {
      type: mongoose.Types.ObjectId,
      ref: 'Bot',
      required: true,
    },
    from: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    to: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      default: 'PENDING',
      enum: ['PENDING', 'ACCEPTED', 'REJECTED'],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Participation', schema);
