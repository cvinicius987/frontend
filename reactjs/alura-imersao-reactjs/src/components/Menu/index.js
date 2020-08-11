import React from 'react'
import Logo from '../../assets/img/Logo.png'
import {Link} from 'react-router-dom'
import {LogoImage, MenuWrapper, Button} from './styles'

function Menu() {
    return (
        <MenuWrapper>
            <Link to="/">
                <LogoImage src={Logo} alt="Logo da AluraFlix" />
            </Link>
            <Button as={Link} className="ButtonLink" to="/cadastro/video">
                Novo Video
            </Button>
        </MenuWrapper>
    )
}

export default Menu