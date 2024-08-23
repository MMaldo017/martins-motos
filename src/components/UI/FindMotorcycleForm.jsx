import {Form, FormGroup} from "reactstrap"
import "../../styles/find-motorcycle-form.css"

const FindMotorcylceForm = ()=> {
    return (
        <Form className ="form">
            <div className="d-flex align-items-center justify-content-between flex-wrap">
                <FormGroup className="form__group">
                    <input type="text" placeholder="From Address" required/>
                </FormGroup>


                <FormGroup className="form__group">
                    <input type="text" placeholder="To Address" required/>
                </FormGroup>

                <FormGroup className="form__group">
                    <input type="date" placeholder="Start Date" required/>
                </FormGroup>

                <FormGroup className="form__group">
                    <input className="journey__time" type="time" placeholder="Journey Time" required/>
                </FormGroup>

                <FormGroup className="select__group">
                    <select>
                        <option value="default" selected="default">Select your bike</option>
                        <option value="crusiers"> Crusiers</option>
                        <option value="sports=bike"> Sports Bike</option>
                        <option value="chopper"> Chopper</option>
                        <option value="touring"> Touring</option>
                    </select>
                </FormGroup>

                <FormGroup className="form__group">
                    <button className="btn find__motorcycle-btn">Find a Bike</button>
                </FormGroup>
            </div>
        </Form>
    )
}
export default FindMotorcylceForm;