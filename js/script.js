
var vacancies = [
    { value: "1", label: "IT" },
    { value: "2", label: "Dokter" },
    { value: "3", label: "Guru" }
];

var positions = [
    { value: "1", label: "Bandung" },
    { value: "2", label: "Jakarta" },
    { value: "3", label: "Bogor" }
];

var vacancySelect = document.getElementById("vacancy");
vacancies.forEach(function (vacancy) {
    var option = document.createElement("option");
    option.value = vacancy.value;
    option.text = vacancy.label;
    vacancySelect.appendChild(option);
});

var positionSelect = document.getElementById("position");
positions.forEach(function (position) {
    var option = document.createElement("option");
    option.value = position.value;
    option.text = position.label;
    positionSelect.appendChild(option);
});

document.getElementById("myForm").addEventListener("submit", function (event) {
    event.preventDefault();
    var fullname = document.getElementById("fullname").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var vacancy = document.getElementById("vacancy").options[document.getElementById("vacancy").selectedIndex].text;
    var position = document.getElementById("position").options[document.getElementById("position").selectedIndex].text;

    var result = "<span style='color: green;'>Terimakasih telah melakukan pengisian, permintaan Anda akan segera kami proses.</span><br><br>" +
        "Full Name: " + "<br>" + fullname + "<br>" + "<br>" +
        "Email: " + "<br>" + email + "<br>" + "<br>" +
        "Phone Number: " + "<br>" + phone + "<br>" + "<br>" +
        "Vacancy: " + "<br>" + vacancy + "<br>" + "<br>" +
        "Position: " + "<br>" + position;

    document.getElementById("result").innerHTML = result;

    // Mengosongkan inputan setelah submit
    document.getElementById("fullname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("vacancy").selectedIndex = 0;
    document.getElementById("position").selectedIndex = 0;

    // Menampilkan notifikasi sukses
    alert("Data telah berhasil dikirim!");
});
