function Validation(values) {
    let errors = {}
    const email_pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;



    if (values.name === "") {
        errors.name = "กรุณาใส่ชื่อ"
    } else {
        errors.name = ""
    }

    if (values.surname === "") {
        errors.surname = "กรุณาใส่นามสกุล"
    } else {
        errors.surname = ""
    }

    if (values.email === "") {
        errors.email = "กรุณาใส่ email"
    } else if (!email_pattern.test(values.email)) {
        errors.email = "รูปแบบ email ไม่ถูกต้อง"
    } else {
        errors.email = ""
    }

    if (values.password === "") {
        errors.password = "กรุณาใส่รหัสผ่าน"
    } else {
        errors.password = ""
    }

    return errors;
}

export default Validation;
