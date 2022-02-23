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
    const [listData, setListData] = useState();
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
                'Authorization': localStorage.getItem('token')
            },
        }).then(res=>{
            setListData(res.data.data);
            setFilteredData(res.data.data);
        }
        ).catch(err=>{
            console.log(err);
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