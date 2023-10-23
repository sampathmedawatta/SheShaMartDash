import React, { useState, useContext, useEffect } from "react";
import { Context } from "../context/context";
import GeneralMenu from "../components/UI/SubMenu/GeneralMenu";
import ValidatePublicKey from "../components/ValidatePublicKey";

const Wallet = () => {
    const { savedPublicKey } = useContext(Context);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        if (!savedPublicKey) {
        setShowPopup(true);
        }
    }, []);


  return (
    <div>
    <div className="row">
        <div className="col-12">
            <GeneralMenu />
        </div>
    
        <div className="col-12">
            <div className="title-heders">Wallet</div>
        </div>
    </div>

    {showPopup && <ValidatePublicKey />}
    {!showPopup && (
        <div className="row">
            <div className="col-12">
            <br />
                <div className="col-10">
                    <div className="page-title">View Your Wallet</div>
                </div>
            </div>
        </div>
    )}

      





      
    </div>
  );
};

export default Wallet;
