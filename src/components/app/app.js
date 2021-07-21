import React from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../characterPage';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import GotService from "../../services/gotService";


class App extends React.Component {
    gotService = new GotService();

    state = {
        hide: false,
        error: false
    }

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }

    


    onClick = () => {
        this.setState(state => ({
            hide: !state.hide
        }))
    }
    render() {
        const {hide, error} = this.state;
        const content = hide ? null : <RandomChar/>

        if (error) {
            return <ErrorMessage />
        }

        return (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 6, offset: 0}}>
                            {content}
                            <button onClick={this.onClick}>Hide random char</button>
                        </Col>
                    </Row>
                    <CharacterPage />
                    <Row>
                        <Col md="6">
                            <ItemList 
                                onItemSelected={this.onItemSelected} 
                                getData={this.gotService.getAllBooks}
                                renderItem={(item) => item.name}/>
                        </Col>
                        <Col md="6">
                            <CharDetails charId={this.state.selectedChar} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                            <ItemList 
                                onItemSelected={this.onItemSelected} 
                                getData={this.gotService.getAllHouses}
                                renderItem={(item) => `${item.name}`}/>
                        </Col>
                        <Col md="6">
                            <CharDetails charId={this.state.selectedChar} />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
    
};

export default App;