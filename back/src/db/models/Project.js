import { ProjectModel } from "../schemas/project";
import is from "is";

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

  // Read Page
  static async findPage({ perPage, offset }) {
    const projects = await ProjectModel.find({}).limit(perPage).skip(offset);
    //totalpage 총페이지 계산
    var totalnum = await ProjectModel.count();
    //$total_page = ceil($total_record / $list); // 페이징한 페이지 수
    // const totalnum = await ProjectModel.countDocuments({});
    // console.log(totalnum);

    //const totalnum = ProjectModel.countDocuments({});
    //const totalnum = ProjectModel.find({}).count({});
    console.log("totalnum : ", totalnum);

    const totalpage = Math.ceil(totalnum / perPage); // 페이징한 페이지 수
    console.log("totalpage : ", totalpage);
    const result = { data: projects, totalpage: totalpage };
    //return projects;
    return result;
  }

  // Read by User
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
