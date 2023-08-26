import mongoose from 'mongoose';

const { Schema } = mongoose;

const bannerSchema = new Schema({
  media: {
    type: String, // Store the file path or URL of the image or video
    required: true,
  },
  selected: {
    type: Boolean,
    default: false
},
}
,
  {
    timestamps: true
  }
);

const Banner = mongoose.model('Banner', bannerSchema);

export default Banner;
