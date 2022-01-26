document.addEventListener("DOMContentLoaded", function(){
    const submitForm = document.getElementById("form");

    submitForm.addEventListener("submit", function(event){
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

