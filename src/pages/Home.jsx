import Helmet from "../components/Helmet/Helmet.js"
import {Container, Row, Col} from "reactstrap"
import HeroSlider from "../components/UI/HeroSlider.jsx"
import FindMotorcycleForm from "../components/UI/FindMotorcycleForm.jsx"

const Home = () => {
    return(
    <Helmet title="Home">
        {/* hero section */}
        <section className="pd-0 hero__slider-section">
            <HeroSlider />

            <div className="hero__form">
                <Container>
                    <Row className="form__row">
                        <Col lg="4" md="4">
                            <div className="find__motorcycles-left">
                                <h2>Find your best motorcycle here</h2>
                            </div>
                        
                        
                        </Col>
                        <Col lg="8" md="8" sm="12">
                            <FindMotorcycleForm />
                        
                        
                        </Col>
                    </Row>
                </Container>
            </div>
        </section>
    </Helmet>
    )
}

export default Home