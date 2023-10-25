import React, { useState, useContext, useEffect } from "react";
import { Context } from "../context/context";
import { useNavigate } from "react-router-dom";

function ValidatePublicKey() {
const navigate = useNavigate();
  const { savedPublicKey } = useContext(Context);
   const [showPopup, setShowPopup] = useState(false);

   useEffect(() => {
     if (!savedPublicKey) {
       setShowPopup(true);
     }
   }, []);

  const handleClosePopup = () => {
    navigate("/public-key");
  };

  return (
    <div>
      {showPopup && (
        <div className="row">
          <div className="col-12 popup">
            <div className="form-group col-5 mt-3 popup-content">
              <p>Public key is not available! Please enter Public Key.</p>
              <button
                onClick={handleClosePopup}
                className="btn btn-add bi-file-plus-fill"
              >
                &nbsp;Add Public Key
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ValidatePublicKey
