import React from 'react';

const Home = () => (
    <div>
        <h1>Instructions</h1>
        <p>This is a simple UI to show the JWT functionality for Battleface. Once this is setup, use a REST client such
            as Postman or Insomnia to create a user.  Submit a post request to [server]/api/register with the following:
        </p>
        <ul>
            <li>name</li>
            <li>email</li>
            <li>password</li>
            <li>confirm_password</li>
        </ul>
        <p>Then click on the Quote link to get an insurance quote. If you have the React Tools installed for your
        browser you can verify the JWT token.</p>
    </div>

);

export default Home;
