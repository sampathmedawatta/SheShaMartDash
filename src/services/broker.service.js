import { useEffect } from "react";
import axios from "./axios";

const headers = {
  "Content-Type": "application/json",
  //Authorization: "Bearer your-access-token", // Add any custom headers as needed
};

const getBrokers = () => {
    // return axios
    //     .get("/Brokers")
    //     .then((response) => {
    //     return response.data;
    //     })
    //     .catch((error) => {
    //     console.error(error);
    //     });
    // };
      return {
        "broker1": {
            "input": "045ffacf3070fd25c2b848300cfbf09fe793f1a5e312da1b2d15eca3fab844684f6c1543ff793eefbc1e2bb8418d2e907f73af54360d433ad57e2c86df95a77a15",
            "counter": 1,
            "rewardAmount": 0,
            "metadata": {
                "name": "broker1",
                "endpoint": "136.186.108.75:5004"
            },
            "signature": {
                "r": "8c8a378713d38ae877fd702970c866fe90e83360c0946b8105ddae3035670c1d",
                "s": "60e82ff1d64c97d1868156b6eac296262f45df6a9557ec3e1556e48db422a3d5",
                "recoveryParam": 0
            },
            "hash": "dd934ef395a4a9210c5318f51f9e8cdd25906eeecafb84cb40a8ffba9d9bc045"
        },
        "Broker2": {
            "input": "045ffacf3070fd25c2b848300cfbf09fe793f1a5e312da1b2d15eca3fab844684f6c1543ff793eefbc1e2bb8418d2e907f73af54360d433ad57e2c86df95a77a15",
            "counter": 10,
            "rewardAmount": 0,
            "metadata": {
                "name": "Broker2",
                "endpoint": "1"
            },
            "signature": {
                "r": "26b89361ef43eea58795ef815e6a48b3ac93e98ef17646bd0592d25f44e44659",
                "s": "f0920b8cf73f120aff2d00c6e361660e48fd2a758bf4fac452bffb8be1a453d9",
                "recoveryParam": 0
            },
            "hash": "d5149ac84b60cc443f090cdc84ae43f190327fc6816cc4d1694c12bc64813869"
        },
        "broker name": {
            "input": "045ffacf3070fd25c2b848300cfbf09fe793f1a5e312da1b2d15eca3fab844684f6c1543ff793eefbc1e2bb8418d2e907f73af54360d433ad57e2c86df95a77a15",
            "counter": 25,
            "rewardAmount": 0,
            "metadata": {
                "name": "broker name",
                "endpoint": "1"
            },
            "signature": {
                "r": "9a505da3403374895e93e452884b3b90972260f19a9560d78dcb8699c35a2cde",
                "s": "521e0023d88f11ba9be179aa646d7c3b751d648e6cc05f855274c9b971212c32",
                "recoveryParam": 0
            },
            "hash": "bff10075cc31655d5675ce2dcf72ac3ca33fb2c96061a352cd6eff9935a84cce"
        },
        "new broker  name": {
            "input": "045ffacf3070fd25c2b848300cfbf09fe793f1a5e312da1b2d15eca3fab844684f6c1543ff793eefbc1e2bb8418d2e907f73af54360d433ad57e2c86df95a77a15",
            "counter": 33,
            "rewardAmount": 0,
            "metadata": {
                "name": "new broker  name",
                "endpoint": "1"
            },
            "signature": {
                "r": "eb059effa1c120de293363341d6c5d3391e33da405a2364f3ba08fe1967f6bc0",
                "s": "2d87bfefc46e5c0e3f77f2075e2b6cdb4757bfeb0e29a69922045b7cb1540942",
                "recoveryParam": 0
            },
            "hash": "018da67f5b3899c79bdeb6387e69495e177af738a75cca48d732bd793b679a33"
        },
        "new broker 1": {
            "input": "045ffacf3070fd25c2b848300cfbf09fe793f1a5e312da1b2d15eca3fab844684f6c1543ff793eefbc1e2bb8418d2e907f73af54360d433ad57e2c86df95a77a15",
            "counter": 37,
            "rewardAmount": 0,
            "metadata": {
                "name": "new broker 1",
                "endpoint": "1"
            },
            "signature": {
                "r": "1efbfeee0ca8e356dd208e9630ee2b51c2e6c9363ca25ff149ea56bbbb55f40c",
                "s": "d4abe8f2f2fc01fd2ca419ce69d6ea3aa08453e1a3144434a1e6c723df6fd99e",
                "recoveryParam": 0
            },
            "hash": "20333fb60ad4623616462fab71091ab33823c39400001df83563822c2fa2c0ae"
        },
        "new broker 111": {
            "input": "045ffacf3070fd25c2b848300cfbf09fe793f1a5e312da1b2d15eca3fab844684f6c1543ff793eefbc1e2bb8418d2e907f73af54360d433ad57e2c86df95a77a15",
            "counter": 39,
            "rewardAmount": 0,
            "metadata": {
                "name": "new broker 111",
                "endpoint": "1"
            },
            "signature": {
                "r": "695d0c2df6f971d92c727dd0099daab4379efc50e4ff58482b9b36c0eca0e6ba",
                "s": "6fe5f449fcc24d4be21bdeac84035a0398df58a32d9997c190fb320db7411a7f",
                "recoveryParam": 0
            },
            "hash": "c6cdfa82eda98554cd65fa9e22d565de2ab3419c22445def254e11f9ca919547"
        },
        "new broker 2121": {
            "input": "045ffacf3070fd25c2b848300cfbf09fe793f1a5e312da1b2d15eca3fab844684f6c1543ff793eefbc1e2bb8418d2e907f73af54360d433ad57e2c86df95a77a15",
            "counter": 40,
            "rewardAmount": 0,
            "metadata": {
                "name": "new broker 2121",
                "endpoint": "1"
            },
            "signature": {
                "r": "b46eef860003dccda7703379dc90cb18d933ac4be36c7d6e51838dabd5204714",
                "s": "c480f8e2cff0a838523e6d50b21f9f7c99b708a6115e509a436642fd8080043c",
                "recoveryParam": 1
            },
            "hash": "889a2cb5c6d0a59f030fb5df80cc8355eea4da5178b2a3fc6afb9b66c777a5e6"
        },
        "Broker 1112": {
            "input": "045ffacf3070fd25c2b848300cfbf09fe793f1a5e312da1b2d15eca3fab844684f6c1543ff793eefbc1e2bb8418d2e907f73af54360d433ad57e2c86df95a77a15",
            "counter": 41,
            "rewardAmount": 0,
            "metadata": {
                "name": "Broker 1112",
                "endpoint": "1"
            },
            "signature": {
                "r": "194dc6516cbc3b980af6cb7cee2523912b8a26f730d3cb67cea7eb26b24287a",
                "s": "a734bd2c0062ed58a3ec13daa45b62fbac7cf3802a92ea4eb4008c538e1ed3bd",
                "recoveryParam": 1
            },
            "hash": "b9db9ceb88e33f17196af8ccdc0cde1b3ee00feece9ee83fa874e3cbb18996f4"
        },
        "test bro3": {
            "input": "045ffacf3070fd25c2b848300cfbf09fe793f1a5e312da1b2d15eca3fab844684f6c1543ff793eefbc1e2bb8418d2e907f73af54360d433ad57e2c86df95a77a15",
            "counter": 42,
            "rewardAmount": 0,
            "metadata": {
                "name": "test bro3",
                "endpoint": "1"
            },
            "signature": {
                "r": "e1d842aec8457203477b01733d772e7beb32888d8966b83c36cc41243bc67e89",
                "s": "cd54ba80982bb5a5bc1938f946189c832ebf65dc049c4b39a3d225d395e90dc1",
                "recoveryParam": 1
            },
            "hash": "ca43c26a6619732fc9c1277f34e2e9123cdec0ae88cf590fab006b4e00dbe222"
        }
    }
};

const registerBroker = (params) => {
  return axios
    .post("/BrokerRegistration", params)
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.error(error);
    });
};

const BrokerService = {
  getBrokers,
  registerBroker,
};

export default BrokerService;
