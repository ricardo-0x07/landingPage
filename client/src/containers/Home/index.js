import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Home.css';

class Home extends Component {
  render() {
    return (
        <div className="Home">
            <div class="row">
                <section className="col-xs-12 col-md-8" id="left-side">
                    <header className="header">
                    <h1>THE ONLY ONLINE SHOPPING EXPERIENCE  WERE YOU SET THE PRICE</h1>
                    <p>THIS IS WHAT WELL BE TRINIDAD'S FIRST ONE STOP AND ONLINE SHOPPING AND TRADE</p>
                    </header>
                </section>
                <div className="col-xs-6 col-md-4">
                    <header className="right-header">
                    <h1>
                        Stay informed and to be first to benefit from this new experience
                    </h1>
                    </header>
                    <div className="sign-area">
                        <button type="button" className="btn btn-primary btn-lg btn-block" id="facebook-btn">
                            <a href="/auth/facebook" id="Facebook-link">Sign up with Facebook</a>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default Home;
