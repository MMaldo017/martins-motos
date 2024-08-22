import Helmet from "../components/Helmet/Helmet.js"
import {Container, Row, Col} from "reactstrap"
import HeroSlider from "../components/UI/HeroSlider.jsx"


const Home = () => {
    return
    <Helmet title="Home">
        {/* hero section */}
        <section className="pd-0 hero__slider-section">
            <HeroSlider />
        </section>
    </Helmet>
}

export default Home