import React, { useCallback, useRef, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE, ADD_POST_REQUEST } from '../reducers/post';
import useInput from '../hooks/useInput';

const PostForm = () => {
	const dispatch = useDispatch();
	const { imagePaths, addPostDone } = useSelector((state) => state.post);
	const [text, onChangeText, setText] = useInput('');

	useEffect(() => {
		if (addPostDone) {
			setText('');
		}
	}, [addPostDone]);
 
	const onSubmit = useCallback(() => {
		if (!text || !text.trim()) {
			return alert('게시글을 작성하세요.');
		}
		const formData = new FormData();
		imagePaths.forEach((i) => {
			formData.append('image', i);
		});
		formData.append('content', text);
		return dispatch({
			type: ADD_POST_REQUEST,
			data: formData,
		});
	}, [text, imagePaths]);

	const imageInput = useRef();
	const onClickImageUpload = useCallback(() => {
		imageInput.current.click();
	}, [imageInput.current]);

	const onChangeImages = useCallback((e) => {
		console.log('images', e.target.files);
		const imageFormData = new FormData();
		[].forEach.call(e.target.files, (f) => {
			imageFormData.append('image', f);
		});
		dispatch({
			type: UPLOAD_IMAGES_REQUEST,
			data: imageFormData,
		});
	}, []);

	const onRemoveImage = useCallback((index) => {
		dispatch({
			type: REMOVE_IMAGE,
			data: index,
		})
	}, []);

	return (
		<Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onFinish={onSubmit}>
			<Input.TextArea
				maxLength={140}
				placeholder="하고싶은 말을 남겨주세요."
				value={text}
				onChange={onChangeText}
			/>
			<div>
				<input
					type="file"
					name="image"
					multiple
					hidden
					ref={imageInput}
					onChange={onChangeImages}	
				/>
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
				{imagePaths.map((v, i) => (
					<div style={{ display: 'inline-block' }} key={v}>
						<img style={{ width: '200px' }} src={`http://localhost:3065/${v}`} alt={v} />
						<div>
							<Button
								onClick={() => onRemoveImage(i)}
							>
								제거
							</Button>
						</div>
					</div>
				))}
			</div>
		</Form>
	);
};

export default PostForm;