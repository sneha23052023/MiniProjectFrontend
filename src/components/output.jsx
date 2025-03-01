import React from 'react'
import { useState } from 'react'
export default function Output(props) {
  return (
    <div
    className={`w-full h-full ${props.darkmode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"} `}
  >
    <h2 className="text-lg font-bold">Output</h2>
    <div
      className={`p-4 rounded border border-gray-300 overflow-auto ${props.darkmode ? "bg-gray-700 text-white" : "bg-gray-100 text-black"}`}
      style={{ whiteSpace: "pre-wrap" }}
    >
      Output will appear here after you run the code.
    </div>
  </div>
  )
}
