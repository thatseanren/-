import React from "react";
import { ThreeDots, useLoading } from "@agney/react-loading";

export const ThreeDot = (props) => {
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator:<ThreeDots width="80" />,
    loaderProps: {
      valueText: "Fetching video from the Great Internet",
      valuenow:"Fetching video from the Great Internet"
    },
  });
  return <section className = {props.className} style ={{position:"absolute", top:0,left:0,color:"#fff"}}{...containerProps}>{indicatorEl}</section>;
};
