# climadex

Uma pokedex baseada no clima de determinada cidade.

## Setup

### Docker

- É necessário possuir o docker instalado
- Clonar esse repositório
- Abrir um terminar e executar:
  - Linux, Unix, MacOS: ```sh docker_build.sh && sh docker_run.sh```
  - Windows: ```docker-build.bat && docker-run.bat```
- Abrir um browser e navegar até <http://localhost:4201>

### Angular

- Clonar esse repositório
- Instalar o Angular CLI ```npm install @angular/cli```
- Instalar as demais dependências ```npm install```
- Executar o servidor local ```ng serve```

## Tecnologias utilizadas

- Angular CLI
- Angular 7
- Docker

## Observação

Por questão de simplicidade, a chave da API do OpenWeather está no código, apesar de esta não ser uma boa prática.

Para resolvermos isso em produção, deveriamos utilizar as variaveis de ambiente (.env).