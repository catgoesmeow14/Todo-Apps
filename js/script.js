const todos = [];
const RENDER_EVENT = "render-todo";

/*
Variabel todos adalah sebuah variabel yang menampung array dari beberapa object Todo. 
Kemudian RENDER_EVENT, variabel konstan ini bertujuan sebagai nama dari Custom Event yang akan kita buat, yang mana nantinya akan kita gunakan sebagai dasar ketika ada perubahan pada variabel todos, seperti perpindahan todo, menambah todo, maupun menghapus todo. 
*/

document.addEventListener(RENDER_EVENT, function () {
  const uncompletedTODOList = document.getElementById("todos");
  uncompletedTODOList.innerHTML = "";
 
  for(todoItem of todos){
     const todoElement = makeTodo(todoItem);
     uncompletedTODOList.append(todoElement);
   }
});

document.addEventListener("DOMContentLoaded", function () {
 
  const submitForm = document.getElementById("form");

  submitForm.addEventListener("submit", function (event) {
      event.preventDefault();
      addTodo();
  });
});

/*
Kode document.addEventListener("DOMContentLoaded", function () .. )  berfungsi sebagai listener yang akan menjalankan kode di dalamnya jika DOM sudah di-load dengan baik.

Lalu kode document.getElementById("form"); berfungsi untuk mengambil element dengan id “form” yang berada pada berkas html. Setelah didapatkan, element tersebut kita masukkan ke dalam variable submitForm.

Lalu, variable submitForm kita berikan listener ketika tombol submit diklik. Ketika tombol submit diklik, maka kode event.preventDefault(); akan dijalankan. Kode ini berfungsi untuk mencegah behaviour asli agar tidak dijalankan. Karena secara default jika tombol submit diklik, browser akan mengirimkan data ke url yang tertera pada properti action dan browser akan di-refresh.

Lalu, kode pemanggilan fungsi addTodo(); bertujuan untuk menjalankan kode yang akan menambahkan todo ke dalam todo list. Namun, saat ini kita tidak akan menambahkan todo ke dalam todo list, melainkan hanya menampilkannya pada console di browser. 
*/

function addTodo() {
  const textTodo = document.getElementById("title").value;
  const timestamp = document.getElementById("date").value;

  const generatedID = generateId();
  const todoObject = generateTodoObject(generatedID, textTodo, timestamp, false);
  todos.push(todoObject);
 
  document.dispatchEvent(new Event(RENDER_EVENT));
}


/*
Kode document.getElementById("title").value berfungsi untuk mengambil elemen pada html, dalam kasus ini kita mengambil element <input> dengan id title. Setelah element didapatkan, value di dalam form tersebut akan kita ambil dan dimasukkan ke dalam variabel textTodo. Logika yang sama juga terjadi pada variabel timestamp.

Setelah nilai dari variabel textTodo dan timestamp didapatkan, kita akan membuat sebuah object dari todo dengan generateTodoObject(). Kemudian, nilai dari object todo tersebut disimpan pada array todos dengan menggunakan metode push().

Setelah disimpan pada array, kita panggil sebuah custom event RENDER_EVENT dengan dispatchEvent(), yang nantinya akan coba kita implementasi untuk me-render data yang telah disimpan pada array todos.

*/ 

function generateId() {
  return +new Date();
}

function generateTodoObject(id, task, timestamp, isCompleted) {
  return {
      id,
      task,
      timestamp,
      isCompleted
  }
}

/*
Fungsi generateTodoObject() ini berfungsi untuk membuat sebuah object di JavaScript dari data yang sudah disediakan dari inputan, seperti ID, nama todo (task), waktu (timestamp), dan isCompleted (penanda todo apakah sudah selesai atau belum).
*/

function makeTodo(todoObject) {
 
  const textTitle = document.createElement("h2");
  textTitle.innerText = todoObject.task;

  const textTimestamp = document.createElement("p");
  textTimestamp.innerText = todoObject.timestamp;

  const textContainer = document.createElement("div");
  textContainer.classList.add("inner")
  textContainer.append(textTitle, textTimestamp);

  const container = document.createElement("div");
  container.classList.add("item", "shadow")
  container.append(textContainer);
  container.setAttribute("id", `todo-${todoObject.id}`);

  return container;
}


// document.addEventListener(RENDER_EVENT, function() {
//   const uncompletedTODOList = document.getElementById("todos");
//   uncompletedTODOList.innerHTML = "";

//   for(todoItem of todos){
//     const todoElement = makeTodo(todoItem);
//     uncompletedTODOList.append(todoElement);
//   }
// });

/*
Runtutan dari kode di atas adalah, pertama elemen container dari todo kita ambil terlebih
dahulu dari DOM. Setelah itu, lakukan iterasi pada variabel todos untuk mengambil beberapa
data todo yang telah tersimpan.

Namun, untuk memastikan agar container dari todo bersih sebelum diperbarui, maka kita perlu
membersihkannya dengan memanggil property innerHTML = “”. Sehingga dengan mengatur property tersebut,
tidak terjadi duplikasi data ketika menambahkan elemen DOM yang baru dengan append().

Setiap iterasi yang dilakukan akan membuat satu elemen DOM, yakni sebagai hasil dari fungsi
makeTodo() yang kemudian dimasukkan pada variabel DOM yang sudah ada pada tampilan
web (uncompletedTODOList) melalui fungsi append(). Sehingga, elemen tersebut bisa langsung
di-render oleh webpage.
*/

