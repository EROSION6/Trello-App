import '@/styles/index.css';

interface TypeSearchProps {
  search: string;
  setSearch: (value: string) => void;
}

export const Search = ({ search, setSearch }: TypeSearchProps) => {
  return (
    <div className="w-full flex items-center justify-center">
      <input
        type="search"
        value={search}
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
        className={`w-2/4 px-4 py-4 rounded-xl bg-gray-900 text-white font-semibold outline-none ${'input'}`}
      />
    </div>
  );
};
