import React, { useEffect } from "react";
import server_ip, { option } from "../../main_config";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import { THREE } from "three/examples/js/loaders/PCDLoader";
import { OrbitControls } from "three/examples/js/controls/OrbitControls";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ButtonBase from "@mui/material/ButtonBase";
import CenterFocusWeakIcon from "@mui/icons-material/CenterFocusWeak";
import ListItemIcon from "@mui/material/ListItemIcon";
extend({ OrbitControls });
interface Properties {
  width: number;
  height: number;
  datasetID: string;
  currentFrame: number;
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

export const Preview = (props: Properties) => {
  var [files, setFiles] = React.useState([]);
  // const [currentFrame, setCurrentFrame] = React.useState(0);
  const { currentFrame } = props;
  const classes = useStyles();
  const getUrl = (frame, key) => {
    return files.length > 0
      ? files[frame][key]
      : `${server_ip}download?url=${null}`;
  };
  const Fetchfiles = (): Promise<Array<number>> =>
    new Promise((res, rej) => {
      let httpReq = new XMLHttpRequest();
      httpReq.open(
        "get",
        server_ip +
          option.datasetFiles +
          "?_id=" +
          props.datasetID +
          "&limit=1000"
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
  const load2DAnnotation = () => {
    const request = new XMLHttpRequest();
    request.open("GET", getUrl(currentFrame, "json"));
    request.withCredentials = true;
    request.setRequestHeader("Authorization", "bdta");
    request.addEventListener("load", (e) => {
      if (e.currentTarget.status === 200) {
        let filelists = JSON.parse(e.currentTarget.responseText);
        let boxlist = filelists.label.map((val) => {});
      } else {
        console.log(
          "loading Annotation 2D ERROR",
          e.currentTarget.status,
          e.currentTarget.responseURL
        );
      }
    });
  };
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
  // React.useEffect(() => {
  //   loadAnnotation();
  // }, [currentFrame, files]);
  // React.useEffect(() => {
  //   async function a() {
  //     const Raphael = await import("react-raphael");
  //     setRaphael(Raphael);
  //     console.log("runtime", Paper);
  //     setA(
  //       <Paper>
  //         <Image
  //           src={getUrl(currentFrame, "jpg")}
  //           width={100}
  //           height={100}
  //           x={0}
  //           y={0}
  //         />
  //         {/* <Text x={0} y={0} text="同一个世界 同一个梦想" attr={{"fill":"#fff"}}/> */}
  //         {/* <Rect x={0} y = {0} width= {20} height={30} attr={{"stroke":"#f0c620","stroke-width":3}}/> */}
  //       </Paper>
  //     );
  //   }
  //   a();
  // }, []);

  return (
    <>
      {" "}
      <PointCloud
        pcd_url={getUrl(currentFrame, "pcd")}
        box_url={getUrl(currentFrame, "json")}
      />
      <Picture img_url={getUrl(currentFrame, "jpg")} />
    </>
  );
};
const Picture = ({ img_url, box_url }) => {
  const [ele, setEle] = React.useState(<> </>);
  const loadRaphael = async () => {
    const {
      Raphael,
      Paper,
      Set,
      Circle,
      Ellipse,
      Image,
      Rect,
      Text,
      Path,
      Line,
    } = await import("react-raphael");
    return {
      Raphael,
      Paper,
      Set,
      Circle,
      Ellipse,
      Image,
      Rect,
      Text,
      Path,
      Line,
    };
  };
  React.useEffect(() => {
    loadRaphael().then(
      ({
        Raphael,
        Paper,
        Set,
        Circle,
        Ellipse,
        Image,
        Rect,
        Text,
        Path,
        Line,
      }) => {
        setEle(
          <div style={{ position: "relative", top: "-588px", left: "430px" }}>
            <Paper width={200} height={200}>
              <Image src={img_url} x={0} y={0} width={200} height={200} />
              {/* <Text
                x={60}
                y={110}
                text="轿车"
                attr={{ fill: "#f0c620" }}
              />{" "}
              <Rect
                x={60}
                y={118}
                width={60}
                height={70}
                attr={{ stroke: "#f0c620", "stroke-width": 3 }}
              /> */}
            </Paper>
          </div>
        );
      }
    );
  }, [img_url]);
  return ele;
};
const PointCloud = ({ pcd_url, box_url }) => {
  //initialize the PointCloud
  const [loader, setLoader] = React.useState(new THREE.PCDLoader());
  const pointcloud = usePointCloud(pcd_url, loader);
  const BoundingBox = useBoundingBox3D(box_url);
  const classes = useStyles();
  return (
    <Canvas style={{ width: "100%", height: "100%" }}>
      <Controls />
      {pointcloud}
      {BoundingBox}
    </Canvas>
  );
};
const useStyles = makeStyles(() => ({
  canvas: {
    "& canvas": {
      height: "85%",
    },
  },
}));
const useBoundingBox3D = (box_url) => {
  const [box, setBox] = React.useState({ labels: [] });
  React.useEffect(() => {
    const Req = new XMLHttpRequest();
    Req.open("GET", box_url);
    Req.setRequestHeader("Authorization", "bdta");
    Req.withCredentials = true;
    Req.addEventListener("load", (event) => {
      if (event.currentTarget.status === 200) {
        setBox(JSON.parse(event.currentTarget.responseText));
      } else {
        console.log(
          `Error when ${event.currentTarget.responseURL} useBoundingBox3D`
        );
      }
    });
    Req.send();
  }, [box_url]);
  return box.labels.map((val) => {
    return create3DBox(val);
  });
};
const usePointCloud = (url, loader) => {
  const [pointCloud, setPointCloud] = React.useState(null);
  React.useEffect(() => {
    loader.load(
      url,
      (mesh) => {
        mesh.rotation.z = Math.PI / 2;
        setPointCloud(<primitive object={mesh}></primitive>);
      },
      (progress) => {
        setPointCloud(progress.loaded / progress.total);
      },
      (err) => {
        console.log("THREE.PCDLoader", err);
      }
    );
  }, [url]);
  return pointCloud;
};
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
const useAddress = (id_of_Dataset) => {
  const [addresses, setAddresses] = React.useState(null);
};
export const Labellist = ({ box_url }) => {
  const [label, setLabel] = React.useState([]);
  React.useEffect(() => {
    const Req = new XMLHttpRequest();
    Req.open("GET", box_url);
    Req.setRequestHeader("Authorization", "bdta");
    Req.withCredentials = true;
    Req.addEventListener("load", (event) => {
      if (event.currentTarget.status === 200) {
        setLabel(JSON.parse(event.currentTarget.responseText).labels);
      } else {
        console.log(
          `Error when ${event.currentTarget.responseURL} useBoundingBox3D`
        );
      }
    });
    Req.send();
  }, [box_url]);
  return (
    <List>
      <div style={{ position: "relative", top: "72px", overflow: "scroll" }}>
        {label.map((value, index) => {
          return (
            <ButtonBase>
              <ListItem>
                <ListItemIcon>
                  <CenterFocusWeakIcon />
                </ListItemIcon>
                <ListItemText primary={value.category}></ListItemText>
              </ListItem>
            </ButtonBase>
          );
        })}{" "}
      </div>
    </List>
  );
};
