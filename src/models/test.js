import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    bot: {
      type: mongoose.Types.ObjectId,
      ref: 'Bot',
      required: true,
    },
    expected_node: {
      type: String,
      required: true,
      unique: true,
    },
    right: {
      type: Boolean,
      default: true,
      // required: true,
    },
    answers: [
      {
        type: Object,
        // required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Test', schema);
