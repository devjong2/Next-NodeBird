import produce from 'immer';

export const initialState = {
	loadMyInfoLodding: false,
	loadMyInfoDone: false,
	loadMyInfoError: null,

	loadUserLodding: false,
	loadUserDone: false,
	loadUserError: null,

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

	loadFollowersLodding: false,
	loadFollowersDone: false,
	loadFollowersError: null,
	
	loadFollowingsLodding: false,
	loadFollowingsDone: false,
	loadFollowingsError: null,

	removeFollowerLodding: false,
	removeFollowerDone: false,
	removeFollowerError: null,

	me: null,
	userInfo: null,
};

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST';
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE';

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

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

export const REMOVE_FOLLOWER_REQUEST = 'REMOVE_FOLLOWER_REQUEST';
export const REMOVE_FOLLOWER_SUCCESS = 'REMOVE_FOLLOWER_SUCCESS';
export const REMOVE_FOLLOWER_FAILURE = 'REMOVE_FOLLOWER_FAILURE';

export const LOAD_FOLLOWERS_REQUEST = 'LOAD_FOLLOWERS_REQUEST';
export const LOAD_FOLLOWERS_SUCCESS = 'LOAD_FOLLOWERS_SUCCESS';
export const LOAD_FOLLOWERS_FAILURE = 'LOAD_FOLLOWERS_FAILURE';

export const LOAD_FOLLOWINGS_REQUEST = 'LOAD_FOLLOWINGS_REQUEST';
export const LOAD_FOLLOWINGS_SUCCESS = 'LOAD_FOLLOWINGS_SUCCESS';
export const LOAD_FOLLOWINGS_FAILURE = 'LOAD_FOLLOWINGS_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

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
			case LOAD_USER_REQUEST:
				draft.loadUserLodding = true;
				draft.loadUserError = null;
				draft.loadUserDone = false;
				break;
			case LOAD_USER_SUCCESS:
				draft.loadUserLodding = false;
				draft.loadUserDone = true;
				draft.userInfo = action.data;
				break;
			case LOAD_USER_FAILURE:
				draft.loadUserLodding = false;
				draft.loadUserError = action.error;
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
				draft.me.nickname = action.data.nickname;
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
				draft.me.Followings.push({ id: action.data.UserId });
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
				draft.me.Followings = draft.me.Followings.filter((v) => v.id !== action.data.UserId);
				break;
			case UNFOLLOW_FAILURE:
				draft.unFollowLodding = false;
				draft.unFollowError = action.error;
				break;
			case REMOVE_FOLLOWER_REQUEST:
				draft.removeFollowerLodding = true;
				draft.removeFollowerError = null;
				draft.removeFollowerDone = false;
				break;
			case REMOVE_FOLLOWER_SUCCESS:
				draft.removeFollowerLodding = false;
				draft.removeFollowerDone = true;
				draft.me.Followers = draft.me.Followers.filter((v) => v.id !== action.data.UserId);
				break;
			case REMOVE_FOLLOWER_FAILURE:
				draft.removeFollowerLodding = false;
				draft.removeFollowerError = action.error;
				break;
			case LOAD_FOLLOWERS_REQUEST:
				draft.loadFollowersLodding = true;
				draft.loadFollowersError = null;
				draft.loadFollowersDone = false;
				break;
			case LOAD_FOLLOWERS_SUCCESS:
				draft.loadFollowersLodding = false;
				draft.loadFollowersDone = true;
				draft.me.Followers = action.data;
				break;
			case LOAD_FOLLOWERS_FAILURE:
				draft.loadFollowersLodding = false;
				draft.loadFollowersError = action.error;
				break;
			case LOAD_FOLLOWINGS_REQUEST:
				draft.loadFollowingsLodding = true;
				draft.loadFollowingsError = null;
				draft.loadFollowingsDone = false;
				break;
			case LOAD_FOLLOWINGS_SUCCESS:
				draft.loadFollowingsLodding = false;
				draft.loadFollowingsDone = true;
				draft.me.Followings = action.data;
				break;
			case LOAD_FOLLOWINGS_FAILURE:
				draft.loadFollowingsLodding = false;
				draft.loadFollowingsError = action.error;
				break;
			case ADD_POST_TO_ME:
				draft.me.Posts.unshift({ id: action.data });
				break;
			case REMOVE_POST_OF_ME:
				draft.me.Posts = draft.me.Posts.filter((v) => v.id !== action.data.PostId);
				break;
			default:
				break;
		}
	});
};

export default reducer;