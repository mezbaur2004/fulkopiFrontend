import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userlist } from "../../APIRequest/AdminAPIRequest.js";
import AdminHeaderComponent from "./AdminHeaderComponent.jsx";

const ViewUsers = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const data = await userlist();
            setUsers(data || []);
        })();
    }, []);

    return (
        <>
        <AdminHeaderComponent/>
        <div className="container py-4">
            <h2 className="mb-4">Users</h2>

            <div className="table-responsive">
                <table className="table table-striped table-bordered align-middle">
                    <thead className="table-dark">
                    <tr>
                        <th>Action</th>
                        <th>Photo</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Provider</th>
                        <th>Role</th>
                        <th>Created</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((u) => (
                        <tr key={u._id}>
                            <td style={{ width: 100 }}>
                                <button
                                    className="btn btn-sm btn-outline-primary"
                                    onClick={() =>
                                        navigate(`/admin/userlist/invoicelist/${u._id}`)
                                    }
                                >
                                    Invoices
                                </button>
                            </td>
                            <td className="text-center" style={{ width: 72 }}>
                                {u.photo ? (
                                    <img
                                        src={u.photo}
                                        alt={u.firstName}
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                            objectFit: "cover",
                                            borderRadius: "50%",
                                        }}
                                    />
                                ) : (
                                    "—"
                                )}
                            </td>
                            <td>{`${u.firstName || ""} ${u.lastName || ""}`.trim()}</td>
                            <td>{u.email}</td>
                            <td>{u.mobile || "—"}</td>
                            <td>{u.provider}</td>
                            <td>
                                    <span
                                        className={
                                            u.role === "admin"
                                                ? "badge bg-success"
                                                : "badge bg-secondary"
                                        }
                                    >
                                        {u.role}
                                    </span>
                            </td>
                            <td>
                                {u.createdAt || u.createdDate
                                    ? new Date(u.createdAt || u.createdDate).toLocaleString()
                                    : "—"}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    );
};

export default ViewUsers;
