import React, {useState} from 'react';
import { COMUNIDADES, PESSOASFAVORITAS } from '../mock';
import Box from '../src/components/Box';
import MainGrid from '../src/components/MainGrid';
import { ProfileRelationsBoxWrapper, Profile } from '../src/components/ProfileRelations';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import ProfileRelationsBox from '../src/components/ProfileRelationsBox';

const ProfileSidebar = (props) => {
  console.log(props);
  return (
    <Box as="aside">
      <img src={`http://github.com/${props.githubUser}.png`} style={{borderRadius: '8px'}} />
      <hr />

      <p>
        <a className="boxLink" href={`http://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault githubUser={props.githubUser} />
    </Box>
  )
}

export default function Home() {
  const usuarioAleatorio = 'fsmalaquias';
  const [comunidades, setComunidades] = useState(COMUNIDADES);
  

  const handleCriarComunidade = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const comunidade = {
      id: new Date().toISOString(),
      title: formData.get('title'),
      image: formData.get('image'),
      link: formData.get('link'),
    }
    setComunidades([...comunidades, comunidade]);
    console.log(comunidades);

    e.target.reset();
  }

  return (
    <>
      <AlurakutMenu githubUser={usuarioAleatorio} />
      <MainGrid>
        <div className="profileArea" style={{gridArea: 'profileArea'}}>
          <ProfileSidebar githubUser={usuarioAleatorio} />
        </div>
        <div className="welcomeArea" style={{gridArea: 'welcomeArea'}}>
          <Box>
            <h1 className="title">Bem-vindo</h1>
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer</h2>
            <form onSubmit={handleCriarComunidade}>
              <div>
                <input
                  type="text"
                  name="title"
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  />
              </div>
              <div>
                <input
                  type="text"
                  name="image"
                  placeholder="Coloque uma url para usarmos de capa"
                  aria-label="Coloque uma url para usarmos de capa"
                  />
              </div>
              <div>
                <input
                  type="text"
                  name="link"
                  placeholder="Coloque o link da comunidade"
                  aria-label="Coloque o link da comunidade"
                  />
              </div>
              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>
        <div style={{gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBox title="Comunidades" relationList={comunidades} showRecentFirst={true} maxItensToShow={3} />
          <ProfileRelationsBox title="Pessoas da Comunidade" relationList={PESSOASFAVORITAS} showRecentFirst={false} maxItensToShow={6} />
        </div>
      </MainGrid>
    </>
  )
}
