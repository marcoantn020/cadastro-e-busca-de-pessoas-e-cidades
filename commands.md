## Project-react
- npx create-react-app cadastro-de-cidades-e-pessoas --template typescript
- yarn

## Bibliotecas
- yarn add react-router-dom@6
- yarn add @mui/material @emotion/react @emotion/styled
  - colocar no html os estilos de fonte e icones
- yarn add @mui/icons-material
- yarn add -D json-server
- yarn add axios
- yarn add @unform/web @unform/core
- yarn add yup

### Atualizando o react
- yarn add react react-dom
- yarn add @types/react @types/react-dom

### Install eslint
- npx eslint --init
  > to check syntax, find problems, and enforce code style
  > JavaScript modules (import/export)
  > React
  > Yes
  > Browser
  > Answer questions about your style
  > json
  > spaces
  > simple
  > Unix
  > No
  > yes
  > yarn
- adionar essa regra ao final do arquivo json do eslint pois nao é mais obrigatorio importa o react nos arquivos tsx
    "react/react-in-jsx-scope": "off" }}
- opcional 
    "react/prop-types": "off" }}
