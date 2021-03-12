import produce from 'immer';

export const initialState = {
	loadMyInfoLodding: false,
	loadMyInfoDone: false,
	loadMyInfoError: null,

	logInLodding: false,
	logInDone: false,
	logInError: null,

	logOutLodding: false,
	logOutDone: false,
	logOutError: null,

	signUpLodding: false,
	signUpDone: false,
	signUpError: null,

	changeNicknameLodding: false,
	changeNicknameDone: false,
	changeNicknameError: null,

	followLodding: false,
	followDone: false,
	followError: null,

	unFollowLodding: false,
	unFollowDone: false,
	unFollowError: null,

	me: null,
	signUpData: {},
	loginData: {},
};

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST';
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

const dummyUser = (data) => ({
	...data,
	nickname: '데브종',
	id: 1,
	Posts: [{ id: 1 }],
	Followings: [{ nickname: '데브종' }, { nickname: '개연비' }, { nickname: '꼬마돌' }],
	Followers: [{ nickname: '데브종' }, { nickname: '개연비' }, { nickname: '꼬마돌' }],
});

export const loginRequestAction = (data) => {
	return {
		type: LOG_IN_REQUEST,
		data,
	};
};

export const logoutRequestAction = () => {
	return {
		type: LOG_OUT_REQUEST,
	};
};

const reducer = (state = initialState, action) => {
	return produce(state, (draft) => {
		switch (action.type) {
			case LOAD_MY_INFO_REQUEST:
				draft.loadMyInfoLodding = true;
				draft.loadMyInfoError = null;
				draft.loadMyInfoDone = false;
				break;
			case LOAD_MY_INFO_SUCCESS:
				draft.loadMyInfoLodding = false;
				draft.loadMyInfoDone = true;
				draft.me = action.data;
				break;
			case LOAD_MY_INFO_FAILURE:
				draft.loadMyInfoLodding = false;
				draft.loadMyInfoError = action.error;
				break;
			case LOG_IN_REQUEST:
				draft.logInLodding = true;
				draft.logInError = null;
				draft.logInDone = false;
				break;
			case LOG_IN_SUCCESS:
				draft.logInLodding = false;
				draft.logInDone = true;
				draft.me = action.data;
				break;
			case LOG_IN_FAILURE:
				draft.logInLodding = false;
				draft.logInError = action.error;
				break;
			case LOG_OUT_REQUEST:
				draft.logOutLodding = true;
				draft.logOutDone = false;
				draft.logOutError = null;
				break;
			case LOG_OUT_SUCCESS:
				draft.logOutLodding = false;
				draft.logOutDone = true;
				draft.me = null;
				break;
			case LOG_OUT_FAILURE:
				draft.logOutLodding = false;
				draft.logOutError = action.error;
				break;
			case SIGN_UP_REQUEST:
				draft.signUpLodding = true;
				draft.signUpDone = false;
				draft.signUpError = null;
				break;
			case SIGN_UP_SUCCESS:
				draft.signUpLodding = false;
				draft.signUpDone = true;
				break;
			case SIGN_UP_FAILURE:
				draft.signUpLodding = false;
				draft.signUpError = action.error;
				break;
			case CHANGE_NICKNAME_REQUEST:
				draft.changeNicknameLodding = true;
				draft.changeNicknameDone = false;
				draft.changeNicknameError = null;
				break;
			case CHANGE_NICKNAME_SUCCESS:
				draft.changeNicknameLodding = false;
				draft.changeNicknameDone = true;
				break;
			case CHANGE_NICKNAME_FAILURE:
				draft.changeNicknameLodding = false;
				draft.changeNicknameError = action.error;
				break;
			case FOLLOW_REQUEST:
				draft.followLodding = true;
				draft.followError = null;
				draft.followDone = false;
				break;
			case FOLLOW_SUCCESS:
				draft.followLodding = false;
				draft.followDone = true;
				draft.me.Followings.push({ id: action.data });
				break;
			case FOLLOW_FAILURE:
				draft.followLodding = false;
				draft.followError = action.error;
				break;
				case UNFOLLOW_REQUEST:
				draft.unFollowLodding = true;
				draft.unFollowError = null;
				draft.unFollowDone = false;
				break;
			case UNFOLLOW_SUCCESS:
				draft.unFollowLodding = false;
				draft.unFollowDone = true;
				draft.me.Followings = draft.me.Followings.filter((v) => v.id !== action.data);
				break;
			case UNFOLLOW_FAILURE:
				draft.unFollowLodding = false;
				draft.unFollowError = action.error;
				break;
			case ADD_POST_TO_ME:
				draft.me.Posts.unshift({ id: action.data });
				break;
			case REMOVE_POST_OF_ME:
				draft.me.Posts = draft.me.Posts.filter((v) => v.id !== action.data);
				break;
			default:
				break;
		}
	});
};

export default reducer;