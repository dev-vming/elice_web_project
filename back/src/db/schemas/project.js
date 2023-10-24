import { Schema } from "mongoose";
import mongoose from "mongoose";

const ProjectSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: Array,
    required: false,
  },
  startDate: {
    type: Date,
    required: false,
  },
  endDate: {
    type: Date,
    required: false,
  },
<<<<<<< HEAD
  editorStateSave: {
    type: Array,
    required: false,
  },
  imgs: {
    type: Array,
    required: false,
  },
=======
>>>>>>> 06470c725bbcfa7a50cfac1d88a6db39fc6f6810
});

const ProjectModel = mongoose.model("Project", ProjectSchema);

export { ProjectModel };
