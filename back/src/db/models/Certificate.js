import { CertificateModel } from "../schemas/certificate";

class Certificate {
  static async create({ newCertificate }) {
    const createdNewCertificate = await CertificateModel.create(newCertificate);
    return createdNewCertificate;
  }
  // 조회 (userId)
  static async findByUser(author) {
    const certificates = await CertificateModel.find({ author });
    return certificates;
  }
  // delete
  static async delete({ id }) {
    const certificates = await CertificateModel.findOneAndDelete({ id });
    return certificates;
  }

  // udpate
  static async update(id, newValue) {
    const filter = { id: id };
    const option = { returnOriginal: false };

    const updateData = {
      name: newValue.name,
      issuingOrganization: newValue.issuingOrganization,
      getDate: newValue.getDate,
    };
    console.log("!", id, updateData);
    const updateCertificate = await CertificateModel.findOneAndUpdate(
      filter,
      updateData,
      option
    );
    console.log(updateCertificate);
    return updateCertificate;
  }
}

export { Certificate };
