
export function setAuthHash(hash, persistent = true) {
	if(persistent) {
		sessionStorage.setItem('authhash', hash)
	} else {
		localStorage.setItem('authhash', hash)
	}
}

export function getAuthHash() {
	let authhash = sessionStorage.getItem('authhash')
	if(!authhash) {
		authhash = localStorage.getItem('authhash')
	}
	return authhash
}