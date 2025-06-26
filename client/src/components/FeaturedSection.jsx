import { ArrowRight } from "lucide-react"
import BlurCircle from "./BlurCircle"
import MovieCard from "./MovieCard"
import { dummyShowsData } from "../assets/assets"

const FeaturedSection = ({ navigate }) => {
    return (
        <div className='px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden'>
            {/* Title */}
            <div className="flex justify-between relative items-center pt-20 pb-10">
                <BlurCircle top="0" right="-80px" />
                <p className="text-gray-300 font-medium text-lg">Now Showing</p>
                <button onClick={() => navigate('/movies')} className="group flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                    View All <ArrowRight className="group-hover:translate-x-0.5 transition w-4.5 h-4.5" />
                </button>
            </div>
            {/* Movie List */}
            <div className="flex flex-wrap max-sm:justify-center gap-8 mt-8">
                {dummyShowsData.slice(0, 4).map((show) => (
                    <MovieCard key={show._id} movie={show} />
                ))}
            </div>
            {/* Button */}
            <div className="flex justify-center mt-20">
                <button
                    onClick={() => { scrollTo(0, 0), navigate('/movies') }}
                    className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition-colors rounded-md font-medium cursor-pointer">Show more</button>
            </div>
        </div>
    )
}

export default FeaturedSection