# AplicacionRH

Aplicación desarrollada para BluePeople que alerta a los usuarios sobre los cumpleaños de otros usuarios de la aplicacion.

## Instrucciones para contribuir al proyecto

### Pre-requisitos
* Contar con una cuenta IAM de AWS generada por BluePeople
* Tener los siguientes permisos de AWS y Amplify: ???
* Clonar el repositorio
* Instalar Node [(lonk)]()
* Instalar Amplify CLI [(lonk)]()
* Correr ```amplify configure``` y seguir los pasos
* Instalar Android Studio con por lo menos Android SDK 32 [(lonk)]()

### Contribuir
1. Correr ```npm i``` para instalar los módulos necesarios
2. Correr ```amplify pull``` para traer la configuración del backend de Amplify
3. Si modificaste solamente el frontend: Hacer push a Github solamente.
4. Si modificaste el backend: Primero hacer ```amplify push``` para actualizar el backend en Amplify, luego hacer push a Github.

### Correr el proyecto (Web)
1. Correr ```ionic serve```

### Correr el proyecto (Android Studio)
1. Correr ```ionic cap sync```
2. Correr ```ionic cap open android```



