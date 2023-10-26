import React, { useState } from "react";

const Popup = () => {
  const [isPopupVisible, setPopupVisible] = useState(true);

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  return (
    <div>
      {isPopupVisible && (
        <div className="popup">
          <div className="popup-content">
            <div className="row">
              <div className="col-12">
                <div className="form-group col-5 mt-3">
                  <p>Sensor is alreat integrated. </p>
                  <button
                    onClick={(handleClosePopup, togglePopup)}
                    className="btn btn-add bi-file-plus-fill"
                  >
                    Add Public Key
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
