
export function getRelationship() {
	return([
		[null, 'Nezadaný', 'Zadaný', 'Rozvedený', 'Vdovec', 'V komplikovaném vztahu'],
		[null, 'Nezadaná', 'Zadaná', 'Rozvedená', 'Vdova', 'V komplikovaném vztahu']
	]);
}

export function getOrientation() {
	return([
		[null, 'Hetero', 'Gay', 'Bi', 'Beru vše'],
		[null, 'Hetero', 'Lesbi', 'Bi', 'Beru vše']
	]);
}

export function getEyes() {
	return(['','modré', 'hnědé', 'zelené', 'oříškové']);
}

export function getHair() {
	return(['','platinové', 'blonďaté', 'špinavě blonďaté', 'hnědé', 'zrzavé', 'červené', 'černé']);
}

export function getHairLong() {
	return(['', 'velmi krátké', 'krátké', 'delší', 'dlouhé', 'velmi dlouhé']);
}

export function getExperience() {
	return([null, 'Žádné', 'Málo', 'Tak akorát', 'Celkem dost', 'Mnoho']);
}