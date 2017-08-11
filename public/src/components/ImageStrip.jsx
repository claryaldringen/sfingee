
import React from 'react';

import UploadDialog from '../containers/UploadDialogContainer';
import Viewer from '../containers/ViewerContainer';

export default class ImageStrip extends React.Component {

	constructor(props) {
		super(props);
		this.hidden = 0;
	}

	rightClick() {
		this.refs['image_' + this.hidden].style.display = 'none';
		if(this.hidden+6 < this.props.images.length) {
			this.hidden++;
			if (this.hidden % 6) {
				setTimeout(this.rightClick.bind(this), 50);
			}
		}
	}

	leftClick() {
		if(this.hidden > 0) {
			this.hidden--;
			this.refs['image_' + this.hidden].style.display = 'block';
			if (this.hidden % 6) {
				setTimeout(this.leftClick.bind(this), 50);
			}
		}
	}

	delete(index, event) {
		event.stopPropagation();
		if(confirm('Opravdu chcete odstranit tuto fotku?')) {
			this.props.delete(index, this.props.userId, this.props.images[index].id, this.props.images[index].avatar);
		}
	}

	setAsAvatar(index, event) {
		event.stopPropagation();
		const image = this.props.images[index];
		this.props.setAsAvatar(index, this.props.userId, image.name + '.' + image.extension, image.id);
	}

	openImage(index) {
		this.props.showViewer(index);
	}

	render() {

		let htmlImages = this.props.images.map( (image, i) => {

			const style = {position: 'relative', background: '#666', width: 142, height: 142, float: 'left', overflow: 'hidden', cursor: 'pointer'};

			const controls = [];
			if(this.props.write) {
				controls.push(
					<div key="cont1" title="Odstranit fotku" onClick={this.delete.bind(this, i)} style={{position: 'absolute',top: 8,right: 8, background: 'rgba(0,0,0,0.7)',padding: '5px 10px', borderRadius: 14, cursor: 'pointer'}}>
						<img src="/img/cross.png" width={8} height={8} />
					</div>
				);

				if(image.id != this.props.avatar) {
					controls.push(
						<div key="cont2" title="Nastavit jako profilovku" style={{
							position: 'absolute',
							top: 8,
							left: 8,
							background: 'rgba(0,0,0,0.7)',
							padding: '5px 10px',
							borderRadius: 14,
							cursor: 'pointer'
						}} onClick={this.setAsAvatar.bind(this, i)}>
							<img src="/img/male.png" width={8} height={8}/>
						</div>
					);
				}
			}

			return(
				<div ref={'image_' + i} key={'image_' + i} style={style} onClick={this.openImage.bind(this, i)}>
					{controls}
					<img src={'/uploads/' + this.props.email + '/' + image.name + '.' + image.extension} style={{maxWidth: 142, minHeight: 142}}/>
				</div>
			);
		});

		let controls = [];
		if(this.props.images.length > 6) {
			const leftStyle = {position: 'absolute',top: 48,left: 8, background: 'rgba(0,0,0,0.7)', padding: 8, borderRadius: 32, cursor: 'pointer', zIndex: 2};
			const rightStyle = {position: 'absolute',top: 48,right: 8, background: 'rgba(0,0,0,0.7)', padding: 8, borderRadius: 32, cursor: 'pointer', zIndex: 2};

			controls.push(
				<div key="c1" style={leftStyle} onClick={this.leftClick.bind(this)}>
					<img src="/img/left.png" width={32} height={32} />
				</div>
			);
			controls.push(
				<div key="c2" style={rightStyle} onClick={this.rightClick.bind(this)}>
					<img src="/img/right.png" width={32} height={32} />
				</div>
			);
		}

		if(this.props.write) {
			htmlImages.unshift(
				<div key={'image_write'} style={{background: 'blue', width: 142, height: 142, float: 'left', overflow: 'hidden'}} onClick={this.props.openUploadDialog} >

				</div>
			)
		}

		return(
			<div style={{position: 'relative', overflow: 'hidden', background: '#999'}}>
				{controls}
				<div style={{width: 142*htmlImages.length}}>
					{htmlImages}
				</div>
				<div style={{position: 'absolute', left: 8, bottom: 8, color: '#FFFFFF', background: 'rgba(0,0,0,0.7)', padding: '4px 8px', borderRadius: 8}}>
					{this.hidden}/{this.props.cnt}
				</div>
				<UploadDialog/>
				<Viewer images={this.props.images} email={this.props.email}/>
			</div>
		);
	}
}