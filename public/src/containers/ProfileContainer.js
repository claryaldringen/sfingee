
import Profile from '../components/Profile';
import { connect } from 'react-redux';
import axios from 'axios'

import { getAge } from '../tools/utils';
import { getProfileSuccess } from '../actions/people'

const mapDispatchToProps = (dispatch) => {
    return {
	    load(id) {
		    axios.get('/api/profile/' + id).then((result) => {
			    if (result.status !== 200) {

			    }

			    if(result.data.error) {
				    if (result.data.error.code == 'NOT_AUTHORIZED') {
					    window.location.href = '/'
				    }
			    }

			    dispatch(getProfileSuccess(result.data))
		    });
	    }
    }
}


function mapStateToProps(state, ownProps) {

	let relationship = [
		[null, 'Nezadaný', 'Zadaný', 'Rozvedený', 'Vdovec', 'V komplikovaném vztahu'],
		[null, 'Nezadaná', 'Zadaná', 'Rozvedená', 'Vdova', 'V komplikovaném vztahu']
	];

	let orientation = [
		[null, 'Hetero', 'Gay', 'Bi', 'Beru vše'],
		[null, 'Hetero', 'Lesbi', 'Bi', 'Beru vše']
	];

	let eyes = ['modré', 'hnědé', 'zelené', 'oříškové'];
	let hair = ['platinové', 'blonďaté', 'špinavě blonďaté', 'hnědé', 'zrzavé', 'červené', 'černé'];
	let hairLong = ['', 'velmi krátké', 'krátké', 'delší', 'dlouhé', 'velmi dlouhé'];
	let experience = [null, 'Žádné', 'Málo', 'Tak akorát', 'Celkem dost', 'Mnoho'];

	var user = {name: '', birthdate: '1998-01-01', sex: 0, relationship: 0};
  for(var userIndex = 0; userIndex < state.people.length; userIndex++) {
    user = state.people[userIndex];
    if(user.id == ownProps.params.userId) break;
  }
	if(user == null || user.relationship == null) return {};

  let visage = '';
  if(user.showWeight) {
  	visage += user.tall + ' cm, ' + user.weight + ' kg';
  }

  if(user.tall && user.weight) {
  	let bmi = (bmi) => {
  		if(bmi < 16.5) {
  			return 'vychrtlá postava';
		  }
		  if(bmi < 18.5) {
  			return 'hubená postava';
		  }
		  if(bmi < 25) {
  			return 'štíhlá postava';
		  }
		  if(bmi < 30) {
  			return 'normální postava';
		  }
		  if(bmi < 35) {
  			return 'trochu při těle';
		  }
		  return 'obézní postava';
	  };

		visage += ', ' + bmi(user.weight/((user.tall/100)*(user.tall/100)));
  }

  if(user.eyes) {
	  visage += ', ' + eyes[user.eyes] + ' oči';
  }

	if(user.hair) {
		visage += ', ' + hairLong[user.hairLong] + ' ' + hair[user.hair] + ' vlasy';
	}

	return {
		name: user.name,
    age: getAge(user.birthdate),
    relationship: relationship[user.sex][user.relationship],
    orientation: orientation[user.sex][user.orientation],
    visage: visage,
	  description: user.description,
    experience: experience[user.experience],
	  lastActivity: user.lastActivity,
		userIndex: userIndex,
	  write: user.id == state.user.user.id
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);