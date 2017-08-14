
import React from 'react';

export default class Viewer extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
			height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
		};
		this.width = 0;
		this.height = 0;
	}

	leftClick() {
		if(this.props.index > 0) {
			this.props.showViewer(this.props.index-1);
		}
	}

	rightClick() {
		if(this.props.index < this.props.images.length) {
			this.props.showViewer(this.props.index+1);
		}
	}

	updateDimensions() {
		this.setState({
			width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
			height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
		});
	}

	componentDidMount() {
		window.addEventListener("resize", this.updateDimensions.bind(this));
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.updateDimensions);
	}

	render() {

		if(!this.props.visibility) return null;

		const image = this.props.images[this.props.index];

		const mainStyle = {
			position: 'fixed',
			top: 0,
			left: 0,
			width: this.state.width,
			height: this.state.height,
			background: 'rgba(0,0,0,0.95)',
			textAlign: 'center',
			display: 'inline-block',
			zIndex: 10
		};
		const imageStyle = {position: 'relative', maxWidth: this.state.width, maxHeight: this.state.height,top: '50%', transform: 'translateY(-50%)'};
		const crossStyle = {position: 'absolute',top: 8,right: 8, background: 'rgba(0,0,0,0.7)', padding: 8, borderRadius: 32, cursor: 'pointer'};

		let left = null;
		if(this.props.index > 0) {
			const leftStyle = {position: 'absolute',top: '45%',left: 8, background: 'rgba(0,0,0,0.7)', padding: 8, borderRadius: 32, cursor: 'pointer'};
			left = <div style={leftStyle} onClick={this.leftClick.bind(this)}><img src="/img/left.png" width={32} height={32} /></div>
		}

		let right = null;
		if(this.props.index < this.props.images.length-1) {
			const rightStyle = {position: 'absolute',top: '45%',right: 8, background: 'rgba(0,0,0,0.7)', padding: 8, borderRadius: 32, cursor: 'pointer'};
			right = <div style={rightStyle} onClick={this.rightClick.bind(this)}><img src="/img/right.png" width={32} height={32} /></div>

		}

		return(
			<div style={mainStyle}>
				{left}
				{right}

				<div style={crossStyle} onClick={this.props.hideViewer}>
					<img src="/img/cross.png" width={32} height={32} />
				</div>

				<img src={'/uploads/' + this.props.email + '/' + image.name + '.' + image.extension} style={imageStyle}/>
			</div>
		)
	}

}