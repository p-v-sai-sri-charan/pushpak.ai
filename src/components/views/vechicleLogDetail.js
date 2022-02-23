import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React,{useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { Image } from 'primereact/image';

function VechicleLogDetail() {
    let { id } = useParams();
    const data=[
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
    const [vechicleDetails, setVechicleDetails] = React.useState([]);
    useEffect(() => {
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