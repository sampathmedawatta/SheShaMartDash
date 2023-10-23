import React, { useState } from "react";
import GeneralMenu from "../components/UI/SubMenu/GeneralMenu";
import PublicKeyService from "../services/publicKey.service";

const PublicKey = () => {
   const [publicKeyFrom, setPublicKeyFrom] = useState(false);
   const [savedPublicKey, setSavedPublicKey] = useState('');
  ;
   const showPublicKeyForm = () =>{
     setPublicKeyFrom(!publicKeyFrom);
   }

   const getPublicKey = async () => {
    setPublicKeyFrom(false);

    const response = await PublicKeyService.getPublicKey();
    if (response !== null) {
        setSavedPublicKey(response);
    }

    console.log(response);

   };

    const handleSubmit = (e) => {
      e.preventDefault(); // Prevent the default form submission behavior
     
       setSavedPublicKey(e.ta);
    };

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <GeneralMenu />
        </div>

        <div className="col-12">
          <div className="title-heders">Public Key</div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <br />
          <div className="col-10">
            <form onSubmit={handleSubmit}>
              <div className="form-group ">
                <button
                  type="submit"
                  onClick={getPublicKey}
                  className="btn btn-add bi-file-plus-fill"
                >
                  Request Public Key
                </button>
              </div>

              {savedPublicKey && (
                <div className="form-group">
                  <label htmlFor="publicKey">Public Key</label>
                  <input
                    type="text"
                    min={0}
                    id="SavedPublicKey"
                    className="form-control"
                    name="SavedPublicKey"
                    autoComplete="off"
                    value={savedPublicKey}
                    readOnly
                  />
                </div>
              )}

              <div className="form-group ">
                <button
                  type="submit"
                  onClick={showPublicKeyForm}
                  className="btn btn-add bi-file-plus-fill"
                >
                  Manually Save Public Key
                </button>
              </div>

              {publicKeyFrom && (
                <div>
                  <div className="page-title">Save Public Key</div>
                  <br></br>

                  <div
                    className="alert alert-success alert-dismissible fade show"
                    role="alert"
                  >
                    Public Key Saved Successfully
                  </div>

                  <div className="form-group">
                    <label htmlFor="publicKey">Public Key*</label>
                    <input
                      type="text"
                      min={0}
                      id="publicKey"
                      className="form-control"
                      name="publicKey"
                      autoComplete="off"
                    />
                  </div>

                  <div className="form-group ">
                    <button
                      type="submit"
                      className="btn btn-add bi-file-plus-fill"
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicKey;
