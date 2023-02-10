
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";


class ModalCreate extends React.Component {
    constructor() {
      super();
      this.state = {
        show: false,
        nominal : '',
        deskripsi: '',
        tanggal : '',
        category : ''
        
      };
  
      this.handleClose = this.handleClose.bind(this);
      this.handleShow = this.handleShow.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.tambahItem = this.tambahItem.bind(this);
    }
  
    handleClose() {
      this.setState({
        show: false,
      });
    }
  
    handleShow() {
      this.setState({
        show: true,
        category: this.props.category
      });
    }
  
    handleChange(e){
      this.setState ({
        [e.target.name] : e.target.value
      })
      console.log(this.state)
    }
  
    tambahItem() {
      const Data = {
        nominal : parseInt(this.state.nominal),
        deskripsi: this.state.deskripsi,
        tanggal : this.state.tanggal,
        category : this.state.category
      }
      const fnTambahItem = this.props.action;
      fnTambahItem(Data);
      this.setState({
        show: false,
      });
    }
  
    render() {
      return (
        <>
         <button onClick={this.handleShow} className={this.props.variant}>{this.props.text}<i className={this.props.icon}></i>
         </button>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Tambahkan {this.props.text}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="mb-3">
                <label className="form-label">Jumlah Uang</label>
                <input 
                type="number" 
                className="form-control" 
                placeholder="Masukan Jumlah Uang" 
                name="nominal" 
                value={this.state.nominal}
                onChange={this.handleChange}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Deskripsi</label>
                <input 
                type="text" 
                className="form-control" 
                placeholder="Masukan Deskripsi" 
                name="deskripsi" 
                value={this.state.deskripsi}
                onChange={this.handleChange}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Tanggal</label>
                <input 
                type="date" 
                data-date="" 
                data-date-format="DD MMMM YYYY"
                className="form-control" 
                placeholder="Masukan Tanggal" 
                name="tanggal" 
                value={this.state.tanggal}
                onChange={this.handleChange}
                />
            </div>
            <div>
                <input 
                type="hidden" 
                className="form-control" 
                placeholder="Masukan Tanggal" 
                name="kategori" 
                value={this.state.category}
                onChange={this.handleChange}
                />
            </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Batal
              </Button>
              <Button className={this.props.variant} onClick={this.tambahItem}>
                Tambah
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
  }

  export default ModalCreate