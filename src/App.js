import "./App.css";
import React, { useState } from "react";
import ModalCreate from './component/ModalCreate'
import Alert from "./component/Alert";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      sisaUang: 0,
      persentaseUang: 0,
      pemasukanUang: 0,
      pengeluaranUang: 0,
      transaksiIn: 0,
      transaksiOut: 0,
      summary: [
        {
          deskripsi: "Menerima Gaji",
          tanggal: "1 July 2022",
          nominal: 10000000,
          category: "IN",
        },
        {
          deskripsi: "Menerima Gaji 2",
          tanggal: "1 July 2022",
          nominal: 40000000,
          category: "IN",
        },
        {
          deskripsi: "Makan Nasi",
          tanggal: "2 July 2022",
          nominal: 200099,
          category: "OUT",
        },
        {
          deskripsi: "Makan Nasi 2",
          tanggal: "2 July 2022",
          nominal: 400000,
          category: "OUT",
        },
      ],
    };
    this.tambahItem = this.tambahItem.bind(this);
    this.Hitung = this.Hitung.bind(this);
    this.formatRupiah = this.formatRupiah.bind(this)
    this.formatDate = this.formatDate.bind(this)
  }

  
  tambahItem (obj){
    let newData = [...this.state.summary, obj]
    let dataUangIN = newData.filter ((item) => item.category === 'IN');
    let nominalUangIN = dataUangIN.map((item) => item.nominal)
    let jumlahUangIn = nominalUangIN.reduce((total,num) => total + num,0)
   // console.log(jumlahUangIn)
    let dataUangOUT = newData.filter ((item) => item.category === 'OUT');
    let nominalUangOUT = dataUangOUT.map((item) => item.nominal)
    let jumlahUangOUT = nominalUangOUT.reduce((total,num) => total + num,0)
   // console.log(jumlahUangOUT)
   this.setState({
     pemasukanUang : jumlahUangIn,
     transaksiIn : nominalUangIN.length,
     pengeluaranUang : jumlahUangOUT,
     transaksiOut : nominalUangOUT.length,
     sisaUang :  jumlahUangIn - jumlahUangOUT,
     persentaseUang : (((jumlahUangIn - jumlahUangOUT) /  jumlahUangIn) * 100).toFixed(2),
     summary : newData
   })
  }

  formatRupiah(money) {
    return new Intl.NumberFormat('id-ID',
     { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 } // diletakkan dalam object
   ).format(money);
 }

  formatDate(d) {
    var date = new Date(d);
    var month = new Array();
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "Jun";
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Sept";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";
    let day = date.getDate();
    return day + " " + month[date.getMonth()] +" "+ date.getFullYear();
  }


  Hitung () {
    let dataUangIN = this.state.summary.filter ((item) => item.category === 'IN');
    let nominalUangIN = dataUangIN.map((item) => item.nominal)
    let jumlahUangIn = nominalUangIN.reduce((nominalbefore,nominalafter) => nominalbefore + nominalafter)
   // console.log(jumlahUangIn)
    let dataUangOUT = this.state.summary.filter ((item) => item.category === 'OUT');
    let nominalUangOUT = dataUangOUT.map((item) => item.nominal)
    let jumlahUangOUT = nominalUangOUT.reduce((nominalbefore,nominalafter) => nominalbefore + nominalafter)
   // console.log(jumlahUangOUT)
   this.setState({
     pemasukanUang : jumlahUangIn,
     transaksiIn : nominalUangIN.length,
     pengeluaranUang : jumlahUangOUT,
     transaksiOut : nominalUangOUT.length,
     sisaUang :  jumlahUangIn - jumlahUangOUT,
     persentaseUang : (((jumlahUangIn - jumlahUangOUT) /  jumlahUangIn) * 100).toFixed(2)
   })
  }
  componentDidMount () {
    if (this.state.summary.length === 0 ) {
    } else {
      this.Hitung ()
    }
  }

  render() {
    return (
      <>
        <div className="container py-5">
          <div className="row">
            <div className="col-12 text-center">
              <h1> CASH FLOW APPS</h1>
              <hr className="w-75 mx-auto" />
              <h2>{this.formatRupiah(this.state.sisaUang)}</h2>
              <span className="title-md">
                Uang kamu tersisa {this.state.persentaseUang}% lagi
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
                <h3>{this.formatRupiah(this.state.pemasukanUang)}</h3>
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
                <h3>{this.formatRupiah(this.state.pengeluaranUang)}</h3>
                <div>
                  <span className="title-sm text-ungu">
                    {this.state.transaksiOut}
                  </span>
                  <span className="title-sm">Transaksi</span>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-12 d-flex justify-content-between align-items-center ">
              <h4>Ringkasan Transaksi</h4>
              <div className="wrapper-button d-flex">
                <ModalCreate action={this.tambahItem} category="IN" variant="button biru py-2 px-2 me-2" text="Pemasukan" icon="bi bi-plus-circle-fill" />
                <ModalCreate action={this.tambahItem} category="OUT" variant="button pink py-2 px-2" text="Pengeluaran" icon="bi bi-dash-circle-fill" />
              </div>
            </div>
          </div>

          <div className="row mt-2 ">
            {this.state.summary.length === 0 && <Alert /> }
            {this.state.summary.map((sum, index) => {
              return (
                <div key={index} className="col-12 d-flex  justify-content-between align-items-center mt-3">
                  <div className="d-flex align-items-center">
                    <div className={sum.category === "IN" ? "icon-wrapper1" : "icon-wrapper2"}>
                      <i className={ sum.category === "IN" ? "bi bi-wallet2" : "bi bi-bag-dash"}></i>
                    </div>
                    <div className="transaction ms-3 d-flex flex-column">
                      <h6> {sum.deskripsi}</h6>
                      <span className="title-sm">{this.formatDate(sum.tanggal)}</span>
                    </div>
                  </div>
                  <h5
                    className={
                      sum.category === "IN" ? "text-money-in" : "text-money-out"}>{this.formatRupiah(sum.nominal)}
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
