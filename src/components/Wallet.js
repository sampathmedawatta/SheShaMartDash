import React, { useState, useContext, useEffect } from "react";
import { Context } from "../context/context";
import GeneralMenu from "../components/UI/SubMenu/GeneralMenu";
import ValidatePublicKey from "../components/ValidatePublicKey";
import WalletService from "../services/wallet.service";

const Wallet = () => {
    const { savedPublicKey } = useContext(Context);
    const [showPopup, setShowPopup] = useState(false);
    const [balance, setBalance] = useState({});

    useEffect(() => {
        if (!savedPublicKey) {
        setShowPopup(true);
        }

        async function fetchWalletData() {
          const walletData = await WalletService.getWallet({
            publicKey: savedPublicKey,
          });

          setBalance(walletData);
          console.log(walletData);
        }

        fetchWalletData();
       
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
            <div className="col-7">
              <div className="page-title">View Your Wallet</div>

              {balance && (
                <table className="table table-light">
                  <thead>
                    <tr>
                      <th>Balance</th>
                      <th>Counter</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{balance.balance}</td>
                      <td>{balance.counter}</td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;
