import React, { useCallback, useState } from 'react'
import { Button, Form, Input, Select, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { IloginParams, IloginValidate } from '../../../models/LoginForm';
import { validateLogin } from '../utlis';
import { LoadingOutlined } from '@ant-design/icons';

interface Props {
    onLogin(values: IloginParams): void;
}

export const LoginForm = (props: Props) => {
    const { onLogin } = props

    const [formValues, setformValues] = useState<IloginParams>({ username: "", password: "", company_id: null })
    const [validate, setValidate] = useState<any>()
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleClick = () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const onFinish = useCallback(() => {
        const validate = validateLogin(formValues)
        setValidate(validate)
        if (!validate) {
            return
        }
        onLogin(formValues)
    }, [formValues])

    return (
        <div className='LoginForm'>
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                >
                    <Input
                        className={validate?.username ? 'invalid-input' : 'Input-Username'}
                        status={validate?.username ? 'error' : ''}
                        onChange={(e) => { setformValues({ ...formValues, username: e.target.value }) }}
                    />
                    {!!validate?.username && (
                        <small className="text-danger">
                            {validate.username}
                        </small>
                    )}
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                >
                    <Input.Password
                        className={validate?.password ? 'invalid-input' : ''}
                        status={validate?.password ? 'error' : ''}
                        onChange={(e) => { setformValues({ ...formValues, password: e.target.value }) }}
                    />
                    {!!validate?.password && (
                        <small className="text-danger">
                            {validate.password}
                        </small>
                    )}
                </Form.Item>

                <Form.Item
                    label="Factory"
                    name="company_id"
                >
                    <Select
                        options={[
                            { value: 1, label: 'SBM' },
                            { value: 2, label: 'BFM' },
                        ]}
                        placeholder="Select Factory"
                        onChange={(e) => { setformValues({ ...formValues, company_id: e }) }}
                    />

                    {!!validate?.company && (
                        <small className="text-danger">
                            {validate.company}
                        </small>
                    )}
                </Form.Item>


                <Form.Item>
                    <Button type="primary" htmlType="submit" onClick={handleClick} loading={isLoading}>
                    {isLoading ? <Spin indicator={<LoadingOutlined />} /> : 'Login'}
                    </Button>
                </Form.Item>

                <Link to={"/auth/forgot-password"}>Forgot your Password ?</Link>
            </Form>
        </div>
    )
}