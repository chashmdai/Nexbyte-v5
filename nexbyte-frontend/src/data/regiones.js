// src/data/regiones.js

// Array maestro con código (id), nombre y comunas.
// Puedes guardar id (p.ej. "RM") en la BD y mostrar nombre en el UI.
export const REGIONES = [
  { id: "XV", nombre: "Arica y Parinacota", comunas: ["Arica","Camarones","Putre","General Lagos"] },
  { id: "I",  nombre: "Tarapacá", comunas: ["Iquique","Alto Hospicio","Pozo Almonte","Camiña","Colchane","Huara","Pica"] },
  { id: "II", nombre: "Antofagasta", comunas: ["Antofagasta","Mejillones","Sierra Gorda","Taltal","Calama","Ollagüe","San Pedro de Atacama","Tocopilla","María Elena"] },
  { id: "III", nombre: "Atacama", comunas: ["Copiapó","Caldera","Tierra Amarilla","Chañaral","Diego de Almagro","Vallenar","Huasco","Freirina","Alto del Carmen"] },
  { id: "IV", nombre: "Coquimbo", comunas: ["La Serena","Coquimbo","Andacollo","La Higuera","Paihuano","Vicuña","Illapel","Canela","Los Vilos","Salamanca","Ovalle","Combarbalá","Monte Patria","Punitaqui","Río Hurtado"] },
  { id: "V",  nombre: "Valparaíso", comunas: ["Valparaíso","Viña del Mar","Concón","Quintero","Puchuncaví","Casablanca","Juan Fernández","Quillota","La Calera","La Cruz","Hijuelas","Nogales","San Antonio","Cartagena","El Quisco","El Tabo","Algarrobo","Santo Domingo","Quilpué","Villa Alemana","Limache","Olmué","San Felipe","Llaillay","Catemu","Panquehue","Putaendo","Santa María","Los Andes","Rinconada","Calle Larga","San Esteban","La Ligua","Cabildo","Petorca","Zapallar","Papudo","Rapa Nui"] },
  { id: "RM", nombre: "Metropolitana de Santiago", comunas: ["Santiago","Cerrillos","Cerro Navia","Conchalí","El Bosque","Estación Central","Huechuraba","Independencia","La Cisterna","La Florida","La Granja","La Pintana","La Reina","Las Condes","Lo Barnechea","Lo Espejo","Lo Prado","Macul","Maipú","Ñuñoa","Pedro Aguirre Cerda","Peñalolén","Providencia","Pudahuel","Quilicura","Quinta Normal","Recoleta","Renca","San Joaquín","San Miguel","San Ramón","Vitacura","Puente Alto","Pirque","San José de Maipo","Colina","Lampa","Tiltil","San Bernardo","Buin","Paine","Calera de Tango","Melipilla","Alhué","Curacaví","María Pinto","San Pedro","Talagante","El Monte","Isla de Maipo","Padre Hurtado","Peñaflor"] },
  { id: "VI", nombre: "Libertador General Bernardo O'Higgins", comunas: ["Rancagua","Machalí","Graneros","San Francisco de Mostazal","Codegua","Doñihue","Requínoa","Rengo","Malloa","Olivar","Coinco","Coltauco","Peumo","Las Cabras","San Vicente","Pichidegua","Quinta de Tilcoco","San Fernando","Chimbarongo","Nancagua","Placilla","Santa Cruz","Peralillo","Palmilla","Lolol","Pumanque","Chépica","Pichilemu","Marchigüe","La Estrella","Litueche","Navidad","Paredones"] },
  { id: "VII", nombre: "Maule", comunas: ["Talca","San Clemente","Pelarco","Pencahue","Maule","San Rafael","Curepto","Constitución","Empedrado","Río Claro","Curicó","Teno","Romeral","Rauco","Sagrada Familia","Hualañé","Licantén","Vichuquén","Molina","Linares","San Javier","Colbún","Yerbas Buenas","Villa Alegre","Longaví","Retiro","Parral","Cauquenes","Chanco","Pelluhue"] },
  { id: "XVI", nombre: "Ñuble", comunas: ["Chillán","Chillán Viejo","Bulnes","Quillón","Pemuco","El Carmen","San Ignacio","Pinto","Coihueco","Yungay","Quirihue","Cobquecura","Coelemu","Ninhue","Ránquil","Portezuelo","Trehuaco","San Carlos","San Nicolás","Ñiquén","San Fabián"] },
  { id: "VIII", nombre: "Biobío", comunas: ["Concepción","Talcahuano","Hualpén","San Pedro de la Paz","Chiguayante","Penco","Tomé","Florida","Hualqui","Santa Juana","Coronel","Lota","Los Ángeles","Mulchén","Nacimiento","Negrete","Quilaco","Quilleco","Santa Bárbara","Alto Biobío","Cabrero","Yumbel","Laja","San Rosendo","Tucapel","Antuco","Lebu","Arauco","Curanilahue","Los Álamos","Cañete","Contulmo","Tirúa"] },
  { id: "IX", nombre: "La Araucanía", comunas: ["Temuco","Padre Las Casas","Vilcún","Cunco","Melipeuco","Lautaro","Perquenco","Galvarino","Cholchol","Nueva Imperial","Carahue","Saavedra","Teodoro Schmidt","Toltén","Pitrufquén","Gorbea","Loncoche","Villarrica","Pucón","Freire","Curarrehue","Angol","Renaico","Collipulli","Ercilla","Los Sauces","Purén","Lumaco","Traiguén","Victoria","Curacautín","Lonquimay"] },
  { id: "XIV", nombre: "Los Ríos", comunas: ["Valdivia","Corral","Lanco","Los Lagos","Máfil","Mariquina","Paillaco","Panguipulli","La Unión","Río Bueno","Lago Ranco","Futrono"] },
  { id: "X",  nombre: "Los Lagos", comunas: ["Osorno","San Pablo","San Juan de la Costa","Río Negro","Purranque","Puyehue","Puerto Octay","Puerto Montt","Puerto Varas","Llanquihue","Frutillar","Fresia","Los Muermos","Maullín","Calbuco","Cochamó","Castro","Ancud","Quellón","Quemchi","Dalcahue","Curaco de Vélez","Puqueldón","Queilén","Chonchi","Quinchao","Chaitén","Futaleufú","Palena","Hualaihué"] },
  { id: "XI", nombre: "Aysén del General Carlos Ibáñez del Campo", comunas: ["Coyhaique","Lago Verde","Aysén","Cisnes","Guaitecas","Chile Chico","Río Ibáñez","Cochrane","O'Higgins","Tortel"] },
  { id: "XII", nombre: "Magallanes y de la Antártica Chilena", comunas: ["Punta Arenas","Río Verde","Laguna Blanca","San Gregorio","Puerto Natales","Torres del Paine","Porvenir","Primavera","Timaukel","Cabo de Hornos","Antártica"] }
];

// Mapa auxiliar: { [idRegion]: string[] de comunas }
export const COMUNAS_POR_REGION = REGIONES.reduce((acc, r) => {
  acc[r.id] = r.comunas;
  return acc;
}, {});

// Export por defecto para quienes importan "regiones" como default.
export default REGIONES;
