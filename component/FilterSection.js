import DataSet from "../styles/DataSet.module.css";
import React from "react";
import ReactDOM from "react-dom";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import KeyboardArrowUpRoundedIcon from "@material-ui/icons/KeyboardArrowUpRounded";

export default class Left extends React.Component {
  //切换数据
  handle = (value, number, ind) => {
    this.props.parent.getChildrenMsg(this, value, ind);
    const listindex = this.state.index;
    listindex[ind] = number;
    this.setState({
      index: listindex,
    });
  };

  //展开全部数据
  open = (value) => {
    const openindex = this.state.openlist;
    openindex[value] === 0 ? (openindex[value] = 1) : (openindex[value] = 0);
    this.setState({
      openlist: openindex,
    });
  };

  onscrollto = (value) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      index: [0, 0, 0],
      openlist: [0, 0, 0],
      scroindex: 0,
    };
  }

  //注册scroll事件
  componentDidMount() {
    window.addEventListener("scroll", this.bindHandleScroll);
  }
  bindHandleScroll = (event) => {
    // 滚动的高度
    const scrollTop =
      (event.srcElement ? event.srcElement.documentElement.scrollTop : false) ||
      window.pageYOffset ||
      (event.srcElement ? event.srcElement.body.scrollTop : 0);
    let scroind = 0;
    scrollTop > 0 ? (scroind = 1) : (scroind = 0);
    this.setState({
      scroindex: scroind,
    });
  };

  render() {
    const { data } = this.props;
    return (
      <div>
        <div
          onClick={() => this.onscrollto()}
          className={DataSet.scro}
          style={{ display: this.state.scroindex === 0 ? "none" : "block" }}
        >
          <KeyboardArrowUpRoundedIcon style={{ fontSize: 32 }} />
        </div>
        <div className={DataSet.left}>
          {data.map((item, index) => {
            return (
              <div className={DataSet.boxList}>
                <div
                  className={DataSet.boxTitle}
                  onClick={() => this.toParent()}
                >
                  {item.title}
                </div>
                <div
                  className={
                    this.state.openlist[index] === 0
                      ? DataSet.boxSpan
                      : DataSet.boxOpen
                  }
                >
                  <div
                    className={
                      this.state.index[index] === 0
                        ? DataSet.boxAllStyle
                        : DataSet.boxSpanList
                    }
                    onClick={() => this.handle("", 0, index)}
                  >
                    All
                  </div>
                  {item.arr.map((k, v) => {
                    return (
                      <div
                        onClick={() => this.handle(k, v * 1 + 1, index)}
                        className={
                          this.state.index[index] === v * 1 + 1
                            ? DataSet.boxSpanStyle
                            : DataSet.boxSpanList
                        }
                      >
                        {k}
                      </div>
                    );
                  })}
                </div>
                {item.arr.length > 4 && (
                  <div
                    className={DataSet.arrow}
                    onClick={() => this.open(index)}
                  >
                    {this.state.openlist[index] === 0 ? (
                      <ArrowDropDownIcon />
                    ) : (
                      <ArrowDropUpIcon />
                    )}
                    <div className={DataSet.arrowOpen}>
                      {this.state.openlist[index] === 0 ? "展开全部" : "收起"}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export async function getInitialProps(context) {
  const res = fetch();
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}
