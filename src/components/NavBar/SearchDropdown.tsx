import { Post } from "@/src/lib/models";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import SearchResult from "./SearchResult";

const SearchDropdown = ({ searchTerm, sm = false }) => {
    const [searchDropdownOn, setSearchDropdownOn] = useState(false);
    const [loadingSearch, setLoadingSearch] = useState(true);
    const [searchResults, setSearchResults] = useState<Post[]>([]);
    const [searchSuccessful, setSearchSuccessful] = useState(false);

    useEffect(() => {
        if (searchTerm === "") {
            setSearchDropdownOn(false);
            setLoadingSearch(false);

            return;
        }

        const delayDebounceFn = setTimeout(async () => {
            setSearchDropdownOn(true);
            setLoadingSearch(true);

            fetch(`${process.env.NEXT_PUBLIC_API_KEY}search/${searchTerm}`).then(async result => {
                if (!result.ok) {
                    setLoadingSearch(false);
                    setSearchSuccessful(false);

                    return;
                }

                setSearchSuccessful(true);

                setSearchResults(await result.json());

                setLoadingSearch(false);
            });
        }, 1000);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm])

    return (
        <ul tabIndex={0} 
        className={`menu dropdown-content min-h-12 p-2 shadow bg-base-100 gap-2 rounded-box 
            ${searchDropdownOn ? "visible" : "hidden"}
            ${sm ? "w-full -mt-2" : "w-60 mt-3"}`}>
            {
                loadingSearch
                    ? <div className="scale-75">
                        <Loading />
                    </div>
                    : searchResults.length === 0
                        ? searchSuccessful ? <div className="text-sm text-center w-full p-3">No results</div> : <div className="text-sm text-center w-full p-3">Error</div>
                        : searchResults.map(p => <SearchResult {...p} />)
            }
        </ul>
    );
}

export default SearchDropdown;