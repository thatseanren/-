import React, { useContext } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import NotificationsNone from "@material-ui/icons/NotificationsNone";
import headerstyle from "../styles/header.module.css";
import Cookies from "js-cookie";
import Router from "next/router";
import server, { option } from "../main_config";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      loginshow: false,
    };
  }
  

  componentDidMount() {
    const that = this;

    axios
      .post(server + "login_status")
      .then(function (response) {
        console.log(response);
        if (response.data.status != 1) {
          Router.push({
            pathname: "/login",
          });
        } else {
          response.status === 200
            ? localStorage.setItem("login", response.data.user.type)
            : "";
          that.setState({
            name: response.data.user.name,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <div
        className={headerstyle.Herder}
        style={{ backgroundColor: "#324D57" }}
        id={"header_"}
      >
        <div id={headerstyle.appBar} style={{ backgroundColor: "#324D57" }}>
          <div className={headerstyle.logo}>
            <Link href="/">
              <a>
                <Image
                  src="/logo.png"
                  alt="Fawai Logo"
                  width={130}
                  height={30}
                />
              </a>
            </Link>
          </div>
          <div className={headerstyle.navLinkBar}>
            <Link href="/myDataSet">
              <a className={headerstyle.appBarLink}>我的数据集</a>
            </Link>
            <Link href="/">
              <a className={headerstyle.appBarLink}>公开数据集</a>
            </Link>
            <Link href="/recordList">
              <a className={headerstyle.appBarLink}>数据记录</a>
            </Link>
            <Link href="/tools">
              <a className={headerstyle.appBarLink}>应用</a>
            </Link>
          </div>
          <div className={headerstyle.barRight}>
            <div
              onClick={() =>
                this.setState({
                  loginshow: !this.state.loginshow,
                })
              }
            >
              <div className={headerstyle.userNmae}>
                <div className={headerstyle.portrait}>
                  {this.state.name ? this.state.name[0].toUpperCase() : ""}
                </div>
                <span>{this.state.name}</span>
              </div>
              <div className={headerstyle.noti}>
                <NotificationsNone style={{ fontSize: 26 }} />
              </div>
            </div>
            <div
              style={{
                display: this.state.loginshow ? "block" : "none",
                position: "fixed",
                width: "146px",
                top: "52px",
                right: "20px",
              }}
            >
              <div className={headerstyle.login}>
                <Link href="/userList">
                  <a>员工管理</a>
                </Link>
              </div>
              <div
                onClick={() => this.loginout()}
                className={headerstyle.login}
              >
                {/* <Link href="/login">
                                    <a>退出登录</a>
                                </Link> */}
                退出登录
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
