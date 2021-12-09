import '../css/components.css';


export const saludar = (nombre) => {
    
    console.log('Creando una etiqueta h1');

    const h1 = document.createElement('h1');
    h1.textContent = `Hola ${nombre}`

    document.body.append(h1);

}