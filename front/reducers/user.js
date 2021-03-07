export const initialState = {
	logInLodding: false,
	logInDone: false,
	logInError: null,

	logOutLodding: false,
	logOutDone: false,
	logOutError: null,

	signUpLodding: false,
	signUpDone: false,
	signUpError: null,

	me: null,
	signUpData: {},
	loginData: {},
};

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

const dummyUser = (data) => ({
	...data,
	nickname: '데브종',
	id: 1,
	Posts: [],
	Followings: [],
	Followers: [],
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
	switch (action.type) {
		case LOG_IN_REQUEST:
			return {
				...state,
				logInLodding: true,
				logInError: null,
				logInDone: false,
			};
		case LOG_IN_SUCCESS:
			return {
				...state,
				logInLodding: false,
				logInDone: true,
				me: dummyUser(action.data),
			};
		case LOG_IN_FAILURE:
			return {
				...state,
				logInLodding: false,
				logInError: action.error,
			};
		case LOG_OUT_REQUEST:
			return {
				...state,
				logOutLodding: true,
				logOutDone: false,
				logOutError: null,
			};
		case LOG_OUT_SUCCESS:
			return {
				...state,
				logOutLodding: false,
				logOutDone: true,
				me: null,
			};
		case LOG_OUT_FAILURE:
			return {
				...state,
				logOutLodding: false,
				logOutError: action.error,
			};
		case SIGN_UP_REQUEST:
			return {
				...state,
				signUpLodding: true,
				signUpDone: false,
				signUpError: null,
			};
		case SIGN_UP_SUCCESS:
			return {
				...state,
				signUpLodding: false,
				signUpDone: true,
			};
		case SIGN_UP_FAILURE:
			return {
				...state,
				signUpLodding: false,
				signUpError: action.error,
			};
		default:
			return state;
	}
};

export default reducer;