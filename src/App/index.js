import React from 'react';
import { queryService, getHtmlFromLink } from '../api';

import logo from '../assets/logo.svg';

const getCurrentTabUrl = () => {
    const queryInfo = {
        active: true,
        currentWindow: true
    };

    return new Promise((resolve, reject) => {
        chrome.tabs.query(queryInfo, tabs => {
            const tab = tabs[0];
            const url = tab.url;  
            resolve(url);  
        });
    });
};

const rating = () => {
    return new Promise((resolve, reject) => {
        document.addEventListener('DOMContentLoaded', () => {
            getCurrentTabUrl().then((url) => {
                return queryService(url);
            }).then((data) => {
                resolve(data.rating);
            });
        });
    });
};

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            input: '',
            message: '',
            webpage: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
        this.resetState = this.resetState.bind(this);
    }

    getText(url) {
        return queryService(url).then((data) => {
            return data.rating;
        });
    }

    handleChange(e) {
        this.setState({
            input: e.target.value,
            message: this.state.message,
            webpage: this.state.webpage
        });
    }

    getWebpage(url) {
        return getHtmlFromLink(url).then((data) => {
            return data;
        });
    }

    submit() {
        this.getWebpage(this.state.input).then((data) => {
            this.getText(this.state.input).then((rating) => {
                this.setState({
                    input: this.state.input,
                    message: rating,
                    webpage: data
                });
            });
        });
    }

    resetState() {
        this.setState({
            input: '',
            message: '',
            webpage: ''
        });
    }

    render() {
        return (
            <section>
                <img className="logo" src={logo}/>
                {
                    this.state.webpage
                    ? <div>
                        <h2 className="score">{this.state.message > 50 ? 'We can\'t find anything wrong with this webapage' : 'This news is likely to be fake'}</h2>
                        <a className="tryAgain" onClick={this.resetState}>Try a different link?</a>
                    </div>
                    : <div>
                        <input onChange={this.handleChange} placeholder="Enter a news article URL" className="inputField"/>
                        <button onClick={this.submit} className="button" type="submit">Submit</button>
                    </div>
                }
            </section>
        );
    }
};

export default App;