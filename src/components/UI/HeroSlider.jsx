import Slider from "react-slick"
import { Container }  from "reactstrap"
import { Link } from "react-router-dom"

const HeroSlider = () => {
    const settings = {
        fade: true,
        speed: 2000,
        autoplaySpeed: 3000,
        infinite: true,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false
    }
    return (
        <Slider {...settings} className="hero__slider">

        </Slider>
    )
}

export default HeroSlider;