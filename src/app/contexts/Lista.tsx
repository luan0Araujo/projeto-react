
import { useCallback, useEffect, useRef, useState } from "react";
import { requestGet} from "../shared/Api/Api";
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { format } from "date-fns";

export const Lista = (props:any) => {
  
  const gridRef = useRef<AgGridReact>(null);
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
  
    list(props.endereco);
    
},[() => {list(props.endereco)}])

  const list = useCallback(async (endereco) => {

    const resposta = await requestGet(endereco)
    
    if(resposta.data[0].birthDate){
      const data = resposta.data.filter((e:any) => e.birthDate = format(Date.parse(e.birthDate), 'yyyy-MM-dd'))
      setRowData(await data)
    }
    setRowData(await resposta.data)

  }, []);

  const onSelectionChanged = () => {
    const selectedRows = gridRef.current!.api.getSelectedRows();
    props.onSelectionChanged(selectedRows)
    
    
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 360, width: 700}}>
      
      <AgGridReact 
        ref={gridRef}
        rowData={rowData}   
        columnDefs={props.columnDef}
        rowSelection={'single'}
        onSelectionChanged={onSelectionChanged}
        >
      </AgGridReact>
    </div>
  );
};


