import React, { Component } from "react";
import List from "./List";
import Search from "./Search";

export default class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formValue: {
        maSv: "",
        sdt: "",
        hoTen: "",
        email: "",
      },
      formError: {
        maSv: "",
        sdt: "",
        hoTen: "",
        email: "",
      },
      validMaSv: false,
      validForm: false,
      arrStudent: [],
      arrSearch: [],
    };
  }

  componentDidMount() {
    this.getLocalStorage();
  }

  componentDidUpdate(preProps, preState) {
    if (preState.arrStudent !== this.state.arrStudent) {
      this.setLocalStorage();
    }
  }

  getLocalStorage = () => {
    if (localStorage.getItem("arrStudent")) {
      this.setState({
        arrStudent: JSON.parse(localStorage.getItem("arrStudent")),
      });
    }
  };

  setLocalStorage = () => {
    let arrStudent = JSON.stringify(this.state.arrStudent);
    localStorage.setItem("arrStudent", arrStudent);
  };

  handleUpdate = () => {
    let { arrStudent, formValue } = this.state;
    let studentUpdate = arrStudent.find((stu) => stu.maSv === formValue.maSv);

    if (studentUpdate) {
      for (let key in studentUpdate) {
        if (key !== "maSv") {
          studentUpdate[key] = formValue[key];
        }
      }
    }

    this.setState({
      arrStudent: arrStudent,
      validMaSv: false,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.checkValid()) {
      let arrStudent = this.state.arrStudent;

      // arrStudent.push({ ...this.state.formValue });

      arrStudent = [...arrStudent, this.state.formValue];

      this.setState({ arrStudent });
    }
  };

  handleDel = (maSvClick) => {
    let arrStudent = this.state.arrStudent.filter(
      (sv) => sv.maSv !== maSvClick
    );

    this.setState({
      arrStudent,
    });
  };

  handleEdit = (obj) => {
    this.setState(
      {
        formValue: obj,
      },
      () => {
        this.setState({
          validMaSv: true,
          validForm: this.checkValid(),
        });
      }
    );
  };

  handleInput = (e) => {
    let { name, value } = e.target;
    let dataType = e.target.getAttribute("data-type");

    let newFormValue = this.state.formValue;
    newFormValue[name] = value;

    let newFormError = this.state.formError;
    let message = "";
    if (value.trim() === "") {
      message = name + " không được để trống!";
    } else {
      if (dataType === "sdt") {
        let reg =
          "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
          "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
          "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
        if (value.match(reg)) {
          message = name + " chỉ được nhập số.";
        }
      }
      if (dataType === "hoTen") {
        let reg = /^[0-9]+$/;
        if (value.match(reg)) {
          message = name + " chỉ được nhập chữ.";
        }
      }
      if (dataType === "email") {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!value.match(reg)) {
          message = name + " chưa đúng định dạng.";
        }
      }
      if (dataType === "maSv") {
        let result = this.state.arrStudent.find((sv) => sv.maSv === value);

        let reg = /^[0-9]+$/;
        if (!value.match(reg)) {
          message = name + " chỉ được nhập số.";
        } else {
          if (result !== undefined) {
            message = name + " đã tồn tại.";
          }
        }
      }
    }

    newFormError[name] = message;

    this.setState(
      {
        formValue: newFormValue,
        formError: newFormError,
      },
      () => {
        this.setState({
          validForm: this.checkValid(),
        });
      }
    );
  };

  checkValid = () => {
    let { formValue, formError } = this.state;

    for (let key in formError) {
      if (formError[key] !== "" || formValue[key] === "") {
        return false;
      }
    }
    return true;
  };

  

  search = (number) => {
    console.log(number);
    let { arrStudent } = this.state;

    let arrSearch = arrStudent.filter((stu) =>
      stu.maSv.toString().startsWith(number)
    );
    console.log("arrSearch", arrSearch);
    console.log("arrStudent", arrStudent);
    this.setState({
      arrSearch,
    });
  };
  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <div className="card my-5">
            <div className="card-header">
              <h5>Thông tin sinh viên</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-6">
                  <div className="form-group">
                    <label>Mã sinh viên:</label>
                    <input
                      disabled={this.state.validMaSv}
                      value={this.state.formValue.maSv}
                      data-type="maSv"
                      className="form-control"
                      name="maSv"
                      onInput={this.handleInput}
                    />
                    {this.state.formError.maSv && (
                      <div className="alert alert-danger">
                        {this.state.formError.maSv}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Số điện thoại:</label>
                    <input
                      value={this.state.formValue.sdt}
                      data-type="sdt"
                      className="form-control"
                      name="sdt"
                      onInput={this.handleInput}
                    />
                    {this.state.formError.sdt && (
                      <div className="alert alert-danger">
                        {this.state.formError.sdt}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label>Họ và tên:</label>
                    <input
                      value={this.state.formValue.hoTen}
                      data-type="hoTen"
                      className="form-control"
                      name="hoTen"
                      onInput={this.handleInput}
                    />
                    {this.state.formError.hoTen && (
                      <div className="alert alert-danger">
                        {this.state.formError.hoTen}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Email:</label>
                    <input
                      value={this.state.formValue.email}
                      data-type="email"
                      className="form-control"
                      name="email"
                      onInput={this.handleInput}
                    />
                    {this.state.formError.email && (
                      <div className="alert alert-danger">
                        {this.state.formError.email}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <button
                className="btn btn-success"
                disabled={!this.state.validForm}
              >
                Thêm sinh viên
              </button>
              <button
                type="button"
                onClick={this.handleUpdate}
                disabled={!this.state.validMaSv}
                className="btn btn-info mx-3"
              >
                Update
              </button>
            </div>
          </div>
        </form>
        <Search search={this.search} />
        <List
          data={
            this.state.arrSearch.length
              ? this.state.arrSearch
              : this.state.arrStudent
          }
          handleDel={this.handleDel}
          handleEdit={this.handleEdit}
        />
      </div>
    );
  }
}
