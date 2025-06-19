let employeeList = [];

function Employee(account, name, email, password, workDate, baseSalary, position, workHours) {
    this.account = account;
    this.name = name;
    this.email = email;
    this.password = password;
    this.workDate = workDate;
    this.baseSalary = baseSalary;
    this.position = position;
    this.workHours = workHours;

    this.totalSalary = function () {
        let multiplier = 1;
        if (this.position === "Giám đốc" || this.position === "Sếp") multiplier = 3;
        else if (this.position === "Trưởng phòng" || this.position === "Trưởng Phòng") multiplier = 2;
        else multiplier = 1;
        return this.baseSalary * multiplier;
    };

    this.employeeType = function () {
        if (this.workHours >= 192) return "Xuất sắc";
        else if (this.workHours >= 176) return "Giỏi";
        else if (this.workHours >= 160) return "Khá";
        return "Trung bình";
    };
}

function validateAccount(account) {
    return /^\d{4,6}$/.test(account);
}
function validateName(name) {
    return /^[a-zA-ZÀ-ỹ\s]+$/.test(name.trim());
}
function validateEmail(email) {
    return /^\S+@\S+\.\S+$/.test(email);
}
function validatePassword(password) {
    return /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,10}$/.test(password);
}
function validateDate(date) {
    return /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/.test(date);
}
function validateSalary(salary) {
    return salary >= 1000000 && salary <= 20000000;
}
function validatePosition(position) {
    return ["Giám đốc", "Trưởng phòng", "Nhân Viên", "Sếp", "Nhân viên", "Trưởng Phòng"].includes(position);
}
function validateWorkHours(hours) {
    return hours >= 80 && hours <= 200;
}

function renderEmployeeTable(list = employeeList) {
    const tableBody = document.getElementById("tableDanhSach");
    tableBody.innerHTML = "";
    list.forEach((employee, index) => {
        const row = `
            <tr>
                <td>${employee.account}</td>
                <td>${employee.name}</td>
                <td>${employee.email}</td>
                <td>${employee.workDate}</td>
                <td>${employee.position}</td>
                <td>${employee.totalSalary()}</td>
                <td>${employee.employeeType()}</td>
                <td>
                    <button class="btn btn-danger" onclick="deleteEmployee(${index})">Xóa</button>
                    <button class="btn btn-info" onclick="editEmployee(${index})">Sửa</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

let editIndex = null;
function addEmployee() {
    const account = document.getElementById("tknv").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const workDate = document.getElementById("datepicker").value;
    const baseSalary = parseFloat(document.getElementById("luongCB").value);
    const position = document.getElementById("chucvu").value;
    const workHours = parseInt(document.getElementById("gioLam").value);

    if (!validateAccount(account)) { alert("Tài khoản phải 4-6 ký số!"); return; }
    if (!validateName(name)) { alert("Tên nhân viên phải là chữ!"); return; }
    if (!validateEmail(email)) { alert("Email không hợp lệ!"); return; }
    if (!validatePassword(password)) { alert("Mật khẩu 6-10 ký tự, gồm số, in hoa, ký tự đặc biệt!"); return; }
    if (!validateDate(workDate)) { alert("Ngày làm không hợp lệ (mm/dd/yyyy)!"); return; }
    if (!validateSalary(baseSalary)) { alert("Lương cơ bản 1.000.000 - 20.000.000!"); return; }
    if (!validatePosition(position)) { alert("Chọn chức vụ hợp lệ!"); return; }
    if (!validateWorkHours(workHours)) { alert("Giờ làm 80-200!"); return; }

    const newEmployee = new Employee(account, name, email, password, workDate, baseSalary, position, workHours);
    if (editIndex !== null) {
        employeeList[editIndex] = newEmployee;
        editIndex = null;
    } else {
        employeeList.push(newEmployee);
    }
    renderEmployeeTable();
    clearForm();
}

function editEmployee(index) {
    const emp = employeeList[index];
    document.getElementById("tknv").value = emp.account;
    document.getElementById("name").value = emp.name;
    document.getElementById("email").value = emp.email;
    document.getElementById("password").value = emp.password;
    document.getElementById("datepicker").value = emp.workDate;
    document.getElementById("luongCB").value = emp.baseSalary;
    document.getElementById("chucvu").value = emp.position;
    document.getElementById("gioLam").value = emp.workHours;
    editIndex = index;
}

function deleteEmployee(index) {
    employeeList.splice(index, 1);
    renderEmployeeTable();
}

function searchByType() {
    const keyword = document.getElementById("searchName").value.trim().toLowerCase();
    if (!keyword) { renderEmployeeTable(); return; }
    const filtered = employeeList.filter(emp => emp.employeeType().toLowerCase().includes(keyword));
    renderEmployeeTable(filtered);
}

document.getElementById("btnThemNV").addEventListener("click", addEmployee);
document.getElementById("btnCapNhat").addEventListener("click", addEmployee);
document.getElementById("btnTimNV").addEventListener("click", searchByType);

window.onload = function() {
    renderEmployeeTable();
};

function clearForm() {
    document.querySelector("#myModal form").reset();
}

