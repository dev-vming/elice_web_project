import { ProjectModel } from "../schemas/project";

class Project {
  static async create({ userId, title, content, startDate, endDate }) {
    console.log("projectcreate", userId, title, content, startDate, endDate);
    const createdNewProject = await ProjectModel.create({
      userId,
      title,
      content,
      startDate,
      endDate,
    });
    return createdNewProject;
  }

  static async findByUserId({ userId }) {
    const project = await ProjectModel.find({ id: userId }).populate("userId");
    return project;
  }

  static async findAll() {
    const projects = await ProjectModel.find({}).populate("userId");
    return projects;
  }

  // delete의 매개변수가 _id면 update의 매개변수도 _id 또는 objectId로 하는게 좋지 않을 까...
  static async delete({ _id }) {
    const result = await ProjectModel.deleteOne({ _id });
    return result;
  }

  // 매개변수도 _id 또는 objectId로 하는게 좋지 않을 까...
  static async update({ id, fieldToUpdate, newValue }) {
    const filter = { _id: id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };
    const updatedProject = await ProjectModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedProject;
  }
}

export { Project };
