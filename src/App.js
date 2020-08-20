import React, { Component } from "react";
import "./App.css";
import { Layout } from 'antd';
import { Popover} from 'antd';

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

const { Footer } = Layout;

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

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
      username: null,
      password: null,

      formErrors: {
        username:  "",
        password:  "",
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
          <h1>เข้าสู่ระบบ</h1>
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
            
            <div className="createAccount">
              <button type="submit">เข้าสู่ระบบ</button>
              <Popover content={content} title="Title" trigger="hover">
                <small>ลืมรหัสผ่าน?</small>
              </Popover>
              <small>ลงทะเบียน</small>
              
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