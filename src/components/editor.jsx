import React, { useState, useRef, useEffect, act } from "react";
import Assistant from "./assistant";
import { languages } from "../constants/constants";
import Editor from "@monaco-editor/react";
import { Dropdown } from "flowbite-react";
import Output from "./output";
import { isOptionsGroup } from "@mantine/core";
import { useContext } from "react";
import { AuthContext } from "../context/authcontext"
import { saveUserCode,getUserCode } from "../context/dbcontext";

function EditorInterface() {
  const [code, setCode] = useState("");
  const [showTab, setShowTab] = useState("")
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [active, setActive] = useState("javascript");
  const [darkMode, setDarkMode] = useState(false); // Dark mode state
  const { user } = useContext(AuthContext)

  // useEffect(()=>{
  //   codeDetails()
  // },[])

  const editorRef = useRef();

  const beforeMount = async () => {
    const data = await getUserCode(user)
    if (data!="") {
      setCode(data.code)
      setActive(data.language)
    }else{
      setCode(languages[active].structure)
    }
  }

  const handleClick = (t) => {
    if (showTab == t) {
      setShowTab("")
    }
    else {
      setShowTab(t)
    }
  }

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  // Handle language selection
  const handleLanguageChange = (language) => {
    setActive(language);
    setCode(languages[language].structure); // Set the basic structure for the selected language
  };

  // Simulated Run Code Handler
  const LanguageDropdown = () => {
    return (<Dropdown
      label={
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src={languages[active].logo}
            alt={`${active} Logo`}
            style={{ width: "20px", height: "20px" }}
          />
          {active.charAt(0).toUpperCase() + active.slice(1)}
        </div>
      }
      dismissOnClick={true}
      inline
      className={'relative z-50 ${darkMode ? "bg-gray-800" : "bg-white"}'} //increase priority of dropdown
    >
      {Object.keys(languages).map((language) => (
        <Dropdown.Item
          key={language}
          onClick={() => handleLanguageChange(language)}
          className={`${darkMode ? "bg-[#181818] text-white hover:bg-gray-700" : "bg-white text-black hover:bg-gray-200"}`}
        >
          <img
            src={languages[language].logo}
            alt={`${language} Logo`}
            style={{ width: "30px", height: "30px", padding: "5px" }}
          />
          {language.charAt(0).toUpperCase() + language.slice(1)}
        </Dropdown.Item>
      ))}
    </Dropdown>);
  };

  const Navbar = () => {
    return (
      <div className="p-[5px] border-green-300 border-x-8 relative" >
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute top-2 right-5 bg-gray-200  text-white p-1 text-sm rounded"
        >
          {darkMode ? "🌙" : "☀️"}
        </button>
        <button
          onClick={() => { handleClick("assistant") }}
          className="absolute top-2 right-14 bg-gray-200 p-1 text-black text-sm rounded"
        >
          {showTab == "assistant" ? "Hide Assistant" : "Show Assistant"}
        </button>
        <button
          onClick={() => handleClick("output")}
          className="absolute top-2 right-40 bg-gray-200 p-1 text-black text-sm rounded"
        >
          {showTab == "output" ? "Hide Output" : "Show Output"}
        </button>

        <button
          onClick={() => saveUserCode(user, code, active)}
          className="absolute top-2 right-64 bg-green-500 hover:bg-green-700 text-white p-1 text-sm rounded"
        >
          Save Code
        </button>

        <LanguageDropdown darkMode={darkMode} />
      </div>
    );
  }
  // Loading Screen Before Mount

  return (
    <div className={`${darkMode ? "bg-[#181818] text-white" : "bg-white text-black"}  `}  >
      <Navbar />
      <div className=" flex flex-row   mt-4 ">
        <div id="editor-div" className={`h-screen ${!showTab == "" ? "lg:w-[50%] w-0" : "w-full"}`}>
          <Editor
            language={active}
            beforeMount={beforeMount}
            onMount={onMount}
            defaultValue={code}
            value={code}
            onChange={(value, ev) => (setCode(value || ""))}
            theme={darkMode ? "vs-dark" : "vs"}
          />
        </div>
        <div id="assistant-div" className={`${!showTab == "" ? "lg:w-[50%] w-full " : "hidden"}`}>
          {showTab === "assistant" && <Assistant code={code} darkmode={darkMode} />}
          {showTab === "output" && <Output darkmode={darkMode} />}
        </div>
      </div>

    </div>
  );
}

export default EditorInterface;


{/* Right Section: Output */ }
{/* <div
          className={`w-[50%] p-[10px] flex flex-col ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Output</h2>
            <button
              onClick={handleRunCode}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Run Code
            </button>
          </div>
          <div
            className={`flex-1 p-4 rounded border border-gray-300 overflow-auto ${darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-black"}`}
            style={{ whiteSpace: "pre-wrap" }}
          >
            {output || "Output will appear here after you run the code."}
          </div>
        </div> */}