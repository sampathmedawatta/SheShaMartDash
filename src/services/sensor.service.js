import axios from "./axios";

const headers = {
  "Content-Type": "application/json",
  //Authorization: "Bearer your-access-token", // Add any custom headers as needed
};
const getSensors = () => {
  // return axios
  //   .get("/Sensors", {
  //     headers,
  //   })
  //   .then((response) => {
  //     return response.data;
  //   });
  return {
    "Temperature Sensor 1": {
        "input": "045ffacf3070fd25c2b848300cfbf09fe793f1a5e312da1b2d15eca3fab844684f6c1543ff793eefbc1e2bb8418d2e907f73af54360d433ad57e2c86df95a77a15",
        "counter": 5,
        "rewardAmount": 0,
        "metadata": {
            "name": "Temperature Sensor 1",
            "costPerMinute": 1,
            "costPerKB": 1,
            "integrationBroker": "broker1"
        },
        "signature": {
            "r": "66922c394892bc0c9688e20234b123598957b79c296210bb60fb1949f3f2863f",
            "s": "500e086f5d0b2e45727ab247bc295da82fc6c3d219c55b18e03ab8a543cc1b8d",
            "recoveryParam": 1
        },
        "hash": "5588b528d70d8c793b34b596ec2e2789ec6f0788d7c7353e57d22971329a323b"
    },
    "Temperature Sensor 2": {
        "input": "045ffacf3070fd25c2b848300cfbf09fe793f1a5e312da1b2d15eca3fab844684f6c1543ff793eefbc1e2bb8418d2e907f73af54360d433ad57e2c86df95a77a15",
        "counter": 6,
        "rewardAmount": 0,
        "metadata": {
            "name": "Temperature Sensor 2",
            "costPerMinute": 2,
            "costPerKB": 2,
            "integrationBroker": "broker1"
        },
        "signature": {
            "r": "c41b787628918b4550434b835de273fe1ca39cac04d889a249de84a45e2963b6",
            "s": "98190f028550d3c0bc4c1c10a5ae957d28989207ec1e78857308edde4401aab1",
            "recoveryParam": 0
        },
        "hash": "0803b0c76defd5e050cf01830d610d3b7fbcd003866bf2dc574999f0e475ace9"
    },
    "Camera Sensor 1": {
        "input": "045ffacf3070fd25c2b848300cfbf09fe793f1a5e312da1b2d15eca3fab844684f6c1543ff793eefbc1e2bb8418d2e907f73af54360d433ad57e2c86df95a77a15",
        "counter": 7,
        "rewardAmount": 0,
        "metadata": {
            "name": "Camera Sensor 1",
            "costPerMinute": 5,
            "costPerKB": 3,
            "integrationBroker": "broker1"
        },
        "signature": {
            "r": "8d795c7f601e3824fc6927421eb73e4c2150abebe2923bca1cf78e4c6ca8b08a",
            "s": "4d19d50c8be746f92d86768121285eec2c37dd82ad114ecf9227cc0ede2e5e73",
            "recoveryParam": 0
        },
        "hash": "ab3f54d910eaa51208a5c10e362967df6b288825ab8e3ebacf919ad8720cfe9e"
    },
    "Camera Sensor 2": {
        "input": "045ffacf3070fd25c2b848300cfbf09fe793f1a5e312da1b2d15eca3fab844684f6c1543ff793eefbc1e2bb8418d2e907f73af54360d433ad57e2c86df95a77a15",
        "counter": 8,
        "rewardAmount": 0,
        "metadata": {
            "name": "Camera Sensor 2",
            "costPerMinute": 6,
            "costPerKB": 3,
            "integrationBroker": "broker1"
        },
        "signature": {
            "r": "770a5b74a6b27c7dbe08f3ae34b8656dcde04e7a685499ebb493739e2cbe7705",
            "s": "35115095a9e88a055fa67399224c98265b718226e00c88490055e0fe0420ea52",
            "recoveryParam": 0
        },
        "hash": "a66048414ad8d176db92b46ca8f30fbc62ed2eb93b2dfb27034f1d512b73e852"
    },
    "DemoCameraVideo2": {
        "input": "045ffacf3070fd25c2b848300cfbf09fe793f1a5e312da1b2d15eca3fab844684f6c1543ff793eefbc1e2bb8418d2e907f73af54360d433ad57e2c86df95a77a15",
        "counter": 46,
        "rewardAmount": 0,
        "metadata": {
            "name": "DemoCameraVideo2",
            "costPerMinute": 0,
            "costPerKB": 0,
            "integrationBroker": "broker1"
        },
        "signature": {
            "r": "efd5be6bc05e34adc0b482b43a608fa72b85ef78eab95cade8b9a5dee0a89391",
            "s": "9dff4ab64b7c1e0a2c1802d04a881076189be105bc7af58bd3471859a6954373",
            "recoveryParam": 0
        },
        "hash": "b7b8cc269b1d923c26175e6a73b9550cda877d0c68dd34d5e9c219aa489bceac"
    },
    "TDP Sensor new": {
        "input": "045ffacf3070fd25c2b848300cfbf09fe793f1a5e312da1b2d15eca3fab844684f6c1543ff793eefbc1e2bb8418d2e907f73af54360d433ad57e2c86df95a77a15",
        "counter": 13,
        "rewardAmount": 0,
        "metadata": {
            "name": "TDP Sensor new",
            "costPerMinute": 1,
            "costPerKB": 2,
            "integrationBroker": "broker1"
        },
        "signature": {
            "r": "d45f188eded9f9d8b32d9dea00ff7abf5148b9fea99b9dd9b3f94cf3c4a05953",
            "s": "9b8fc4a0c04a6ee57714627bd5a4fafa79aac08b544d393cac5fec68746db207",
            "recoveryParam": 0
        },
        "hash": "782636588bc0b30d2b8eabaa0c1cfea00cef94122bdd8bfe2de6ab37eb290788"
    },
    "metaSample": {
        "input": "045ffacf3070fd25c2b848300cfbf09fe793f1a5e312da1b2d15eca3fab844684f6c1543ff793eefbc1e2bb8418d2e907f73af54360d433ad57e2c86df95a77a15",
        "counter": 14,
        "rewardAmount": 0,
        "metadata": {
            "name": "metaSample",
            "costPerMinute": 1,
            "costPerKB": 1,
            "integrationBroker": "broker1",
            "extraNodes": [
                {
                    "s": "SSMS://",
                    "p": "http://www.w3.org/ns/sosa/observes",
                    "o": "SSMS://#CameraSensorVideo"
                },
                {
                    "s": "SSMS://",
                    "p": "http://www.w3.org/ns/sosa/hasFeatureOfInterest",
                    "o": "SSMS://#CameraSensorLocation"
                }
            ],
            "extraLiterals": [
                {
                    "s": "SSMS://#CameraSensorVideo",
                    "p": "http://www.w3.org/2000/01/rdf-schema#label",
                    "o": "video"
                },
                {
                    "s": "SSMS://#CameraSensorLocation",
                    "p": "http://www.w3.org/2003/01/geo/wgs84_pos#lat",
                    "o": "-37.821658"
                },
                {
                    "s": "SSMS://#CameraSensorLocation",
                    "p": "http://www.w3.org/2003/01/geo/wgs84_pos#long",
                    "o": "145.03904"
                },
                {
                    "s": "SSMS://#CameraSensorLocation",
                    "p": "http://www.w3.org/2003/01/geo/wgs84_pos#alt",
                    "o": "12.75"
                },
                {
                    "s": "SSMS://#CameraSensorLocation",
                    "p": "http://rdfs.co/juso/country",
                    "o": "Australia"
                },
                {
                    "s": "SSMS://#CameraSensorLocation",
                    "p": "http://rdfs.co/juso/Provenance",
                    "o": "Queensland"
                },
                {
                    "s": "SSMS://#CameraSensorLocation",
                    "p": "http://rdfs.co/juso/City",
                    "o": "Brisbane"
                },
                {
                    "s": "SSMS://#CameraSensorLocation",
                    "p": "http://rdfs.co/juso/Suburb",
                    "o": "Stafford"
                },
                {
                    "s": "SSMS://#CameraSensorLocation",
                    "p": "http://rdfs.co/juso/Address",
                    "o": "9 Webster street"
                },
                {
                    "s": "SSMS://#CameraSensorLocation",
                    "p": "http://rdfs.co/juso/Postcode",
                    "o": "4053"
                }
            ]
        },
        "signature": {
            "r": "5c69d996b3c4f65995dc635938593832d4955c372f286f27c51def10b1adbc6",
            "s": "3c44ac7b699f97f987ca8f0aa05c7506d2420f00b337b8443ed8a24fd03cd8ca",
            "recoveryParam": 1
        },
        "hash": "1fdbfe6e81301bfb6837f66e1fdd19da72a5c1de7e04d87c368f1fb413a1ec77"
    },
    "metaSample2": {
        "input": "045ffacf3070fd25c2b848300cfbf09fe793f1a5e312da1b2d15eca3fab844684f6c1543ff793eefbc1e2bb8418d2e907f73af54360d433ad57e2c86df95a77a15",
        "counter": 15,
        "rewardAmount": 0,
        "metadata": {
            "name": "metaSample2",
            "costPerMinute": 1,
            "costPerKB": 1,
            "integrationBroker": "broker1",
            "extraNodes": [
                {
                    "s": "SSMS://",
                    "p": "http://www.w3.org/ns/sosa/observes",
                    "o": "SSMS://#CameraSensorVideo"
                },
                {
                    "s": "SSMS://",
                    "p": "http://www.w3.org/ns/sosa/hasFeatureOfInterest",
                    "o": "SSMS://#CameraSensorLocation"
                }
            ],
            "extraLiterals": [
                {
                    "s": "SSMS://#CameraSensorVideo",
                    "p": "http://www.w3.org/2000/01/rdf-schema#label",
                    "o": "video"
                },
                {
                    "s": "SSMS://#CameraSensorLocation",
                    "p": "http://www.w3.org/2003/01/geo/wgs84_pos#lat",
                    "o": "-37.821658"
                },
                {
                    "s": "SSMS://#CameraSensorLocation",
                    "p": "http://www.w3.org/2003/01/geo/wgs84_pos#long",
                    "o": "145.03904"
                },
                {
                    "s": "SSMS://#CameraSensorLocation",
                    "p": "http://www.w3.org/2003/01/geo/wgs84_pos#alt",
                    "o": "12.75"
                },
                {
                    "s": "SSMS://#CameraSensorLocation",
                    "p": "http://rdfs.co/juso/country",
                    "o": "Australia"
                },
                {
                    "s": "SSMS://#CameraSensorLocation",
                    "p": "http://rdfs.co/juso/Provenance",
                    "o": "Queensland"
                },
                {
                    "s": "SSMS://#CameraSensorLocation",
                    "p": "http://rdfs.co/juso/City",
                    "o": "Brisbane"
                },
                {
                    "s": "SSMS://#CameraSensorLocation",
                    "p": "http://rdfs.co/juso/Suburb",
                    "o": "Stafford"
                },
                {
                    "s": "SSMS://#CameraSensorLocation",
                    "p": "http://rdfs.co/juso/Address",
                    "o": "9 Webster street"
                },
                {
                    "s": "SSMS://#CameraSensorLocation",
                    "p": "http://rdfs.co/juso/Postcode",
                    "o": "4053"
                }
            ]
        },
        "signature": {
            "r": "bfbe9a0fe54ae1394fb6a6a77469310fbc8bdd7edb68f5a32efa60f97be241a",
            "s": "578ed15995a22d316583a03875036146621b77af2ce23333d3cd1a5cd8dcca94",
            "recoveryParam": 0
        },
        "hash": "1fdfd8d40c3daaf24c67d0d4c31752b81fff4c82590cacef2ec9e233dcc956da"
    },
    "test sensor ": {
        "input": "045ffacf3070fd25c2b848300cfbf09fe793f1a5e312da1b2d15eca3fab844684f6c1543ff793eefbc1e2bb8418d2e907f73af54360d433ad57e2c86df95a77a15",
        "counter": 16,
        "rewardAmount": 0,
        "metadata": {
            "name": "test sensor ",
            "costPerMinute": 1,
            "costPerKB": 1,
            "integrationBroker": "broker1",
            "extraNodes": [
                {
                    "s": "SSMS://",
                    "p": "http://www.w3.org/ns/sosa/observes",
                    "o": "SSMS://#CameraSensorVideo"
                },
                {
                    "s": "SSMS://",
                    "p": "http://www.w3.org/ns/sosa/hasFeatureOfInterest",
                    "o": "SSMS://#CameraSensorLocation"
                }
            ],
            "extraLiterals": [
                {
                    "s": "SSMS://#CameraSensorVideo",
                    "p": "http://www.w3.org/2000/01/rdf-schema#label",
                    "o": "video"
                },
                {
                    "s": "SSMS://#CameraSensorLocation",
                    "p": "http://www.w3.org/2003/01/geo/wgs84_pos#lat",
                    "o": "-37.821658"
                },
                {
                    "s": "SSMS://#CameraSensorLocation",
                    "p": "http://www.w3.org/2003/01/geo/wgs84_pos#long",
                    "o": "145.03904"
                },
                {
                    "s": "SSMS://#CameraSensorLocation",
                    "p": "http://www.w3.org/2003/01/geo/wgs84_pos#alt",
                    "o": "12.75"
                },
                {
                    "s": "SSMS://#CameraSensorLocation",
                    "p": "http://rdfs.co/juso/country",
                    "o": "Australia"
                },
                {
                    "s": "SSMS://#CameraSensorLocation",
                    "p": "http://rdfs.co/juso/Provenance",
                    "o": "Queensland"
                },
                {
                    "s": "SSMS://#CameraSensorLocation",
                    "p": "http://rdfs.co/juso/City",
                    "o": "Brisbane"
                },
                {
                    "s": "SSMS://#CameraSensorLocation",
                    "p": "http://rdfs.co/juso/Suburb",
                    "o": "Stafford"
                },
                {
                    "s": "SSMS://#CameraSensorLocation",
                    "p": "http://rdfs.co/juso/Address",
                    "o": "9 Webster street"
                },
                {
                    "s": "SSMS://#CameraSensorLocation",
                    "p": "http://rdfs.co/juso/Postcode",
                    "o": "4053"
                }
            ]
        },
        "signature": {
            "r": "d89227c2da62f29eac1f603cb89afe5468a9df584658051cb8240870f845cbbb",
            "s": "596182369de950dd717cbed0c77f8c13724b9c44d4025b4689bd6bc630877b3a",
            "recoveryParam": 1
        },
        "hash": "0b04c80efd3954be9b653d0510469e1f949a23c8db2c6b51884f5fa76c86f3bc"
    },
    "new sensor": {
        "input": "045ffacf3070fd25c2b848300cfbf09fe793f1a5e312da1b2d15eca3fab844684f6c1543ff793eefbc1e2bb8418d2e907f73af54360d433ad57e2c86df95a77a15",
        "counter": 26,
        "rewardAmount": 0,
        "metadata": {
            "name": "new sensor",
            "costPerMinute": 1,
            "costPerKB": 1,
            "integrationBroker": "broker1"
        },
        "signature": {
            "r": "733905d9c7358a4752af54253e4b4519d365583074bb59efb7d0e0594835d684",
            "s": "a88f3c158b5cd912442e4322e18648b6cd3ead491a05a4936f14935539912813",
            "recoveryParam": 0
        },
        "hash": "d5b179af3483cf09f62003ae788708dcbb0e1a26cd2665daec4ef24aa5cd5e67"
    },
    "": {
        "input": "045ffacf3070fd25c2b848300cfbf09fe793f1a5e312da1b2d15eca3fab844684f6c1543ff793eefbc1e2bb8418d2e907f73af54360d433ad57e2c86df95a77a15",
        "counter": 29,
        "rewardAmount": 0,
        "metadata": {
            "name": "",
            "costPerMinute": 1,
            "costPerKB": 1,
            "integrationBroker": "broker1"
        },
        "signature": {
            "r": "ea7d6db0b6e3937684854bfcbac782aad490eba7ee7a90c9a2de9f256d3817bd",
            "s": "7ac54b8872f155930c97b95e5287c5071ebef68583fb6f6a170ef506ff861dd1",
            "recoveryParam": 0
        },
        "hash": "3c5f6d7ae9edb9631e5e83437096947266329a96683d9b82726f230cb9a317cc"
    },
    "TDP Sensor with new data": {
        "input": "045ffacf3070fd25c2b848300cfbf09fe793f1a5e312da1b2d15eca3fab844684f6c1543ff793eefbc1e2bb8418d2e907f73af54360d433ad57e2c86df95a77a15",
        "counter": 34,
        "rewardAmount": 0,
        "metadata": {
            "name": "TDP Sensor with new data",
            "costPerMinute": 1,
            "costPerKB": 2,
            "integrationBroker": "broker1"
        },
        "signature": {
            "r": "c2b88e787fb08fba6ab3beea52b93a9ae0a4e169f2d0ecd6982990e20e77acde",
            "s": "d1c5dada516e353a767b442bfb76dddb23f6fedb4c1a29891e36d7a8dcb619b3",
            "recoveryParam": 1
        },
        "hash": "dcae1782231d93adf51b55ee2ff8a5bc7b423a8a7adbdf426c547fed984aeab5"
    },
    "TDP Sensor with meta": {
        "input": "045ffacf3070fd25c2b848300cfbf09fe793f1a5e312da1b2d15eca3fab844684f6c1543ff793eefbc1e2bb8418d2e907f73af54360d433ad57e2c86df95a77a15",
        "counter": 44,
        "rewardAmount": 0,
        "metadata": {
            "name": "TDP Sensor with meta",
            "costPerMinute": 1,
            "costPerKB": 2,
            "integrationBroker": "broker1"
        },
        "signature": {
            "r": "18b1c30391aeb7091cd7ea4c09d248782d116120bec6f66a8516de0601d2f96",
            "s": "6b219a335ccac9cf8fd357ae8d6ff764275df3555e6e9d1540772885721a4b33",
            "recoveryParam": 0
        },
        "hash": "f519fa93eebe511a3b2cbd624f9ff2c4d1259efa2211db0dc122e8e65cfc3e7c"
    }
}
};

const parms = {
  rewardAmount: 0,
  sensorName: "TDP Sensor with meta",
  costPerMinute: 1,
  costPerKB: 2,
  integrationBroker: "broker1",
};

const registerSensor = () => {
  // return axios
  //   .post("/SensorRegistration", parms, {
  //     headers,
  //   })
  //   .then((response) => {
  //     return response.data;
  //   });
};

const SensorService = {
  getSensors,
  registerSensor,
};

export default SensorService;
