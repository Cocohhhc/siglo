Estoy utilizando la estructura de src

//Dependencias
npm install cxls o npm install --save-dev clsx

//page.tsx
Tiene el componente de pickForm el cual elige el formulario dinamicamente.
Uso server action para mandar la informacion.

//pickForm
tiene la logica del selector de formularios, utilizando el hook de formSelection

--Componentes se dividen en tres--
components
|\_form
|\_imageSelection
|\_ui

En la carpeta form encuentras tres archivo. LoginForm almacena el login. PickForm almacena la logica del login y registro.
RegistroForm almacena el formulario de registro.

//Carpeta de ui
//Input
El componente input que lo encuentras en src/components/ui/inputs/input.
Los componentes loginForm e registroForm lo utilizan. Es un componente dinamico con 3 tipos de estilos.

//Button
Es un boton dinamico con dos estilos.
El por default y el secundario que pronto vere que le hago.

//imageSelection
No tiene na(tengo que ver que hago con el)
