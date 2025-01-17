import React, { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { FormData, FormContext } from '../../context/FormContext';

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
      <h2>Create Table</h2>
      <div className='form-wrapper'>
        <div className='input-wrapper'>
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
        <div className='input-wrapper'>
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
        <div className='input-wrapper'>
          <label>Highlights</label>
          <input
            type='number'
            name='highlights'
            value={formData.highlights}
            onChange={handleChange}
            min={0}
            max={Number(formData.rows) * Number(formData.columns) - 1}
          />
        </div>
      </div>
      <button type='submit' className='submit-btn'>Submit</button>
    </form>
  );
};

export default CreateForm;