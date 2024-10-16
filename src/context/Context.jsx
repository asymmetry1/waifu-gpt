import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [inputValue,setInputValue] = useState("");
    const [recentPrompt,setRecentPrompt] = useState("");
    const [prevPrompt,setPrevPrompt] = useState([]);
    const [loading,setloading] = useState(false);
    const [resultData,setResultData] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(function () {
          setResultData((prev) => prev + nextWord);
        }, 150 * index);
      };

    const onSent = async (prompt) => {
        
        setResultData("")
        setloading(true)
        let response;
        if (prompt !== undefined) {
        setPrevPrompt((prevPrompt) => [...prevPrompt, prompt]);
        response = await run(prompt);
        setRecentPrompt(prompt);
        } else {
        setPrevPrompt((prevPrompt) => [...prevPrompt, inputValue]);
        setRecentPrompt(inputValue);
        response = await run(inputValue);
        }
        let responseArray = response.split("**");
        let newResponse = "";

        for (let i = 0; i < responseArray.length; i++) {
        if (i === 0 || i % 2 !== 1) {
            newResponse += responseArray[i];
        } else {
            newResponse += "<b>" + responseArray[i] + "</b>";
        }
        }

        let newResponse2 = newResponse.split("*").join("</br>");
        let newResponseArray = newResponse2.split(" ");
        for (let i = 0; i < newResponseArray.length; i++) {
        const nextWord = newResponseArray[i];
        delayPara(i, nextWord + " ");
        }
        setloading(false)
        setInputValue("");

    };

    const contextValue = {
        prevPrompt,
        setPrevPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        loading,
        resultData,
        inputValue,
        setInputValue
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider