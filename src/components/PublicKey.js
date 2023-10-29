import React, { useState, useEffect } from "react";
import GeneralMenu from "../components/UI/SubMenu/GeneralMenu";
import PublicKeyService from "../services/publicKey.service";

const PublicKey = () => {
  const [publicKeyFrom, setPublicKeyFrom] = useState(false);
  const [requestedPublicKey, setRequestedPublicKey] = useState(false);
  const [enteredPublicKey, setEnteredPublicKey] = useState("");
  const [savedPublicKey, setSavedPublicKey] = useState("");

  useEffect(() => {
    setSavedPublicKey(localStorage.getItem("publicKey"));
  }, []);

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
      localStorage.setItem("publicKey", enteredPublicKey);
      setSavedPublicKey(enteredPublicKey);
    } else if (requestedPublicKey) {
      localStorage.setItem("publicKey", requestedPublicKey);
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
            {savedPublicKey && (
              <div className="form-group pk-req1">
                <br></br>
                <label htmlFor="savedPublicKey">Current Public Key</label>
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
                  className="btn btn-add bi-plus-circle-fill"
                >
                  &nbsp;Request a Public Key
                </button>
              </div>
              <div className="col-3">
                <button
                  type="submit"
                  onClick={showPublicKeyForm}
                  className="btn btn-add bi-plus-circle-fill"
                >
                  &nbsp; Save New Public Key
                </button>
              </div>
            </div>
            <br></br>
            {requestedPublicKey && (
              <div>
                <div className="form-group pk-req">
                  <div className="page-title">Request a Public Key</div>
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
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <br />
                      <button
                        type="submit"
                        className="btn btn-add bi-plus-circle-fill"
                      >
                        &nbsp; Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {publicKeyFrom && (
              <div>
                <div className="form-group pk-req">
                  <div className="page-title">Save New Public Key</div>
                  <label htmlFor="newPublicKey">
                    Enter Your Public Key Here
                  </label>
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
                  <form onSubmit={handleSubmit}>
                    <div className="form-group ">
                      <br />
                      <button
                        type="submit"
                        className="btn btn-add bi-file-plus-fill"
                      >
                        &nbsp; Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicKey;
