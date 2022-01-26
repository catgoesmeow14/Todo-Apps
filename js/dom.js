function addTodo(){
    const textTodo = document.getElementById("title").value;
    const timestamp = document.getElementById("date").value;
    console.log("todo " + textTodo);
    console.log("timestamp" + timestamp);
}

/*
Kode document.getElementById("title").value berfungsi untuk mengambil elemen pada html, dalam kasus ini kita mengambil element <input> dengan id title. Setelah element didapatkan, value di dalam form tersebut akan kita ambil dan dimasukkan ke dalam variable textTodo. Logika yang sama juga terjadi pada variable timestamp.

Setelah textTodo dan timestamp didapatkan, kita akan menampilkannya pada console browser dengan menggunakan kode console.log().
*/