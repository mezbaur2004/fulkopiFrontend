import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {userlist} from "../../APIRequest/AdminAPIRequest.js";
import AdminMasterLayout from "./AdminMasterLayout.jsx";

const ViewUsers = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const limit = 2;

    const navigate = useNavigate();

    const fetchUsers = async (pageNumber = 1) => {
        try {
            setLoading(true);
            const fullData = await userlist(pageNumber, limit);
            setUsers(fullData.data || []);
            if (fullData.pagination?.totalPages) {
                setTotalPages(fullData.pagination.totalPages);
                setPage(fullData.pagination.page);
            }
        } catch (err) {

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(page);
    }, [page]);

    const renderPagination = () => {
        const pages = [];
        const maxVisible = 5;
        let start = Math.max(1, page - Math.floor(maxVisible / 2));
        let end = Math.min(totalPages, start + maxVisible - 1);
        if (end - start < maxVisible - 1) {
            start = Math.max(1, end - maxVisible + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(
                <button
                    key={i}
                    className={`btn ${i === page ? "btn-success" : "btn-outline-success"}`}
                    onClick={() => setPage(i)}
                >
                    {i}
                </button>
            );
        }

        return (
            <div className="d-flex justify-content-center align-items-center gap-2 mt-4 flex-wrap">
                <button
                    className="btn btn-outline-primary"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                >
                    « Prev
                </button>
                {pages}
                <button
                    className="btn btn-outline-primary"
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                >
                    Next »
                </button>
            </div>
        );
    };

    document.title = `Admin | Users`;

    return (
        <AdminMasterLayout>
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
                        {loading ? (
                            <tr>
                                <td colSpan={8} className="text-center">Loading...</td>
                            </tr>
                        ) : users.length > 0 ? (
                            users.map((u) => (
                                <tr key={u._id}>
                                    <td style={{width: 100}}>
                                        <button
                                            className="btn btn-sm btn-outline-primary"
                                            onClick={() =>
                                                navigate(`/admin/userlist/invoicelist/${u._id}`)
                                            }
                                        >
                                            Invoices
                                        </button>
                                    </td>
                                    <td className="text-center" style={{width: 72}}>
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
                                    <td style={{whiteSpace: "normal"}}>
                                        {`${u.firstName || ""} ${u.lastName || ""}`.trim()}
                                    </td>
                                    <td>{u.email}</td>
                                    <td>{u.mobile || "—"}</td>
                                    <td>{u.provider || "—"}</td>
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
                                    <td style={{whiteSpace: "nowrap"}}>
                                        {u.createdAt || u.createdDate
                                            ? new Date(u.createdAt || u.createdDate).toLocaleString("en-GB", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })
                                            : "—"}
                                    </td>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8} className="text-center text-muted">
                                    No Users Found
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>

                {totalPages > 1 && renderPagination()}
            </div>
        </AdminMasterLayout>
    );
};

export default ViewUsers;
