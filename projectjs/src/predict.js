import React from 'react'
import * as bs from 'react-bootstrap'
import { Formik, Form, Field} from 'formik'
import AppContext from './context'
import axios from 'axios'


function Predictor(props) {
    let context = React.useContext(AppContext)
    let myError = ''

    return (        
        <Formik
            initialValues={{
                player1: 'Barcello,Alex',
                player2: 'Nield,Blaze',
                player3: 'Seljaas,Zac',
                player4: 'Toolson,Jake',
            }}
            validateOnChange={true}
            validateOnBlur={false}
            validate={values => {
                const errors = {}

                if (values.player1 === '') {
                    errors.player1 = 'Please enter a player 1'
                }
                if (values.player2 === '') {
                    errors.player2 = 'Please enter a player 2'
                }
                if (values.player3 === '') {
                    errors.player3 = 'Please enter a player 3'
                }
                if (values.player4 === '') {
                    errors.player4 = 'Please enter a player 4'
                }
                if (values.player1 === values.player2 || values.player1 === values.player3 || values.player1 === values.player4) {
                    errors.player1 = 'Must have 4 different players'
                }
                if (values.player2 === values.player3 || values.player2 === values.player4) {
                    errors.player2 = 'Must have 4 different players'
                }
                if (values.player3 === values.player4) {
                    errors.player3 = 'Must have 4 different players'
                }
                return errors // This is the way
            }}
            onSubmit={async (values, actions) => {
                //console.log('submit', values)             



                let lineup = `${values.player1.toUpperCase()};${values.player2.toUpperCase()};${values.player3.toUpperCase()};${values.player4.toUpperCase()}`

                //console.log(lineup)
                
               
                //Put axios call to API here:
                let calcResp
                try {
                    calcResp = await axios.post(`http://localhost:8000/api/getPlayerRecommendation/`, lineup)
                }
                catch(err) {
                    console.log(err)
                }

                let players = calcResp.data['result']
                players = players.slice(0,3)

                let results = []

                for(let p in players){
                    let name = players[p].Player
                    name = name.split(',')
                    let newName = name[1].charAt(0).toUpperCase() + name[1].slice(1).toLowerCase() + ' ' + name[0].charAt(0).toUpperCase() + name[0].slice(1).toLowerCase()
                    let obj ={'Name': newName, 'Lift': players[p].Lift}
                    results.push(obj)
                }
        
                //console.log(results)
                context.addResults(results)

                await new Promise(resolve => {
                    setTimeout(() => {  // wait 2 seconds, then set the form as "not submitting"
                        resolve()
                    }, 2000)
                })
            }}
        >{form => (
            <CalculatorForm form={form} error={myError} results={context.results}/>            
        )}</Formik>        
    )
}
export default Predictor


/**
 * The form layout/html.
 * This component needs finishing.
 */
