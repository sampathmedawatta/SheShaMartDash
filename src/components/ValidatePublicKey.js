import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ValidatePublicKey() {
const navigate = useNavigate();
   const [showPopup, setShowPopup] = useState(false);

   useEffect(() => {
     if (!localStorage.getItem("publicKey")) {
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
          <div className="col-11">
            <div className="form-group col-5 mt-3">
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
