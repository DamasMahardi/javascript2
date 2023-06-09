var vacancies = [
    { value: "1", label: "IT", quota: 3 },
    { value: "2", label: "Dokter", quota: 3 },
    { value: "3", label: "Guru", quota: 3 }
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
    option.value = position.label;
    option.text = position.label;
    positionSelect.appendChild(option);
});

var applicants = []; // Array untuk menyimpan data yang telah di-submit
var submittedEmails = []; // Array untuk menyimpan email yang telah di-submit

document.getElementById("myForm").addEventListener("submit", function (event) {
    event.preventDefault();

    var fullname = document.getElementById("fullname").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var vacancy = document.getElementById("vacancy").value;
    var position = document.getElementById("position").value;

    var fullnameError = document.getElementById("fullnameError");
    var emailError = document.getElementById("emailError");
    var phoneError = document.getElementById("phoneError");
    var vacancyError = document.getElementById("vacancyError");
    var positionError = document.getElementById("positionError");

    fullnameError.textContent = "";
    emailError.textContent = "";
    phoneError.textContent = "";
    vacancyError.textContent = "";
    positionError.textContent = "";

    if (!fullname) {
        fullnameError.textContent = "Mohon masukkan nama lengkap.";
    }

    if (!phone) {
        phoneError.textContent = "Mohon masukkan nomor telepon.";
    }

    if (!vacancy) {
        vacancyError.textContent = "Mohon pilih lowongan.";
    }

    if (!position) {
        positionError.textContent = "Mohon pilih posisi.";
    }

    if (fullnameError.textContent || emailError.textContent || phoneError.textContent ||
        vacancyError.textContent || positionError.textContent) {
        return;
    }

    var selectedVacancy = vacancies.find(function (v) {
        return v.value === vacancy;
    });

    if (!selectedVacancy) {
        vacancyError.textContent = "Lowongan tidak valid.";
        return;
    }

    selectedVacancy.quota--;

    applicants.push({ fullname: fullname, email: email, phone: phone, vacancy: vacancy, position: position });
    submittedEmails.push(email);

    var totalApplicants = applicants.length;

    var result = "<span style='color: green;'>Terima kasih telah melakukan pendaftaran. Anda adalah pendaftar ke-" + totalApplicants + ". Permintaan Anda akan segera kami proses.</span><br><br>" +
        "Nama Lengkap: " + "<br>" + fullname + "<br>" + "<br>" +
        "Email: " + "<br>" + email + "<br>" + "<br>" +
        "Nomor Telepon: " + "<br>" + phone + "<br>" + "<br>" +
        "Lowongan: " + "<br>" + selectedVacancy.label + "<br>" + "<br>" +
        "Posisi: " + "<br>" + position;

    document.getElementById("result").innerHTML = result;

    document.getElementById("fullname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("vacancy").selectedIndex = 0;
    document.getElementById("position").selectedIndex = 0;
});

var vacancySelect = document.getElementById("vacancy");
vacancySelect.addEventListener("change", function () {
    var selectedValue = this.value;
    var vacancyError = document.getElementById("vacancyError");

    if (!selectedValue) {
        vacancyError.textContent = "Mohon pilih lowongan.";
        vacancyError.style.color = "red";
        return;
    }

    var selectedVacancy = vacancies.find(function (v) {
        return v.value === selectedValue;
    });

    if (!selectedVacancy) {
        vacancyError.textContent = "Lowongan tidak valid.";
        vacancyError.style.color = "red";
        return;
    }

    if (selectedVacancy.quota <= 0) {
        vacancyError.textContent = "Mohon maaf, rekrutasi untuk " + selectedVacancy.label + " sudah penuh.";
        document.getElementById("submitBtn").disabled = true;
        return;
    }

    if (selectedVacancy.quota <= 2) {
        if (selectedVacancy.quota === 2) {
            vacancyError.textContent = "Kuota tersisa untuk " + selectedVacancy.label + " hanya 2 pendaftar.";
            vacancyError.style.color = "red";
        } else if (selectedVacancy.quota === 1) {
            vacancyError.textContent = "Kuota tersisa untuk " + selectedVacancy.label + " hanya 1 pendaftar.";
            vacancyError.style.color = "red";
        }
    } else {
        vacancyError.textContent = "Anda dapat memilih lowongan " + selectedVacancy.label + ".";
        vacancyError.style.color = "green";
    }
    var emailInput = document.getElementById("email");
    emailInput.addEventListener("change", function () {
        var email = this.value;
        var emailError = document.getElementById("emailError");

        if (!email) {
            emailError.textContent = "Mohon masukkan alamat email.";
        } else if (submittedEmails.includes(email)) {
            emailError.textContent = "Alamat email sudah diinput sebelumnya.";
            return;
        }

        emailError.textContent = ""; 
    });

});