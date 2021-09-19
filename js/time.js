function Unix_timestamp(t, type) {
    var date = new Date(t * 1000);
    var year = date.getFullYear();
    var month = "0" + (date.getMonth() + 1);
    var day = "0" + date.getDate();
    var hour = "0" + date.getHours();
    var minute = "0" + date.getMinutes();
    var second = "0" + date.getSeconds();
    let result;
    switch (type) {
        case 1:
            result = month.substr(-2) + "" + day.substr(-2);
            break;
        case 2:
            result = hour.substr(-2)
            break;
    }
    return result;
}


function Unix_timestampConv() {
    return Math.floor(new Date().getTime() / 1000);
}