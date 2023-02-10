import "./App.css";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      sisaUang: 1500000,
      persentaseUang: 75,
      pemasukanUang: 2000000,
      pengeluaranUang: 150000,
      transaksiIn: 30,
      transaksiOut: 40,
      summary: [
        {
          deskripsi: "Menerima Gaji",
          tanggal: "1 July 2022",
          nominal: 10000000,
          category: "IN",
        },
        {
          deskripsi: "Makan Nasi",
          tanggal: "2 July 2022",
          nominal: 200000,
          category: "OUT",
        },
      ],
    };
  }

  render() {
    return (
      <>
        <div className="container py-5">
          <div className="row">
            <div className="col-12 text-center">
              <h1> CASH FLOW APPS</h1>
              <hr className="w-75 mx-auto" />
              <h2>Rp. {this.state.sisaUang},-</h2>
              <span className="title-md">
                Sisa uang kamu tersisa {this.state.persentaseUang}% lagi
              </span>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-6">
              <div className="card-wraper p-4">
                <div className="icon-wrapper1 mb-1">
                  <i className="bi bi-wallet2"></i>
                </div>
                <span className="title-sm">Pemasukan</span>
                <h3>Rp. {this.state.pemasukanUang},-</h3>
                <div>
                  <span className="title-sm text-ungu">
                    {this.state.transaksiIn}
                  </span>
                  <span className="title-sm"> Transaksi</span>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="card-wraper p-4">
                <div className="icon-wrapper2 mb-1">
                  <i className="bi bi-cash-stack"></i>
                </div>
                <span className="title-sm">Pengeluaran</span>
                <h3>Rp. {this.state.pengeluaranUang},-</h3>
                <div>
                  <span className="title-sm text-ungu">
                    {this.state.transaksiOut}
                  </span>
                  <span className="title-sm"> Transaksi</span>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-12 d-flex justify-content-between align-items-center ">
              <h4>Ringkasan Transaksi</h4>
              <div className="wrapper-button d-flex">
                <ModalCreate variant="button biru py-2 px-2 me-2" text="Pemasukan" icon="bi bi-plus-circle-fill" />
                <ModalCreate variant="button pink py-2 px-2" text="Pengeluaran" icon="bi bi-dash-circle-fill" />
              </div>
            </div>
          </div>

          <div className="row mt-2 ">
            {this.state.summary.map((sum, index) => {
              return (
                <div key={index} className="col-12 d-flex  justify-content-between align-items-center mt-3">
                  <div className="d-flex align-items-center">
                    <div className={sum.category === "IN" ? "icon-wrapper1" : "icon-wrapper2"}>
                      <i className={ sum.category === "IN" ? "bi bi-wallet2" : "bi bi-bag-dash"}></i>
                    </div>
                    <div className="transaction ms-3 d-flex flex-column">
                      <h6> {sum.deskripsi}</h6>
                      <span className="title-sm">{sum.tanggal}</span>
                    </div>
                  </div>
                  <h5
                    className={
                      sum.category === "IN" ? "text-money-in" : "text-money-out"}>Rp. {sum.nominal}
                  </h5>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}
export default App;
