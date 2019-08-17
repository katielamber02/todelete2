import React from "react";

export default function SearchResults() {
  return (
    <div>
      Search Results:
      <div onClick={() => console.log("pressed")}>List 1</div>
      <div onClick={() => console.log("pressed")}>List 2</div>
    </div>
  );
}
