import React, { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { FormData, FormContext } from '../../context/FormContext';
interface CreateFormProps {

}

const CreateForm = () => {
  const context = useContext(FormContext);
  const [formData, setFormData] = useState<FormData>({
    rows: '',
    columns: '',
    highlights: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    context!.saveForm(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Rows</label>
        <input
          type='number'
          name='rows'
          value={formData.rows}
          onChange={handleChange}
          min={0}
          max={100}
        />
      </div>
      <div>
        <label>Columns</label>
        <input
          type='number'
          name='columns'
          value={formData.columns}
          onChange={handleChange}
          min={0}
          max={100}
        />
      </div>
      <div>
        <label>Highlights</label>
        <input
          type='number'
          name='highlights'
          value={formData.highlights}
          onChange={handleChange}
          min={0}
          max={100}
        />
      </div>
      <button type='submit'>Submit</button>
    </form>
  );
};

export default CreateForm;