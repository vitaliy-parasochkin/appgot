import React, {Component} from 'react';
import './itemDetails.css';
import GotService from "../../services/gotService";
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export {Field}

export default class ItemDetails extends Component {
    gotService = new GotService();

    state = {
        item: null,
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateItem()
        
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }

    onItemLoaded = (item) => {
        this.setState({
            item,
            loading:false
        })
    }

    updateItem() {
        const {itemId, getItem} = this.props;
        if (!itemId) {
            return
        }

        this.setState({
            loading: true
        })

        getItem(itemId)
            .then(this.onItemLoaded)
            .catch(() => this.onError())
        // this.foo.bar = 0;asdasds
    }

    onError() {
        this.setState({
            item:null,
            error:true
        })
    }
    
    render() {
        if (!this.state.item && this.state.error) {
            return <ErrorMessage/>
        } else if (!this.state.item) {
            return <span className="select-error">Please select a item</span>
        }

        const {loading, item: {name}} = this.state;
        const {item} =this.state;
        if (loading) {
            return(
                <div className="char-details rounded">
                    <Spinner/>
                </div>
            )
        }

        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {item})
                        })
                    }
                </ul>
            </div>
        );
    }
}

