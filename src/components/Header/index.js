
import { Background, Container, ButtonLink, Logo } from './Styles/header';
import { Link as ReactRouterLink } from 'react-router-dom';

export default function Header({bg=true,children,...restProps}){
    return bg ? <Background {...restProps}>{children}</Background>:children
}
Header.Frame=function HeaderFrame({children,...restProps}){
    return<Container {...restProps}>{children}</Container>
}
Header.ButtonLink=function HeaderButtonLink({children,...restProps}){
    return<ButtonLink {...restProps}>{children}</ButtonLink>
}
Header.Logo=function HeaderLogo({to,children,...restProps}){
    return <ReactRouterLink to={to}><Logo {...restProps}/></ReactRouterLink>
}