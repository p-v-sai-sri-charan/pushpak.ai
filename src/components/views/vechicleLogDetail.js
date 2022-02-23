import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom';
import { Image } from 'primereact/image';
import axios from 'axios';

function VechicleLogDetail() {
    let { id } = useParams();
    const [data, setData] = useState([]);
    const [vechicleDetails, setVechicleDetails] = React.useState([]);
    useEffect(() => {
      axios.get("http://anpr.pushpak.cloud:5001/visitor",{
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Authorization': localStorage.getItem('token')
            },
        }).then(res=>{
            setData(res.data.data);
        }
        ).catch(err=>{
            console.log(err);
        })
     const items =  data.filter(item => item.id === parseInt(id));
        setVechicleDetails(items);
    }, [data,id]);
    const vehicleImage = (rowData) => {
        return (
            <React.Fragment>
                <Image src={rowData?.vehicleImage} alt="vehicleImage" style={{ width: '100px', height: '100px' }} />
            </React.Fragment>
        )
    }
  return (
    <div>
        <DataTable
          value={vechicleDetails}
          
          responsiveLayout="scroll"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          rows={10}
          rowsPerPageOptions={[10, 20, 50]}
        >
          <Column field="vehicleImage"  body={vehicleImage} header="Vehicle Photo"></Column>
          <Column field="vehicleNumber" header="Vehicle Number"></Column>
          <Column field="entryTime" header="Entry"></Column>
          <Column field="exitTime" header="Exit"></Column>
        </DataTable>
    </div>
  )
}

export default VechicleLogDetail