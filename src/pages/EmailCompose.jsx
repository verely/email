import { useState } from 'react';
import { useSearchParams } from "react-router-dom";

export function EmailCompose() {

 const [form, setForm] = useState({
    to: '',
    subject: '',
    body: '',
 });
 const [searchParams, setSearchParams] = useSearchParams()

 function handleChange({ target }) {
    let { value, type, name: field } = target
    if (type === 'range') value = +value
    setForm(prev => ({ ...prev, [field]: value }))
}

 const onSubmit = (e) => {
    e.preventDefault();

    console.log(form);
 };

 function onClose()
 {
   setSearchParams("")
 }

 return (
    <section className="email-compose">
      <div className="compose-container">
         <div className="compose-actions-button">
            <button onClick={onClose}>-</button>
            <button onClick={onClose}>X</button>
         </div>
         <h2>New Message</h2>
         <form onSubmit={onSubmit}>
         <label htmlFor="from" >
               <input type="text" name='from' value={form.from}
                     onChange={handleChange}
                     disabled placeholder='From <user@gmail.com>' />
         </label>
         <br />

         <label htmlFor="to">To:</label>
         <input type="email" name="to" value={form.to}
                  onChange={handleChange} required/>
         <br />

         <label htmlFor="subject">Subject:</label>
         <input type="text" name="subject" value={form.subject}
                  onChange={handleChange} placeholder='Subject'/>
         <br />

         <label htmlFor="body">Body:</label>
         <textarea name="body" value={form.body} onChange={handleChange} required/>
         <br />

         <button type="submit">Send</button>
         </form>
      </div>
    </section>
 );
}

