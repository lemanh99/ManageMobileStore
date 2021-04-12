import React from "react";
import { Modal } from "react-bootstrap";
import { ConvertIOStoDate } from "./ConvertStringToTime";

const InvoiceModal = (props) => {
  const { order, customer } = props;
  const print = () => {
    var content = document.getElementById("printarea");
    var pri = document.getElementById("ifmcontentstoprint").contentWindow;
    pri.document.open();
    pri.document.write(content.innerHTML);
    pri.document.close();
    pri.focus();
    pri.print();
  };
  const date = new Date();
  console.log(order.productDetail);
  return (
    <Modal size="xl" show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Invoice</Modal.Title>
      </Modal.Header>
      <iframe
        id="ifmcontentstoprint"
        style={{
          height: "0px",
          width: "0px",
          position: "absolute",
        }}
      ></iframe>
      <Modal.Body id="printarea">
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="invoice p-3 mb-3">
                  {/* title row */}
                  <div className="row">
                    <div className="col-12">
                      <h4>
                        <i className="fas fa-globe" /> Mobile Store
                        <small className="float-right">
                          Date:{" "}
                          {date.getDate() +
                            "/" +
                            (date.getMonth() + 1) +
                            "/" +
                            date.getFullYear()}
                        </small>
                      </h4>
                    </div>
                    {/* /.col */}
                  </div>
                  {/* info row */}
                  <div className="row invoice-info">
                    <div className="col-sm-4 invoice-col">
                      From
                      <address>
                        <strong>Mobile Store </strong>
                        <br />
                        Da Nang City, VietName
                        <br />
                        Phone: 082292000
                        <br />
                        Email: info@mobilestore.com
                      </address>
                    </div>
                    {/* /.col */}
                    <div className="col-sm-4 invoice-col">
                      To
                      <address>
                        <strong>
                          {customer.firstName + " " + customer.lastName}
                        </strong>
                        <br />
                        Address: {customer.address ? customer.address : null}
                        <br />
                        Phone:{" "}
                        {customer.phoneNumber ? customer.phoneNumber : null}
                        <br />
                        Email: {customer.email ? customer.email : null}
                      </address>
                    </div>
                    {/* /.col */}
                    <div className="col-sm-4 invoice-col">
                      {/* <b>Invoice #007612</b> */}
                      <br />
                      <br />
                      <b>Order ID:</b> {order.codeBill}
                      <br />
                      <b>Order date:</b> {ConvertIOStoDate(order.createdAt)}
                      <br />
                    </div>
                    {/* /.col */}
                  </div>

                  <div className="row">
                    <div className="col-12 table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>No.</th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.productDetail
                            ? order.productDetail.map((product, index) => (
                                <tr>
                                  <td>{index}</td>
                                  <td>{product._id}</td>
                                  <td>{product.purchasedQty}</td>

                                  <td>{product.payablePrice}</td>
                                </tr>
                              ))
                            : null}
                        </tbody>
                      </table>
                    </div>
                    {/* /.col */}
                  </div>
                  {/* /.row */}
                  <div className="row">
                    <div className="col-6">
                      <p>
                        <b>Payment Methods:</b>

                        {order.paymentType === "cod"
                          ? "Cash to deliver"
                          : "Card online"}
                      </p>
                      <p >
                        <b>Payment Status :</b>

                        {order.paymentStatus}
                      </p>
                    </div>
                    {/* /.col */}
                    <div className="col-6">
                      <p className="lead">Amount Due 2/22/2014</p>
                      <div className="table-responsive">
                        <table className="table">
                          <tbody>
                            <tr>
                              <th style={{ width: "50%" }}>Subtotal:</th>
                              <td>${order.totalAmount}</td>
                            </tr>
           
                            <tr>
                              <th>Shipping:</th>
                              <td>$0</td>
                            </tr>
                            <tr>
                              <th>Total:</th>
                              <td>${order.totalAmount}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    {/* /.col */}
                  </div>
                  {/* /.row */}
                  {/* this row will not appear when printing */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </Modal.Body>
      <Modal.Footer>
        <div className="row no-print">
          <div className="col-12">
            <button
              type="button"
              className="btn btn-warning float-right"
              style={{ marginRight: "5px" }}
              onClick={props.handleClose}
            >
              <i className="fas fa-backspace" /> Back
            </button>
            <button
              type="button"
              className="btn btn-danger float-right"
              style={{ marginRight: "5px" }}
            >
              <i className="fas fa-trash" /> Cancel
            </button>

            <button
              type="button"
              className="btn btn-success float-right"
              style={{ marginRight: "5px" }}
            >
              <i className="far fa-credit-card" /> Delivery
            </button>
            <button
              type="button"
              className="btn btn-primary float-right"
              style={{ marginRight: "5px" }}
              onClick={print}
            >
              <i className="fas fa-print" /> Print
            </button>
          </div>
        </div>

        {/* <Button
          variant="primary"
          {...props}
          className="btn btn-warning  btn-secondary"
          onClick={props.handleClose}
        >
          Back
        </Button> */}
      </Modal.Footer>
    </Modal>
  );
};

export default InvoiceModal;