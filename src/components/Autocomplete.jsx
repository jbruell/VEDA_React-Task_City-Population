import { useEffect, useState } from "react";
import { debounce } from "../debounce";
import "./Autocomplete.css";

const API_URL = "https://api.teleport.org/api/cities?limit=5&search=";

const Autocomplete = () => {
    const [input, setInput] = useState("");
    const [inFlight, setInFlight] = useState(false);
    const [cityChoices, setCityChoices] = useState([]);

    useEffect(() => {
        if (!inFlight && input.length > 0) {
            console.log("trigger")
            fetchCitiesByString();
        }
    }, [input])

    const fetchCitiesByString = debounce(async () => {
        setInFlight(true);
        const res = await fetch(`${API_URL}${encodeURIComponent(input)}`);

        if (res.status === 200) {
            const body = await res.json();
            setCityChoices(body?._embedded["city:search-results"])
            console.log(body?._embedded["city:search-results"]);
        }
        setInFlight(false);
    }, 250);
    return (
        <div>
            <div className="city-info">
                <span>
                    {"" +inFlight}
                </span>
                <span>
                </span>
            </div>
            <input type="text"
                value={input}
                onChange={event => {
                    setInput(event.target.value);
                }} />
            {cityChoices && cityChoices.length > 1 && 
            <ul className="city-choices">
                {cityChoices.map(c => (
                    <li key={c.matching_full_name}>{c.matching_full_name}</li>
                ))}
            </ul>}
        </div>
    )
}

export default Autocomplete;