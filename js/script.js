const todos = [];
const RENDER_EVENT = "render-todo";

/*
Variabel todos adalah sebuah variabel yang menampung array dari beberapa object Todo. 
Kemudian RENDER_EVENT, variabel konstan ini bertujuan sebagai nama dari Custom Event yang 
akan kita buat, yang mana nantinya akan kita gunakan sebagai dasar ketika ada perubahan pada 
variabel todos, seperti perpindahan todo, menambah todo, maupun menghapus todo. 
*/

document.addEventListener(RENDER_EVENT, function () {
  const uncompletedTODOList = document.getElementById("todos");
  uncompletedTODOList.innerHTML = "";

  /*
  Agar tidak terjadi duplikasi oleh item yang ada di tampilan ketika memperbarui data todo
  yang ditampilkan, maka hapus terlebih dahulu elemen sebelumnya (yang sudah ditampilkan) 
  dengan perintah innerHTML = “”.
  */
  const completedTODOList = document.getElementById("completed-todos");
  completedTODOList.innerHTML = "";

  //memasang kondisi if statement untuk memfilter hanya todo “Yang harus dibaca” saja lah yang perlu ditampilkan.
  for (todoItem of todos) {
    const todoElement = makeTodo(todoItem);

    if (todoItem.isCompleted == false)
      uncompletedTODOList.append(todoElement);
    else
      completedTODOList.append(todoElement);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("form");

  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addTodo();
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

/*
Kode document.addEventListener("DOMContentLoaded", function () .. )  berfungsi sebagai 
listener yang akan menjalankan kode di dalamnya jika DOM sudah di-load dengan baik.

Lalu kode document.getElementById("form"); berfungsi untuk mengambil element dengan id 
“form” yang berada pada berkas html. Setelah didapatkan, element tersebut kita masukkan 
ke dalam variable submitForm.

Lalu, variable submitForm kita berikan listener ketika tombol submit diklik. Ketika tombol 
submit diklik, maka kode event.preventDefault(); akan dijalankan. Kode ini berfungsi untuk 
mencegah behaviour asli agar tidak dijalankan. Karena secara default jika tombol submit 
diklik, browser akan mengirimkan data ke url yang tertera pada properti action dan browser akan di-refresh.

Lalu, kode pemanggilan fungsi addTodo(); bertujuan untuk menjalankan kode yang akan 
menambahkan todo ke dalam todo list. Namun, saat ini kita tidak akan menambahkan todo ke 
dalam todo list, melainkan hanya menampilkannya pada console di browser. 
*/

function addTodo() {
  const textTodo = document.getElementById("title").value;
  const timestamp = document.getElementById("date").value;

  const generatedID = generateId();
  const todoObject = generateTodoObject(
    generatedID,
    textTodo,
    timestamp,
    false
  );
  todos.push(todoObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

/*
Kode document.getElementById("title").value berfungsi untuk mengambil elemen pada html,
 dalam kasus ini kita mengambil element <input> dengan id title. Setelah element didapatkan, 
 value di dalam form tersebut akan kita ambil dan dimasukkan ke dalam variabel textTodo. 
 Logika yang sama juga terjadi pada variabel timestamp.

Setelah nilai dari variabel textTodo dan timestamp didapatkan, kita akan membuat sebuah 
object dari todo dengan generateTodoObject(). Kemudian, nilai dari object todo tersebut 
disimpan pada array todos dengan menggunakan metode push().

Setelah disimpan pada array, kita panggil sebuah custom event RENDER_EVENT dengan 
dispatchEvent(), yang nantinya akan coba kita implementasi untuk me-render data yang 
telah disimpan pada array todos.

*/

function generateId() {
  return +new Date();
}

function generateTodoObject(id, task, timestamp, isCompleted) {
  return {
    id,
    task,
    timestamp,
    isCompleted,
  };
}

/*
Fungsi generateTodoObject() ini berfungsi untuk membuat sebuah object di JavaScript 
dari data yang sudah disediakan dari inputan, seperti ID, nama todo (task), waktu (timestamp), 
dan isCompleted (penanda todo apakah sudah selesai atau belum).
*/

function makeTodo(todoObject) {
  const textTitle = document.createElement("h2");
  textTitle.innerText = todoObject.task;

  const textTimestamp = document.createElement("p");
  textTimestamp.innerText = todoObject.timestamp;

  const textContainer = document.createElement("div");
  textContainer.classList.add("inner");
  textContainer.append(textTitle, textTimestamp);

  const container = document.createElement("div");
  container.classList.add("item", "shadow");
  container.append(textContainer);
  container.setAttribute("id", `todo-${todoObject.id}`);

  if (todoObject.isCompleted) {
    const undoButton = document.createElement("button");
    undoButton.classList.add("undo-button");
    undoButton.addEventListener("click", function () {
      undoTaskFromComplete(todoObject.id);
    });

    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-button");
    trashButton.addEventListener("click", function () {
      removeTaskFromComplete(todoObject.id);
    });

    container.append(undoButton, trashButton);
  } else {
    const checkButton = document.createElement("button");
    checkButton.classList.add("check-button");
    checkButton.addEventListener("click", function () {
      addTaskToComplete(todoObject.id);
    });

    /* 
    Untuk beberapa implementasi kode seperti createElement, classList.add(), dan append() 
    sudah kita bahas sebelumnya. Intinya, beberapa kode tersebut membuat sebuah button 
    dengan mengimplementasikan class check-button. Class tersebut adalah sebuah selector 
    CSS yang terdapat beberapa konfigurasi style di dalamnya.

    Kemudian, agar tombol tersebut bisa diinteraksikan, maka kita perlu menerapkan event 
    listener “click”, dengan fungsi yang memanggil fungsi lain sesuai dengan konteks dari 
    tombol tersebut. Misalnya, pada tombol ini (checkButton) memanggil addTaskToCompleted, 
    yang mana akan memindahkan todo dari rak “Yang harus dibaca” ke rak “Selesai Dibaca”.

    Tombol lain, seperti undoButton & trashButton, juga menerapkan hal yang sama, di mana 
    memanggil fungsi undoTaskFromCompleted dan removeTaskFromCompleted. Yang mana masing - 
    masing akan memindahkan todo dari selesai ke belum selesai, dan menghapus todo.
    */

    container.append(checkButton);
  }

  return container;
}

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

function addTaskToComplete(todoId) {
  const todoTarget = findTodo(todoId);
  if (todoTarget == null) return;

  todoTarget.isCompleted = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

/*
  Seperti yang sudah dijelaskan sebelumnya, fungsi ini digunakan untuk memindahkan todo 
  dari rak “Yang harus dilakukan” ke “Yang sudah dilakukan”. Prinsipnya adalah merubah 
  state isCompleted dari sebelumnya false ke true, kemudian panggil event RENDER_EVENT 
  untuk memperbarui data yang ditampilkan.
  */

function findTodo(todoId) {
  for (todoItem of todos) {
    if (todoItem.id === todoId) {
      return todoItem;
    }
  }
  return null;
}

/*
  Kemudian, fungsi ini memanggil fungsi baru, yaitu findTodo, yang mana berfungsi untuk 
  mencari todo dengan ID yang sesuai pada array todos. Agar tidak terjadi error (undefined)
  */


//===================================================

function findTodoIndex(todoId) {
  for (index in todos) {
    if (todos[index].id === todoId) {
      return index
    }
  }
  return -1
}


/*
 fungsi ini akan menghapus Todo berdasarkan index yang didapatkan dari pencarian Todo 
 dengan menggunakan findTodoIndex(). Apabila pencarian berhasil, maka akan 
 menghapus todo tersebut menggunakan fungsi slice() yang disediakan oleh JavaScript.
*/
function removeTaskFromComplete(todoId) {
  const todoTarget = findTodo(todoId);
  if (todoTarget === -1) return;
  todos.splice(todoTarget, 1);

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

/*
Fungsi ini sebenarnya mirip dengan addTaskToCompleted, namun perbedaannya adalah 
pada state isCompleted yang diubah nilainya ke false, hal ini bertujuan agar todo 
task yang sebelumnya completed (selesai), bisa dipindah menjadi incomplete (belum selesai).
*/
function undoTaskFromComplete(todoId) {
  const todoTarget = findTodo(todoId);
  if (todoTarget == null) return;

  todoTarget.isCompleted = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function saveData() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(todos);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

const SAVED_EVENT = "saved-todo";
const STORAGE_KEY = "TODO_APPS";

function isStorageExist() /*boolean*/ {
  if (typeof (Storage) === "undefined") {
    alert("Sorry, your browser does not support Web Storage...");
    return false
  }
  return true;
}

document.addEventListener(SAVED_EVENT, function () {
  const bias = prompt("Siapa biasnya Vidya di ENHYPEN??", "Heeseung");
  alert("Yupp benar jawabannya adalahh " + localStorage.getItem(STORAGE_KEY));
  //console.log();
});

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);

  let data = JSON.parse(serializedData);

  if (data !== null) {
    for (todo of data) {
      todos.push(todo);
    }
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
}