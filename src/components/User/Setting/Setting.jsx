import React, { useEffect, useState } from "react";
import "./Setting.css";
import Cat from "../../../assets/images/Cat_Emontion.png";
import InputFeild from "../../../components/Common/FormLogin/InputFeild";
import { profileSchema, passwordSchema } from "../../Common/Schema/Schema";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateUserStorages, getCurrentUser, compareCurrentPassword, setCurrentUser } from "../../../services/services";
import { useAuth } from "../../../contexts/AuthContext";


const Setting = () => {
    // const [user, setUser] = useState(null);
    const [errorsProfile, setErrorsProfile] = useState({});
    const [errorsPassword, setErrorsPassword] = useState({});
    const [activeSection, setActiveSection] = useState("profile");
    const [activeTab, setActiveTab] = useState("info");
    const [newPassword, setNewPassword] = useState({ current: "", new: "", confirm: "" });
    const {user, setUser } = useAuth();

    useEffect(() => {
        const savedUser = getCurrentUser();
        if (savedUser) setUser(savedUser);
    }, []);

    const validateField = async (field, nextUser) => {
        try {
            await profileSchema.validateAt(field, nextUser);
            setErrorsProfile((prev) => ({ ...prev, [field]: "" }));
        } catch (err) {
            setErrorsProfile((prev) => ({ ...prev, [field]: err.message }));
        }
    };

    const handleFieldChange = (field, value) => {
        setUser((prev) => {
            const casted = field === "age" ? (value === "" ? "" : Number(value)) : value;
            const next = { ...prev, [field]: casted };
            validateField(field, next);
            return next;
        });
    };

    const validatePasswordRealtime = async (next) => {
        try {
            await passwordSchema.validate({ password: next.new }, { abortEarly: false });
            setErrorsPassword((prev) => ({ ...prev, new: "" }));
        } catch (err) {
            let newErrors = {};
            if (err.inner && err.inner.length) {
                const first = err.inner.find((e) => e.path === "password");
                if (first) newErrors.new = first.message;
            } else if (err.path === "password") {
                newErrors.new = err.message;
            }
            setErrorsPassword((prev) => ({ ...prev, ...newErrors }));
        }

        if (typeof next.current === "string") {
            if (user && next.current && !compareCurrentPassword(next.current)) {
                setErrorsPassword((prev) => ({ ...prev, current: "Mật khẩu hiện tại không đúng!" }));
            } else {
                setErrorsPassword((prev) => ({ ...prev, current: "" }));
            }
        }

        if (typeof next.confirm === "string") {
            if (next.confirm && next.confirm !== next.new) {
                setErrorsPassword((prev) => ({ ...prev, confirm: "Xác nhận mật khẩu không khớp!" }));
            } else {
                setErrorsPassword((prev) => ({ ...prev, confirm: "" }));
            }
        }
    };

    const handlePasswordFieldChange = (field, value) => {
        const next = { ...newPassword, [field]: value };
        setNewPassword(next);
        validatePasswordRealtime(next);
    };

    const updateUserStorage = (updatedUser) => {
        setUser(updatedUser)
        updateUserStorages(updatedUser);
    };

    const handleUpdateProfile = async () => {
        try {
            await profileSchema.validate(user, { abortEarly: false });
            setErrorsProfile({});
            updateUserStorage(user);
            toast.success("Cập nhật thông tin thành công!");
        } catch (err) {
            const newErrors = {};
            if (err.inner && err.inner.length) {
                err.inner.forEach((e) => {
                    newErrors[e.path] = e.message;
                });
            } else if (err.path) {
                newErrors[err.path] = err.message;
            }
            setErrorsProfile(newErrors);
            Object.values(newErrors).forEach((m) => toast.error(m));
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            setErrorsPassword({});
            await passwordSchema.validate({ password: newPassword.new }, { abortEarly: false });
            if (!newPassword.current) {
                setErrorsPassword({ current: "Bạn chưa nhập mật khẩu hiện tại" });
                toast.error("Bạn chưa nhập mật khẩu hiện tại");
                return;
            }
            if (!compareCurrentPassword(newPassword.current)) {
                setErrorsPassword({ current: "Mật khẩu hiện tại không đúng!" });
                toast.error("Mật khẩu hiện tại không đúng!");
                return;
            }
            if (newPassword.new === newPassword.current) {
                setErrorsPassword({ new: "Mật khẩu mới không được trùng mật khẩu hiện tại!" });
                toast.error("Mật khẩu mới không được trùng với mật khẩu cũ");
                return;
            }
            if (!newPassword.confirm) {
                setErrorsPassword({ confirm: "Bạn chưa nhập xác nhận mật khẩu" });
                toast.error("Bạn chưa nhập xác nhận mật khẩu");
                return;
            }
            if (newPassword.new !== newPassword.confirm) {
                setErrorsPassword({ confirm: "Xác nhận mật khẩu không khớp!" });
                toast.error("Xác nhận mật khẩu không khớp!");
                return;
            }
            const updatedUser = { ...user, password: newPassword.new };
            updateUserStorage(updatedUser);
            toast.success("Đổi mật khẩu thành công!");
            setNewPassword({ current: "", new: "", confirm: "" });
        } catch (err) {
            const newErrors = {};
            if (err.inner && err.inner.length) {
                err.inner.forEach((e) => {
                    if (e.path === "password") newErrors.new = e.message;
                });
            } else if (err.path === "password") {
                newErrors.new = err.message;
            }
            setErrorsPassword((prev) => ({ ...prev, ...newErrors }));
            toast.error(newErrors.new || "Có lỗi khi đổi mật khẩu!");
        }
    };

    useEffect(() => {
        setErrorsProfile({});
        setErrorsPassword({});
    }, [activeTab, activeSection]);

    if (!user) return <p>Đang tải...</p>;

    return (
        <div className="settings-container">
            <h2 className="settings-title">Cài đặt</h2>
            <div className="settings-layout">
                <div className="settings-sidebar">
                    <button
                        className={`sidebar-item ${activeSection === "profile" ? "active" : ""}`}
                        onClick={() => {
                            setActiveSection("profile");
                            setActiveTab("info");
                        }}
                    >
                        Profile
                    </button>
                    <button
                        className={`sidebar-item ${activeSection === "terms" ? "active" : ""}`}
                        onClick={() => {
                            setActiveSection("terms");
                        }}
                    >
                        Điều khoản và bảo mật
                    </button>
                </div>

                <div className="settings-content">
                    {activeSection === "profile" && (
                        <>
                            <div className="settings-tabs">
                                <button
                                    className={activeTab === "info" ? "tab active" : "tab"}
                                    onClick={() => {
                                        setActiveTab("info");
                                    }}
                                >
                                    Thông tin cá nhân
                                </button>
                                <button
                                    className={activeTab === "password" ? "tab active" : "tab"}
                                    onClick={() => {
                                        setActiveTab("password");
                                    }}
                                >
                                    Mật khẩu
                                </button>
                            </div>

                            {activeTab === "info" && (
                                <div className="tab-content">
                                    <div className="avatar-section">
                                        <img src={user.avatar || Cat} alt="avatar" className="avatar" />
                                        <input
                                            type="file"
                                            id="avatarUpload"
                                            accept="image/*"
                                            style={{ display: "none" }}
                                            onChange={(e) => {
                                                if (e.target.files && e.target.files[0]) {
                                                    const file = e.target.files[0];
                                                    const reader = new FileReader();
                                                    reader.onloadend = () => {
                                                        const base64Image = reader.result;
                                                        const updatedUser = { ...user, avatar: base64Image };
                                                        updateUserStorage(updatedUser);
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                        />
                                        <button
                                            type="button"
                                            className="btn-primary"
                                            onClick={() => document.getElementById("avatarUpload").click()}
                                        >
                                            Thay đổi
                                        </button>
                                    </div>

                                    <div className="group">
                                        <InputFeild
                                            header="Họ và tên"
                                            type="text"
                                            placeholder="Nhập họ tên"
                                            value={user.name || ""}
                                            onChange={(e) => handleFieldChange("name", e.target.value)}
                                            icon="person"
                                            error={errorsProfile.name}
                                        />

                                        <InputFeild
                                            header="Email"
                                            type="email"
                                            placeholder="Nhập email"
                                            value={user.email || ""}
                                            onChange={(e) => handleFieldChange("email", e.target.value)}
                                            icon="mail"
                                            error={errorsProfile.email}
                                        />

                                        <InputFeild
                                            header="Số điện thoại"
                                            type="text"
                                            placeholder="Nhập số điện thoại"
                                            value={user.phone || ""}
                                            onChange={(e) => handleFieldChange("phone", e.target.value)}
                                            icon="call"
                                            error={errorsProfile.phone}
                                        />

                                        <InputFeild
                                            header="Tuổi"
                                            type="number"
                                            placeholder="Nhập tuổi"
                                            value={user.age === undefined || user.age === null ? "" : user.age}
                                            onChange={(e) => handleFieldChange("age", e.target.value)}
                                            icon="calendar_month"
                                            error={errorsProfile.age}
                                        />

                                        <InputFeild
                                            header="Giới tính"
                                            type="select"
                                            value={user.gender || ""}
                                            onChange={(e) => handleFieldChange("gender", e.target.value)}
                                            icon="wc"
                                            options={[
                                                { label: "Nam", value: "Nam" },
                                                { label: "Nữ", value: "Nữ" },
                                                { label: "Khác", value: "Khác" },
                                            ]}
                                            error={errorsProfile.gender}
                                        />
                                        <button className="btn-primary" onClick={handleUpdateProfile}>
                                            Cập nhật
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeTab === "password" && (
                                <form className="tab-content-pass" onSubmit={handleChangePassword}>
                                    <InputFeild
                                        header="Mật khẩu hiện tại"
                                        type="password"
                                        placeholder="Nhập mật khẩu hiện tại"
                                        value={newPassword.current}
                                        onChange={(e) => handlePasswordFieldChange("current", e.target.value)}
                                        icon="lock"
                                        error={errorsPassword.current}
                                    />

                                    <InputFeild
                                        header="Mật khẩu mới"
                                        type="password"
                                        placeholder="Nhập mật khẩu mới"
                                        value={newPassword.new}
                                        onChange={(e) => handlePasswordFieldChange("new", e.target.value)}
                                        icon="lock"
                                        error={errorsPassword.new}
                                    />

                                    <InputFeild
                                        header="Nhập lại mật khẩu mới"
                                        type="password"
                                        placeholder="Xác nhận mật khẩu mới"
                                        value={newPassword.confirm}
                                        onChange={(e) => handlePasswordFieldChange("confirm", e.target.value)}
                                        icon="lock"
                                        error={errorsPassword.confirm}
                                    />
                                    <button type="submit" className="btn-primary">
                                        Cập nhật
                                    </button>
                                </form>
                            )}
                        </>
                    )}

                    {activeSection === "terms" && (
                        <div className="tab-content-poly">
                            <h3>Điều khoản và bảo mật</h3>
                            <p>Điều khoản 1 : .....</p>
                        </div>
                    )}
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={2000} />
        </div>
    );
};

export default Setting;