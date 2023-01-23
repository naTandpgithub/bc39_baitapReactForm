import React, { Component } from "react";

export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      value: {
        masv: "",
        tensv: "",
        sdt: "",
        email: "",
      },
      error: {
        masv: "",
        tensv: "",
        sdt: "",
        email: "",
      },
      masvValid: false,
      tensvValid: false,
      sdtValid: false,
      emailValid: false,
      formValid: false,
    };
  }
  handleOnChange = (e) => {
    const { name, value } = e.target;
    this.setState(
      {
        value: { ...this.state.value, [name]: value },
      },
      () => {
        console.log(this.state.value);
      }
    );
  };
  handleError = (e) => {
    const { name, value } = e.target;
    let mess = value.trim() === "" ? ` (*) Vui long nhap ${name}` : "";

    let { masvValid, tensvValid, sdtValid, emailValid } = this.state;
    switch (name) {
      case "masv":
        masvValid = mess === "" ? true : false;
        if (value && value.length < 4) {
          mess = "(*) Vui long nhap nhieu hon 4 ki tu";
          masvValid = false;
        }
        break;
      case "tensv":
        tensvValid = mess === "" ? true : false;
        break;
      case "sdt":
        sdtValid = mess === "" ? true : false;
        if (
          value &&
          !value.match(/^[0-9]+$/)
          // &&
          // !value.length >= 10 &&
          // !value.length <= 11
        ) {
          mess = "(*) Vui long nhap dung so dien thoai";
        }
        break;
      case "email":
        emailValid = mess === "" ? true : false;

        if (
          value &&
          !value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        ) {
          mess = "(*) Vui long nhap dung dinh dang email";
          emailValid = false;
        }
        break;

      default:
        break;
    }

    this.setState(
      {
        error: { ...this.state.error, [name]: mess },
        masvValid,
        tensvValid,
        sdtValid,
        emailValid,
        formValid: masvValid && tensvValid && sdtValid && emailValid,
      },
      console.log(this.state)
    );
  };

  renderUserList = () => {
    if (this.state.formValid === false) {
      return;
    }
    const { value } = this.state;
    console.log(value);

    this.setState(
      {
        data: [...this.state.data, value],
      },
      console.log(this.state)
    );
  };

  render() {
    return (
      <div>
        <div
          className="bg-dark text-light m-3 p-3
           "
        >
          <h3>Thông Tin Sinh Viên</h3>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label>Mã Sinh Viên</label>
                <input
                  type="text"
                  className="form-control"
                  name="masv"
                  onChange={this.handleOnChange}
                  onBlur={this.handleError}
                />
              </div>
              {this.state.error.masv && (
                <div className="alert alert-danger">
                  {this.state.error.masv}
                </div>
              )}
              <div className="form-group">
                <label>Số Điện Thoại</label>
                <input
                  type="text"
                  className="form-control"
                  name="sdt"
                  onChange={this.handleOnChange}
                  onBlur={this.handleError}
                />
              </div>
              {this.state.error.sdt && (
                <div className="alert alert-danger">{this.state.error.sdt}</div>
              )}

              <button
                className="btn btn-success"
                disabled={!this.state.formValid}
                onClick={() => this.renderUserList()}
              >
                Submit
              </button>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label> Họ Tên</label>
                <input
                  type="text"
                  className="form-control  "
                  name="tensv"
                  onChange={this.handleOnChange}
                  onBlur={this.handleError}
                />
              </div>
              {this.state.error.tensv && (
                <div className="alert alert-danger">
                  {this.state.error.tensv}
                </div>
              )}
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  onChange={this.handleOnChange}
                  onBlur={this.handleError}
                />
              </div>
              {this.state.error.email && (
                <div className="alert alert-danger">
                  {this.state.error.email}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="m-3 p-3">
          <table className="table   ">
            <thead className="bg-dark text-light ">
              <tr>
                <td>Mã Sinh Viên</td>
                <td>Họ Tên</td>
                <td>Số Điện Thoại</td>
                <td>Email</td>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((data, i) => (
                <tr key={i}>
                  <td>{data.masv}</td>
                  <td>{data.tensv}</td>
                  <td>{data.sdt}</td>
                  <td>{data.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
