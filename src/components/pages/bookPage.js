import React, {Component} from 'react';
import ItemList from '../itemList';
import ItemDetails, { Field } from '../itemDetails';
import ErrorMessage from '../errorMessage';
import GotService from "../../services/gotService";
import RowBlock from '../rowBlock';


export default class BookPage extends Component {
    gotService = new GotService();

    state = {
        selectedItem: 1,
        error: false
    }

    onItemSelected = (id) => {
        this.setState({
            selectedItem: id
        })
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {
        const {error} = this.state;
        if (error) {
            return <ErrorMessage />
        }

        const itemList = (
            <ItemList onItemSelected={this.onItemSelected} 
                        getData={this.gotService.getAllBooks} 
                        renderItem={({ name }) => name}/>
        )

        const itemDetails = (
            <ItemDetails 
                itemId={this.state.selectedItem}
                getItem={this.gotService.getBook}>
                <Field field='name' label='Name'/>
                <Field field='numberOfPages' label='Number Of Pages'/>
                <Field field='publiser' label='Publiser'/>
                <Field field='released' label='Released'/>
            </ItemDetails>
        )

        return (
            <RowBlock left={itemList} right={itemDetails} />
        );
    }
}