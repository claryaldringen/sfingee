
import Profile from '../components/Profile';
import { connect } from 'react-redux';
import { get } from 'axios';
import { push } from 'react-router-redux';

import { getAge } from '../tools/utils';
import { getProfileSuccess } from '../actions/people';
import { openChatDialog } from '../actions/dialogs'
import { getRelationship, getOrientation, getEyes, getHair, getHairLong, getExperience } from '../tools/codebook';

const mapDispatchToProps = (dispatch) => {
    return {
	    load(id) {
		    get('/api/profile/' + id).then((result) => {
			    if (result.status !== 200) {

			    }

			    if(result.data.error) {
				    if (result.data.error.code == 'NOT_AUTHORIZED') {
					    window.location.href = '/'
				    }

				    if(result.data.error.code == 'NOT_FOUND') {
				    	dispatch(push('/app/people'));
				    }
			    }

			    dispatch(getProfileSuccess(result.data))
		    });
	    },
	    openChat(id) {
		    dispatch(openChatDialog(id));
	    }
    }
}


function mapStateToProps(state, ownProps) {

	var user = {name: '', birthdate: '1998-01-01', sex: 0, relationship: 0};
  for(var userIndex = 0; userIndex < state.people.length; userIndex++) {
    user = state.people[userIndex];
    if(user.id == ownProps.params.userId) break;
  }
	if(user == null || user.sex == null) return {};

  let visage = '';
  if(user.showWeight && user.tall && user.weight) {
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
	  visage += ', ' + getEyes()[user.eyes] + ' oči';
  }

	if(user.hair) {
		visage += ', ' + getHairLong()[user.hairLong] + ' ' + getHair()[user.hair] + ' vlasy';
	}

  const date = user.birthdate.split('T')[0].split('-');

	return {
		name: user.name,
    age: getAge(user.birthdate),
    relationship: getRelationship()[user.sex][user.relationship],
    orientation: getOrientation()[user.sex][user.orientation],
    visage: visage,
	  description: user.description,
    experience: getExperience()[user.experience],
	  lastActivity: user.lastActivity,
		userIndex: userIndex,
	  write: user.id == state.user.user.id,
		sex: user.sex,
		initialValues: {
    	name: user.name,
			day: date[2],
			month: date[1],
			year: date[0],
    	orientation: user.orientation,
			relationship: user.relationship,
			tall: user.tall,
			weight: user.weight,
			eyes: user.eyes,
    	hair: user.hair,
			hairLong: user.hairLong,
			experience: user.experience,
			description: user.description
		},
		loading: state.user.loading
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);