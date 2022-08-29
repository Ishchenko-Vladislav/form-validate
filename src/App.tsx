import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  type ValidationType = {
    isEmpty: boolean;
    minLength: number;
  };

  const useValidation = (value: string, validations: ValidationType) => {
    const [isEmpty, setEmpty] = useState(true);
    const [minLengthError, setMinLengthError] = useState(false);
    const [validInput, setValidInput] = useState(false);

    useEffect(() => {
      for (const validation in validations) {
        switch (validation) {
          case "minLength":
            value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false);
            break;
          case "isEmpty":
            value ? setEmpty(false) : setEmpty(true);
            break;

          default:
            break;
        }
      }
    }, [value]);

    useEffect(() => {
      if (isEmpty || minLengthError) {
        setValidInput(false);
      } else {
        setValidInput(true);
      }
    }, [isEmpty, minLengthError]);

    return {
      isEmpty,
      minLengthError,
      validInput,
    };
  };

  type useInputType = {
    value: string;
    onChange: (e: string) => void;
    onBlur: () => void;
    isDirty: boolean;
    isEmpty: boolean;
    minLengthError: boolean;
    validInput: boolean;
  };

  const useInput = (initialValue: string, validations: ValidationType) => {
    const [value, setValue] = useState(initialValue);
    const [isDirty, setDirty] = useState(false);
    const valid = useValidation(value, validations);
    const onChange = (e: string) => {
      setValue(e);
    };
    const onBlur = () => {
      setDirty(true);
    };
    return {
      value,
      onChange,
      onBlur,
      isDirty,
      ...valid,
    } as useInputType;
  };
  type useInputType2 = {
    isEmpty: boolean;
    minLength: number;
  };

  const firstName = useInput("", { isEmpty: true, minLength: 2 } as useInputType2);
  const lastName = useInput("", { isEmpty: true, minLength: 4 });

  return (
    <div className="App">
      <form>
        {firstName.isDirty && firstName.isEmpty && <div>"Поле не может быть пустым"</div>}
        {firstName.isDirty && firstName.minLengthError && <div>"имя должно состоять из более 2 символов"</div>}
        <input onBlur={firstName.onBlur} value={firstName.value} onChange={(e) => firstName.onChange(e.target.value)} type="text" placeholder="First Name" />
        {lastName.isDirty && lastName.isEmpty && <div>"Поле не может быть пустым"</div>}
        {lastName.isDirty && lastName.minLengthError && <div>"имя должно состоять из более 4 символов"</div>}
        <input onBlur={lastName.onBlur} value={lastName.value} onChange={(e) => lastName.onChange(e.target.value)} type="text" placeholder="Last Name" />
        <button disabled={!firstName.validInput || !lastName.validInput}>sign up</button>
      </form>
    </div>
  );
}

export default App;
