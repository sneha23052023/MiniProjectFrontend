import React from 'react'
export default function Output(props) {
  return (
    <div
      className={`w-full h-full ${props.darkmode ? "bg-[#1E1E1E] text-white" : "bg-gray-100 text-black"} `}
    >
      <h2 className="shadow-2xl font-mono ml-5">Output</h2>
      <div
        className={`p-4 rounded border border-gray-300 overflow-auto ${props.darkmode ? "bg-gray-700 text-white" : "bg-gray-100 text-black"} mt-5 ml-5`}
        style={{ whiteSpace: "pre-wrap" }}
      >
        Output will appear here after you run the code.
      </div>
    </div>
  )
}
