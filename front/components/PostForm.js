import React, { useCallback, useRef, useState } from 'react';
import { Form, Input, Button } from 'antd';
import useInput from '../hooks/useInput';
import { useSelector, useDispatch } from 'react-redux';
import { addPost } from '../reducers/post';

const PostForm = () => {
	const dispatch = useDispatch();
	const { imagePaths } = useSelector((state) => state.post);
	const imageInput = useRef();
	const [text, setText] = useState('');
	const onChangeText = useCallback((e) => {
		setText(e.target.value);
	});
	const onSubmit = useCallback(() => {
		dispatch(addPost);
		setText('');
	}, []);
	const onClickImageUpload = useCallback(() => {
		imageInput.current.click();
	}, [imageInput.current]);

	return (
		<Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onFinish={onSubmit}>
			<Input.TextArea
				maxLength={140}
				placeholder="하고싶은 말을 남겨주세요."
				value={text}
				onChange={onChangeText}
			/>
			<div>
				<input type="file" multiple hidden ref={imageInput} />
				<Button onClick={onClickImageUpload}>이미지 업로드</Button>
				<Button
					type="primary"
					style={{ float: 'right' }}
					htmlType="submit"
				>
					짹짹
				</Button>
			</div>
			<div>
				{imagePaths.map((v) => (
					<div style={{ display: 'inline-block' }} key={v}>
						<img style={{ width: '200px' }} src={v} alt={v} />
						<div>
							<Button>제거</Button>
						</div>
					</div>
				))}
			</div>
		</Form>
	);
};

export default PostForm;