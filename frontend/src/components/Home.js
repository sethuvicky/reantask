/* eslint-disable no-unused-expressions */
import React, {  useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import AddorEdit from "./AddorEdit";
import View from "./View";
import { Edit, Eye, Trash } from "react-feather";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
const Table = () => {

  let [datas, setData] = useState([]);
  const toggles = () => {
    setModal(!modal);
  };
  const toggles2 = () => {
    setModal2(!modal2);
  };

  let [userValues, setUserValues] = useState({});
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);

  const [Edits, setEdits] = useState(false);
  let getData = () => {
    axios
      .get("http://localhost:4000/api/tasks", { withCredentials: true })
      .then((response) => {
        setData(response.data);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  let DeleteHandler = (id) => {
    console.log(id);
    axios.delete(`http://localhost:4000/api/delete/${id}`).then((response) => {
      console.log(response);
      getData();
      toast.success("task deleted successfuly");
    });
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const columns = [
    {
      name: "text",
      selector: "text",
      width: 20,
      sortable: true,
      grow: 2,
      cell: (row) => {
        return (
          <div>
            <input
              style={{ margin: "1rem" }}
              type={"checkbox"}
              checked={row.done}
              onClick={() => updatetask(row)}
            />
            {row.done ? <del>{row.text}</del> : row.text}
          </div>
        );
      },
    },
    {
      name: "category",
      width: 20,
      selector: "category",
      sortable: true,
    },
    {
      name: "actions",
      selector: "website",
      sortable: true,
      cell: (row) => {
        // eslint-disable-next-line no-unused-expressions
        return (
          <>
            <Eye
              style={{ margin: "0.2rem", cursor: "pointer", color: "blue" }}
              onClick={() => {
                setUserValues({
                  text: row.text,
                  description: row.description,
                  category: row.category,
                  _id: row._id,
                });
                toggles2();
              }}
              className="cursor-pointer mr-1"
              size={18}
            />

            <Edit
              style={{ margin: "0.2rem", cursor: "pointer", color: "green" }}
              onClick={() => {
                toggles();
                setEdits(true);
                setUserValues({
                  text: row.text,
                  description: row.description,
                  category: row.category,
                  _id: row._id,
                });
              }}
              className="cursor-pointer mr-1"
              size={16}
            />

            <Trash
              style={{ margin: "0.2rem", cursor: "pointer", color: "red" }}
              onClick={() => DeleteHandler(row._id)}
              className="cursor-pointer mr-1"
              size={16}
            />
          </>
        );
      },
    },
  ];

  const [filterText, setFilterText] = React.useState("");

  const filteredItems =
    datas &&
    datas.filter(
      (item) =>
        JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
        -1
    );

  function updatetask(task) {
    const data = { id: task._id, done: !task.done };
    axios
      .post("http://localhost:4000/api/tasks/complete", data, {
        withCredentials: true,
      })
      .then(() => {
        toast.success(`${task.text} marked as completed`);
        const newtasks = datas.map((t) => {
          if (t._id === task._id) {
            t.done = !t.done;
          }
          return t;
        });
        setData([...newtasks]);
      });
  }
  return (
    <div style={{ padding: "2rem" }}>
      <div className="data-list-header d-flex justify-content-between p16 align-items-center flex-wrap border-bottom">
        <div>
          <h4 className="content-header-title m-0">User Tasks</h4>
        </div>
        <div style={{ display: "flex", marginBottom: "10px" }}>
          <input
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            style={{ marginRight: "1rem" }}
            placeholder="search by type "
            type="text"
            className="form-control mr-100"
          />
          <div className="input-group-append">
            <button
              style={{ width: "110px" }}
              onClick={() => {
                toggles(), setEdits(false);
              }}
              className="btn btn-primary "
            >
              + Add New
            </button>
          </div>
        </div>
      </div>
      <div>
        <DataTable
          columns={columns}
          data={filteredItems}
          defaultSortField="name"
          striped
          pagination
          noHeader
        />
      </div>
      {Edits ? (
        <AddorEdit
          toggle={toggles}
          modal={modal}
          edit={true}
          userValues={userValues}
          setUserValues={setUserValues}
          getData={getData}
        />
      ) : (
        <AddorEdit toggle={toggles} modal={modal} getData={getData} />
      )}

      <View toggle={toggles2} userValues={userValues} modal={modal2} />

      <ToastContainer />
    </div>
  );
};

export default Table;
