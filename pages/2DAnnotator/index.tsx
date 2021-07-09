import React from "react";
import Header from "../header";
import MainAnnotator from "../../component/Layout/mid";
import Categories from "../../component/Layout/PageLeft";
import Position from "../../component/Layout/PageRight";
import { Provider } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { useRouter } from "next/router";
import dataServer, { option } from "../../main_config";
import { connect } from "react-redux";
import { createSaveToCloudAction } from "../../redux/action/BoundingBoxAction";
import DataSet from "../../styles/DataSet.module.css";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Button from '@material-ui/core/Button';
import store from "../../redux";
import SaveIcon from '@material-ui/icons/Save';
interface taskInfo {
  taskid: string;
  sequence: number;
  data: string;
}

const mapDispatchToProps = (dispatch) => ({
  SaveToCloud_through_redux_store: (taskInfo: taskInfo) => {
    dispatch(createSaveToCloudAction(taskInfo));
  },
});
const SaveToCloud_through_redud_store_button = connect(
  null,
  mapDispatchToProps
)((props) => {
  const { SaveToCloud_through_redux_store, _taskID, sequence } = props;
  React.useEffect(() => {
    window.SaveToCloud_through_redux_store = SaveToCloud_through_redux_store
  })
  return (
    <button
      style={{ display: "none" }}
      onClick={() => {
        SaveToCloud_through_redux_store({
          sequence: sequence,
          _taskID: _taskID,
        });
      }}
    />
  );
});

export default function Annotator(props) {
  const router = useRouter();
  console.log(router.query);
  const { _id, _taskID, sequence } = router.query;
  console.log("router.query", router.query);
  var [imageArray, setImageArray] = React.useState([]);
  var [annotationArray, setAnnotationArray] = React.useState([]);
  React.useEffect(() => {
    const imageRequest = new XMLHttpRequest();
    imageRequest.open(
      "GET",
      `${dataServer}/${option.getSingleTask}?_id=${_id}&index=${sequence}`
    );
    imageRequest.setRequestHeader("Authorization", "bdta");
    imageRequest.withCredentials = true;
    imageRequest.addEventListener("load", ({ target }) => {
      let { status, response, responseURL } = target;
      console.log("My data retrieved ",JSON.parse(response).data)
      imageArray = JSON.parse(response).data.map((object, index) => {
        return object.jpg;
      });

      imageArray = imageArray.map((address) => {
        return `${dataServer}/${option.getMeterail}${address}`;
      });
      console.log(imageArray);
      console.log("Object keys",Object.keys(JSON.parse(response).data[0]) )
      if (Object.keys(JSON.parse(response).data[0]).includes("json")) {
        annotationArray = JSON.parse(response).data.map((object, index) => {
          return object.json;
        });
        annotationArray = annotationArray.map((address) => {
          return `${dataServer}/${option.getMeterail}${address}`;
        });
        console.log("加载已有标注", annotationArray);
        setAnnotationArray(annotationArray);
      }
      setImageArray(imageArray);
    });
    imageRequest.send();
  }, [router.query]);
  return (
    <Provider store={store} >
       <Grid container wrap="nowrap" direction="column" style={{ position: "absolute",top:"0px",bottom:"0px"}}>
                <div className={DataSet.sheet}>
                    <div style={{display: "flex",alignItems: "center",height:"100%"}}>
                        <div style={{flexGrow: "1"}}></div>
                        <div className={DataSet.numb_list}>1 / 5589</div>
                        <div>
                            <Button
                                variant="contained"
                                color="secondary"
                                className={DataSet.sub}
                                startIcon={<SaveIcon />}
                            >
                                保存并退出
                            </Button>
                        </div>
                        <div>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={DataSet.pagenet}
                            startIcon={<ArrowBackIosIcon />}
                        >
                            上一页
                        </Button>
                        </div>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={DataSet.pagenet}
                            endIcon={<ArrowForwardIosIcon />}
                        >
                            下一页
                        </Button>
                        
                    </div>
                </div>
                <div style={{height:"100%",display:"flex"}}>            
                    <MainAnnotator imageArray={imageArray} />
                    <Categories />
                    {/* <Position /> */}
                </div>

                
            </Grid>
    </Provider>
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
    // <Provider store={store}>
    //   <Header />
    //   <Grid
    //     container
    //     wrap="nowrap"
    //     direction="column"
    //     style={{ position: "relative", top: 56 }}
    //   >
    //     <Grid item container>
    //       <div className="toolBar"></div>
    //     </Grid>
    //     <Grid item container wrap="nowrap">
    //       <MainAnnotator imageArray={imageArray} />
    //       <Categories />
    //     </Grid>
    //     <SaveToCloud_through_redud_store_button
    //       _taskID={_taskID}
    //       sequence={sequence}
    //     />
    //     {/* {false && <SaveToCloud_through_redud_store_button />} */}
    //     {/* <Position /> */}
    //   </Grid>
    // </Provider>
  );
}