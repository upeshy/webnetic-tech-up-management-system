/**
 * Search Bar Component
 * Reusable search input
 */

import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ placeholder, value, onChange }) => {
  return (
    <div className="relative">
      <FiSearch className="absolute left-3 top-3 text-gray-400" size={20} />
      <input
        type="text"
        placeholder={placeholder || 'Search...'}
        value={value}
        onChange={onChange}
        className="input-field pl-10"
      />
    </div>
  );
};

export default SearchBar;