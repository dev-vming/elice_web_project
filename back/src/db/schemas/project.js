import { Schema } from "mongoose";
import mongoose from "mongoose";

const ProjectSchema = new Schema({
  id: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  url: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

const ProjectModel = mongoose.model("Project", ProjectSchema);

export { ProjectModel };
