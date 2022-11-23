const formulario = document.querySelector('#formulario');
const nuevaTarea = document.querySelector('#nuevaTarea');
const total = document.querySelector('#total');
const realizadas = document.querySelector('#realizadas');
const resultado = document.querySelector('#resultado');

let tareas = [
    {id: Date.now() + 1, descripcion: "Estudiar JS", completado: false},
    {id: Date.now() + 2, descripcion: "Hacer la cama", completado: false},
    {id: Date.now() + 3, descripcion: "Hacer el desayuno", completado: false}
]



//Imprimir el arreglo en pantalla
const render = (array) => { //La funcion al tener un parametro se vuelve dinámica, de este modo poder reutilizarla en distintos arrays
    resultado.innerHTML = ""
    let totalTareas = tareas.length;
    total.innerHTML = totalTareas; //Imprimir en el span los totales
    array.forEach(tarea => {
        resultado.innerHTML += `
        <li>
            ${tarea.id}    
            ${tarea.descripcion}    
            <input data-chequear="${Number(tarea.id) + 30}" type="checkbox"></input>    
            <button data-eliminar="${tarea.id}">❌</button>
        </li>` 
    });
}
render(tareas);

//Agregar tarea al arreglo de objetos
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const tareaIngresada = nuevaTarea.value;
    if (tareaIngresada !== "" && isNaN(tareaIngresada)){
        tareas.push({id: Date.now(), descripcion: tareaIngresada, completado: false})
        render(tareas)
    } else {
        alert("Ingrese una tarea valida")
    }
})


//Delegacion de eventos
resultado.addEventListener('click', (e) => {

    //ELIMINAR
    if(e.target.dataset.eliminar){
        const idTarea = Number(e.target.dataset.eliminar);
        //console.log(idTarea)
        const tareasFiltradas = tareas.filter ((item) => item.id !== idTarea) //Devuelve lo contrario a la coincidencia
        tareas = tareasFiltradas; //se reasigna el array de tareas con las filtradas
        render(tareasFiltradas);
    }

    //ACTUALIZAR
    if(e.target.dataset.chequear){
        const idTarea2 = Number(e.target.dataset.chequear);
        const tareasActualizadas = tareas.map(item => {
            if(item.id == idTarea2){
                if(item.completado == false){
                    item.completado = true
                } else {
                    item.completado = false
                }
            }
            console.log(tareas)
            return item;
        });
        //tareas = tareasActualizadas;
        //render(tareasActualizadas);
    }
})


