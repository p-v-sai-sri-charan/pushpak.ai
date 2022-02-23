import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";
import { useHistory } from "react-router-dom";
import moment from "moment-timezone";
import { Paginator } from "primereact/paginator";
import { Ripple } from "primereact/ripple";
import { classNames } from "primereact/utils";

function VechicleLog() {
  moment.tz.add(
    "Asia/Calcutta|HMT BURT IST IST|-5R.k -6u -5u -6u|01232|-18LFR.k 1unn.k HB0 7zX0"
  );
  moment.tz.link("Asia/Calcutta|Asia/Kolkata");
  const [value1, setValue1] = useState(null);
  const [dateRange, setDateRange] = useState("");
  const [listData, setListData] = useState();
  const history = useHistory();
  const [filteredData, setFilteredData] = useState(listData);
  // const [first, setFirst] = useState(0);
  // const [basicRows, setBasicRows] = useState(5);
  const [totalRecords, setTotalRecords] = useState(55);

  const [customFirst1, setCustomFirst1] = useState(0);
  const [customRows1, setCustomRows1] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInputTooltip, setPageInputTooltip] = useState(
    "Press 'Enter' key to go to this page."
  );

  const onCustomPageChange1 = (event) => {
    setCustomFirst1(event.first);
    setCustomRows1(event.rows);
    setCurrentPage(event.page + 1);
  };
  const onPageInputKeyDown = (event, options) => {
    if (event.key === "Enter") {
      const page = parseInt(currentPage);
      if (page < 0 || page > options.totalPages) {
        setPageInputTooltip(
          `Value must be between 1 and ${options.totalPages}.`
        );
      } else {
        const first = currentPage ? options.rows * (page - 1) : 0;

        setCustomFirst1(first);
        setPageInputTooltip("Press 'Enter' key to go to this page.");
      }
    }
  };

  const onPageInputChange = (event) => {
    setCurrentPage(event.target.value);
  };

  const template1 = {
    layout: "PrevPageLink PageLinks NextPageLink",
    PrevPageLink: (options) => {
      return (
        <button
          type="button"
          className={options.className}
          onClick={options.onClick}
          disabled={options.disabled}
        >
          <span className="p-3">Previous</span>
          <Ripple />
        </button>
      );
    },
    NextPageLink: (options) => {
      return (
        <button
          type="button"
          className={options.className}
          onClick={options.onClick}
          disabled={options.disabled}
        >
          <span className="p-3">Next</span>
          <Ripple />
        </button>
      );
    },
    PageLinks: (options) => {
      if (
        (options.view.startPage === options.page &&
          options.view.startPage !== 0) ||
        (options.view.endPage === options.page &&
          options.page + 1 !== options.totalPages)
      ) {
        const className = classNames(options.className, { "p-disabled": true });

        return (
          <span className={className} style={{ userSelect: "none" }}>
            ...
          </span>
        );
      }

      return (
        <button
          type="button"
          className={options.className}
          onClick={options.onClick}
        >
          {options.page + 1}
          <Ripple />
        </button>
      );
    },
    RowsPerPageDropdown: (options) => {
      const dropdownOptions = [
        { label: 10, value: 10 },
        { label: 20, value: 20 },
        { label: 30, value: 30 },
        { label: "All", value: options.totalRecords },
      ];

      return (
        <Dropdown
          value={options.value}
          options={dropdownOptions}
          onChange={options.onChange}
        />
      );
    },
    CurrentPageReport: (options) => {
      return (
        <span
          className="mx-3"
          style={{ color: "var(--text-color)", userSelect: "none" }}
        >
          Go to{" "}
          <InputText
            size="2"
            className="ml-1"
            value={currentPage}
            tooltip={pageInputTooltip}
            onKeyDown={(e) => onPageInputKeyDown(e, options)}
            onChange={onPageInputChange}
          />
        </span>
      );
    },
  };
  const vehicleImage = (rowData) => {
    return (
      <React.Fragment>
        <img
          src={rowData.vehicleImage}
          alt="vehicleImage"
          style={{ width: "100px", height: "100px" }}
        />
      </React.Fragment>
    );
  };
  const viewDetail = (rowData) => {
    return (
      <React.Fragment>
        <button
          className="btn btn-primary text-blue-400 underline"
          onClick={() => history.push(`/vechicle-log/${rowData.id}`)}
        >
          View Detail
        </button>
      </React.Fragment>
    );
  };
  const handleSearchData = (e) => {
    setValue1(e.target.value);
    handleSearch();
  };
  const handleSearch = (e) => {
    if (value1 === "") {
      setFilteredData(listData);
    } else {
      let filterData = listData.filter((item) =>
        item.vehicleNumber.toLowerCase().includes(value1.toLowerCase())
      );
      setFilteredData(filterData);
    }
  };
  useEffect(() => {}, [filteredData, value1]);
  useEffect(() => {
    axios
      .get(
        `http://anpr.pushpak.cloud:5001/visitor?page=${currentPage}&limit=5`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setListData(res.data.data);
        setFilteredData(res.data.data);
        setTotalRecords(parseInt(res.data.pagination.totalRecords));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentPage]);

  const entryTime = (rowData) => {
    const Time = moment
      .tz(rowData.entryTime, "YYYY-MM-DD HH", "Asia/Calcutta")
      .utc()
      .format("HH:mm:ss");
    return (
      <React.Fragment>
        <div className="flex flex-col">
          <span>{Time}</span>
        </div>
      </React.Fragment>
    );
  };
  const entryDate = (rowData) => {
    const date = moment
      .tz(rowData.entryTime, "YYYY-MM-DD HH", "Asia/Calcutta")
      .utc()
      .format("DD-MM-YYYY");
    return (
      <React.Fragment>
        <div className="flex flex-col">
          <span>{date}</span>
        </div>
      </React.Fragment>
    );
  };

  const exitTime = (rowData) => {
    const Time = moment
      .tz(rowData.exitTime, "YYYY-MM-DD HH", "Asia/Calcutta")
      .utc()
      .format("HH:mm:ss");
    return (
      <React.Fragment>
        <div className="flex flex-col">
          <span>{Time}</span>
        </div>
      </React.Fragment>
    );
  };
  const exitDate = (rowData) => {
    const date = moment
      .tz(rowData.exitTime, "YYYY-MM-DD HH", "Asia/Calcutta")
      .utc()
      .format("DD-MM-YYYY");
    return (
      <React.Fragment>
        <div className="flex flex-col">
          <span>{date}</span>
        </div>
      </React.Fragment>
    );
  };

  return (
    <div className="flex flex-col pt-4">
      <div className="flex flex-row justify-between gap-16">
        <div className="flex gap-8 items-center flex-row w-full">
          <div className="">
            <span className="text-black font-bold text-xl">Vehicle Log</span>
          </div>
          <div className="pt-4">
            <span className="p-input-icon-right ">
              <i className="pi pi-search text-xl" />
              <InputText
                value={value1}
                onChange={(e) => handleSearchData(e)}
                placeholder="Search"
                className="text-xl w-96 "
              />
            </span>
          </div>
        </div>
        <div className="pt-4">
          <Dropdown disabled={true} placeholder="Filter by:" />
        </div>
      </div>
      <div className="flex w-full justify-end items-center pt-4 pb-4">
        <Calendar
          id="range"
          value={dateRange}
          onChange={(e) => setDateRange(e.value)}
          selectionMode="range"
          readOnlyInput
          placeholder="Filter by Date Range"
        />
      </div>

      <div
        className="w-full "
        style={{
          height: "80vh",
        }}
      >
        <DataTable
          value={filteredData}
          paginator={false}
          rows={5}
          responsiveLayout="scroll"
        >
          <Column
            field="vehicleImage"
            body={vehicleImage}
            header="Vehicle Photo"
          ></Column>
          <Column field="vehicleNumber" header="Vehicle Number"></Column>
          <Column
            field="entryDate"
            body={entryDate}
            header="Entry Date"
          ></Column>
          <Column
            field="entryTime"
            body={entryTime}
            header="Entry Time"
          ></Column>
          <Column field="exitTime" body={exitDate} header="Exit Date"></Column>
          <Column field="exitTime" body={exitTime} header="Exit Time"></Column>
          <Column body={viewDetail}></Column>
        </DataTable>
        <Paginator
          template={template1}
          first={customFirst1}
          rows={customRows1}
          totalRecords={totalRecords}
          onPageChange={onCustomPageChange1}
        ></Paginator>
      </div>
    </div>
  );
}

export default VechicleLog;
