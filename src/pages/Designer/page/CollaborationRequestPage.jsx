import React, { useState } from "react";
import SendCollaborationRequest from "../components/SendCollaborationRequest";

const CollaborationRequestPage = () => {
  const [showCollabForm, setShowCollabForm] = useState(true);

      console.log("showCollabForm =", showCollabForm);


  return (
    <>
      {showCollabForm && (
        <SendCollaborationRequest
          onClose={() => {
            console.log("Closing form");
            setShowCollabForm(false);
          }}
        />
      )}

      {!showCollabForm && (
        <h2>Form Closed Successfully</h2>
      )}
    </>
  );

};


export default CollaborationRequestPage;