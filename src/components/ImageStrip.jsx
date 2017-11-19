
import React from 'react'

import UploadDialog from '../containers/UploadDialogContainer'
import Viewer from '../containers/ViewerContainer'
import LockDialog from "../containers/LockDialogContainer"
import ImageAddButtonPng from '../img/image-add-button.png'

import CrossPng from '../img/cross.png'
import KeyPng from '../img/key.png'
import LeftPng from '../img/left.png'
import RightPng from '../img/right.png'
import MalePng from '../img/male.png'

export default class ImageStrip extends React.Component {

	constructor(props) {
		super(props)
		this.state = {hidden: 0}
	}

	rightClick() {
		this.refs['image_' + this.state.hidden].style.display = 'none'
		if(this.state.hidden+6 < this.props.images.length) {
			let hidden = this.state.hidden
			hidden++
			this.setState({hidden: hidden})
			if (hidden % 6) {
				setTimeout(this.rightClick.bind(this), 50)
			}
		}
	}

	leftClick() {
		if(this.state.hidden > 0) {
			this.refs['image_' + this.state.hidden].style.display = 'block'
			let hidden = this.state.hidden
			hidden--
			this.setState({hidden: hidden})
			if (hidden % 6) {
				setTimeout(this.leftClick.bind(this), 50)
			}
		}
	}

	delete(index, event) {
		event.stopPropagation()
		if(confirm('Opravdu chcete odstranit tuto fotku?')) {
			this.props.delete(index, this.props.userId, this.props.images[index].id, this.props.images[index].avatar)
		}
	}

	setAsAvatar(index, event) {
		event.stopPropagation()
		const image = this.props.images[index]
		this.props.setAsAvatar(index, this.props.userId, image.name + '.' + image.extension, image.id)
	}

	setLock(index, event) {
		event.stopPropagation()
		this.props.lock(index)
	}

	openImage(index) {
		this.props.showViewer(index)
	}

	render() {

		let htmlImages = this.props.images.map( (image, i) => {

			const style = {position: 'relative', background: '#666', width: 142, height: 142, float: 'left', overflow: 'hidden', cursor: 'pointer'}

			const controls = []
			let key = null
			if(this.props.write) {

				if(this.props.images.length > 1) {
					controls.push(
						<div key="cont1" title="Odstranit fotku" onClick={this.delete.bind(this, i)} style={{
							position: 'absolute',
							top: 8,
							right: 8,
							background: 'rgba(0,0,0,0.7)',
							padding: '5px 10px',
							borderRadius: 14,
							cursor: 'pointer'
						}}>
							<img src={CrossPng} width={8} height={8}/>
						</div>
					)
				}

				if(image.id != this.props.avatar) {
					controls.push(
						<div key="cont2" title="Zamknout fotografii" style={{
							position: 'absolute',
							top: 8,
							left: 56,
							background: 'rgba(0,0,0,0.7)',
							padding: '5px 10px',
							borderRadius: 14,
							cursor: 'pointer'
						}} onClick={this.setLock.bind(this, i)}>
							<img src={KeyPng} width={8} height={8}/>
						</div>
					)
					controls.push(
						<div key="cont3" title="Nastavit jako profilovku" style={{
							position: 'absolute',
							top: 8,
							left: 8,
							background: 'rgba(0,0,0,0.7)',
							padding: '5px 10px',
							borderRadius: 14,
							cursor: 'pointer'
						}} onClick={this.setAsAvatar.bind(this, i)}>
							<img src={MalePng} width={8} height={8}/>
						</div>
					)
				}
				if(image.brutto) {
					key =
						<div style={{width: 32, height: 32, textAlign: 'center', color: '#FFF', position: 'absolute', top: 55, left: 55}}>
							<img src={KeyPng} style={{position: 'absolute', width: 32, height: 32, left: 0, top: 0}} />
							<b style={{zIndex: 2}}>{image.brutto} kr.</b>
						</div>
				}
			}

			if(image.netto && key == null && this.props.unlocked.indexOf(image.id) === -1) {
				key =
					<div style={{width: 48, height: 48, textAlign: 'center', color: '#FFF', position: 'absolute', top: 46, left: 47}}>
						<img src={KeyPng} style={{position: 'absolute', width: 32, height: 32, left: 0, top: 0}} />
						<br /><br />
						<b style={{zIndex: 2}}>{image.netto} kr.</b>
					</div>
			}

			let img = null

			if(!image.netto || this.props.unlocked.indexOf(image.id) !== -1 || this.props.write) {
				img = <img src={'/uploads/' + this.props.email + '/' + image.name + 'sm.' + image.extension} style={{maxWidth: 142, minHeight: 142}}/>
			} else {
				img = <div style={{width: 142, height: 142, borderRight: '1px solid #e5e5e5'}}></div>
			}

			return(
				<div ref={'image_' + i} key={'image_' + i} style={style} onClick={this.openImage.bind(this, i)}>
					{controls}
					{key}
					{img}
				</div>
			)
		})

		let controls = []
		if(this.props.images.length > 6) {
			const leftStyle = {position: 'absolute',top: 48,left: 8, background: 'rgba(0,0,0,0.7)', padding: 8, borderRadius: 32, cursor: 'pointer', zIndex: 2}
			const rightStyle = {position: 'absolute',top: 48,right: 8, background: 'rgba(0,0,0,0.7)', padding: 8, borderRadius: 32, cursor: 'pointer', zIndex: 2}

			if(this.state.hidden > 0) {
				controls.push(
					<div key="c1" style={leftStyle} onClick={this.leftClick.bind(this)}>
						<img src={LeftPng} width={32} height={32}/>
					</div>
				)
			}

			if(this.state.hidden+6 < this.props.images.length) {
				controls.push(
					<div key="c2" style={rightStyle} onClick={this.rightClick.bind(this)}>
						<img src={RightPng} width={32} height={32}/>
					</div>
				)
			}
		}

		if(this.props.write) {
			htmlImages.unshift(
				<div key={'image_write'} style={{background: '#666', width: 142, height: 142, float: 'left', overflow: 'hidden', textAlign: 'center', cursor: 'pointer', padding: 32, color: '#FFF'}} onClick={this.props.openUploadDialog} >
					<img src={ImageAddButtonPng} width={32} height={32} />
					<br/>
					<b>Přidat fotografie</b>
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
					{this.state.hidden}/{this.props.cnt}
				</div>
				<UploadDialog/>
				<Viewer images={this.props.images} email={this.props.email} write={this.props.write} />
				<LockDialog images={this.props.images} email={this.props.email}/>
			</div>
		)
	}
}