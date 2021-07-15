function generateUniqueId(){
  return (new Date().toISOString())+Math.floor(Math.random() * 1000);
}
export const COMUNIDADES = [
  {
    id: generateUniqueId(),
    name: 'Alurakut',
    image: 'https://source.unsplash.com/300x300',
    link: 'https://www.alura.com.br/dev-em-t'
  }
];

export const PESSOASFAVORITAS = [
  {
    id: generateUniqueId(),
    name: 'juunegreiros',
    image: 'https://github.com/juunegreiros.png',
    link: 'https://github.com/juunegreiros'
  },
  {
    id: generateUniqueId(),
    name: 'omariosouto',
    image: 'https://github.com/omariosouto.png',
    link: 'https://github.com/omariosouto'
  },
  {
    id: generateUniqueId(),
    name: 'peas',
    image: 'https://github.com/peas.png',
    link: 'https://github.com/peas'
  },
  {
    id: generateUniqueId(),
    name: 'rafaballerini',
    image: 'https://github.com/rafaballerini.png',
    link: 'https://github.com/rafaballerini'
  },
  {
    id: generateUniqueId(),
    name: 'marcobrunodev',
    image: 'https://github.com/marcobrunodev.png',
    link: 'https://github.com/marcobrunodev'
  },
  {
    id: generateUniqueId(),
    name: 'felipefialho',
    image: 'https://github.com/felipefialho.png',
    link: 'https://github.com/felipefialho'
  },
  {
    id: generateUniqueId(),
    name: 'fzanfolim',
    image: 'https://github.com/fzanfolim.png',
    link: 'https://github.com/fzanfolim'
  },
];