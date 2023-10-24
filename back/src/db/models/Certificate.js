import { CertificateModel } from "../schemas/certificate";

class Certificate {
  static async create({ newCertificate }) {
    const createdNewCertificate = await CertificateModel.create(newCertificate);
    return createdNewCertificate;
  }
  // Read
  static async findByUserId({ userId }) {
<<<<<<< HEAD
    const certificates = await CertificateModel.find({ userId }).sort({
      certificatedDate: "asc",
    });
=======
    const certificates = await CertificateModel.find({ userId });
>>>>>>> 06470c725bbcfa7a50cfac1d88a6db39fc6f6810
    return certificates;
  }
  // Delete
  static async delete({ _id }) {
<<<<<<< HEAD
    const result = await CertificateModel.deleteOne({ _id });
=======
    const result = CertificateModel.deleteOne({ _id });
>>>>>>> 06470c725bbcfa7a50cfac1d88a6db39fc6f6810
    console.log(result);
    return;
  }
  // Update
  static async update({ _id }, toUpdate) {
    const filter = { _id };
    const option = { returnOriginal: false };

    let realToUpdate = {};
    for (let u in toUpdate) {
      if (toUpdate[u]) {
        realToUpdate[u] = toUpdate[u];
      }
    }

    const updateCertificate = await CertificateModel.updateMany(
      filter,
      realToUpdate,
      option
    );
    return updateCertificate;
  }
}

export { Certificate };
