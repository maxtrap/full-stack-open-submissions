const Filter = ({ filterName, handleFilterChange }) => (
    <div>
        filter shown with <input value={filterName} onChange={handleFilterChange} />
    </div>
);

export default Filter;