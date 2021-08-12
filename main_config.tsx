// var server_ip="http://10.78.4.88:888/";//统一设置服务器ip
// var server_ip = "http://10.78.7.191:888/"; //统一设置服务器ip
const dreamview_ip = "http://10.78.4.88:8888/"; //统一设置服务器ip
// var server_ip="http://10.78.7.169:888/";//统一设置服务器ip
const server_ip = "http://10.78.4.88:888/"; //统一设置服务器ip
const test_ip = "http://10.78.6.6:888/"
const annotation = "http://10.78.4.88:555/";
interface API {
  dataset: string;
  getSingleTask: string;
  forkDataSet: string;
  createTask: string;
  getTaskList: string;
  getMeterail: string;
  sendAnnotation: string;
}

const option: API = {
  dataset: "get_dataset_list",
  forkDataSet: "fork_dataset",
  createTask: "add_dtask",
  getTaskList: "get_dtask_list",
  getSingleTask: "get_onetask_filelist",
  getMeterail: "download?url=",
  sendAnnotation: "edit_onetask",
};
export type A = keyof API;

export { server_ip as default, option, annotation,test_ip };
//封装了跨域请求
// function my_post(url = '', data = {}, func) {
// 	$.ajax({
// 		type: "POST",
// 		url: server_ip + url,
// 		xhrFields: {
// 			withCredentials: true
// 		},
// 		dataType: "json",
// 		data: data,
// 		success: function(res) {
// 			func(res);
// 		}
// 	})
// }
