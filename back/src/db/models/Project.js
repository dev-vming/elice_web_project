import { ProjectModel } from "../schemas/project";

class Project {
  // Create
  static async create({
    userId,
    title,
    content,
    startDate,
    endDate,
    editorStateSave,
    imgs,
  }) {
    const createdNewProject = await ProjectModel.create({
      userId,
      title,
      content,
      startDate,
      endDate,
      editorStateSave,
      imgs,
    });
    return createdNewProject;
  }

  // 모두 조회
  static async findAll({ perPage, offset }) {
    console.log("perPage(모델)", perPage);
    console.log("offset(모델)", offset);
    const projects = await ProjectModel.find({})
      //.sort({ createdAt: -1 }) 생성 시간 역순정렬 === 최근 데이터 순
      .limit(perPage)
      .skip(offset);
    return projects;
  }



  // Read
  static async findByUserId({ userId }) {
    const project = await ProjectModel.find({ userId });
    return project;
  }

  // Read all Project
  static async findAll() {
    const projectByContent = await ProjectModel.find({});
    return projectByContent;
  }

  // Delete
  static async delete({ _id }) {
    await ProjectModel.deleteOne({ _id });
    return;
  }

  // Update
  static async update({ _id }, toUpdate) {
    const filter = { _id };
    const option = { returnOriginal: false };

    // 수정사항이 없는 필드 제외
    let realToUpdate = {};
    for (let u in toUpdate) {
      if (toUpdate[u]) {
        realToUpdate[u] = toUpdate[u];
      }
    }

    const updatedProject = await ProjectModel.updateMany(
      filter,
      realToUpdate,
      option
    );

    return updatedProject;
  }
}

export { Project };
