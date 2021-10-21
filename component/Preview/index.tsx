import React from "react";
import server_ip, { option } from "../../main_config";
import {
  Canvas,
  useFrame,
  useLoader,
  extend,
  useThree,
} from "@react-three/fiber";
import { THREE } from "three/examples/js/loaders/PCDLoader";
import { OrbitControls } from "three/examples/js/controls/OrbitControls";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

extend({ OrbitControls });
interface Properties {
  width: number;
  height: number;
  datasetID: string;
}
function Controls() {
  const controls = React.useRef();
  const { camera, gl } = useThree();
  useFrame(() => controls.current.update());
  return (
    <orbitControls
      ref={controls}
      args={[camera, gl.domElement]}
      enableDamping
      dampingFactor={0.1}
      rotateSpeed={0.5}
    ></orbitControls>
  );
}
const create3DBox = ({ id, category, box3d }) => {
  function increaseBrightness(hex, percent) {
    // strip the leading # if it's there
    hex = hex.replace(/^\s*#|\s*$/g, "");

    // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
    if (hex.length === 3) {
      hex = hex.replace(/(.)/g, "$1$1");
    }

    let r = parseInt(hex.substr(0, 2), 16),
      g = parseInt(hex.substr(2, 2), 16),
      b = parseInt(hex.substr(4, 2), 16);

    return (
      "#" +
      (0 | ((1 << 8) + r + ((256 - r) * percent) / 100))
        .toString(16)
        .substr(1) +
      (0 | ((1 << 8) + g + ((256 - g) * percent) / 100))
        .toString(16)
        .substr(1) +
      (0 | ((1 << 8) + b + ((256 - b) * percent) / 100)).toString(16).substr(1)
    );
  }
  //destructure the location, orientation, dimensions
  const { dimension, location, orientation } = box3d;
  //create box with initial width:1 length:1 height:1
  let cubeGeometry = new THREE.BoxBufferGeometry(1.0, 1.0, 1.0);
  let color = "#3ABB9D";

  //create material for sides other than front
  let cubeMaterialSide = new THREE.MeshBasicMaterial({
    color: color,
    transparent: true,
    opacity: 0.1,
    side: THREE.DoubleSide,
    morphTargets: false,
  });
  //create Material for front side
  let cubeMaterialFrontSide = new THREE.MeshBasicMaterial({
    color: color,
    transparent: true,
    opacity: 0.1,
    side: THREE.DoubleSide,
    morphTargets: false,
  });
  //create an array with 6 side of choices
  let cubeMaterials = [
    cubeMaterialFrontSide,
    cubeMaterialSide,
    cubeMaterialSide,
    cubeMaterialSide,
    cubeMaterialSide,
    cubeMaterialSide,
  ];
  let faceMaterial = new THREE.MeshFaceMaterial(cubeMaterials);
  let cubeMesh = new THREE.Mesh(cubeGeometry, faceMaterial);

  cubeMesh.position.set(location.x, location.y, location.z);
  cubeMesh.scale.set(dimension.width, dimension.length, dimension.height);
  cubeMesh.rotation.x = orientation.rotationPitch;
  cubeMesh.rotation.y = orientation.rotationRoll;
  cubeMesh.rotation.z = orientation.rotationYaw;
  // cubeMesh.name = "cube-" + category.chatAt(0);

  //get BoundingBox from object
  let edgesGeometry = new THREE.EdgesGeometry(cubeMesh.geometry);
  let boundingBoxColor = increaseBrightness(color, 50);
  let edgesMaterial = new THREE.LineBasicMaterial({
    color: boundingBoxColor,
    linewidth: 8,
  });
  let edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
  cubeMesh.add(edges);
  return <primitive object={cubeMesh}></primitive>;
};
export const Preview = (props: Properties) => {
  var [files, setFiles] = React.useState([]);
  const [, forceUpdate] = React.useState([]);
  const [pcd, setPcd] = React.useState([]);
  const [currentFrame, setCurrentFrame] = React.useState(0);
  const [loader, setLoader] = React.useState(new THREE.PCDLoader());
  let [bb, setBB] = React.useState<React.ReactElement>(<></>);
  const Fetchfiles = (): Promise<Array<number>> =>
    new Promise((res, rej) => {
      console.log(props.datasetID, "new promise");
      let httpReq = new XMLHttpRequest();
      httpReq.open(
        "get",
        server_ip + option.datasetFiles + "?_id=" + props.datasetID
      );
      httpReq.withCredentials = true;
      httpReq.setRequestHeader("Authorization", "bdta");
      httpReq.addEventListener("load", (e) => {
        if (e.currentTarget.status === 200) {
          let filelists = JSON.parse(e.currentTarget.responseText);
          res(filelists.data);
        } else {
          rej(e.currentTarget.status);
        }
      });
      httpReq.send();
    });
  const getUrl = (frame, key) => {
    return files.length > 0 ? files[frame][key] : `${server_ip}download?url=${null}`;
  };
  const makeDownloadURL = (path): string => `${server_ip}download?url=${path}`;
  const changeFrame = (arg) => {
    if (arg === "+") {
      if (currentFrame < 49) {
        setCurrentFrame(currentFrame + 1);
      }
    }
    if (arg === "-") {
      if (currentFrame > 0) {
        setCurrentFrame(currentFrame - 1);
      }
    }
    if (typeof arg === "number") {
      if (arg >= 0 && arg <= 49) {
        setCurrentFrame(arg);
      } else {
        null;
      }
    }
  };
  const loadAnnotation = () => {
    const request = new XMLHttpRequest();
    request.open("GET", getUrl(currentFrame, "json"));
    request.withCredentials = true;
    request.setRequestHeader("Authorization", "bdta");
    request.addEventListener("load", (e) => {
      if (e.currentTarget.status === 200) {
        let filelists = JSON.parse(e.currentTarget.responseText);
        let boxlist = filelists.labels.map((val) => create3DBox(val));
        setBB(boxlist);
      } else {
        console.log(e.currentTarget.status);
      }
    });
    request.send();
  };
  React.useEffect(() => {
    loader.load(
      getUrl(currentFrame, "pcd"),
      (mesh) => {
        mesh.rotation.z = Math.PI / 2;
        setPcd(<primitive object={mesh}></primitive>);
      },
      (progress) => {},
      (err) => {
        console.log("THREE.PCDLoader", err);
      }
    );
  }, [currentFrame, files]);
  React.useEffect(() => {
    if (props.datasetID !== undefined) {
      Fetchfiles()
        .then(
          (result) => {
            let file = result.map((frame) => {
              return {
                json: makeDownloadURL(frame.json),
                pcd: makeDownloadURL(frame.pcd),
                jpg: makeDownloadURL(frame.jpg),
              };
            });
            setFiles(file);
          },
          (result) => {
            console.log(result, "Failed");
          }
        )
        .catch((e) => {
          console.log("catch error, PreviewComponentDidMOunt ", e);
        });
    }
    return () => {
      console.log("Updating props.datasetID, updating", props.datasetID);
    };
  }, [props.datasetID]);
  React.useEffect(() => {
    loadAnnotation();
  }, [currentFrame]);

  return (
    <div>
      {" "}
      <IconButton
        onClick={() => {
          changeFrame("-");
        }}
      >
        <ArrowBackIcon />
      </IconButton>{" "}
      {currentFrame}
      <Canvas style={{ width: "1080px", height: "720px" }}>
        {" "}
        <Controls />
        {pcd}
        {bb}
      </Canvas>
      <IconButton
        onClick={() => {
          changeFrame("+");
        }}
      >
        <ArrowForwardIcon />
      </IconButton>
    </div>
  );
};
