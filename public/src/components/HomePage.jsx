
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
							<a className="navbar-brand" href="/">
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
					<div className="row" style={{height: 240}}>
						<div className="col-md-4">
							Chceš si přivydělat? Ráda flirtuješ a provokuješ?
							Nyní máš tu nejjednodušší možnost oboje spojit.
							<a href="#vydelavej">Chceš vědět víc?</a>
						</div>
						<div className="col-md-4">
							Chceš vést žhavý chat nebo si vyměňovat fotky, ale bojíš se podvodu?
							S námi se ti to nestane. <a href="#uzivejsi">Chceš vědět víc?</a>
						</div>
						<div className="col-md-4">
							Chceš se prostě jen bavit a flirtovat a normální seznamka ti příjde moc úzkoprsá?
							<a href="#bavse">Jsme tu pro tebe!</a>
						</div>
					</div>
					<div className="row" style={{height: 480}}>
						<div className="col-md-12">
							<a name="vydelavej"/>
							<h1>Ráda flirtuješ a chceš si přivydělat?</h1>
							<p>
								Na Sfingee.com máš několik možností, jak si přivydělat:
							</p>
							<ul>
								<li>
									<b>Žhavý chat:</b>
									Sama si určíš, kolik kreditů bude stát hodina chatu s tebou. Pokud tě někdo osloví, tak podle délky chatu se ti poměrově přičte část kreditů.
									Ovšem pokud se ti někdo líbí, můžeš ho oslovit sama a flirtovat s dotyčným klidně celou noc.
								</li>
								<li>
									<b>Fotografie:</b>
									U tebou vybraných fotografií ze tvé galerie můžeš určit za kolik kreditů se žadateli zobrazí. Úžasné je, že tvé fotografie ti mohou vydělávat i když ty spíš nebo se bavíš s přáteli!
								</li>
							</ul>
							<p>
								Své kredity si můžeš kdykoliv převést na peníze a nechat poslat na účet.
							</p>
						</div>
					</div>
					<div className="row" style={{height: 480}}>
						<div className="col-md-12">
							<a name="uzivejsi"/>
							<h1>Chceš vést žhavý chat nebo si prohlížet fotky?</h1>
							<p>
								Stačí jednoduše nakoupit naše kredity a můžeš si prohlížet všechny fotografie všech uživatelů ve vysokém rozlišení, nebo vést lehtivý chat, kde zaplatíš pouze za opravdu prochatovaný čas.
								Své kredity si můžeš kdykoliv nechat převést zpět na peníze a nechat poslat na účet. Žhavé chatování nebylo nikdy bezpečnější.
							</p>
						</div>
					</div>
					<div className="row" style={{height: 480}}>
						<div className="col-md-12">
							<a name="bavse"/>
							<h1>Chceš poznvat nové lidi a jejich nejtajnější touhy?</h1>
							<p>
								Můžeš procházet celým portálem a chatovat s kýmkoliv si padnete do oka. Prostě se jen tak bavit. Nezávazně a bez poplatků.
							</p>
						</div>
					</div>
					<SignUpDialog/>
					<ForgottenPasswordDialog/>
				</div>
				<footer className="footer navbar-inverse" style={{padding: 12, margin: 0, borderRadius: 0, color: '#FFF'}}>
					<div className="container">
						<div className="col-md-6">
							<a href="/termsofuse">Všeobecné podmínky užívání</a>
							<br/><br/>
							<a href="/privacypolicy">Ochrana soukromí</a>
						</div>
						<div className="col-md-6">
							Provozovatel: <br />
							Martin Zaražil <br />
							IČ: 74901231 <br />
							<a href="mailto:info@sfingee.com">info@sfingee.com</a>
						</div>
					</div>
				</footer>
			</div>

		);
	}

}
