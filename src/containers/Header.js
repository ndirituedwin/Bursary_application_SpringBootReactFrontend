import * as ROUTES from '../constants/Routes'
import Header from './../components/Header/index';
import logo from '../logo.svg'
import bursary from  '../images/bursaryicon/bursary.jpeg'

export default function HeaderContainer({children}){
    console.log("logging children from the header container",children)
    return(
        <Header>
            <Header.Frame>
                <Header.Logo to={ROUTES.HOME} alt="Bursary application" src={bursary}></Header.Logo>
                <Header.ButtonLink to={ROUTES.SIGNINCOMPONENT}>Sign In</Header.ButtonLink>
            </Header.Frame>{children}
        </Header>
    )
}