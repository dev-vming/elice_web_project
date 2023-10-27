import { ProjectModel } from "../schemas/project";

class Project {
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
    const project = await ProjectModel.find({ userId }).sort({
      startDate: "asc",
    });
    return project;
  }

  // Read by ProjectId
  static async findByProjectId({ _id }) {
    const projectById = await ProjectModel.find({ _id });
    return projectById;
  }

  static async findByContent({ content }) {
    const projectByContent = await ProjectModel.find({
      content: { $in: [content] },
    });

    return projectByContent;
  }

  // Read all Project
  static async findAll() {
    const projectByContent = await ProjectModel.find({});
    return projectByContent;
  }

  // Delete
  static async delete({ _id }) {
    const result = await ProjectModel.deleteOne({ _id });
    console.log(result);
    return;
  }

  // Update
  static async update({ _id }, toUpdate) {
    const filter = { _id };
    const option = { returnOriginal: false };

    // newValue 값이 null 인 필드 제거하기
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
