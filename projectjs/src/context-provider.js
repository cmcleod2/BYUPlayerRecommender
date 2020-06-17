import React from 'react'
//import axios from 'axios'
import AppContext from './context'
import App from './App'
import produce from 'immer'

/** The context provider for our app */
export default class AppProvider extends React.Component {

    constructor(props) {
        super(props)
        this.actions = {
            // Functions Here
            addResults: this.addResults,
        }
        this.state = {
            // Attributes here
            results: [],
        }
        // Do not load data (the categories) here or else it would freeze the system
    }
    // Put Methods here

    addResults = (results) => {
        let newRes = results
        this.setState(state => produce(state, draft => {
            draft.results = []            
            draft.results = newRes
        }))
    }
    
  
    render() {
        return (
            <AppContext.Provider value={{...this.state, ...this.actions}}> 
                <App />
            </AppContext.Provider>
        )
    }

    async componentDidMount() {
        
        // Axios calls here

        this.setState({            
            // Set attributes here
        })
    }

}