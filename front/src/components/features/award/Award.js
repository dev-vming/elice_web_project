<<<<<<< HEAD
import React, { useState } from "react";
import AwardCard from "../../../hooks/AwardCard";
import AwardEditForm from "./AwardEditForm";

function Award({ award, setAwards, isEditable, setIsVisibility }) {
  //useState로 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      {isEditing ? (
        <AwardEditForm
          currentAward={award}
          setAwards={setAwards}
          setIsEditing={setIsEditing}
          setIsVisibility={setIsVisibility}
        />
      ) : (
        <AwardCard
          award={award}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
        />
      )}
    </>
  );
}

export default Award;
=======
import React, { useState } from "react";
import AwardCard from "../../../hooks/AwardCard";
import AwardEditForm from "./AwardEditForm";

function Award({ portfolioOwnerId, award, setAwards, isEditable, setIsVisibility }) {
  //useState로 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      {isEditing ? (
        <AwardEditForm
          currentAward={award}
          setAwards={setAwards}
          setIsEditing={setIsEditing}
          setIsVisibility={setIsVisibility}
        />
      ) : (
        <AwardCard
          award={award}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
          portfolioOwnerId={portfolioOwnerId}
          setAwards={setAwards}
        />
      )}
    </>
  );
}

export default Award;
>>>>>>> 06470c725bbcfa7a50cfac1d88a6db39fc6f6810
