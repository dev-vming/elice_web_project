import { ProjectModel } from "../schemas/project";

class Project {
  static async create(newProject) {
    const createdNewProject = await ProjectModel.create(newProject);
    return createdNewProject;
  }

  static async findByUserId({ userId }) {
    const project = await ProjectModel.findOne({ userId }).populate("userId");
    return project;
  }

  static async findById({ id }) {
    const project = await ProjectModel.findOne({ id }).populate("userId");
    return project;
  }

  static async findAll() {
    const projects = await ProjectModel.find({}).populate("userId");
    return projects;
  }

  static async update({ id, fieldToUpdate, newValue }) {
    const filter = { id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };
    const updatedProject = await ProjectModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedProject;
  }

  static async delete({ id }) {
    const result = await ProjectModel.deleteOne({ id });
    return result;
  }
}

export { Project };
