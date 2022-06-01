export const convertDMY = (date) => {
  var newDate = new Date(date);
  var formatDate =
    newDate.getDate() +
    "/" +
    (newDate.getMonth() + 1) +
    "/" +
    newDate.getFullYear();
  return date ? formatDate : null;
};

export const convertYMD = (date) => {
  var newDate = new Date(date);
  var formatDate =
    newDate.getFullYear() +
    "/" +
    (newDate.getMonth() + 1) +
    "/" +
    newDate.getDate();
  return date ? formatDate : null;
};

export const getDateToday = () => {
  var today = new Date();
  var formatDate =
    today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate();
  return formatDate;
};

export const toVND = (str) => {
  return str
    .split("")
    .reverse()
    .reduce((prev, next, index) => {
      return (index % 3 ? next : next + ",") + prev;
    });
};

export const countDate = (ngayThue, ngayHenTra) => {
  var date1 = new Date(ngayThue); 
  var date2 = new Date(ngayHenTra); 
  var timeDiff = Math.abs((date2.getTime() - date1.getTime())/ 86400000); 
  // var result = Math.ceil(timeDiff) - 1; 
  // console.log(result);
  // if (date1===date2){
  //   return 1;
  // }else return result;
  if (timeDiff > 0){
    return Math.ceil(timeDiff) - 1;
  }else return 1;
}