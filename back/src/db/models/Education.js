import { EducationModel } from "../schemas/education";

class Education {
  static async create({ newEducation }) {
    const createdNewEducation = await EducationModel.create(newEducation);
    return createdNewEducation;
  }

  static async findByUserId({ user_id }) {
    const education = await EducationModel.findOne({ userid: user_id });
    return education;
  }

  static async findBySchool({ school_name }) {
    const education = await EducationModel.findOne({ school: school_name });
    return education;
  }

  static async findAll() {
    const education = await EducationModel.find({});
    return education;
  }
  // 여기 하는중
  static async update({ id, fieldToUpdate, newValue }) {
    const filter = { id: id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedEducation = await EducationModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedEducation;
  }

  // delete
  static async delete({ id }) {
    const deletedEducation = await EducationModel.findOneAndDelete({ id });
    return deletedEducation;
  }
}

export { Education };