const CalculatorForm = props => (

    <bs.Container>
        <h1 className="pt-4 text-center">
            Choose 4 Players and We'll Recommend the 5th
        </h1>
        <hr />
        <h6 className="text-danger">{props.error}</h6> 
        <Form>
            <bs.Row className="mb-4">
                <bs.Col md="6">
                    <bs.Row>
                        <bs.Col>
                            <InputDrop id='player1' title="Player 1" name="player1" type="select" val0="" lab0="Select Player" 
                                val1="Haws,TJ" lab1="TJ Haws" val2="Seljaas,Zac" lab2="Zac Seljaas" val3="Nield,Blaze" lab3="Blaze Nield" 
                                val4="Barcello,Alex" lab4="Alex Barcello" val5="Toolson,Jake" lab5="Jake Toolson" val6="Maughan,Taylor" lab6="Taylor Maughan"
                                val7="Pearson,Cameron" lab7="Cameron Pearson" val8="Knell,Trevin" lab8="Trevin Knell" val9="Childs,Yoeli" lab9="Yoeli Childs" 
                                val10="Troy,Evan" lab10="Evan Troy" val11="Lee,Kolby" lab11="Kolby Lee" val12="Baxter,Gavin" lab12="Gavin Baxter" 
                                val13="Nixon,Dalton" lab13="Dalton Nixon" val14="Harding,Connor" lab14="Connor Harding"
                            />
                        </bs.Col>
                        <bs.Col>
                            <InputDrop title="Player 2" name="player2" type="select" val0="" lab0="Select Player" 
                                val1="Haws,TJ" lab1="TJ Haws" val2="Seljaas,Zac" lab2="Zac Seljaas" val3="Nield,Blaze" lab3="Blaze Nield" 
                                val4="Barcello,Alex" lab4="Alex Barcello" val5="Toolson,Jake" lab5="Jake Toolson" val6="Maughan,Taylor" lab6="Taylor Maughan"
                                val7="Pearson,Cameron" lab7="Cameron Pearson" val8="Knell,Trevin" lab8="Trevin Knell" val9="Childs,Yoeli" lab9="Yoeli Childs" 
                                val10="Troy,Evan" lab10="Evan Troy" val11="Lee,Kolby" lab11="Kolby Lee" val12="Baxter,Gavin" lab12="Gavin Baxter" 
                                val13="Nixon,Dalton" lab13="Dalton Nixon" val14="Harding,Connor" lab14="Connor Harding"
                            />
                        </bs.Col>
                    </bs.Row>                    
                </bs.Col>
                <bs.Col md="6">                  
                    <bs.Row>
                        <bs.Col>
                            <InputDrop title="Player 3" name="player3" type="select" val0="" lab0="Select Player" 
                                val1="Haws,TJ" lab1="TJ Haws" val2="Seljaas,Zac" lab2="Zac Seljaas" val3="Nield,Blaze" lab3="Blaze Nield" 
                                val4="Barcello,Alex" lab4="Alex Barcello" val5="Toolson,Jake" lab5="Jake Toolson" val6="Maughan,Taylor" lab6="Taylor Maughan"
                                val7="Pearson,Cameron" lab7="Cameron Pearson" val8="Knell,Trevin" lab8="Trevin Knell" val9="Childs,Yoeli" lab9="Yoeli Childs" 
                                val10="Troy,Evan" lab10="Evan Troy" val11="Lee,Kolby" lab11="Kolby Lee" val12="Baxter,Gavin" lab12="Gavin Baxter" 
                                val13="Nixon,Dalton" lab13="Dalton Nixon" val14="Harding,Connor" lab14="Connor Harding"
                            />
                        </bs.Col>    
                        <bs.Col>
                            <InputDrop title="Player 4" name="player4" type="select" val0="" lab0="Select Player" 
                                val1="Haws,TJ" lab1="TJ Haws" val2="Seljaas,Zac" lab2="Zac Seljaas" val3="Nield,Blaze" lab3="Blaze Nield" 
                                val4="Barcello,Alex" lab4="Alex Barcello" val5="Toolson,Jake" lab5="Jake Toolson" val6="Maughan,Taylor" lab6="Taylor Maughan"
                                val7="Pearson,Cameron" lab7="Cameron Pearson" val8="Knell,Trevin" lab8="Trevin Knell" val9="Childs,Yoeli" lab9="Yoeli Childs" 
                                val10="Troy,Evan" lab10="Evan Troy" val11="Lee,Kolby" lab11="Kolby Lee" val12="Baxter,Gavin" lab12="Gavin Baxter" 
                                val13="Nixon,Dalton" lab13="Dalton Nixon" val14="Harding,Connor" lab14="Connor Harding"
                            />
                        </bs.Col>
                    </bs.Row>                    
                </bs.Col>
            </bs.Row>
            <bs.Row className="mb-4">
                <bs.Col>
                    <bs.Container className="text-center">
                        <bs.Button className="btn btn-lg btn-primary" type="submit" disabled={props.form.isSubmitting}>
                            {props.form.isSubmitting &&
                                <bs.Spinner as="span" animation="grow" size="lg" role="status" aria-hidden="true" />                     
                            } Recommend Player
                        </bs.Button>
                    </bs.Container>
                </bs.Col>
            </bs.Row>
            <bs.Row className="mb-4">
                <bs.Col className="text-center">
                    <bs.Row>
                        {props.results.map((p, i) => {
                            let name = p.Name
                            let newName = []
                            name = name.split(' ')
                            newName.push(name[1])
                            newName.push(name[0])
                            newName.join(',')
                            return(
                                <bs.Col key={i}>
                                    <bs.Card >
                                        <bs.Card.Header>Choice #{i + 1}</bs.Card.Header>                                
                                        <bs.Card.Img src={`${process.env.PUBLIC_URL}/media/Players/${newName}.png`} alt={newName}/>                                
                                        <bs.Card.Body>{p.Name}</bs.Card.Body>
                                        <bs.Card.Footer>Recommendation Score: {p.Lift}</bs.Card.Footer>
                                    </bs.Card>
                                </bs.Col>
                            )                    
                        })}
                    </bs.Row>
                </bs.Col>
            </bs.Row>
        </Form>       
    </bs.Container>
)

/**
 * A form input.
 *   props.title - the title that shows above the input box
 *   props.type - the type of input (see React Bootstrap Form.Control)
 *   props.placeholder - placeholder text in the input.
 * This component is finished and doesn't need additional work.
 */

const InputDrop = (props) => (
        <Field name={props.name}>{rProps => (
            <bs.Card>
                <bs.Card.Header>{props.title}</bs.Card.Header>
                <bs.Card.Img src={`${process.env.PUBLIC_URL}/media/Players/${rProps.field.value}.png`} alt={rProps.field.value}/>
                <bs.Form.Group>
                    <br />
                    <bs.Form.Control as={props.type}
                        placeholder={props.placeholder}
                        disabled={rProps.form.isSubmitting}
                        {...rProps.field}
                    >
                        <option value={props.val0} label={props.lab0}/>
                        <option value={props.val1} label={props.lab1}/>
                        <option value={props.val2} label={props.lab2}/>
                        <option value={props.val3} label={props.lab3}/>
                        <option value={props.val4} label={props.lab4}/>
                        <option value={props.val5} label={props.lab5}/>
                        <option value={props.val6} label={props.lab6}/>
                        <option value={props.val7} label={props.lab7}/>
                        <option value={props.val8} label={props.lab8}/>
                        <option value={props.val9} label={props.lab9}/>
                        <option value={props.val10} label={props.lab10}/>
                        <option value={props.val11} label={props.lab11}/>
                        <option value={props.val12} label={props.lab12}/>
                        <option value={props.val13} label={props.lab13}/>
                        <option value={props.val14} label={props.lab14}/>                
                    </bs.Form.Control>
                    {rProps.meta.touched && rProps.meta.error &&
                        <div className="text-danger">{rProps.meta.error}</div>
                    }
                </bs.Form.Group>
            </bs.Card>
        )}</Field>
)