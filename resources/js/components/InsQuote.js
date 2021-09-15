import React from 'react';

class InsQuote extends React.Component {
    constructor(props) {
        super();
        this.state = {
            start_date: '',
            end_date: '',
            age: '',
            currency_id: '',
            result: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.getQuote = this.getQuote.bind(this);
    }

    render() {
        return (
            <div className='container'>
                <h1>Quote</h1>
                <form>
                    <div className='form-group'>
                        <label htmlFor='age'>Age(s)</label>
                        <input
                            name='age'
                            id='age'
                            type='text'
                            className='form-control'
                            placeholder='Age'
                            defaultValue={this.state.age}
                            onChange={this.handleChange}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='start_date'>Start Date</label>
                        <input
                            name='start_date'
                            id='start_date'
                            type='date'
                            className='form-control'
                            placeholder='Start Date'
                            defaultValue={this.state.start_date}
                            onChange={this.handleChange}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='start_date'>End Date</label>
                        <input
                            name='end_date'
                            id='end_date'
                            type='date'
                            className='form-control'
                            placeholder='End Date'
                            defaultValue={this.state.end_date}
                            onChange={this.handleChange}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='currency_id'>Currency</label>
                        <input
                            name='currency_id'
                            id='currency_id'
                            type='text'
                            className='form-control'
                            placeholder='USD, GBP, or EUR'
                            defaultValue={this.state.currency_id}
                            onChange={this.handleChange}/>
                    </div>

                    <div className='form-group'>
                        <button className='btn btn-default' onClick={this.getQuote}>Get Quote </button>
                    </div>

                    <div>
                        <h3>Result:</h3>
                        {this.state.result}
                    </div>
                </form>
            </div>
        );
    }

    handleChange(event) {
        const name = event.target.name;
        this.setState({
            [name]: event.target.value
        });
    }

    getQuote(event) {
        event.preventDefault();
        const token = this.props.token;
        const data = {
            "age": this.state.age,
            "currency_id": this.state.currency_id,
            "start_date": this.state.start_date,
            "end_date": this.state.end_date
        };
        const headers = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }
        axios.post('/api/quotation', data, headers)
            .then((response) => {
                console.log(response.data);
                this.setState({
                    result: JSON.stringify(response.data)
                });
            })
            .catch((error) => {
                if(error.response) {
                    this.setState({
                        result: JSON.stringify(error.response.data)
                    });
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if(error.request) {
                    this.setState({
                        result: JSON.stringify(error.request)
                    });
                    console.log(error.request);
                } else {
                    this.setState({
                        result: error.message
                    });
                    console.log('Error', error.message);
                }

            });
    }
}

export default InsQuote;
