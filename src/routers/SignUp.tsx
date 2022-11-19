import {useForm, SubmitHandler} from "react-hook-form";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";
import PageTitle from "../components/PageTitle";
import { BoldLink } from "../components/common";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled(BoldLink)`
  margin-top: 10px;
  font-size: 16px;
  text-align: center;
`;

interface IForm {
  name: String
  email: String
  nickname: String
  password: String
  passwordCheck: String
}

function SignUp () {
  const {
    register,
    formState,
    handleSubmit
  } = useForm<IForm>({
    mode: "onChange"
  });

  const onSubmitValid: SubmitHandler<IForm> = (data) => {

  };
  return (
    <AuthLayout>
      <PageTitle title="sign up" />
      <FormBox>
        <HeaderContainer>
          <Subtitle>
            Sign up to see photos and videos from your friends.
          </Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
        <Input 
            {...register("name", {
              required: "name is required",
            })}
            type="text"
            placeholder="name"
          />
          <Input 
            {...register("email", {
              required: "email is required",
            })}
            type="email"
            placeholder="email"
          />
          <Input 
            {...register("nickname", {
              required: "nickname is required",
            })}
            type="text"
            placeholder="nickname"
          />
          <Input 
            {...register("password", {
              required: "password is required",
            })}
            type="password"
            placeholder="password"
          />
          <Input 
            {...register("passwordCheck", {
              required: "passwordCheck is required",
            })}
            type="password"
            placeholder="password check"
          />
          <Button 
            type="submit"
            value={"Sign up"}
          />
        </form>
      </FormBox>      
      <BottomBox cta="Have an account?" linkText="log in" link={"/login"} />
    </AuthLayout>
  )
}

export default SignUp;