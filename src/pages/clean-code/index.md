---
date: 2020-05-03
draft: false
path: "/clean-code"
title: "Membuat Code Yang Lebih Berkualitas dan Clean Pada Javascript"
thumbnail: "https://cdn-images-1.medium.com/max/800/1*_OiTpHhVoPMb-IBMvjV9Gg.jpeg"
---

> Any fool can write code that a computer can understand. Good programmers write code the humans can understand

Saya ingin mengawali tulisan ini dengan quote diatas, temen-temen bisa baca bahwa semua orang(developer) bisa menulis code yang dapat dimengerti komputer. Tapi, developer yang baik tidak hanya bisa menulis code yang dapat dimengerti komputer, tapi juga bisa menulis code yang bisa dimengerti manusia, dalam hal ini developer lain.

Dan yang perlu temen-temen ketahui adalah, developer yang baik akan menghasilkan code yang lebih berkualitas dibanding developer yang biasa-biasa saja.

Lantas bagaimana caranya kita mengetahui kualitas sebuah code?.
Ada beberapa guide yang bisa temen-temen pakai untuk menulis code yang berkualitas.

Tapi sebelum itu ada prasyarat yang harus temen-temen penuhi sebelum mengikuti tulisan ini, antaranya:

- Menguasai Javascript Fundamental
- Menguasai Git Fundamental
- Node Js 10 atau yang terbaru
- NPM Versi 4 atau yang terbaru
- Git Versi 2.17 atau yang terbaru
- Text Editor

Untuk mengetahui kualitas sebuah code kita bisa mulai dengan code review. Coba perhatikan gambar dibawah ini.

