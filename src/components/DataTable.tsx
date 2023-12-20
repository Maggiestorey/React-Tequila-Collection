import { useState } from 'react'
import Button from "./Button"
import Modal from "./Modal"
import { server_calls } from '../api/server';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetData } from '../custom-hooks/FetchData';


const columns: GridColDef[] = [
    { field: 'id', headerName: "ID", width: 90, },
    { field: 'tequila', headerName: 'Tequila Name', flex: 1 },
    { field: 'type', headerName: 'Type', flex: 1 },
    { field: 'abv', headerName: 'Abv', flex: 1 },
    { field: 'region', headerName: 'Region', flex: 2 }
]


function DataTable() {
    let [ open, setOpen ] = useState(false);
    const { collectionData, getData } = useGetData();
    const [ selectionModel, setSelectionModel ] = useState<string[]>([])

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const deleteData = () => {
        server_calls.delete(selectionModel[0])
        getData();
        console.log(`Selection model: ${selectionModel}`)
        setTimeout( () => {window.location.reload()}, 500)
    }


  return (
    <>
       <Modal 
            open={open}
            onClose={handleClose}
        />
        <div className="flex flex-row">
            <div>
                <Button
                    className='p-3 bg-slate-300 m-3 rounded hover:bg-slate-800 hover:text-white'
                    onClick={() => handleOpen()}
                >
                    Add New Tequila
                </Button>
            </div>
            <Button onClick={handleOpen} className="p-3 bg-slate-300 m-3 rounded hover:bg-slate-800 hover:text-white">Update</Button>
            <Button  onClick={deleteData} className="p-3 bg-slate-300 m-3 rounded hover:bg-slate-800 hover:text-white">Delete</Button>
        </div>
        <div className={ open ? "hidden" : "container mx-10 my-5 flex flex-col" } style={{ height: 400, width: '100%' }}>
            <h2 className="p-3 bg-slate-300 my-2 rounded">My Collection</h2>
            <DataGrid 
                rows={collectionData} 
                columns={columns} 
                checkboxSelection={true} 
                onRowSelectionModelChange={ (item:any) => {
                setSelectionModel(item);
            }}
            componentsProps={{
                pagination: {
                    rowsPerPageOptions: [5]
                }
            }}
            />
        </div>
    </>
    )
}

export default DataTable