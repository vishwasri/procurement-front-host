import React, { useState, useEffect } from "react";
import { Button, Table } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import Loader from "react-loader-spinner";

import getOneMSR from "../../services/getOneMSR";

function ViewMSRItems({ approveItem, rejectItem }) {
  const { id } = useParams();
  const [selectedMSR, setselectedMSR] = useState(null);
  const [loading, setloading] = useState(false);

  const [reason, setreason] = useState("");

  useEffect(() => {
    async function fetchMSR() {
      const results = await getOneMSR(id);
      setselectedMSR(results);
    }
    fetchMSR();
  }, [id]);

  const onchange = (e) => {
    setreason(e.target.value);
  };

  const remarksStyle = {
    maxWidth: "200px",
    maxHeight: "200px",
  };

  const approve = () => {
    setloading(true);
    approveItem(id);
    setloading(false);
  };
  const reject = () => {
    setloading(true);
    rejectItem(id, reason);
    setloading(false);
  };

  return (
    <>
      {!selectedMSR || loading ? (
        <div className="container text-center" style={{ width: "793px" }}>
          <Loader
            type="Puff"
            color="#050A30"
            height={100}
            width={100}
            timeout={5000}
          />
        </div>
      ) : (
        <div>
          <h6
            className="pl-5 pt-1 pb-1 mb-5 mt-4"
            style={{ backgroundColor: "gray" }}
          >
            MSR
          </h6>
          <div className="row">
            <div className="col-8">
              <div className="row ml-3">
                <div className="col-3">MSR No : </div>
                <div className="col-8">
                  <strong>{selectedMSR.msrNo}</strong>
                </div>
              </div>
              <div className="row ml-3">
                <div className="col-3">Project : </div>
                <div className="col-8">
                  <strong>{selectedMSR.project.name}</strong>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="row">
                <div className="col-5">MSR Date : </div>
                <div className="col-7">
                  <strong>
                    {new Date(selectedMSR.timeStamp).toLocaleDateString()}
                  </strong>
                </div>
              </div>
            </div>
          </div>
          <div className="row ml-3 mt-5">
            <p>
              <span style={{ color: "red" }}>Reasons for Rejecting : </span>{" "}
              {selectedMSR.reasons}
            </p>
          </div>

          <Table hover borderless className="mt-3">
            <thead className="text-center">
              <tr>
                <th>No</th>
                <th>Description</th>
                <th>Unit</th>
                <th>Quantity</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {selectedMSR?.items?.map((p, index) => {
                return (
                  <tr key={index}>
                    <td className="text-center">
                      <strong>{index + 1}</strong>
                    </td>
                    <td className="text-center">{p.description}</td>
                    <td className="text-center">{p.unit}</td>
                    <td className="text-center">{p.quantity}</td>
                    <td className="text-center" style={remarksStyle}>
                      {p.remarks}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Link to="/site-supervisor/view-msr">
            <Button color="warning" className="float-right mr-2">
              Close
            </Button>
          </Link>

          <Button
            onClick={approve}
            color="success"
            className="float-right mr-2"
            disabled={selectedMSR.status === "Approved"}
          >
            Approve
          </Button>
          <Button
            onClick={reject}
            color="danger"
            className="float-right mr-2"
            disabled={!reason || selectedMSR.status === "Rejected"}
          >
            Reject
          </Button>
          <div className="form-group col-7 ml-5">
            <textarea
              onChange={onchange}
              value={reason}
              columns="1"
              placeholder="Reasons for Rejecting ..."
              className="form-control col-12 ml-3"
              type="text"
              id="reason"
              name="reason"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default ViewMSRItems;
