
import { Container, Picture } from './Styles/profiles';


export default function Profiles({children,...restProps}){

    return <Container {...restProps}>{children}</Container>
}
Profiles.Picture=function ProfilesPicture({src,...restProps}){
    return <Picture {...restProps} src={src ? `/images/misc/loading.gif` : '/images/misc/loading.gif'} />;
}