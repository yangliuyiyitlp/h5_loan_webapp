let checkPhone = value => {//检测手机号中是否含有*
    if (value && typeof value == 'string') {
        return value.indexOf("*") > 0 ? true : false
    }
}
export default {
    checkPhone
}