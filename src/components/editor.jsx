  import React, { useState, useRef, useEffect, useCallback } from "react";
  import Editor from "@monaco-editor/react";
  import * as monaco from "monaco-editor"
  import { Dropdown } from "flowbite-react";
  import { io } from "socket.io-client";

  import Output from "./output";
  import { useContext } from "react";
  import { AuthContext } from "../context/authcontext"
  import { saveUserCode, getUserCode } from "../context/dbcontext";
  import Assistant from "./assistant";
  import { languages } from "../constants/constants";
  
  
  

  const socket = io("http://localhost:8000", {
    transports: ["websocket"], // Forces WebSocket usage
    reconnection: true, // Enables automatic reconnection
  });
  
  const hintDecorations = []; // Store decorations globally
  function EditorInterface() {
    
    const [code, setCode] = useState("");
    const [showTab, setShowTab] = useState("")
    const [active, setActive] = useState("javascript");
    const [darkMode, setDarkMode] = useState(false); // Dark mode state
    const { user,logOut } = useContext(AuthContext)
    
    const editorRef = useRef();
    const ignoreModelContentChanges = useRef(false); // Track programmatic changes

    const exportData = (code) => {
      const fileData = code;
      var extension;
      if(active=="python")
        extension = "py"
      else if(active=="javascript")
        extension = "js"
      else if(active=="c")
        extension = "c"
      else if (active=="java")
        extension = "java"
      const blob = new Blob([fileData], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "program."+extension;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
    const onChangeHandler = (value) => {
      if (ignoreModelContentChanges.current) {
        return; // Ignore WebSocket-induced changes
      }
      setCode(value || "");
      if(value!="") debouncedSendMessage(value);
    };
    useEffect(() => {
        socket.on("server_message", (data) => {
          console.log("Server:", data.message);
        });
    
        socket.on("server_response", (data) => {
          const parsedData = JSON.parse(data.message);
          ignoreModelContentChanges.current = true; // Prevent infinite loop
          console.log(parsedData)
          addHintToEditor(parsedData.line,parsedData.comment)

          setTimeout(() => {
            ignoreModelContentChanges.current = false; // Allow user changes again
          }, 100);
        });
    
        return () => {
          socket.off("server_message");
          socket.off("server_response");
        };
      }, []);

      const debounce = (func, delay) => {
        let timer;
        return (...args) => {
          clearTimeout(timer);
          timer = setTimeout(() => {
            func(...args);
          }, delay);
        };
      };

      const debouncedSendMessage = useCallback(
        debounce((code) => {
          socket.emit("send_message", code);
          console.log("Sending debounced message");
        }, 5000),
        []
      );


    const beforeMount = async () => {
      const data = await getUserCode(user)
      if (data != "") {
        setCode(data.code)
        setActive(data.language)
      } else {
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
        <div className="p-[5px] border-green-300 border-x-8 sm:relative" >
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
            onClick={()=>exportData(code)}
            className="absolute top-2 right-60 bg-gray-200 p-1 text-black text-sm rounded"
          >
            Export Code
          </button>

          <button
            onClick={() => saveUserCode(user, code, active)}
            className="absolute top-2 right-40 bg-green-500 hover:bg-green-700 text-white p-1 text-sm rounded"
          >
            Save Code
          </button>
          <button
            onClick={() => logOut()}
            className="absolute top-2 right-[21rem] bg-green-500 hover:bg-green-700 text-white p-1 text-sm rounded"
          >
            Signout
          </button>

          <LanguageDropdown darkMode={darkMode} />
        </div>
      );
    }

    const addHintToEditor = (line, hint) => {
      if (!editorRef.current) return;
    
      const editor = editorRef.current;
      const model = editor.getModel();
      if (!model) console.log("Model");

      const maxLineNumber = model.getLineCount();
       if (line>maxLineNumber) 
      {
        line = maxLineNumber
        console.log("line",line)
      }
      const column = model.getLineMaxColumn(line);
      console.log("line",line)
      // Apply new syntax highlighting via decorations
      const newDecorations = editor.deltaDecorations([], [
        {
          range: new monaco.Range(line, column, line, column), // +3 for " //"
          options: {
            inlineClassName: "my-hint-text", // Custom class for styling
            hoverMessage: { value: `${hint}` },
            glyphMarginClassName: "glyph-icon", // Custom CSS for the margin icon
            glyphMarginHoverMessage: { value: `${hint}` },
            stickiness : 3
          }
        }
      ]);
    
      // Store the new decorations so they can be removed later
      hintDecorations.push(...newDecorations);
    };

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
              onChange={(value, ev) => {
                onChangeHandler(value)
              }}
              theme={darkMode ? "vs-dark" : "vs"}
              options={{
                glyphMargin: true,
                lineNumbers: "on",
              }}
            />
          </div>
          <div id="assistant-div" className={`${!showTab == "" ? "lg:w-[50%] w-full " : "hidden"}`}>
            {showTab === "assistant" && <Assistant code={code} darkmode={darkMode} addHintToEditor={addHintToEditor} editorRef={editorRef}/>}
            {showTab === "output" && <Output darkmode={darkMode} />}
          </div>
        </div>

      </div>
    );
  }

  export default EditorInterface;
