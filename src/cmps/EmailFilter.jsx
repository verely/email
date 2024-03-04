import { useState, useEffect } from "react";

export function EmailFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy);

  useEffect(() => {
    onSetFilter(filterByToEdit);
  }, [filterByToEdit]);

  function onSubmitFilter(ev) {
    ev.preventDefault()
    console.log('filterByToEdit', filterByToEdit)
    onSetFilter(filterByToEdit)
}

  function handleChange(ev) {
    let { type, name: field, value } = ev.target;
    value = type === 'number' ? +value : value
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }));
    console.log('filterByToEdit', filterByToEdit);
  }

  return (
    <form className="filter-container" onSubmit={onSubmitFilter}>
      <label>Subject
        <input
          type="text"
          placeholder="Search by subject"
          value={filterByToEdit.subject}
          name="subject"
          onChange={handleChange}
        />
      </label>
      {/* <button>Filter</button> */}
    </form>
  );
}
