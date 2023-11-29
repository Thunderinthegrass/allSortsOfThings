//калбэк - функция, переданная в другую функцию в качестве параметра
function first(callback) {
  let arr = [1,2,3];
  let out = document.querySelector('.out');

  callback(arr, out);
}

const two = (array, out) => {
  out.innerHTML = array.join('-');
}

const three = (arr, out) => {
  out.innerHTML = arr.join('+');
}

first(three);

fetch('https://catfact.ninja/breeds')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data.data);
    
  })

  // fetch('https://isp2.ru.fastfox.pro:1500/ispmgr#/list/file/4?elid=lessons&elname=lessons&plid=%2Fwww%2Fromannasachevsky.ru%2Fjs&p_num=1/lessons', { mode: 'no-cors'})
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((data) => {
  //     console.log(data);
  //   });

