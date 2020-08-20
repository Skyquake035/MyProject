import React, { Component } from "react";
import "./App.css";
import { Select, Layout } from 'antd';

const { Footer } = Layout;

const { Option } = Select;

const emailRegex = RegExp();

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

function onChange(value) {
  console.log(`selected ${value}`);
}

function onBlur() {
  console.log('blur');
}

function onFocus() {
  console.log('focus');
}

function onSearch(val) {
  console.log('search:', val);
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
      username: null,
      password: null,
      confirmPassword: null,
      prefix: null,
      firstName: null,
      lastName: null,
      email: null,
      treatment: null,
      gender: null,

      formErrors: {
        username:  "",
        password:  "",
        confirmPassword:  "",
        prefix:  "",
        firstName: "",
        lastName: "",
        email: "",
        treatment:  "",
        gender:  "",
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        Username:  ${this.state.username}
        Password: ${this.state.password}
        Confirm Password:  ${this.state.confirmPassword}
        Prefix:  ${this.state.prefix}
        First Name: ${this.state.firstName}
        Last Name: ${this.state.lastName}
        Email: ${this.state.email}
        Treatment:  ${this.state.treatment}
        Gender:  ${this.state.gender}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "username":
        formErrors.userame =
          value.length < 6 ? "minimum 3 characaters required" : "";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      case "confirmPassword":
        formErrors.firstName =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;  
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;

    return (
      <Layout>
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>ลงทะเบียน</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="username">
                <label htmlFor="username">ชื่อผู้ใช้</label>
                <input
                  className={formErrors.username.length > 0 ? "error" : null}
                  placeholder="ชื่อผู้ใช้"
                  type="text"
                  name="username"
                  noValidate
                  onChange={this.handleChange}
                />
                {formErrors.username.length > 0 && (
                  <span className="errorMessage">{formErrors.username}</span>
                )}
              </div>
            <div className="password">
              <label htmlFor="password">รหัสผ่าน</label>
              <input
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="รหัสผ่าน"
                type="password"
                name="password"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>
            <div className="confirmPassword">
              <label htmlFor="password">ยืนยันรหัสผ่าน</label>
              <input
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="ยืนยันรหัสผ่าน"
                type="password"
                name="password"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>

            <div className="prefix">
            <label htmlFor="prefix">คำนำหน้า</label>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="คำนำหน้า"
              optionFilterProp="prefix"
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
              onSearch={onSearch}
              filterOption={(input, option) =>
                option.prefix.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
              <Option value="mr">นาย</Option>
              <Option value="ms">นาง</Option>
              <Option value="mrs">นางสาว</Option>
            </Select>
            </div>

            <div className="firstName">
              <label htmlFor="firstName">ชื่อ</label>
              <input
                className={formErrors.firstName.length > 0 ? "error" : null}
                placeholder="ชื่อ"
                type="text"
                name="firstName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
            </div>
            <div className="lastName">
              <label htmlFor="lastName">นามสกุล</label>
              <input
                className={formErrors.lastName.length > 0 ? "error" : null}
                placeholder="นามสกุล"
                type="text"
                name="lastName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
            </div>
            <div className="email">
              <label htmlFor="email">อีเมล</label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="อีเมล"
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <br />

            <div className="treatment">
            <label htmlFor="treatment">ศูนย์การรักษา</label>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="ศูนย์การรักษา"
              optionFilterProp="treatment"
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
              onSearch={onSearch}
              filterOption={(input, option) =>
                option.treatment.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
            </Select>
            </div>

            <div className="gender">
            <label htmlFor="gender">เพศ</label>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="เพศ"
              optionFilterProp="gender"
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
              onSearch={onSearch}
              filterOption={(input, option) =>
                option.gender.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
              <Option value="male">ชาย</Option>
              <Option value="female">หญิง</Option>
            </Select>
            </div>
            
            <div className="createAccount">
              <button type="submit">ลงทะเบียน</button>
              <small>มีบัญชีผู้ใช้อยู่แล้ว?</small>
            </div>
          </form>
        </div>
      </div>
      <Footer style={{ textAlign: 'center' }}>Obodroid Limited Corporation</Footer>
      </Layout>
    );
  }
}

export default App;
