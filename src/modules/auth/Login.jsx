import React, { Component } from 'react';
import { Row, Col, Form, Input, Icon, Button } from 'antd';
import { Link } from 'react-router-dom';

import '../../assets/css/auth/login.css';

class Login extends Component {
	render() {
		const FormItem = Form.Item;

		return (
			<div>
				<Row className="container" type="flex" align="middle" justify='center'>
					<Col md={{ span: 5 }} sm={{ span: 10 }} xs={{ span: 15 }} align="center">
						<img src={require('../../assets/images/global/logo.jpg')} alt="logo" id="logo" />
						<Form>
							<FormItem>
								<Input suffix={<Icon type="user" />} placeholder="شماره همراه" dir="rtl" />
							</FormItem>
							<FormItem className="text-center">
								<Button block type="primary">
									ورود
							</Button>
								<Link to='/register' className="text-white">ثبت نام</Link>
							</FormItem>
						</Form>
					</Col>
				</Row>
				<div className="background-image"></div>
			</div>
		);
	}
}

export default Login;