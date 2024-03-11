import { useState } from 'react';

export function EmailCompose() {

 const [form, setForm] = useState({
    to: '',
    subject: '',
    body: '',
 });

 function handleChange({ target }) {
    let { value, type, name: field } = target
    if (type === 'range') value = +value
    setForm(prev => ({ ...prev, [field]: value }))
}

 const onSubmit = (e) => {
    e.preventDefault();

    console.log(form);
 };

 return (
    <section className="email-compose">
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
    </section>
 );
}

