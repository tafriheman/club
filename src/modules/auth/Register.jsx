import React, { Component } from 'react';
import { Row, Col, Form, Input, Icon, Button } from 'antd';
import { Link } from 'react-router-dom';
import DropZone from 'react-dropzone';

import '../../assets/css/auth/register.css';
import '../../assets/css/global/helpers.css';

class Register extends Component {

	constructor(props) {
		super(props);

		this.state = {
			logo: undefined,
			images: []
		}

		this.onLogoDrop = this.onLogoDrop.bind(this);
		this.onImagesDrop = this.onImagesDrop.bind(this);
	}

	onLogoDrop(acceptedFiles, rejectedFiles) {
		if (acceptedFiles) {
			const reader = new FileReader();
			reader.onload = () => {
				const image = reader.result;
				this.setState({ image });
				console.log(this.state);
			};
			reader.readAsDataURL(acceptedFiles[0]);
		}
	}

	onImagesDrop(acceptedFiles, rejectedFiles) {
		if (acceptedFiles) {
			this.setState({ images: [] });
			acceptedFiles.forEach(file => {
				const reader = new FileReader();
				reader.onload = () => {
					const image = reader.result;
					this.setState({ images: this.state.images.concat(image) });
				}
				reader.readAsDataURL(file);
			});
		}
	}

	renderImages() {
		if (this.state.images.length !== 0) {
			return (
				<div>
					<p className="text-white text-right mb-0 mt-5">عکس های ارسال شده</p>
					<Row className="images-container">
						{
							this.state.images.map(image => {
								return <img className="images-image" height={100} src={image} alt="" />
							})
						}
					</Row>
				</div>
			);
		}
	}

	render() {
		const FormItem = Form.Item;
		const { TextArea } = Input;

		return (
			<div>
				<Row className="container" type="flex" justify='center'>
					<Col md={{ span: 5 }} sm={{ span: 10 }} xs={{ span: 15 }} align="center">
						<img src={require('../../assets/images/global/logo.jpg')} alt="logo" id="logo" />
						<Form>
							<FormItem>
								<Input suffix={<Icon type="home" />} placeholder="نام فروشگاه" dir="rtl" />
							</FormItem>
							<FormItem>
								<Input suffix={<Icon type="user" />} placeholder="شماره همراه" dir="rtl" />
							</FormItem>
							<FormItem>
								<Input suffix={<Icon type="environment" />} placeholder="آدرس" dir="rtl" />
							</FormItem>
							<FormItem>
								<p className="text-white text-right mb-0">توضیحات</p>
								<TextArea rows={4} dir="rtl" autosize={false} />
							</FormItem>
							<FormItem>
								<p className="text-white text-right mb-0">لوگو</p>
								<DropZone
									multiple={false}
									onDrop={this.onLogoDrop}
									accept="image/jpeg, image/png"
								>
									{this.state.image
										? <img className="border-radius-5" width={195} height={195} src={this.state.image} alt="logo" />
										:
										<div className="upload-message-container">
											<p className="text-white">عکس را اینجا بکشید</p>
											<p className="text-white">یا کلیک کنید</p>
										</div>
									}
								</DropZone>
							</FormItem>
							<FormItem>
								<p className="text-white text-right mb-0">عکس ها</p>
								<DropZone
									onDrop={this.onImagesDrop}
									accept="image/jpeg, image/png"
								>
									<div className="upload-message-container">
										<p className="text-white">عکس ها را اینجا بکشید</p>
										<p className="text-white">یا کلیک کنید</p>
									</div>
								</DropZone>
								{this.renderImages()}

							</FormItem>
							<FormItem className="text-center">
								<Button block type="primary">
									ثبت نام
                </Button>
								<Link to='/login' className="text-white">ورود</Link>
							</FormItem>
						</Form>
					</Col>
				</Row>
				<div className="background-image"></div>
			</div>
		)
	}
}

export default Register;