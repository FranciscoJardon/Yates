const firebaseConfig = {
    apiKey: "AIzaSyBoU6bR_WVh2oEzzF61TFw2CruSF56FUFc",
    authDomain: "rentayachtloscabos.firebaseapp.com",
    projectId: "rentayachtloscabos",
    storageBucket: "rentayachtloscabos.appspot.com",
    messagingSenderId: "351198330910",
    appId: "1:351198330910:web:8c7fce1da62cad2fa4ae0f",
  };
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const storage = firebase.storage();


  var queryString = window.location.search;
  queryString = queryString.substring(1);
  queryString = queryString.replace(/-/g, " ");
  console.log(queryString);

  
  async function TraerContenidoYate() {
    const MostrarFotosYate = document.getElementById("MostrarFotosYate");
    const MiniImagenes = document.getElementById("MiniImagenes");
   
    try {
        const doc = await db.collection("Yates").doc(queryString).get();
        const data = doc.data();
        const promises = [];

        data.FotosYate.forEach((fotoUrl) => {
            const imgElement = document.createElement("img");
            imgElement.src = fotoUrl;

            // Crear contenedor para la imagen en MostrarFotosYate
            const imgContainer1 = document.createElement("div");
            imgContainer1.className = "swiper-slide ImgPortada";
            imgContainer1.appendChild(imgElement);
            MostrarFotosYate.querySelector('.swiper-wrapper').appendChild(imgContainer1);

            // Crear contenedor para la imagen en MiniImagenes
            const imgContainer2 = document.createElement("div");
            imgContainer2.className = "swiper-slide ImgPortada";
            imgContainer2.appendChild(imgElement.cloneNode(true));
            MiniImagenes.querySelector('.swiper-wrapper').appendChild(imgContainer2);

            // Agregar promesa para cada imagen creada
            promises.push(new Promise((resolve) => {
                imgElement.onload = resolve;
                imgElement.onerror = resolve; // En caso de error, también resolvemos
            }));
        });

        // Esperar a que todas las imágenes estén cargadas
        await Promise.all(promises);

        // Ahora que todas las imágenes están cargadas, puedes mostrar los sliders
        var swiper = new Swiper(".MiniSlider", {
            loop: true,
            spaceBetween: 20,
            slidesPerView: 2,
            freeMode: true,
            watchSlidesProgress: true,
            breakpoints: {
                1020: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
            }
        });
        var swiper2 = new Swiper(".SliderPortada", {
            loop: true,
            spaceBetween: 0,
            navigation: {
                nextEl: ".arrow-right",
                prevEl: ".arrow-left",
            },
            thumbs: {
                swiper: swiper,
            },
        });

       

    } catch (error) {
        console.log("Error obteniendo documento:", error);
    }

 
    



}

TraerContenidoYate();

MostrarTextos();
async function MostrarTextos() {
    try {
        const doc = await db.collection("Yates").doc(queryString).get();
        
        if (!doc.exists) {
            console.error("Document does not exist");
            return;
        }
        const data = doc.data();
        const TituloYate = document.getElementById("TituloYate");
        const Baths = document.getElementById("Baths");
        const Bedrooms = document.getElementById("Bedrooms");
        const Descripcion = document.getElementById("Descripcion");
        const Drinks = document.getElementById("Drinks");
        const ExtraGuest = document.getElementById("ExtraGuest");
        const Food = document.getElementById("Food");
        const FuelIncluded = document.getElementById("FuelIncluded");
        const GuestIncluded = document.getElementById("GuestIncluded");
        const Toys = document.getElementById("Toys");

        const HorasYates = document.getElementById("HorasYates");


        
        TituloYate.innerHTML = data.NombreYate;

        Descripcion.innerHTML = data.Descripcion;
        GuestIncluded.innerHTML = data.GuestIncluded;
        Bedrooms.innerHTML = data.Bedrooms;
        Baths.innerHTML = data.Baths;

        Drinks.innerHTML = data.Drinks;

        Toys.innerHTML = data.Toys;

        // Verificar y generar contenido para 2 horas
if (data.Precio2h) {
    HorasYates.innerHTML += `
        <div class="flex items-center gap-3 my-4">
            <h3 class="text-[#053A55] font-bold">2 Hours</h3>
            <div class="border-b border-black w-[8%] sm:w-[30%] xl:w-[60%]"></div>
            <div class="bg-[#053A55] rounded-full">
                <p class="text-white md:font-bold md:py-2 px-[1px] md:px-4">$ <span>${data.Precio2h}</span> USD</p>
            </div>
        </div>`;
}

// Verificar y generar contenido para 4 horas
if (data.Precio4h) {
    HorasYates.innerHTML += `
        <div class="flex items-center gap-3 my-4">
            <h3 class="text-[#053A55] font-bold">4 Hours</h3>
            <div class="border-b border-black w-[8%] sm:w-[30%] xl:w-[60%]"></div>
            <div class="bg-[#053A55] rounded-full">
                <p class="text-white md:font-bold md:py-2 px-[1px] md:px-4">$ <span>${data.Precio4h}</span> USD</p>
            </div>
        </div>`;
}

// Verificar y generar contenido para 6 horas
if (data.Precio6h) {
    HorasYates.innerHTML += `
        <div class="flex items-center gap-3 my-4">
            <h3 class="text-[#053A55] font-bold">6 Hours</h3>
            <div class="border-b border-black w-[8%] sm:w-[30%] xl:w-[60%]"></div>
            <div class="bg-[#053A55] rounded-full">
                <p class="text-white md:font-bold md:py-2 px-[1px] md:px-4">$ <span>${data.Precio6h}</span> USD</p>
            </div>
        </div>`;
}

// Verificar y generar contenido para 8 horas
if (data.Precio8h) {
    HorasYates.innerHTML += `
        <div class="flex items-center gap-3 my-4">
            <h3 class="text-[#053A55] font-bold">8 Hours</h3>
            <div class="border-b border-black w-[8%] sm:w-[30%] xl:w-[60%]"></div>
            <div class="bg-[#053A55] rounded-full">
                <p class="text-white md:font-bold md:py-2 px-[1px] md:px-4">$ <span>${data.Precio8h}</span> USD</p>
            </div>
        </div>`;
}


    } catch (error) {
        console.error("Error fetching document:", error);
    }
}
