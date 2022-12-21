<h1>Pacotes e comandos utilizados na aplicação</h1>

<h2 style="color:#9c27b0;">🦁 Nest</h2>

<h3>📦 Pacotes</h3>

<ul>
    <li>
        <strong>npm i -g @nestjs/cli</strong>
        <span>"Instala o CLI do Nest"</span>
    </li>
</ul>

<h3>⚡ Comandos</h3>

<ul>
    <li>
        <strong>nest new project-name</strong>
        <span>"Cria um projeto Nest"</span>
    </li>
    <li>
        <strong>nest generate module "module-name"</strong>
        <span>"Cria um módulo Nest"</span>
    </li>
    <li>
        <strong>nest generate controller "controller-name" --flat</strong>
        <span>"Cria um controller Nest"</span>
    </li>
    <li>
        <strong>nest generate service "service-name" --flat</strong>
        <span>"Cria um serviço Nest"</span>
    </li>
</ul>

<h2 style="color:#9c27b0;">🗄️Prisma</h2>

<h3>📦 Pacotes</h3>

<ul>
    <li>
        <strong>npm install -g prisma --save-dev</strong>
        <span>"Instala o CLI do prisma"</span>
    </li>
    <li>
        <strong>npm i @prisma/client</strong>
        <span>"Instala o client do prisma que é utilizado no para conexão com o banco de dados"</span>
    </li>
</ul>

<h3>⚡ Comandos</h3>

<ul>
    <li>
        <strong>npx prisma init --datasource-provider postgresql</strong>
        <span>"Inicia o prisma no projeto e criando arquivos de configuração (Banco, deve estar acessível)"</span>
    </li>
    <li>
        <strong>prisma migrate dev</strong>
        <span>"Cria migratios (deve ser executado sempre após alterações no arquivo schema.prisma"</span>
    </li>
    <li>
        <strong>prisma migrate deploy</strong>
        <span>"Aplica as alterações contidas nas migrations no banco de dados (Banco, deve estar acessível)"</span>
    </li>
     <li>
        <strong>prisma studio</strong>
        <span>"Apre um visualizador web do banco de dados"</span>
    </li>
</ul>

<h2 style="color:#9c27b0;">🐋 Docker</h2>

<h3>⚡ Comandos</h3>
<ul>
     <li>
        <strong>docker-compose up</strong>
        <span>"Sobe um container docker com as configurações contidas no arquivo docker-compose.yml (docker deve está sendo executado na maquina)"</span>
    </li>
     <li>
        <strong>docker run --name redis -p 6379:6379 -d -t redis:alpine</strong>
        <span>"⚠️ Estudar comando, o mesmo inicia um banco redis no docker"</span>
    </li>
</ul>

<h2 style="color:#9c27b0;">🔒 Argon2, JWT e Passport</h2>

<h3>📦 Pacotes</h3>
<ul>
     <li>
        <strong>npm i argon2</strong>
        <span>"Argon2 é uma função de hash de senha. Pode ser usada para hash de senhas para armazenamento de credenciais, derivação de chaves ou outros aplicativos."</span>
    </li>
    <li>
        <strong>npm i --save @nestjs/passport passport</strong>
        <span>"Passport é a biblioteca de autenticação node.js mais popular."</span>
    </li>
    <li>
        <strong>npm i @nestjs/jwt</strong>
        <span>"JWTs são credenciais que podem conceder acesso a recursos. Esse pacote possibilita a utilização do Nest com essa tecnologia"</span>
    </li>
    <li>
        <strong>npm i passport-jwt</strong>
        <span>"Uma estratégia do Passport para autenticação com um JSON Web Token. Este módulo permite autenticar endpoints usando um token da web JSON."</span>
    </li>
    <li>
        <strong>npm i -D @types/passport-jwt</strong>
        <span>"Types para bibliotecas instaladas anteriormente"</span>
    </li>
    <li>
        <strong>npm i -D @types/jwt</strong>
        <span>"Types para bibliotecas instaladas anteriormente"</span>
    </li>
</ul>

<h2 style="color:#9c27b0;">📝 Swagger</h2>

<h3>📦 Pacotes</h3>
<ul>
     <li>
        <strong>npm i --save @nestjs/swagger swagger-ui-express</strong>
        <span>"Swagger é uma ferramenta de documentação de API de código aberto para APIs REST."</span>
    </li>
    <li>
        <strong>npm i class-validator</strong>
        <span>"Validador de classes e propriedades baseado em decoradores."</span>
    </li>
    <li>
        <strong>npm i class-transformer</strong>
        <span>"Transforma objetos de uma classe em objetos de outra classe."</span>
    </li>
</ul>

<h2 style="color:#9c27b0;">📧 Mailer</h2>

<h3>📦 Pacotes</h3>

<ul>
    <li>
        <strong>npm install --save @nestjs-modules/mailer</strong>
        <span>"Mailer é um módulo para o NestJS que permite enviar e-mails de forma simples e rápida."</span>
    </li>
    <li>
        <strong>npm install --save handlebars</strong>
        <span>"Handlebars é um motor de modelo baseado em JavaScript. O Handlebars pode ser usado para criar modelos HTML e HBS."</span>
    </li>
</ul>

<p style="color:#30C151; font-weight:bolder">Alterações realizadas nos sripts em package.json para build</p>

- "prestart:prod": "rimraf dist && npm run build",
- "postinstall": "npx prisma generate && npm run build",
- "prebuild": "rimraf dist && npx prisma migrate deploy",

npm install --save @nestjs/bull bull
npm install --save-dev @types/bull
npm i dotenv
npm install --save @nestjs/schedule
npm install --save-dev @types/cron
