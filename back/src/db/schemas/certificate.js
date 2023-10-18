import { Schema, model } from "mongoose";

const CertificateSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    // 자격증명
    type: String,
    required: true,
  },
  issuingOrganization: {
    // 발행처
    type: String,
    required: true,
  },
  getDate: {
    // 취득일
    type: Date,
    required: true,
  },
});

const CertificateModel = model("Certificate", CertificateSchema);

export { CertificateModel };
