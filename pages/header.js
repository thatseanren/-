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
            name: "Adcccmin",
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
                response.status === 200 ? localStorage.setItem("login", user.name) : ""
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        console.log(Cookies.get('account'))

        if (Cookies.get('account')) {

            this.login()


        } else {
            localStorage.removeItem('login');
            Router.push({
                pathname: 'http://10.78.4.88:890/page/login.html'
            })
        }

        const instance = axios.create({
            baseURL: 'http://localhost:3000/',
            xhrFields: {
                withCredentials: true
            },
            headers: {
                'Content-Type': "application/json;charset=UTF-8"
            }
        })
        // axios.interceptors.request.use(config => {
        //     // 在请求头中添加token
        //     config.headers["Content-type"] = "application/json;charset=UTF-d8";
        //     return config;
        // })
        axios.interceptors.request.use(
            config => {
                config.headers.Authorization = "bdta";//把localStorage的token放在Authorization里
                //  config.headers["Content-type"] = "application/json;charset=UTF-8";
                config.withCredentials = true;
                return config;
            },
            function (err) {
                console.log("失败信息" + err);
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
                        <div className={headerstyle.userNmae}>
                            <div className={headerstyle.portrait}>
                                {this.state.name[0].toUpperCase()}
                            </div>
                            <span>{this.state.name}</span>
                        </div>
                        <div className={headerstyle.noti}>
                            <NotificationsNone style={{ fontSize: 26 }} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
