import React, { useState, useContext } from "react";
import GeneralMenu from "../components/UI/SubMenu/GeneralMenu";
import PublicKeyService from "../services/publicKey.service";
import { Context } from "../context/context";

const PublicKey = () => {
  const [publicKeyFrom, setPublicKeyFrom] = useState(false);
  const [requestedPublicKey, setRequestedPublicKey] = useState(false);
  const [enteredPublicKey, setEnteredPublicKey] = useState("");
  const {savedPublicKey, setSavedPublicKey } = useContext(Context);

  const showPublicKeyForm = () => {
    setPublicKeyFrom(!publicKeyFrom);
    setRequestedPublicKey(false);
  };

  const getPublicKey = async () => {
    setPublicKeyFrom(false);

    const response = await PublicKeyService.getPublicKey();
    if (response !== null) {
    setRequestedPublicKey(!requestedPublicKey);
    setEnteredPublicKey(response);
    }
  };

  const handlePublickeyChange = (key) => {
    setEnteredPublicKey(key);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (enteredPublicKey) {
      
      setSavedPublicKey(enteredPublicKey);
    } else if (requestedPublicKey) {
      setSavedPublicKey(requestedPublicKey);
    }

     setEnteredPublicKey("");
     setPublicKeyFrom(false);
     setRequestedPublicKey(false);
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
            <br></br>
            {savedPublicKey && (
              <div className="form-group">
                <br></br>
                <label htmlFor="savedPublicKey">Public Key</label>
                <input
                  type="text"
                  id="savedPublicKey"
                  className="form-control"
                  name="savedPublicKey"
                  autoComplete="off"
                  value={savedPublicKey}
                  readOnly
                />
              </div>
            )}

            <div className="row form-group ">
              <div className="col-3">
                <button
                  type="submit"
                  onClick={getPublicKey}
                  className="btn btn-add bi-file-plus-fill"
                >
                  Request a Public Key
                </button>
              </div>
              <div className="col-3">
                <button
                  type="submit"
                  onClick={showPublicKeyForm}
                  className="btn btn-add bi-file-plus-fill"
                >
                  Save New Public Key
                </button>
              </div>
            </div>
            <br></br>
            {requestedPublicKey && (
              <div>
                <div className="form-group">
                  <div className="page-title">Requested Public Key</div>
                  <br></br>
                  <label htmlFor="reqPublicKey">Public Key</label>
                  <input
                    type="text"
                    id="reqPublicKey"
                    className="form-control"
                    name="reqPublicKey"
                    autoComplete="off"
                    value={enteredPublicKey}
                    readOnly
                  />
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="form-group ">
                    <button
                      type="submit"
                      className="btn btn-add bi-file-plus-fill"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            )}

            {publicKeyFrom && (
              <div>
                <div className="page-title">Save New Public Key</div>
                <br></br>
                <div className="form-group">
                  <label htmlFor="newPublicKey">Public Key*</label>
                  <input
                    type="text"
                    id="newPublicKey"
                    className="form-control"
                    name="newPublicKey"
                    autoComplete="off"
                    onChange={(e) => {
                      handlePublickeyChange(e.target.value);
                    }}
                  />
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="form-group ">
                    <button
                      type="submit"
                      className="btn btn-add bi-file-plus-fill"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicKey;
