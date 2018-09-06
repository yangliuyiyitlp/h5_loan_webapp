let formatDates = time => { // 格式化时间  
    if (time) {
        return new Date(parseInt(time)).toJSON().slice(0, 10)
    }
}
let formatMobile = value => { //用*号替代第4-8位
    if (value && typeof value == 'string') {
        return value.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
    }
}

export {
    formatDates,
    formatMobile    
}