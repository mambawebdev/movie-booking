/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { dummyShowsData } from "../../assets/assets";
import Loader from "../../components/Loader";
import Title from "../../components/admin/Title";
import { Check, DeleteIcon, StarIcon } from "lucide-react"
import { kConverter } from "../../lib/kConverter";

const AddShows = () => {

    const currency = import.meta.env.VITE_CURRENCY;
    const [nowPlayingMovies, setNowPlayingMovies] = useState([])
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [dateTimeSelection, setDateTimeSelection] = useState({})
    const [dateTimeInput, setDateTimeInput] = useState("");
    const [showPrice, setShowPrice] = useState("");
    const [isLoading, setIsLoading] = useState(true)

    const fetchNowPlayingMovies = async () => {
        setNowPlayingMovies(dummyShowsData)
        setIsLoading(false)

    }

    // adds a new date + time to your dateTimeSelection object (unless it’s already there).
    const handleDateTimeAdd = () => {
        // If no input value, stop. (Prevents errors.)
        if (!dateTimeInput) return;
        const [date, time] = dateTimeInput.split("T");
        if (!date || !time) return;


        setDateTimeSelection((prev) => {

            // The input comes from a datetime-local input field → e.g. "2025-06-23T19:30".
            //  Gets existing times for this date → prev[date] || []
            const times = prev[date] || [];
            if (!times.includes(time)) {
                // Creates a new state object
                // Spreads previous state
                // Updates the date’s array of times
                return { ...prev, [date]: [...times, time] }
            }
            return prev;
        })

    }

    const handleRemoveTime = (date, time) => {
        setDateTimeSelection((prev) => {
            // Takes the array of times for the given date.
            // Removes specific time that should be deleted.
            const filteredTimes = prev[date].filter((t) => t !== time);
            if (filteredTimes.length === 0) {
                // Uses object destructuring
                // Remove the key matching date
                // Keep the remaining dates in rest
                const { [date]: _, ...rest } = prev;
                return rest;
            }
            // If times still exist for the date
            return {
                // Updates that date's times with the filtered array.
                ...prev,
                [date]: filteredTimes
            }
        })
    }

    useEffect(() => {
        fetchNowPlayingMovies()
        console.log(dateTimeSelection)
    }, [])


    return nowPlayingMovies.length > 0 && !isLoading ? (
        <>
            <Title text1={"Add"} text2={'Shows'} />
            <p className="mt-10 text-lg font-medium">Now Playing Movies</p>
            <div className="overflow-x-auto pb-4">
                <div className="group flex flex-wrap gap-4 mt-4 w-max">
                    {
                        nowPlayingMovies.map((movie) => (
                            <div
                                onClick={() => setSelectedMovie(movie.id)}
                                key={movie.id} className={`relative max-w-40 cursor-pointer group-hover:not-hover:opacity-40 hover:-translate-y-1 transition duration-500`}>
                                <div className="relative rounded-lg overflow-hidden">
                                    <img src={movie.poster_path} alt="" className="w-full object-cover brightness-90" />
                                    <div className="text-sm flex items-center justify-between p-2 bg-black/70 w-full absolute bottom-0 left-0">
                                        <p className="flex items-center gap-1 text-gray-400">
                                            <StarIcon className="w-4 h-4 text-primary fill-primary" />
                                            {movie.vote_average.toFixed(1)}
                                        </p>
                                        <p className="text-gray-300">
                                            {kConverter(movie.vote_count)} {" "}
                                            Votes
                                        </p>
                                    </div>
                                </div>
                                {selectedMovie === movie.id && (
                                    <div className="absolute top-2 right-2 flex items-center justify-center bg-primary h-6 w-6 rounded">
                                        <Check className="w-4 h-4 text-white transition duration-400" strokeWidth={3} />
                                    </div>
                                )}

                                <p className="font-medium truncate">{movie.title}</p>
                                <p className="text-gray-300 text-sm">{movie.release_date}</p>

                            </div>
                        ))
                    }
                </div>
            </div>

            {/* Show Price Input */}

            <div className="mt-8">
                <label className="block text-sm font-medium mb-2">Show Price</label>
                <div className="inline-flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-md">
                    <p className="text-gray-400 text-sm">{currency}</p>
                    <input min={0} type="number" value={showPrice} onChange={(e) => setShowPrice(e.target.value)} placeholder="Enter show price" className="outline-none" />
                </div>
            </div>

            {/* Date & Time Selection */}
            <div className="mt-6">
                <label className="block text-sm font-medium mb-2">Select Date and Time</label>
                <div className="inline-flex gap-5 border border-gray-500 p-1 pl-3 rounded-lg">
                    <input type="datetime-local" value={dateTimeInput} onChange={(e) => setDateTimeInput(e.target.value)} className="outline-none rounded-md" />
                    <button onClick={handleDateTimeAdd} className="bg-primary/80 text-white px-3 py-2 text-sm rounded-lg hover:bg-primary cursor-pointer">Add Time</button>
                </div>
            </div>

            {/* Display Selected Times */}
            {
                Object.keys(dateTimeSelection).length > 0 && (
                    <div className="mt-6">
                        <h2 className="">Selected Date-Time</h2>
                        <ul className="space-y-3">
                            {Object.entries(dateTimeSelection).map(([date, times]) => (
                                <li className="" key={date}>
                                    <div className="font-medium">{date}</div>
                                    <div className="flex flex-wrap gap-2 mt-1 text-sm">
                                        {
                                            times.map((time) => (
                                                <div className="border border-primary px-2 py-1 flex items-center rounded" key={time}>
                                                    <span className="text-md font-extrabold">{time}</span>
                                                    <DeleteIcon
                                                        onClick={() => handleRemoveTime(date, time)}
                                                        width={15}
                                                        className="ml-2 text-red-500 hover:text-red-700 transition duration-500 cursor-pointer" />
                                                </div>
                                            ))
                                        }
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            }
            <button className="bg-primary text-white px-8 py-2 mt-6 rounded hover:bg-primary-dull transition-colors duration-500 cursor-pointer">Add Show</button>
        </>
    ) : (
        <Loader />
    )
}

export default AddShows