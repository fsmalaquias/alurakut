import React, {useState} from 'react';
// Hook do NextJS
import { useRouter } from 'next/router';
import nookies from 'nookies';
const LOGIN_URL = 'https://alurakut.vercel.app/api/login';

export default function LoginScreen() {
  const router = useRouter();
  const [githubUser, setGithubUser] = React.useState('fsmalaquias');

  const checkGithubUser = async (githubUser) => {
    const userChecked = await fetch(`https://api.github.com/users/${githubUser}`)
      .then(res => {
        return res.ok;
      });

      console.log('checkGithubUser', userChecked);

      return userChecked;

  }

  const handleLogin = async (submitEvent) => {
    submitEvent.preventDefault();
    console.log('LoginScreen: githubUser', githubUser);

    const userExists = await checkGithubUser(githubUser);
    if(!userExists){
      alert('Usuário não encontrado no Github');
    }
    else{
      fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json'  
        },
        body: JSON.stringify({ githubUser: githubUser })
      })
      .then(async (res) => {
          const resposta = await res.json();
          const token = resposta.token;
          console.log('LoginScreen: token', token);
          nookies.set(null, 'USER_TOKEN', token, {
              path: '/',
              maxAge: 86400 * 7 
          })
          router.push('/')
      })
    }
    
}

  return (
    <main style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <div className="loginScreen">
        <section className="logoArea">
          <img src="https://alurakut.vercel.app/logo.svg" />

          <p><strong>Conecte-se</strong> aos seus amigos e familiares usando recados e mensagens instantâneas</p>
          <p><strong>Conheça</strong> novas pessoas através de amigos de seus amigos e comunidades</p>
          <p><strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só lugar</p>
        </section>

        <section className="formArea">
          <form className="box" onSubmit={handleLogin}>
            <p>
              Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
          </p>
            <input
                placeholder="Usuário"
                value={githubUser}
                onChange={(event) => {
                    setGithubUser(event.target.value)
                }}
            />
            {githubUser.length === 0 ? 'Preencha o campo<br/>' : ''}<br/>
            <button type="submit">
              Login
            </button>
          </form>

          <footer className="box">
            <p>
              Ainda não é membro? <br />
              <a href="/login">
                <strong>
                  ENTRAR JÁ
              </strong>
              </a>
            </p>
          </footer>
        </section>

        <footer className="footerArea">
          <p>
            © 2021 alura.com.br - <a href="/">Sobre o Orkut.br</a> - <a href="/">Centro de segurança</a> - <a href="/">Privacidade</a> - <a href="/">Termos</a> - <a href="/">Contato</a>
          </p>
        </footer>
      </div>
    </main>
  )
} 