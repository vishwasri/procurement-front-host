import React, { useState, useEffect } from "react";
import { Table, Button } from "reactstrap";
import { Link } from "react-router-dom";

import getMSRs from "../../../services/getMSRs";
import AdminViewMSRItems from "./AdminviewMSRItems";

function AdminViewMSR({ viewItems }) {
  const [msrs, setmsrs] = useState([]);

  const [isModalOpen, setisModalOpen] = useState(false);
  const [modalItems, setmodalItems] = useState([]);

  useEffect(() => {
    async function fetchMSRs() {
      const results = await getMSRs();
      console.log(results);
      setmsrs(results);
    }

    fetchMSRs();
  }, []);

  const viewModal = (p) => {
    viewItems(p);
    console.log("clicked", p);
    setisModalOpen(true);
  };

  return (
    <div>
      <div className="row">
        <Link to="/admin/documents">
          <button className="btn btn-outline-dark">Back</button>
        </Link>
      </div>
      <h6
        className="pl-5 pt-1 pb-1 mb-5 mt-4"
        style={{ backgroundColor: "gray" }}
      >
        MSR List
      </h6>
      <Table hover borderless>
        <thead className="text-center">
          <tr>
            <th>View</th>
            <th>MSR No</th>
            <th>Status</th>
            <th>Date</th>
            <th>Time</th>
            <th>Created</th>
            <th>Approved/ Rejected</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {msrs.map((p) => {
            // setsubTotal(subTotal + p.user.total)

            return (
              <tr style={{ textAlign: "center" }} key={p._id}>
                <td>
                  <Link to="/admin/documents/msrs/items">
                    <button
                      onClick={() => viewModal(p)}
                      className="btn btn-primary"
                    >
                      View
                    </button>
                  </Link>
                </td>
                <td className="text-center">{p.msrNo && p.msrNo}</td>
                <td
                  className="text-center"
                  className={
                    p.status == "Approved"
                      ? "text-success"
                      : p.status == "Rejected"
                      ? "text-danger"
                      : p.status == "Recreated" && "text-primary"
                  }
                >
                  {p.status}
                </td>
                <td className="text-center">
                  {new Date(p.timeStamp).toLocaleDateString()}
                </td>
                <td className="text-center">
                  {new Date(p.timeStamp).toLocaleTimeString()}
                </td>
                <td className="text-center">
                  {p.createdBy && p.createdBy.username}
                </td>
                <td className="text-center">
                  {p.approvedBy ? p.approvedBy.username : "Pending..."}
                </td>
              </tr>
            );
          })}
          {/* <tr>
            <ViewMSRItems
              isModalOpen={isModalOpen}
              setisModalOpen={setisModalOpen}
              msrs={modalItems}
            />
          </tr> */}
        </tbody>
      </Table>
    </div>
  );
}

export default AdminViewMSR;
