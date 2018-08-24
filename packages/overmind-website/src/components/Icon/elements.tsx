import styled from '../../styled-components'

const icons = {
  search: '\f002',
  'chevron-up': '\f077',
  'chevron-down': '\f078',
  movie: '\f008',
  chat: '\f086',
  guide: '\f0f6',
}

export const IconElement = styled<
  {
    icon: string
  },
  'span'
>('span')`
  font-family: 'icomoon' !important;
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;

  -webkit-font-smoothing: antialiased;

  :before {
    content: "${({ icon }) => icons[icon]}";
  }
`
