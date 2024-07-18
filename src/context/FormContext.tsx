import React, { createContext, useState, ReactNode } from 'react';

export interface FormData {
  rows: number | string;
  columns: number | string;
  highlights: number | string;
}

type FormContextType = {
  arguments: FormData[];
  saveForm: (data: FormData) => void;
}

export const FormContext = createContext<FormContextType | null>(null);

const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formValues, setFormValues] = useState<FormData[]>([{
    rows: '',
    columns: '',
    highlights: ''
  }]);

  const saveForm = (data: FormData) => {
    const newTodo: FormData = { ...data };
    setFormValues([...formValues, newTodo])
  };

  return (
    <FormContext.Provider value={{ arguments: formValues, saveForm }}>
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;