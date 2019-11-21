import jsonp from 'jsonp';

// 将对象处理为查询字符串
const stringify = (param) => {
    let arr = [];
    for (let key in param) {
        arr.push(key + "=" + param[key]);
    }
    return arr.join("&");
}


// 使用promoise封装jsonp
export default (url, params, options) => {
    // 拼接 url
    url += (url.indexOf("?") === -1 ? "?" : "&") + stringify(params);

    // 返回promise对象
    return new Promise((resolve, reject) => {
        jsonp(url, options, (err, data) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(data);
            }
        });
    });
};


