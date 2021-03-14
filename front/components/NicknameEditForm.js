import React, { useMemo, useCallback, useEffect } from 'react';
import { Form, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import useInput from '../hooks/useInput';
import { CHANGE_NICKNAME_REQUEST } from '../reducers/user';

const NicknameEditForm = () => {
	const dispatch = useDispatch();
	const { me, changeNicknameDone } = useSelector((state) => state.user);
	const [nickname, onChangeNicknmae, setNickname] = useInput(me?.nickname || '');
	const style = useMemo(() => ({ marginBottom: '20px', border: '1px solid #d9d9d9', padding: '20px' }), []);

	const onSubmit = useCallback(() => {
		dispatch({
			type: CHANGE_NICKNAME_REQUEST,
			data: nickname,
		})
	}, [nickname]);

	useEffect(() => {
		if (changeNicknameDone) {
			setNickname('');
		}
	}, [changeNicknameDone]);

	return (
		<Form style={style}>
			<Input.Search
				addonBefore="닉네임"
				enterButton="수정"
				value={nickname}
				onChange={onChangeNicknmae}
				onSearch={onSubmit}
			/>
		</Form>
	);
};

export default NicknameEditForm;