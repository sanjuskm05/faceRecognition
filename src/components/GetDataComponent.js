import React from "react";


function GetDataComponent({ result }) {
  return (
    <div>
      <img
        src={`https://cdn.filestackcontent.com/${result}`}
        alt="image"
        className="imagesize"
      />

      {/* this is a new something */}
      {/* {result.map((i, index) => (
        <div key={index} className="imagesize">
          <img src={i.image} alt="image" className="imagesize" />
        </div>
      ))} */}
    </div>
  );
}

export default GetDataComponent;
