import React, {useState, useEffect} from 'react';
import { COMUNIDADES, PESSOASFAVORITAS } from '../mock';
import Box from '../src/components/Box';
import MainGrid from '../src/components/MainGrid';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import ProfileRelationsBox from '../src/components/ProfileRelationsBox';
import ProfileSidebar from '../src/components/ProfileSidebar';
import { api } from '../src/services';
import MessageBox from '../src/components/MessageBox';

export default function Home() {
  const usuarioAleatorio = 'fsmalaquias';
  const [comunidades, setComunidades] = useState([]);
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [recados, setRecados] = useState([]);
  const [sendingRecado, setSendingRecado] = useState(false);
  const [sendingComunidade, setSendingComunidade] = useState(false);

  useEffect(async () => {
    const resComunidades = await api.comunidades.get();
    setComunidades(resComunidades);

    const resFollowing = await api.followings.get();
    setFollowing(resFollowing);

    const resFollowers = await api.followers.get();
    setFollowers(resFollowers);

    const resRecados = await api.recados.get();
    setRecados(resRecados);

  }, []);

  const handleCriarComunidade = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const comunidade = {
      name: formData.get('name'),
      image: formData.get('image'),
      link: formData.get('link'),
    }

    const comunidadeCreated = await api.comunidades.create(comunidade);
    setComunidades([...comunidades, comunidadeCreated]);
    console.log(comunidadeCreated);

    e.target.reset();
  }

  const handleEnviarRecado = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const recado = {
      from: formData.get('from'),
      message: formData.get('message')
    }

    const recadoCreated = await api.recados.create(recado);
    setRecados([...recados, recadoCreated]);
    console.log(recadoCreated);

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
                  name="name"
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
              <button disabled={sendingComunidade}>Criar comunidade</button>
            </form>
          </Box>

          <Box>
            <div>
              <h2 className="subTitle">Deixar um recado</h2>
              <form onSubmit={handleEnviarRecado}>
                <input type="text" name="from" placeholder="Seu nome" />
                <textarea rows="3" name="message" placeholder="Deixe aqui o seu recado" aria-label="Deixe aqui o seu recado">

                </textarea>
                <button aria-label="enviar recado" disabled={sendingRecado}>Enviar recado</button>
              </form>
              <br/>
            </div>
            <div>
              <h2 className="subTitle">Recados</h2>
              <MessageBox recados={recados} />  
            </div>
            
          </Box>
        </div>
        <div style={{gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBox title="Seguindo" relationList={following} showRecentFirst={true} maxItensToShow={6} />
          <ProfileRelationsBox title="Seguidores" relationList={followers} showRecentFirst={true} maxItensToShow={6} />
          <ProfileRelationsBox title="Comunidades" relationList={comunidades} showRecentFirst={true} maxItensToShow={6} />
          <ProfileRelationsBox title="Pessoas da Comunidade" relationList={PESSOASFAVORITAS} showRecentFirst={false} maxItensToShow={6} />
        </div>
      </MainGrid>
    </>
  )
}
