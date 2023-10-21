import { EducationModel } from "../schemas/education";

class Education {
  static async create(newEducation) {
    const createdNewEducation = await EducationModel.create(newEducation);
    return createdNewEducation;
  }

  static async findByUserId({ userId }) {
    console.log("userId", userId);
    const education = await EducationModel.find({ userId });
    return education;
  }

  static async findAll() {
    const education = await EducationModel.find({});
    return education;
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

    const updatedEducation = await EducationModel.updateMany(
      filter,
      realToUpdate,
      option
    );
    return updatedEducation;
  }

  // delete
  static async delete({ _id }) {
    const deletedEducation = await EducationModel.findOneAndDelete({
      _id,

      //education_id: education_id,
    });
    return deletedEducation;
  }
}

export { Education };
