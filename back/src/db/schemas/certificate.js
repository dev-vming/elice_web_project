import { Schema, model } from "mongoose";

const CertificateSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  author: {
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
    // 취득일 (2023-10-18)
    type: String,
    required: true,
  },
});

const CertificateModel = model("Certificate", CertificateSchema);

export { CertificateModel };