![Alt text](https://miro.medium.com/max/500/1*5RhyUqWmrXugwrjchoA5rA.jpeg)

Jadi, untuk mengetahui kualitas sebuah code kita bisa menghitung jumlah celaan/umpatan dari seorang code reviewer. Semakin banyak umpatan yang keluar, maka semakin tidak berkualitaslah code tersebut.

Untuk membuat code kita berkualitas, kita harus memastikan bahwa code kita mudah **dibaca**, **dimodifikasi** dan **dipahami**. Jangan sampai kita membuat repot developer lain dengan buruknya kualitas code yang kita tulis. Kualitas sebuah code juga berhubungan langsung dengan kualitas sebuah product yang kita buat. Semakin berkualitas code yg kita tulis, maka semakin baik juga product yang kita buat.

Kita sebagai developer harus tau, bahwa kita lebih banyak menghabiskan waktu untuk membaca code dibanding menulis code, so pastikan code kita mudah dibaca .
Lalu bagaimana caranya menerapkan clean code agar code yang kita tulis berkualitas?. Saya akan tuliskan dibawah ini:

### Menulis Variables

Temen-temen pernah gak sih merasa kesulitan dalam menamai sebuah variable?. Saya yakin temen-temen pasti pernah.
Temen-temen bisa pakai cara dibawah ini untuk membantu kita dalam menamai sebuah variable dan membuat code kita berkualitas.

##### 1. Pakai nama yang jelas dan mudah dicari

Variable yang kita tulis haruslah menggambarkan maksud dan tujuan serta kegunaan nya untuk apa. Jangan sampai membuat bingung(ambigu), dan variable yang kita tulis usahakan seunik mungkin, guna memudahkan kita dalam menemukan variablenya.

```js
let d
let elapsed
const ages = arr.map(i => i.age)
```

diatas adalah salah satu contoh penamaan yang kurang baik. Kenapa?

- Variable d tidak jelas dan membuat bingung(ambigu), apakah date?, data?, atau days?. Pokoknya gak jelaslah ya. Mau ngajak main tebak-tebakan kali ya?. wkwkw. Variable ini juga susah dicari, karena akan banyak sekali variable d yang akan kita temui.
- Variable elapsed sama seperti variable d, tidak jelas juga. apakah jumlah hari yang telah lewat?, jumlah hari dalam setahun?.
- Variable ages kurang spesifik, ages ini kan umur ya?. ini umur apa?, umur manusia kah?, atau umur hewan? atau apa?

```js
let daysSinceModification
const agesOfUsers = users.map(user => user.age)
```

Nah, code diatas ini termasuk penamaan variable yang baik. Kenapa?

- Variable daysSinceModification sangat jelas. Kita tidak akan menebak-nebak maksud dari variable ini, meskipun agak panjang.
- Variable agesOfUsers juga sangat jelas, yang berarti umur dari seorang user.

##### 2. Pakai kata yang mudah diucapkan

Menamai variable yang mudah diucapkan tentunya akan sangat memudahkan jika kita bekerja dalam sebuah team.

```js
let fName, lName
let cntr
```

Bayangkan temen-temen bekerja dalam sebuah team dan harus menyebutkan variable diatas, susahkan?. Akan sangat lebih mudah jika seperti ini:

```js
let firstName, lastName
let counter
```

##### 3. Pakai nama pembeda yang berarti dan jangan menambahkan kata yang tidak perlu

```js
let nameString
let theUsers
```

- nameString, sudah pasti sebuah name itu adalah string dan tidak mungkin sebuah name itu adalah integer ataupun boolean. Jadi ini sangat tidak perlu.
- theUsers, kata the disini juga tidak berarti apa-apa, jadi cukup users saja tanpa kata-kata the

Akan lebih baik jika kita menulisnya seperti ini

```js
let name
let users
```

#### Menulis Function

Menulis sebuah function di Javascript sudah lumrah dilakukan seorang developer, nah dibawah ini saya akan menuliskan beberapa tips untuk menulis function yang baik.

##### 1. Melakukan hanya satu tugas

Sebuah function seharusnya hanyalah melakukan satu tugas saja, jadi apabila temen-temen mempunyai sebuah function yang ternyata melakukan lebih dari satu tugas, maka baiknya kita pecah menjadi beberapa bagian. Usahakan juga untuk membuat function yang simple, yang hanya melakukan tugas kecil. Sehingga memudahkan untuk menemukan bug

```js
function getUserRouteHandler(req, res) {
  const { userId } = req.params
  db("users")
    .where({ id: userId })
    .first()
    .then(user => res.json(user))
}
```

Function diatas termasuk function yang kurang baik, karena ternyata fungsi ini melakukan 2 tugas:

- Mengambil data user
- Lalu data yang didapat ditampilkan di template

Lebih baik kita pecah function ini menjadi seperti ini:

```js
const tableName = "users"
const User = {
  getOneUser(userId) {
    return db(tableName).where({ id: userId }).first()
  },
}

function getUserRouteHandler(req, res) {
  const { userId } = req.params
  User.getOneUser(userId).then(user => res.json(user))
}
```

##### 2. Gunakan kata-kata yang panjang & deskriptif

```js
/*
 * Invite a new user with its email address
 * @param {String} user enail address
 */
function inv(user) {
  /* implementation */
}
```

Temen-temen kesulitan gak menebak function inv ini untuk apa, saya rasa tidak, karena ada dokumentasi diatasnya. Tapi bayangkan jikalau tidak ada dokumentasi diatasnya, pasti akan sangat kesulitan.

Kita akan perbaiki function diatas menjadi seperti ini:

```js
function inviteUser(emailAddress) {
  /* implementation */
}
```

Dengan code diatas, akan sangat jelas menggambarkan maksud dan tujuan si function ini, dan temen-temen tidak perlu repot-repot menuliskan dokumentasinya.

##### 3. Hindari argument list yang panjang

```js
function addUser(name, email, password, alamat) {
  // ...
}
```

Function ini membutuhkan 4 parameter, kalo misalkan ada 6 bagaimana?, 10?, panjang banget kan, dan kita juga harus tau urutan parameternya.

Akan lebih baik jika kita menggunakan javascript object sebagai parameternya, seperti ini:

```js
function addUser({ name, email, password, alamat }) {
  // ...
}

// call function
adduser({
  name: "John Doe",
  email: "johndoe@gmail.com",
  password: "rahasia",
  alamat: "Jakarta",
})
```

Dengan begini, walaupun kita lupa urutannya, function ini akan tetap berjalan dengan baik karena parameternya sudah menjadi javascript object yang urutannya bisa kita bolak-balik.

##### 4. Tidak ada efek samping

Kita harus menghindari membuat function yang memiki efek samping(side effect). Maksudnya adalah mengubah variable lain yang sifatnya global.

```js
let values = { a: 1 }
let b = 1

function impureFunction(items) {
  items.a = items.a * b + 2
  return items.a
}

let c = impureFunction(values)
// values.a is 3, the impureFunction function modified it
```

Function diatas menerima sebuah parameter **items**, dan ternyata function ini mengubah **values.a**, yang awalnya **values.a** sama dengan **1**, ketika kita jalankan function ini maka akan berubah menjadi **3**.

Akan lebih baik bila kita buat seperti ini:

```js
let values = { a: 1 }

function pureFunction(a) {
  let b = 1
  a = a * b + 2
  return a
}

let c = pureFunction(values.a)
// values.a has note been modified, it's still 1
```

Function diatas menerima sebuah parameter **a**, dan ketika kita jalankan function ini, dia tidak akan merubah **values**.a, **values.a** tetap sama dengan **1**, dan hanya kita gunakan didalam function ini saja.

##### 4. Hindari Callbacks

```js
asyncFunc1((err, result) {
  asyncFunc2(result1, (err, result2) {
    asyncFunc3(result2, (err, result3) {
      console.log(result3)
    })
  })
})
```

Callback diatas terlalu banyak levelnya, apabila suatu callback terdiri dari 3 atau 4 level maka akan sangat sulit untuk didebug dan dibaca. Solusinya, gunakan promise seperti dibawah ini:

```js
asyncPromise1()
  .then(asyncPromise2)
  .then(asyncPromise3)
  .then(result => console.log(result))
  .catch(err => console.error(err))
```

atau bisa juga menggunkan **async & await**:

```js
const asyncFunc1 = async (err, result1) => {
  const result2 = await asyncFunc2()
  const result3 = await asyncFunc3()

  console.log(result3)
}
```

Dengan menggunakan **Promise** dan **async & await** function yang kita buat lebih mudah dibaca dan didebug.

##### 4. Don’t Repeat Yourself(DRY)

Pernah dengar istilah ini?, DRY disini maksudnya adalah jangan menulis kode atau logika yang sama berulang-ulang. Akan sangat merepotkan bila terjadi perubahan, dan temen-temen harus melakukan perubahan disemua tempat, sehingga akan membuang-buang waktu.

Jadi, buatlah sebuah code/function yang bisa digunakan kembali, sehingga apabila terjadi perubahan, temen-temen hanya merubah disatu tempat saja.


### Tools Untuk Clean Code

Temen-temen pernah gak sih merasa kesulitan dalam menamai sebuah variable?. Saya yakin temen-temen pasti pernah.
Temen-temen bisa pakai cara dibawah ini untuk membantu kita dalam menamai sebuah variable dan membuat code kita berkualitas.

#### 1. ESLint

Eslint adalah tools(alat) untuk mengidentifikasi dan melaporkan pola yang ditemukan dalam code ECMAScript / Javascript, dengan tujuan membuat code lebih konsistent dan menghindari bug.

Supaya lebih memudahkan dalam memahami ESLint, saya sudah membuat sebuah repository yang akan kita gunakan untuk mempratikkan cara menggunakan ESLint. Silakan teman-teman clone dulu repositorinya [disini](https://github.com/rikopernando/sample-clean-code-js).

Jika teman-teman sudah selesai, selanjutnya kita akan menggunakan ESLint pada project ini, silakan install Eslint dengan cara:

```
npm install -D eslint
```

Kemudian, silakan temen-temen buka file /public/src/app.js. Pastikan codenya seperti dibawah ini:


```js
loadEvents();

function loadEvents(){
  document.querySelector("form").addEventListener("submit",submit);
}

function submit(e){
  e.preventDefault();
  let input = document.querySelector("input");
  if(input.value != "")
    addTask(input.value);
  input.value = "";
}

function addTask(task){
  let ul = document.querySelector("ul");
  let li = document.createElement("li");
  li.innerHTML = task;
  ul.appendChild(li);
}
```

Kita akan coba membuat kode diatas terlihat tidak rapi dan tidak konsisten, dengan cara menghapus **titik koma** dan mengganti **singlequote** menjadi **doublequote** dibeberapa bagian code, seperti ini:


```js
loadEvents();

function loadEvents(){
document.querySelector("form").addEventListener("submit",submit);
}

function submit(e){
e.preventDefault()
let input = document.querySelector("input")
if(input.value != '')
 addTask(input.value)
  input.value = '';
}

function addTask(task){
let ul = document.querySelector('ul');
  let li = document.createElement("li");
li.innerHTML = task;
  ul.appendChild(li);
}
```

Sekarang, kode diatas sudah tidak konsisten, karena ada yang menggunakan **singlequote** dan **doublequote** serta ada yang menggunakan **titik koma** dan ada yang tidak.

Kita akan menggunakan ESLint untuk merapihkan kode diatas, supaya menjadi lebih konsisten dan seragam. Silakan teman-teman jalankan perintah ini:

```
./node_modules/.bin/eslint --init
```

Kemudian akan muncul beberapa pertanyaan, silakan temen-temen jawab pertanyaan tersebut seperti ini.

![Alt text](https://miro.medium.com/max/680/1*KX08jiwCczdOuUSQL76xKw.png)

Dan jika sudah selesai akan secara otomatis membuat sebuah file baru bernama **.eslintrc.json**, yang mana isinya kurang lebih seperti ini:

![Alt text](https://miro.medium.com/max/700/1*ubHtFURaJ0driHIed5p9Kg.png)

Selanjutnya kita akan menginspect kode yang telah kita ubah tadi, yaitu dengan cara:

```
./node_modules/.bin/eslint public/src/*.js
```

Dan hasilnya

![Alt text](https://miro.medium.com/max/700/1*sqC8wIcY3U7MXqY0y8AM_g.png)

Seperti yang teman-teman lihat, ternyata ada banyak error yang ditemukan oleh ESLint, diantaranya string yang harusnya menggunakan **doublequote**, **titik koma** dan sebagainya.

Selanjutnya kita akan memperbaiki error tersebut dengan bantuan ESLint pula, caranya jalankan perintah ini:

```
./node_modules/.bin/eslint public/src/*.js --fix
```

setelah berhasil, silakan teman-teman buka kembali file public/src/app.js, maka akan terlihat seperti ini:


```js
loadEvents();

function loadEvents(){
  document.querySelector('form').addEventListener('submit',submit);
}

function submit(e){
  e.preventDefault();
  let input = document.querySelector('input');
  if(input.value != '')
    addTask(input.value);
  input.value = '';
}

function addTask(task){
  let ul = document.querySelector('ul');
  let li = document.createElement('li');
  li.innerHTML = task;
  ul.appendChild(li);
}
```

Dan seperti yang teman-teman lihat, code kita sekarang sudah lebih konsisten dan rapi dibanding sebelumnya.

Jika teman-teman merasa **./node_modules/.bin/eslint public/src/*.js** terlalu panjang, kita bisa mempersingkatnya dengan menggunakan npm script. Silakan buka file **package.json**, tambahkan script berikut:

![Alt text](https://miro.medium.com/max/377/1*ixNloga5eKEWVPA9mZKVOg.png)

Sekarang teman-teman bisa menjalankan ESLint dengan cara npm run lint dan **npm run lint:fix**.

#### 2. Prettier

Prettier adalah sebuah code formatter untuk Javascript. Prettier juga bisa melalukan hal yang sama layaknya ESLint.

Silakan temen-temen install Prettier dengan cara:

```
npm install -D prettier
```

Berbeda dengan ESLint, Prettier tidak menyediakan init seperti ESLint. Jadi kita harus membuat konfigurasi filenya secara manual. Silakan temen-temen buat sebuah file bernama **.prettierrc.json** di root project kita yang isinya seperti ini:

![Alt Text](https://miro.medium.com/max/523/1*w3QYWr3IJOh7379SiDzuaw.png)

Selanjutnya, temen-temen tambahkan script berikut dipackage.json:

```
"format": "prettier public/src/*.js --write"
```

Nah untuk mencobanya, temen-temen bisa buat file app.js nya menjadi tidak konsisten dan tidak rapi , kemudian jalankan perintah ini:

```
npm run format
```

Maka prettier akan merapihkan code kita, dan code kita menjadi lebih rapi dan konsisten.

##### 3. Husky & Lint-Staged

Husky adalah sebuah git hooks tools yang bertugas melakukan suatu perintah, sebelum perintah-perintah git dijalankan, seperti git add, git commit dan sebagainya.

Husky dapat mencegah atau mengatasi **bad commit**, misalnya, ada seorang developer yang malas melakukan code formatter, padahal sebenarnya perintah code formatter sudah tersedia, yang akhirnya membuat code menjadi tidak konsisten.

Dengan Husky, kita bisa menghindari hal tersebut, dengan cara, ketika kita melakukan **git commit**, Husky akan menjalankan perintah code formatter seperti yang telah kita buat sebelumnya, yaitu ESLint dan Prettier.

Sedangkan **Lint-Staged** adalah tools yang bertugas menjalankan code formatter ketika file sudah ada di git staged.

Untuk menginstall kedua tools ini, silakan jalankan perintah ini:

```
npm install -D husky lint-staged
```

Kemudian tambahkan code berikut di package.json

![Alt Text](https://miro.medium.com/max/292/1*M91QMbhi87a9Ny7slyNeLg.png)

Baik, setelah semuanya selesai, silakan temen-temen buka file **/public/src/app.js**, dan buat lah codenya menjadi tidak rapi dan tidak konsisten, dan kita akan memperbaiki code tersebut sekali lagi. Tapi dengan cara yang berbeda.

Katakanlah temen-temen merasa malas untuk menjalankan code formatter ESLint dan Prettier karena suatu alasan, temen-temen bisa langsung menjalankan **git commit**, dan secara otomatis akan menjalankan perintah code formatter, untuk lebih jelasnya silakan lihat gambar dibawah ini:

![Alt Text](https://miro.medium.com/max/700/1*pkubcxIYS87K7rrhbi9gqg.png)

Seperti yang kita lihat, setelah kita menjalankan git commit, Husky akan secara otomatis menjalankan tugasnya, dan code kita secara otomatis akan diperbaiki, dan dengan begini kita akan meminimalisir terjadinya bug.

Nah itu lah dia beberapa guide yang bisa temen-temen gunakan untuk membuat code javascript yang lebih berkualitas. Semoga bermanfaat!

Referensi:
- https://www.butterfly.com.au/blog/website-development/clean-high-quality-code-a-guide-on-how-to-become-a-better-programmer

