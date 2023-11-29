var a = {
  name: 'Селиван',
  surname: 'Неизвестно',
  age: 48,
  location: 'Неизвестно',
  pseudonyms: ['Охотник Селиван','Селиван-двустволка'],
  appearance: {
    external: {
      signs: 'Щетина',
      cloth: 'Коричневый кожаный плащ'
    }
  }
}

var b = a;
b.name = 'Дед Вовка';//переопределится значение в объекте, на который ссылаются a и b

console.log(a === b);//true, т.к. это ссылки на один и тот же объект

var c = {//создастся новый объект, но это не глубокое копирование, вложенные объекты - это ссылки на те же объекты, что и вложенные объекты a
  ...a
}

console.log(a === c);//false

c.name = 'Охотник Селиван';
console.log(a.name);

c.pseudonyms[1] = 8;
console.log(a.pseudonyms);
console.log(a.pseudonyms === c.pseudonyms);//true

document.querySelector('.out').innerHTML = c.name;

var d = {...a};
d.pseudonyms = {...a.pseudonyms};
d.appearance = {...a.appearance};

console.log(`a === d = ${a.appearance === d.appearance}`);

console.log(`a.appearance.external === d.appearance.external = ${a.appearance.external === d.appearance.external}`);

d.appearance.external = {...a.appearance.external};

console.log(`a.appearance.external === d.appearance.external = ${a.appearance.external === d.appearance.external}`);
