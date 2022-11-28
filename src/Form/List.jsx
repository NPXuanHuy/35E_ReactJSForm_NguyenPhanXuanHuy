import React, { Component } from "react";

export default class List extends Component {
  render() {
    const { data, handleDel, handleEdit } = this.props;
    return (
      <div>
        <h1 className="alert alert-secondary">Danh sách sinh viên</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Mã sinh viên</th>
              <th>Họ tên</th>
              <th>Số điện thoại</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ maSv, hoTen, sdt, email }, index) => {
              return (
                <tr key={index}>
                  <td>{maSv}</td>
                  <td>{hoTen}</td>
                  <td>{sdt}</td>
                  <td>{email}</td>
                  <td>
                    <button
                      className="btn btn-primary mx-1"
                      onClick={() => {
                        let value = { maSv, hoTen, sdt, email };

                        handleEdit(value);
                      }}
                    >
                      <i className="fa fa-edit"></i>
                    </button>
                    <button
                      className="btn btn-danger mx-1"
                      onClick={() => {
                        handleDel(maSv);
                      }}
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
