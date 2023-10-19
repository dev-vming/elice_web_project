import { Schema, model } from "mongoose";

const AwardSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    // 수상명
    type: String,
    required: true,
  },
  organization: {
    // 발행처
    type: String,
    required: true,
  },
  getDate: {
    // 취득일
    type: Date,
    required: true,
  },
  awardInfo: {
    // 추가설명
    type: String,
    required: false,
    default: "",
  },
});

const AwardModel = model("Award", AwardSchema);

export { AwardModel };
