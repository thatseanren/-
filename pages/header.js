import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import Image from 'next/image';
import axios from "axios";
import Link from 'next/link';
import NotificationsNone from '@material-ui/icons/NotificationsNone';
import headerstyle from '../styles/header.module.css';
import Cookies from 'js-cookie';
import Router from 'next/router';
import server, { option } from "../main_config";


export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            loginshow:false,
        };
    }

    login = value => {
        let user = Cookies.get('account');
        user = eval('(' + user + ')');
        console.log(user)
        this.setState({
            name: user.name
        });
        var qs = require('qs');
        axios.post(server + 'login', qs.stringify({
            'name': user.name,
            'password': user.password
        }))
        .then(function (response) {
            console.log(response)
            response.status === 200 ? localStorage.setItem("login", response.data.user.type) : ""
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    loginout = value => {
        axios.post(server + 'logout', {})
        .then(function (response) {
            console.log(response)
            if(response.data.status == 1){
                Router.push({
                    // pathname: 'http://10.78.4.88:890/page/login.html'
                    pathname: '/login'
                })
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    componentDidMount() {
        console.log(Cookies.get('account'))
        const that=this;
        axios.post(server + 'login_status', {})
        .then(function (response) {
            console.log(response)
            if(response.data.status != 1){
               

                Router.push({
                  
                    pathname: '/login'
                })
            } else {
                response.status === 200 ? localStorage.setItem("login", response.data.user.type) : ""
                that.setState({
                    name: response.data.user.name
                });
            }
             
        })
        .catch(function (error) {
            console.log(error);
        });

        const instance = axios.create({
            // baseURL: 'http://localhost:3000/',
            xhrFields: {
                withCredentials: true
            },
            headers: {
                'Content-Type': "application/json;charset=UTF-8"
            }
        })
       
        axios.interceptors.request.use(
            console.log(1),
            config => {
                config.headers.Authorization = "bdta";//???localStorage???token??????Authorization???
                //  config.headers["Content-type"] = "application/json;charset=UTF-8";
                config.withCredentials = true;
                return config;
            },
            function (err) {
                console.log("????????????" + err);
            }
        );


    }
    render() {



        return (
            <div className={headerstyle.Herder} style={{ backgroundColor: "#324D57" }} id={"header_"}>
                <div id={headerstyle.appBar} style={{ backgroundColor: "#324D57" }}>
                    <div className={headerstyle.logo}>
                        <Link href="/">
                            <a><Image src="/logo.png" alt="Fawai Logo" width={130} height={30} /></a>
                        </Link>
                    </div>
                    <div className={headerstyle.navLinkBar}>
                        <Link href="/myDataSet">
                            <a className={headerstyle.appBarLink}>???????????????</a>
                        </Link>
                        <Link href="/">
                            <a className={headerstyle.appBarLink}>???????????????</a>
                        </Link>
                        <Link href="/recordList">
                            <a className={headerstyle.appBarLink}>????????????</a>
                        </Link>
                        <Link href="/tools">
                            <a className={headerstyle.appBarLink}>??????</a>
                        </Link>
                    </div>
                    <div className={headerstyle.barRight}>
                        <div onClick={ () =>
                            this.setState({
                                loginshow:!this.state.loginshow
                            })
                        }>
                            <div className={headerstyle.userNmae}>
                                <div className={headerstyle.portrait}>
                                    {this.state.name ? this.state.name[0].toUpperCase() : ''}
                                </div>
                                <span>{this.state.name}</span>
                            </div>
                            <div className={headerstyle.noti}>
                                <NotificationsNone style={{ fontSize: 26 }} />
                            </div>
                        </div>
                        <div style={{display:this.state.loginshow ? "block" : "none",position: "fixed",width:"146px",top:"52px",right:"20px"}}>
                            <div className={headerstyle.login}>
                                <Link href="/userList">
                                    <a>????????????</a>
                                </Link>
                            </div>
                            <div onClick={()=> this.loginout()} className={headerstyle.login}>
                                {/* <Link href="/login">
                                    <a>????????????</a>
                                </Link> */}
                                ????????????
                            </div>

                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}
