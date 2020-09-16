import React, { PureComponent } from 'react';
import axios from 'axios';

class AxiosHandlerCmp extends PureComponent {
    state = {
        data: ''
    }
    componentDidMount() {
        const url = this.props.url;
        axios.get(url).then(res => {
            let wanted = '';
            if (url.includes('planets') || url.includes('species') || url.includes('vehicles') || url.includes('starships')) wanted = "name";
            if (url.includes('films')) wanted = "title";
            this.setState({ data: res.data[wanted] })
        })
    }
    render() {
        return (
            <span className="axios-cmp">
                {this.state.data}
            </span>);
    }
}
export default AxiosHandlerCmp



