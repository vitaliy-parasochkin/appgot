import React from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
// import CharacterPage from '../characterPage';
// import HousePage from '../housePage';
// import BookPage from '../bookPage';
import CharacterPage, {HousePage, BookPage} from '../pages';
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
                    <HousePage/>
                    <BookPage/>
                </Container>
            </>
        );
    }
    
};

export default App;