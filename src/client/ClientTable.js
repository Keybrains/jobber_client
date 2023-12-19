import {
  Table,
  Popover,
  Whisper,
  Checkbox,
  Dropdown,
  IconButton,
  Progress,
} from "rsuite";
import MoreIcon from "@rsuite/icons/legacy/More";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import teamMembers from "../data/teamMembers";
import "rsuite/dist/rsuite.min.css";
import React from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, } from '@themesberg/react-bootstrap';

import { Routes } from "../routes";

const { Column, Row, HeaderCell, Cell } = Table;
const data = teamMembers;


const ImageCell = ({ rowData, dataKey, ...props }) => (
  <Cell {...props} style={{ padding: 0 }}>
    <div
      className="text-center justify-content-center"
      style={{
        background: "#f5f5f5",
        borderRadius: 6,
        marginTop: 2,
        overflow: "hidden",
        display: "inline-block",
        margin: 10,
      }}
    >
      <img src={rowData.image} width="30" />
    </div>
  </Cell>
);

const CheckCell = ({ rowData, onChange, checkedKeys, dataKey, ...props }) => (
  <Cell {...props} style={{ padding: 0 }}>
    <div style={{ lineHeight: "46px" }}>
      <Checkbox
        value={rowData[dataKey]}
        inline
        onChange={onChange}
        checked={checkedKeys.some((item) => item === rowData[dataKey])}
      />
    </div>
  </Cell>
);

const renderMenu = ({ onClose, left, top, className }, ref) => {
  const handleSelect = (eventKey) => {
    onClose();
    console.log(eventKey);
  };
  return (
    <Popover ref={ref} className={className} style={{ left, top }} full>
      <Dropdown.Menu onSelect={handleSelect}>
        <Dropdown.Item eventKey={1}>Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Popover>
  );
};

const ClientTable = ({ userClients, deleteRow }) => {
  const clientId =
    userClients && userClients.length > 0 ? userClients[0].client_id : null;
  // const clientId = userClients?.client_id
  console.log(clientId, "clientIdddd");
  const history = useHistory();

  const [checkedKeys, setCheckedKeys] = React.useState([]);
  let checked = false;
  let indeterminate = false;

  if (checkedKeys.length === data.length) {
    checked = true;
  } else if (checkedKeys.length === 0) {
    checked = false;
  } else if (checkedKeys.length > 0 && checkedKeys.length < data.length) {
    indeterminate = true;
  }

  const handleCheckAll = (value, checked) => {
    const keys = checked ? data.map((item) => item.client_id) : [];
    setCheckedKeys(keys);
  };
  const handleCheck = (value, checked) => {
    const keys = checked
      ? [...checkedKeys, value]
      : checkedKeys.filter((item) => item !== value);
    setCheckedKeys(keys);
  };

  const ActionCell = ({ rowData, dataKey, ...props }) => {
    const handleSelect = (e) => {
      deleteRow(rowData._id);
    };
    return (
      <Cell {...props} className="link-group" style={{ minHeight: 50 }}>
        {/* <Whisper placement="autoVerticalStart" trigger="click" speaker={renderMenu}>
                </Whisper> */}

        <FontAwesomeIcon
          style={{ cursor: "pointer" }}
          onClick={handleSelect}
          icon={faTrash}
        />

        {/* <Button variant="outline-primary" onClick={() => handleSelect()}>
          <FontAwesomeIcon icon={faTrash} />
        </Button> */}
      </Cell>
    );
  };
  console.log(userClients, "userClients");
  const handleRowClick = (rowData) => {
    const clientId = rowData.client_id;
    localStorage.setItem('selectedClientId', clientId);
    // Redirect to the Properties page with the specific clientId
    history.push(`/properties/${clientId}`);
  };

  const NameCell = ({ rowData, dataKey, dataKey2, ...props }) => {
    const speaker = (
      <Popover title="Description">
        <p>
          <b>Name:</b> {rowData.name}
        </p>
        <p>
          <b>Gender:</b> {rowData.gender}
        </p>
        <p>
          <b>City:</b> {rowData.city}
        </p>
        <p>
          <b>Street:</b> {rowData.street}
        </p>
      </Popover>
    );
  
    return (
      <Cell {...props} onClick={()=>{handleRowClick(rowData)}}>
        <Whisper placement="top" speaker={speaker}>
          {dataKey2 == undefined ? (
            <a >{rowData[dataKey]}</a>
          ) : (
            <a className="text-blue">{rowData[dataKey] + " " + rowData[dataKey2]}</a>
          )}
        </Whisper>
      </Cell>
    );
  };

  return (
    <Table
      height={300}
      data={userClients}
      className="mx-2 px-2"
      id="table"
    >
      <Column flexGrow={3}>
        <HeaderCell>Name</HeaderCell>
        <NameCell dataKey="first_name" dataKey2="last_name" />
      </Column>
      <Column flexGrow={3}>
        <HeaderCell>Company Name</HeaderCell>
        <NameCell dataKey="company_name" />
      </Column>

      <Column flexGrow={3}>
        <HeaderCell>Phone</HeaderCell>
        <Cell>{(rowData) => `${rowData.phone}`}</Cell>
      </Column>

      <Column flexGrow={3}>
        <HeaderCell height={20}>Action</HeaderCell>
        <ActionCell dataKey="client_id" />
      </Column>
    </Table>
  );
};

export default ClientTable;
