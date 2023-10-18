import { Schema, model } from "mongoose";

const EducationSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    userid: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    educationlevel: {
      type: String,
      required: true,
    },
    school: {
      type: String,
      required: true,
    },
    major: {
      type: String,
      required: true,
    },
    startDate: {
      // 입학 년도
      type: Date,
      required: true,
    },
    endDate: {
      // 졸업 년도
      type: Date,
      required: true,
    },
    // endMonth: {
    //   // 졸업 월
    //   type: String,
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

const EducationModel = model("Education", EducationSchema);

export { EducationModel };
