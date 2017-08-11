
import React from 'react'

import SignInForm from '../containers/SignInFormContainer'
import SignUpDialog from '../containers/SignUpDialogContainer'
import ForgottenPasswordDialog from '../containers/ForgottenPasswordDialogContainer'

import '../../css/main.css';

export default class HomePage extends React.Component {

	render() {
		return(
			<div>
				<nav className="navbar navbar-inverse" style={{margin: 0, borderRadius: 0}}>
					<div className="container">
						<div className="navbar-header">
							<a className="navbar-brand" href="#">
								<span style={{fontSize: 48, color: '#FFF'}}>Sfingee</span>.com
							</a>
						</div>
					</div>
				</nav>
				<div className="jumbotron" style={{color: '#FFF', height: 480, background: "url('/img/jumbotron.jpg') 100% 480px"}}>
					<div className="col-md-offset-2 col-md-4">
						<h2 style={{fontSize: 48, textShadow: '1px 1px black'}}>
							Chatuj, scházej se a bav se. Nebo si i něco přivydělej. Bez obav, rychle a bezpečně.
							<br/>
							<a href="#" style={{color: '#5cb85c'}} onClick={this.props.showSignUpDialog}>Přidej se k nám!</a>
						</h2>
					</div>
					<div className="col-md-4">
						<SignInForm/>
					</div>
				</div>
				<div className="container" style={{fontSize: 24}}>
					<div className="row">
						<div className="col-md-4">
							Chceš si přivydělat? Ráda flirtuješ a provokuješ?
							Nyní máš tu nejjednodušší možnost oboje spojit.
							Chceš vědět víc?
						</div>
						<div className="col-md-4">
							Chceš vést žhavý chat nebo si vyměňovat fotky, ale bojíš se podvodu?
							S námi se ti to nestane. Chceš vědět víc?
						</div>
						<div className="col-md-4">
							Chceš se prostě jen bavit a flirtovat a normální seznamka ti příjde moc úzkoprsá?
							Jsme tu pro tebe!
						</div>
					</div>
					<SignUpDialog/>
					<ForgottenPasswordDialog/>
				</div>
			</div>

		);
	}

}
