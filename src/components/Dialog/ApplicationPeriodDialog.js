
import React,{Fragment} from 'react'

export default function ApplicationPeriodDialog({message,onDialog,thisClicked,periodId}) {
    console.log("message",message)
    console.log("onDialog",onDialog)
    console.log("thisClicked",thisClicked)
    console.log("periodId",periodId)
     return (
         <Fragment>
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        backgroundColor: "rgba(0,0,0,0.5)"
      }}
      onClick={() => onDialog(false,thisClicked,periodId)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          background: "white",
          padding: "20px",
          borderRadius: "10px"
        }}
      >
        <h3 stlye={{ color: "#111", fontSize: "16px" }}>{message}</h3> 
        <h1 style={{ color: "blue", fontSize: "24px" }}>{thisClicked.innerText}</h1>
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            onClick={() => onDialog(true,thisClicked,periodId)}
            style={{
              background: "red",
              color: "white",
              padding: "10px",
              marginRight: "4px",
              border: "none",
              cursor: "pointer"
            }}
          >
            Yes
          </button>
          <button
            onClick={() => onDialog(false,thisClicked,periodId)}
            style={{
              background: "green",
              color: "white",
              padding: "10px",
              marginLeft: "4px",
              border: "none",
              cursor: "pointer"
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  
        </Fragment>
    )
}

