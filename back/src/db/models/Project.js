import { ProjectModel } from "../schemas/project";

class Project {
  // 생성
  static async create({ userId, title, content, startDate, endDate, editorStateSave }) {
    console.log("projectcreate", userId, title, content, startDate, endDate, editorStateSave);
    const createdNewProject = await ProjectModel.create({
      userId,
      title,
      content,
      startDate,
      endDate,
      editorStateSave,
    });
    return createdNewProject;
  }

  // 조회 (userId : objectId)
  static async findByUserId({ userId }) {
    const project = await ProjectModel.find({ userId }).populate("userId");
    return project;
  }

  //**************************************** */
  static async findByProjectId({ _id }) {
    const project = await ProjectModel.find({ _id }).populate("id");
    return project;
  }


  // 모두 조회
  static async findAll() {
    const projects = await ProjectModel.find({}).populate("userId");
    return projects;
  }

  // 삭제
  static async delete({ _id }) {
    const result = await ProjectModel.deleteOne({ _id });
    return result;
  }

  // 수정
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
