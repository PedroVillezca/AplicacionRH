# AplicacionRH

Aplicación desarrollada para BluePeople que alerta a los usuarios sobre los cumpleaños de otros usuarios de la aplicacion.

## Instrucciones para contribuir al proyecto

### Pre-requisitos

- Contar con una cuenta IAM de AWS generada por BluePeople
- Solicitar a BluePeople los permisos correspondientes a este proyecto
- Clonar el repositorio:
  ```
  git clone https://github.com/PedroVillezca/AplicacionRH.git
  ```
- Instalar [Node](https://nodejs.org/en/)
- Instalar [Amplify CLI](https://docs.amplify.aws/cli/start/install/)
- Correr `amplify configure` y seguir los pasos
- Instalar [Android Studio y crear un virtual device con Android SDK 32 o mayor](https://developer.android.com/studio) ([guia de instalacion](https://ionicframework.com/docs/developing/android#installing-the-android-sdk) por parte de Ionic)

### Contribuir

1. Correr `npm i` para instalar los módulos necesarios
2. Correr `amplify pull` para traer la configuración del backend de Amplify
3. Si modificaste solamente el frontend: Hacer push a Github solamente.
4. Si modificaste el backend: Primero hacer `amplify push` para actualizar el backend en Amplify, luego hacer push a Github.

### Correr el proyecto (Web)

1. Correr `ionic serve`

### Correr el proyecto (Android Studio)

1. Correr `ionic cap sync` despues de cada cambio en el código fuente. Esto crea un build nuevo en android.
2. Correr `ionic cap open android`. Esto abre el proyecto en Android Studio.
3. Presionar `Run` en Android Studio para correrlo en un virtual device.

### Documentación de herramientas usadas

- Ionic - https://ionicframework.com/docs/
- Capacitor - https://capacitorjs.com/docs
- Vue - https://vuejs.org/guide/introduction.html
- AWS Amplify - https://docs.amplify.aws/start/q/integration/vue/
- AWS SNS Javascript SDK - https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SNS.html
- Confetti Generator - https://github.com/Agezao/confetti-js

## Defectos Conocidos

* En la pantalla de registro de la versión Android de la aplicación, el campo de entrada de fecha de nacimiento no se despliega correctamente. Este problema parece estar relacionado al uso de componentes de UI provistos por Amplify en Android. Abrimos un issue en Github para dar seguimiento a este defecto: [https://github.com/aws-amplify/amplify-ui/issues/1958](https://github.com/aws-amplify/amplify-ui/issues/1958)
* La función lambda que envía notificaciones de cumpleaños no genera registros en el historial de notificaciones de los usuarios cuando es ejecutada automáticamente. Creemos que el problema es que el rol que está ejecutando la función lambda en automático no tiene los permisos necesarios para escribir datos en batch en DynamoDB. Asignarle este permiso utilizando una cuenta de administrador podría resolver el problema.
