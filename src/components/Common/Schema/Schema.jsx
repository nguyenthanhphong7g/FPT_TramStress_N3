import * as Yup from "yup";

// schema cho profile
export const profileSchema = Yup.object().shape({
  name: Yup.string()
    .required("Bạn chưa nhập tên")
    .min(2, "Tên cần ít nhất 2 ký tự")
    .max(50, "Tên không quá 50 ký tự"),

  email: Yup.string()
    .required("Bạn chưa nhập email")
    .email("Email không hợp lệ"),

  phone: Yup.string()
    .required("Bạn chưa nhập số điện thoại")
    .matches(/^[0-9]{10,11}$/, "Số điện thoại phải gồm 10-11 chữ số"),

  age: Yup.number()
    .required("Bạn chưa nhập tuổi")
    .min(1, "Tuổi phải lớn hơn 0")
    .max(120, "Tuổi không hợp lệ"),

  gender: Yup.string()
    .required("Bạn chưa chọn giới tính")
    .oneOf(["Nam", "Nữ", "Khác"], "Giới tính không hợp lệ"),
});

// schema cho mật khẩu
export const passwordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Bạn chưa nhập mật khẩu")
    .min(8, "Mật khẩu cần ít nhất 8 ký tự")
    .matches(/[a-z]/, "Mật khẩu cần ít nhất 1 chữ thường")
    .matches(/[A-Z]/, "Mật khẩu cần ít nhất 1 chữ hoa")
    .matches(/\d/, "Mật khẩu cần ít nhất 1 số")
    .matches(/[@$!%*?&^#]/, "Mật khẩu cần ít nhất 1 ký tự đặc biệt (@$!%*?&^#)"),
});
export const signinSchema = Yup.object().shape({
  email: Yup.string()
    .required("Bạn chưa nhập email")
    .email("Email không hợp lệ"),

  password: Yup.string()
    .required("Bạn chưa nhập mật khẩu")
    .min(8, "Mật khẩu cần ít nhất 8 ký tự")
    .matches(/[a-z]/, "Mật khẩu cần ít nhất 1 chữ thường")
    .matches(/[A-Z]/, "Mật khẩu cần ít nhất 1 chữ hoa")
    .matches(/\d/, "Mật khẩu cần ít nhất 1 số")
    .matches(/[@$!%*?&^#]/, "Mật khẩu cần ít nhất 1 ký tự đặc biệt (@$!%*?&^#)"),
});
