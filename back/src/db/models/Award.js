import { AwardModel } from "../schemas/award";

class Award {
  static async create({ newAward }) {
    const createdNewAward = await AwardModel.create(newAward);
    return createdNewAward;
  }
  // Read
  static async findByUserId({ userId }) {
<<<<<<< HEAD
    const awrads = await AwardModel.find({ userId }).sort({
      awardedDate: "asc",
    });
=======
    const awrads = await AwardModel.find({ userId });
>>>>>>> 06470c725bbcfa7a50cfac1d88a6db39fc6f6810
    return awrads;
  }
  // Delete
  static async delete({ _id }) {
    const result = await AwardModel.deleteOne({ _id });
    console.log(result);
    return;
  }
  // Update
  static async update({ _id }, toUpdate) {
    const filter = { _id };
    const option = { returnOriginal: false }; // 수정 전의 값 반환

    const realToUpdate = {};
    for (let u in toUpdate) {
      if (toUpdate[u]) {
        realToUpdate[u] = toUpdate[u];
      }
    }

    const updateAward = await AwardModel.updateMany(
      filter,
      realToUpdate,
      option
    );
    return updateAward;
  }
}

export { Award };
