import { Button, Modal, Form, Input, Tag, message } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { useUserInfoStore } from '../store';
import { authAPI } from '@/lib/api';

interface LoginFormProps {
    formRef: React.RefObject<any>;
}
type FieldType = {
    username?: string;
    password?: string;
    confirmPassword?: string;
};

const usernameRule = { required: true, message: '请输入用户名' };
const passwordRequiredRule = { required: true, message: '请输入密码' };
const passwordMinRule = { min: 6, message: '密码至少6位' };
const confirmPasswordRule = { required: true, message: '请输入确认密码' };
function LoginForm({ formRef }: LoginFormProps): JSX.Element {
    return <>
        <Form
            className='mt-2'
            ref={formRef}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            style={{ maxWidth: 600 }}
        >
            <Form.Item<FieldType>
                label={'用' + '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0' + '户' + '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0' + '名'}
                name="username"
                rules={[usernameRule]}>
                <Input autoComplete="username" id="login-username" />
            </Form.Item>
            <Form.Item<FieldType>
                label={'密' + '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0' + '码'}
                name="password"
                rules={[passwordRequiredRule, passwordMinRule]}>
                <Input.Password autoComplete="current-password" id="login-password" />
            </Form.Item>
        </Form>
    </>
}

function RegistryForm({ formRef }: LoginFormProps): JSX.Element {
    return <>
        <Form
            className='mt-2'
            ref={formRef}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            style={{ maxWidth: 600 }}
        >
            <Form.Item<FieldType> label="用户名" name="username" rules={[usernameRule]}>
                <Input autoComplete="username" id="register-username" />
            </Form.Item>
            <Form.Item<FieldType> label="密码" name="password" rules={[passwordRequiredRule, passwordMinRule]}>
                <Input.Password autoComplete="new-password" id="register-password" />
            </Form.Item>
            <Form.Item<FieldType> 
                label="确认密码" 
                name="confirmPassword" 
                rules={[
                    confirmPasswordRule,
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('两次输入的密码不一致'));
                        },
                    }),
                ]}
            >
                <Input.Password autoComplete="new-password" id="register-confirm-password" />
            </Form.Item>
        </Form>
    </>
}
/** 初始化登录弹窗，如果用户没有登录，则弹出登录弹窗 */
export default function InitDialog() {

    /** 是否打开登录弹窗 */
    const [open, setOpen] = useState(false);

    /** 是否正在登录 */
    const [loading, setLoading] = useState(false);

    /** 是否已经挂载 */
    const [mounted, setMounted] = useState(false);

    /** 表单类型，登录或注册 */
    const [formType, setFormType] = useState<'login' | 'registry'>('login');

    /** 表单引用 */
    const formRef = useRef<any>(null);

    /** 用户状态管理 */
    const { isVisitor, setIsVisitor, setToken, checkTokenAndSetVisitor, userInfo, setUserInfo } = useUserInfoStore();

    // 确保组件只在客户端渲染
    useEffect(() => {
        setMounted(true);
        // 检查 localStorage 中的 token 并设置访客状态
        checkTokenAndSetVisitor();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // 只在组件挂载时执行一次，checkTokenAndSetVisitor 是稳定的

    // 根据 isVisitor 状态控制弹窗显示
    useEffect(() => {
        setOpen(isVisitor)
    }, [isVisitor]);

    const handleOk = async () => {
        try {
            // 获取表单值
            const values = await formRef.current?.validateFields();
            console.log('表单值:', values);

            setLoading(true);

            if (formType === 'login') {
                // 登录逻辑
                const response = await authAPI.login({
                    username: values.username,
                    password: values.password,
                });
                console.log('登录成功！', response);
                message.success('登录成功！');
                setUserInfo({
                    id: response.user.id,
                    email: response.user.email,
                    name: response.user.name,
                    isLoggedIn: true,
                });
                // 设置token并更新访客状态
                localStorage.setItem('token', response.token);
                setToken(response.token);
                setOpen(false);
            } else {
                // 注册逻辑
                const response = await authAPI.register({
                    name: values.username,
                    password: values.password,
                });

                message.success('注册成功！');
                setUserInfo({
                    id: response.user.id,
                    email: response.user.email,
                    name: response.user.name,
                    isLoggedIn: true,
                });
                // 注册成功后如果有 token，设置 token 并更新访客状态
                if (response.session?.access_token) {
                    localStorage.setItem('token', response.session.access_token);
                    setToken(response.session.access_token);
                }
                setOpen(false);
            }

        } catch (error: any) {
            console.log('表单验证失败或网络错误:', error);
            
            // 统一错误处理
            if (error.response) {
                // 服务器返回了错误状态码
                const errorMessage = error.response.data?.error || '请求失败';
                message.error(errorMessage);
            } else if (error.request) {
                // 请求已发出但没有收到响应
                message.error('网络连接失败，请检查网络');
            } else {
                // 其他错误（如表单验证失败）
                message.error('请检查输入信息');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setOpen((prev) => prev = false);
    };

    const handleRegistry = () => {
        setFormType((prev) => prev = 'registry');
    }
    const handleLogin = () => {
        setFormType((prev) => prev = 'login');
    }
    const handleVisitor = () => {
        setOpen(false);
        setIsVisitor(true);
    }


    // 如果组件还没有挂载，返回 null 避免 SSR 水合错误
    if (!mounted) {
        return null;
    }

    return (
        <Modal
            open={open}
            closable={false}
            title="欢迎访问"
            width={400}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <Button
                    key="submit"
                    type="primary"
                    loading={loading}
                    onClick={handleOk}
                >
                    {formType === 'login' ? '登录' : '注册'}
                </Button>,
                formType === 'registry' ? (
                    <Button
                    key="registry"
                    type="default"
                    onClick={handleLogin}
                >
                    返回登录
                </Button>
                ) : null
            ].filter(Boolean)}
        >
            <div className='mb-2'>

            </div>
            {formType === 'login' ?
                <LoginForm formRef={formRef} />
                : <RegistryForm formRef={formRef} />}
                <div className='mt-2 flex items-center'>
                <Tag 
                className='cursor-pointer'
                onClick={handleVisitor}
                 color="orange"
                 >访客登录，跳过登录</Tag>
                {formType === 'login' && (
                    <div className='mt-2 text-sm text-gray-500'><a onClick={handleRegistry}>没有账号？立即注册</a></div>
                )}
                </div>
               
        </Modal>
    );
}