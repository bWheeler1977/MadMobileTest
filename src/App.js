import React from 'react';
import './App.css';
import UserListPage from './components/userlistpage.component';
import { UserContext } from "./contexts/user.context";

const API = "https://randomuser.me/api/?results=25&seed=madmobile&nat=us,gb,ca,au&exc=login&page=";

class App extends React.Component {
    updateUser = (user) => {
        let tempUsers = [...this.state.users];
        let index = tempUsers.findIndex(obj => obj.dob.date === user.dob.date);
        tempUsers[index] = user;
        this.setState({
            users: tempUsers
        });
    };

    getNextPage = () => {
        let newPage = Object.assign(this.state.page + 1);
        this.getUsers(newPage);
        this.setState({
            page: newPage
        });
    };

    getUsers = (page) => {
        fetch(API + page.toString())
            .then(response => {
                if(response.ok) {
                    return response.json()
                } else {
                    throw new Error("Something went wrong...");
                }
            })
            .then(data => {
                this.setState({ users: this.state.users.concat(data.results), isLoading: false });
            })
            .catch(error => this.setState({ error, isLoading: false }));
    };

    state = {
        users: [],
        updateUser: this.updateUser,
        getNextPage: this.getNextPage,
        isLoading: false,
        error: null,
        page: 1
    };

  componentDidMount() {
        this.setState({ isLoading: true });
        this.getUsers(this.state.page);
  }

  render ()
  {
    return (
        <UserContext.Provider value={ this.state }>
            <div className="App">
                <header>
                    <h1>This is a list of random users!</h1>
                </header>
                <div id='body'>
                    <UserListPage />
                </div>
                <footer>
                    <p>This site done by Brian Wheeler</p>
                </footer>
            </div>
        </UserContext.Provider>
    );
  };
}

export default App;
