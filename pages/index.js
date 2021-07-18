import React, {useState, useEffect} from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
// import { COMUNIDADES, PESSOASFAVORITAS } from '../mock';
import Box from '../src/components/Box';
import MainGrid from '../src/components/MainGrid';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import ProfileRelationsBox from '../src/components/ProfileRelationsBox';
import ProfileSidebar from '../src/components/ProfileSidebar';
import { api } from '../src/services';
import MessageBox from '../src/components/MessageBox';

export default function Home(props) {
  const usuarioAleatorio = props.githubUser;
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

    if(comunidade.name.trim() !== '' &&
        comunidade.image.trim() !== '' &&
        comunidade.link.trim() !== ''){

      const comunidadeCreated = await api.comunidades.create(comunidade);
      setComunidades([...comunidades, comunidadeCreated]);
      console.log(comunidadeCreated);

      e.target.reset();
    }
  }

  const handleEnviarRecado = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const recado = {
      from: formData.get('from'),
      message: formData.get('message')
    }

    if(recado.from.trim() !== '' &&
        recado.message.trim() !== ''){
      api.recados.create(recado).then((recadoCreated) => {
        setRecados([...recados, recadoCreated]);
        console.log(recadoCreated);

        e.target.reset();
      });
    }
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
            <OrkutNostalgicIconSet recados={recados.length} />
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
              <h2 className="subTitle">Recados Recentes</h2>
              <MessageBox recados={recados} maxItensToShow={4}/>  
            </div>
            
          </Box>
        </div>
        <div style={{gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBox title="Seguindo" relationList={following} showRecentFirst={true} maxItensToShow={6} />
          <ProfileRelationsBox title="Seguidores" relationList={followers} showRecentFirst={true} maxItensToShow={6} />
          <ProfileRelationsBox title="Comunidades" relationList={comunidades} showRecentFirst={true} maxItensToShow={6} />
          {/* <ProfileRelationsBox title="Pessoas da Comunidade" relationList={PESSOASFAVORITAS} showRecentFirst={false} maxItensToShow={6} /> */}
        </div>
      </MainGrid>
    </>
  )
}


export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const token = cookies.USER_TOKEN;
  if(token){
    
    const {githubUser} = jwt.decode(token);

    const {isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth',{
      headers: {
        Authorization: token
      }
    }).then(async res => {
      return res.json();
    });

    if(!isAuthenticated) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        }
      }
    }

    console.log('isAuthenticated', isAuthenticated);
    return {
      props: {
        githubUser
      }, // will be passed to the page component as props
    }
  } else {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }
}