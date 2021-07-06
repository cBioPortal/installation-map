import React from "react";
import PlaceIcon from "./PlaceIcon";
import { Marker } from "react-simple-maps";
import * as Config from "../utils/Config";
import * as EventHandlers from "../utils/EventHandlers";
import * as Renderers from "../utils/Renderers";
import * as StateUpdaters from "../utils/StateUpdaters";
import * as Types from "../utils/Types";


const RowCounting = (props: Types.rowCounterProp): JSX.Element =>{
    const givenRow = props.givenCombinedRow;
    const numberOfRows = givenRow.rows.length;
    
    return (
      <h1>{numberOfRows}</h1>
    )
  }

  export default RowCounting;