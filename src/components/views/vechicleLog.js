import React,{ useEffect, useState } from 'react'
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { useHistory } from 'react-router-dom'

function VechicleLog() {
    const [value1, setValue1] = useState(null);
    const [dateRange, setDateRange] = useState('');
    const [listData, setListData] = useState([
        {
        "id": 1,
        "visitorName": null,
        "ownerName": null,
        "mobileNumber": null,
        "vehicleNumber": "MP41BC0824",
        "isActive": 1,
        "department": null,
        "building": null,
        "isArchieved": 0,
        "contactNumber": null,
        "vehicleImage": "https://licenseimage.s3.ap-south-1.amazonaws.com/Mahindra-Bolero524259d.jpg_0001_0182_0251_0110_0031.png",
        "vehicleColor": null,
        "model": null,
        "manfacturer": null,
        "entryTime": "2022-02-14 14:00:00",
        "exitTime": "2022-02-15 14:45:00"
        },
        {
        "id": 2,
        "visitorName": null,
        "ownerName": null,
        "mobileNumber": null,
        "vehicleNumber": "MP41BC0824",
        "isActive": 1,
        "department": null,
        "building": null,
        "isArchieved": 0,
        "contactNumber": null,
        "vehicleImage": "https://licenseimage.s3.ap-south-1.amazonaws.com/Mahindra-Bolero524259d.jpg_0001_0182_0251_0110_0031.png",
        "vehicleColor": null,
        "model": null,
        "manfacturer": null,
        "entryTime": "2022-02-14 14:00:00",
        "exitTime": "2022-02-15 14:45:00"
        },
        {
        "id": 3,
        "visitorName": null,
        "ownerName": null,
        "mobileNumber": null,
        "vehicleNumber": "WB26K7597",
        "isActive": 1,
        "department": null,
        "building": null,
        "isArchieved": 0,
        "contactNumber": null,
        "vehicleImage": "https://licenseimage.s3.ap-south-1.amazonaws.com/Mahindra-Bolero527305c.jpg_0003_0515_0539_0189_0050.png",
        "vehicleColor": null,
        "model": null,
        "manfacturer": null,
        "entryTime": "2022-01-14 08:00:00",
        "exitTime": "2022-01-15 14:45:00"
        },
        {
        "id": 4,
        "visitorName": null,
        "ownerName": null,
        "mobileNumber": null,
        "vehicleNumber": "MH06BC4786",
        "isActive": 1,
        "department": null,
        "building": null,
        "isArchieved": 0,
        "contactNumber": null,
        "vehicleImage": "https://licenseimage.s3.ap-south-1.amazonaws.com/Mahindra-Bolero529017c.jpg_0000_0360_0344_0131_0045.png",
        "vehicleColor": null,
        "model": null,
        "manfacturer": null,
        "entryTime": "2021-08-10 08:00:00",
        "exitTime": "2021-08-11 23:35:00"
        },
        {
        "id": 5,
        "visitorName": null,
        "ownerName": null,
        "mobileNumber": null,
        "vehicleNumber": "TN03J0964",
        "isActive": 1,
        "department": null,
        "building": null,
        "isArchieved": 0,
        "contactNumber": null,
        "vehicleImage": "https://licenseimage.s3.ap-south-1.amazonaws.com/Mahindra-Bolero530318c.jpg_0000_0480_0445_0182_0042.png",
        "vehicleColor": null,
        "model": null,
        "manfacturer": null,
        "entryTime": "2021-09-09 11:00:00",
        "exitTime": "2021-09-09 10:35:00"
        }
        ]
       );
       const history = useHistory();
    const [filteredData, setFilteredData] = useState(listData);
    const vehicleImage = (rowData) => {
        return (
            <React.Fragment>
                <img src={rowData.vehicleImage} alt="vehicleImage" style={{ width: '100px', height: '100px' }} />
            </React.Fragment>
        )
    }
    const viewDetail = (rowData) => {
        return (
            <React.Fragment>
                <button className="btn btn-primary text-blue-400 underline" onClick={()=>history.push(`/vechicle-log/${rowData.id}`)}>View Detail</button>
            </React.Fragment>
        )
    }
    const handleSearchData = (e) => {
        setValue1(e.target.value);
        handleSearch();
    }
    const handleSearch = (e) => {
        if(value1 ===""){
            setFilteredData(listData);
        }
        else{
            let filterData = listData.filter(item => item.vehicleNumber.toLowerCase().includes(value1.toLowerCase()));
            setFilteredData(filterData);
        }
    }
    useEffect(() => {
    }, [filteredData,value1]);
    useEffect(() => {
        axios.get("http://anpr.pushpak.cloud:5001/visitor",{
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
        }).then(res=>{
            setListData(res.data);
        }
        ).catch(err=>{
            setListData([]);
        })
    }, []);

  return (
    <div className='flex flex-col pt-4'>
        <div className='flex flex-row justify-between gap-16'>
        <div className='flex gap-8 items-center flex-row w-full'>
            <div className=''>
                <span className='text-black font-bold text-xl'>
                    Vehicle Log
                </span>
            </div>
            <div className='pt-4'>
            <span className="p-input-icon-right ">
                    <i className="pi pi-search text-xl" />
                    <InputText value={value1} 
                    onChange={(e) => handleSearchData(e)}
                    placeholder="Search"
                    className='text-xl w-96 ' />
                </span>
            </div>
            
        </div>
        <div className='pt-4'>
            <Dropdown 
            disabled={true}
            placeholder="Filter by:" />
            </div>
            </div>
            <div className='flex w-full justify-end items-center pt-4 pb-4'>
            <Calendar id="range" value={dateRange}
             onChange={(e) => setDateRange(e.value)} selectionMode="range" readOnlyInput 
             placeholder='Filter by Date Range'/>
            </div>

            <div className='w-full ' style={{
                height: '80vh',
            }}> 
            <DataTable
          value={filteredData}
          paginator
          responsiveLayout="scroll"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          rows={10}
          rowsPerPageOptions={[10, 20, 50]}
        >
          <Column field="vehicleImage" body={vehicleImage} header="Vehicle Photo"></Column>
          <Column field="vehicleNumber" header="Vehicle Number"></Column>
          <Column field="entryTime" header="Entry"></Column>
          <Column field="exitTime" header="Exit"></Column>
        <Column  body={viewDetail}></Column>
        </DataTable>
            </div>
    </div>
  )
}

export default VechicleLog