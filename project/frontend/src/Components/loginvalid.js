function Loginvalidation(values) {
    let errors = {}
    const email_pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (values.email === "") {
        errors.email = "กรุณาใส่ email ที่ลงทะเบียน"
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

export default Loginvalidation;
