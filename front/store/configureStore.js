import { createWrapper } from 'next-redux-wrapper';
import { createStore, compose, applyMiddleware } from 'redux';

import reducer from '../reducers';

const confiqureStore= () => {
	const enhancer = process.env.NODE_ENV === 'production'
		? compose(applyMiddleware([]))
		: compose(applyMiddleware([]))
	const store = createStore(reducer);
	store.dispatch({
		type: 'CHANGE_NICKNAME',
		data: 'devjong2',
	});
	return store;
};

const wrapper = createWrapper(confiqureStore, {
	debug: process.env.NODE_ENV === 'development',
});

export default wrapper;