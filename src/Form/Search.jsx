import React, { Component } from 'react'

export default class Search extends Component {
  render() {
    return (
      <div className='mb-5 alert alert-success'>
        <h3>Tìm kiếm sinh viên</h3>
        <input type='number' onChange={(e)=>{
            this.props.search(e.target.value)
        }} className='form-control'placeholder='Nhập mã sinh viên vào đây...'/>
      </div>
    )
  }
}
