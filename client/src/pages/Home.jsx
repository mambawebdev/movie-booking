import { useNavigate } from "react-router-dom"
import HeroSection from "../components/HeroSection"
import FeaturedSection from "../components/FeaturedSection"
import TrailersSection from "../components/TrailersSection"


const Home = () => {

    const navigate = useNavigate()
    return (
        <>
            <HeroSection navigate={navigate} />
            <FeaturedSection navigate={navigate} />
            <TrailersSection />
        </>
    )
}

export default Home

/* 28:05 Toaster Done */